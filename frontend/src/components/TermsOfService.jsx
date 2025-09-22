import React from 'react';
import { Card, CardContent } from './ui/card';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsOfService = () => {
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
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Terms of Service</h1>
          <p className="text-slate-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardContent className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Acceptance of Terms</h2>
              <div className="space-y-4 text-slate-600">
                <p>
                  By accessing and using the Lakwalahal Foundation website ("Service"), you accept and agree to be bound by the terms and provision of this agreement.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">2. About Our Organization</h2>
              <div className="space-y-4 text-slate-600">
                <p>
                  The Lakwalahal Foundation is a nonprofit organization dedicated to healing, protection, and sacred remembrance. We are in the process of obtaining 501(c)(3) status in New York, United States.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Use of Our Service</h2>
              <div className="space-y-4 text-slate-600">
                <p>You may use our Service for lawful purposes only. You agree not to use the Service:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>In any way that violates any applicable law or regulation</li>
                  <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent</li>
                  <li>To impersonate or attempt to impersonate the Foundation, a Foundation employee, another user, or any other person or entity</li>
                  <li>In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Donations</h2>
              <div className="space-y-4 text-slate-600">
                <p>
                  <strong>Current Status:</strong> We are currently awaiting 501(c)(3) tax-exempt status approval. Donations made before approval may not be tax-deductible.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>All donations are voluntary and non-refundable unless required by law</li>
                  <li>We will provide receipts for all donations</li>
                  <li>Donors will be notified when our 501(c)(3) status is approved</li>
                  <li>We reserve the right to refuse any donation</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">5. Privacy and Data Protection</h2>
              <div className="space-y-4 text-slate-600">
                <p>
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">6. Intellectual Property Rights</h2>
              <div className="space-y-4 text-slate-600">
                <p>
                  The Service and its original content, features, and functionality are and will remain the exclusive property of the Lakwalahal Foundation and its licensors.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">7. Disclaimer of Warranties</h2>
              <div className="space-y-4 text-slate-600">
                <p>
                  The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, the Lakwalahal Foundation excludes all representations, warranties, obligations, and liabilities.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">8. Limitation of Liability</h2>
              <div className="space-y-4 text-slate-600">
                <p>
                  In no event shall the Lakwalahal Foundation, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">9. Governing Law</h2>
              <div className="space-y-4 text-slate-600">
                <p>
                  These Terms shall be interpreted and governed by the laws of the State of New York, United States, without regard to its conflict of law provisions.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">10. Changes to Terms</h2>
              <div className="space-y-4 text-slate-600">
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">11. Contact Information</h2>
              <div className="space-y-4 text-slate-600">
                <p>
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p><strong>The Lakwalahal Foundation</strong></p>
                  <p>Email: info@lakwalahalfoundation.org</p>
                  <p>Phone: (555) 123-HEAL</p>
                  <p>Address: 123 Healing Way, Compassion City, NY 12345</p>
                </div>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;