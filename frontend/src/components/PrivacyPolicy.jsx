import React from 'react';
import { Card, CardContent } from './ui/card';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </button>
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Privacy Policy</h1>
          <p className="text-slate-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardContent className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Information We Collect</h2>
              <div className="space-y-4 text-slate-600">
                <p>
                  The Lakwalahal Foundation ("we," "our," or "us") collects information you provide directly to us, such as when you:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Fill out our contact form</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Make a donation</li>
                  <li>Participate in our programs or services</li>
                  <li>Communicate with us via email or phone</li>
                </ul>
                <p>
                  <strong>Personal Information:</strong> This may include your name, email address, phone number, mailing address, and any messages or information you choose to share with us.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">2. How We Use Your Information</h2>
              <div className="space-y-4 text-slate-600">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Respond to your inquiries and provide support</li>
                  <li>Send you newsletters and updates about our programs</li>
                  <li>Process donations and provide receipts</li>
                  <li>Improve our services and website</li>
                  <li>Comply with legal obligations</li>
                  <li>Communicate about volunteer opportunities and events</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Information Sharing and Disclosure</h2>
              <div className="space-y-4 text-slate-600">
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website, conducting our business, or serving our users</li>
                  <li><strong>Legal Requirements:</strong> We may disclose information when required by law or to protect our rights, property, or safety</li>
                  <li><strong>Consent:</strong> We may share information with your explicit consent</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Data Security</h2>
              <div className="space-y-4 text-slate-600">
                <p>
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">5. Your Rights</h2>
              <div className="space-y-4 text-slate-600">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access and update your personal information</li>
                  <li>Unsubscribe from our newsletters at any time</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt-out of certain communications</li>
                </ul>
                <p>
                  To exercise these rights, please contact us at info@lakwalahalfoundation.org
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">6. Cookies and Tracking</h2>
              <div className="space-y-4 text-slate-600">
                <p>
                  Our website may use cookies and similar tracking technologies to enhance your experience and gather information about visitors and visits to our website.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">7. Third-Party Links</h2>
              <div className="space-y-4 text-slate-600">
                <p>
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">8. Children's Privacy</h2>
              <div className="space-y-4 text-slate-600">
                <p>
                  Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">9. Contact Information</h2>
              <div className="space-y-4 text-slate-600">
                <p>
                  If you have questions about this Privacy Policy, please contact us:
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p><strong>The Lakwalahal Foundation</strong></p>
                  <p>Email: info@lakwalahalfoundation.org</p>
                  <p>Phone: (555) 123-HEAL</p>
                  <p>Address: 123 Healing Way, Compassion City, NY 12345</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">10. Updates to This Policy</h2>
              <div className="space-y-4 text-slate-600">
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;