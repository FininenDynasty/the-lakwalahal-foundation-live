import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { 
  Heart, 
  Users, 
  Mail, 
  MessageSquare, 
  Download, 
  Search,
  LogOut,
  Eye,
  Check,
  Clock,
  AlertCircle
} from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = ({ onLogout }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const token = localStorage.getItem('admin_token');

  const axiosConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  useEffect(() => {
    fetchDashboardData();
    fetchContacts();
    fetchSubscribers();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(`${API}/admin/dashboard`, axiosConfig);
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      if (error.response?.status === 401) {
        onLogout();
      }
    }
  };

  const fetchContacts = async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (searchTerm) params.append('search', searchTerm);
      
      const response = await axios.get(`${API}/admin/contact-submissions?${params}`, axiosConfig);
      setContacts(response.data.submissions || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const fetchSubscribers = async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      
      const response = await axios.get(`${API}/admin/newsletter-subscribers?${params}`, axiosConfig);
      setSubscribers(response.data.subscribers || []);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    }
  };

  const updateContactStatus = async (contactId, newStatus) => {
    try {
      await axios.put(`${API}/admin/contact-submissions/${contactId}`, 
        { status: newStatus }, 
        axiosConfig
      );
      fetchContacts();
      fetchDashboardData();
    } catch (error) {
      console.error('Error updating contact status:', error);
    }
  };

  const exportContacts = async () => {
    try {
      const response = await axios.get(`${API}/admin/export/contacts`, {
        ...axiosConfig,
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'contact_submissions.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting contacts:', error);
    }
  };

  const exportSubscribers = async () => {
    try {
      const response = await axios.get(`${API}/admin/export/subscribers`, {
        ...axiosConfig,
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'newsletter_subscribers.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting subscribers:', error);
    }
  };

  const handleSearch = () => {
    fetchContacts();
    fetchSubscribers();
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    onLogout();
  };

  const getStatusBadge = (status) => {
    const variants = {
      'new': 'bg-blue-100 text-blue-800',
      'in_progress': 'bg-yellow-100 text-yellow-800',
      'resolved': 'bg-green-100 text-green-800'
    };
    
    const labels = {
      'new': 'New',
      'in_progress': 'In Progress', 
      'resolved': 'Resolved'
    };

    return (
      <Badge className={`${variants[status]} border-0`}>
        {labels[status]}
      </Badge>
    );
  };

  const getStatusIcon = (status) => {
    const icons = {
      'new': AlertCircle,
      'in_progress': Clock,
      'resolved': Check
    };
    const Icon = icons[status] || AlertCircle;
    return <Icon className="w-4 h-4" />;
  };

  if (loading && !dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Heart className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-slate-800">Lakwalahal Foundation</h1>
                <p className="text-sm text-slate-600">Admin Dashboard</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        {dashboardData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <MessageSquare className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Total Contacts</p>
                    <p className="text-2xl font-bold text-slate-800">
                      {dashboardData.stats.total_contacts}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                    <AlertCircle className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">New Contacts</p>
                    <p className="text-2xl font-bold text-slate-800">
                      {dashboardData.stats.new_contacts}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Newsletter Subscribers</p>
                    <p className="text-2xl font-bold text-slate-800">
                      {dashboardData.stats.total_subscribers}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content */}
        <Tabs defaultValue="contacts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="contacts">Contact Submissions</TabsTrigger>
            <TabsTrigger value="subscribers">Newsletter Subscribers</TabsTrigger>
          </TabsList>

          <TabsContent value="contacts" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Search contacts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={handleSearch} className="px-4">
                        <Search className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="all">All Status</option>
                      <option value="new">New</option>
                      <option value="in_progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                    <Button onClick={exportContacts} variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export CSV
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <div key={contact.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-slate-800">{contact.name}</h3>
                            {getStatusBadge(contact.status)}
                          </div>
                          <p className="text-sm text-slate-600 mb-1">
                            <Mail className="w-4 h-4 inline mr-1" />
                            {contact.email}
                          </p>
                          {contact.phone && (
                            <p className="text-sm text-slate-600 mb-1">
                              📞 {contact.phone}
                            </p>
                          )}
                          <p className="text-sm font-medium text-slate-700 mb-2">
                            Subject: {contact.subject}
                          </p>
                          <p className="text-sm text-slate-600 mb-2">
                            {contact.message.length > 150 
                              ? `${contact.message.substring(0, 150)}...` 
                              : contact.message
                            }
                          </p>
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <span>
                              {new Date(contact.created_at).toLocaleDateString()} at{' '}
                              {new Date(contact.created_at).toLocaleTimeString()}
                            </span>
                            {contact.interest && (
                              <span className="bg-gray-100 px-2 py-1 rounded">
                                Interest: {contact.interest}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 ml-4">
                          {contact.status === 'new' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateContactStatus(contact.id, 'in_progress')}
                              className="text-xs"
                            >
                              <Clock className="w-3 h-3 mr-1" />
                              Mark Progress
                            </Button>
                          )}
                          {contact.status === 'in_progress' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateContactStatus(contact.id, 'resolved')}
                              className="text-xs text-green-600 border-green-600"
                            >
                              <Check className="w-3 h-3 mr-1" />
                              Mark Resolved
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {contacts.length === 0 && (
                    <div className="text-center py-8 text-slate-500">
                      <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No contact submissions found</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscribers" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Search subscribers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={handleSearch} className="px-4">
                        <Search className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <Button onClick={exportSubscribers} variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </div>

                <div className="space-y-4">
                  {subscribers.map((subscriber) => (
                    <div key={subscriber.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-slate-800">{subscriber.email}</p>
                          <p className="text-sm text-slate-500">
                            Subscribed: {new Date(subscriber.subscribed_at).toLocaleDateString()} at{' '}
                            {new Date(subscriber.subscribed_at).toLocaleTimeString()}
                          </p>
                        </div>
                        <Badge className="bg-green-100 text-green-800 border-0">
                          Active
                        </Badge>
                      </div>
                    </div>
                  ))}

                  {subscribers.length === 0 && (
                    <div className="text-center py-8 text-slate-500">
                      <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No newsletter subscribers found</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;