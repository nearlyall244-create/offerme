import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
  MessageSquare,
  Clock,
  HelpCircle
} from 'lucide-react';
import './ContactView.css';

export const ContactView: React.FC = () => {
  const { addToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Merchant Partnership Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      addToast({ type: 'warning', title: 'Missing fields', message: 'Please fill in all required contact fields.' });
      return;
    }

    setSubmitted(true);
    addToast({
      type: 'success',
      title: 'Message Dispatched',
      message: 'Thank you for contacting OfferMe support! Our team will respond within 24 hours.'
    });
  };

  return (
    <div className="contact-wrapper" id="contact-view-root">
      <div className="contact-container">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-bold mb-2">
            <MessageSquare size={14} />
            <span>Get in Touch</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Contact & Merchant Support
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Have questions about listing your store, claiming vouchers, or API integrations? We are here to help.
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact Details & Office */}
          <div className="contact-card">
            <h2 className="text-lg font-black text-slate-900 mb-4">Contact Information</h2>

            <div className="space-y-4 text-xs text-slate-600 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <strong className="block text-slate-800 font-bold text-sm">Headquarters</strong>
                  <span>500 Howard Street, Suite 400, San Francisco, CA 94105</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Mail size={16} />
                </div>
                <div>
                  <strong className="block text-slate-800 font-bold text-sm">Email Support</strong>
                  <span>support@offerme.com / merchants@offerme.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Phone size={16} />
                </div>
                <div>
                  <strong className="block text-slate-800 font-bold text-sm">Phone Line</strong>
                  <span>+1 (800) 555-OFFER (Mon - Fri, 8am - 6pm PST)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                  <Clock size={16} />
                </div>
                <div>
                  <strong className="block text-slate-800 font-bold text-sm">Response Time</strong>
                  <span>Average response time under 2 business hours</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs text-slate-600">
              <div className="font-bold text-slate-900 mb-1 flex items-center gap-1">
                <HelpCircle size={14} className="text-rose-500" />
                <span>Frequently Asked Questions</span>
              </div>
              <p>
                Interested in advertising your multi-location franchise? Reach out to our enterprise sales team for bulk onboarding.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="contact-card">
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle size={28} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Message Sent Successfully!</h3>
                <p className="text-xs text-slate-600 mb-6">
                  Thank you for reaching out to OfferMe. One of our support managers will be in touch with you shortly.
                </p>
                <button
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold"
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-lg font-black text-slate-900 mb-2">Send Us a Message</h2>

                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">Your Name *</label>
                  <input
                    type="text"
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-rose-500"
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">Email Address *</label>
                  <input
                    type="email"
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-rose-500"
                    placeholder="jane@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">Subject</label>
                  <select
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-rose-500 font-medium"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  >
                    <option value="Merchant Partnership Inquiry">Merchant Partnership Inquiry</option>
                    <option value="Offer Verification Support">Offer Verification Support</option>
                    <option value="Customer Voucher Redemption">Customer Voucher Redemption</option>
                    <option value="Technical Issue / Bug Report">Technical Issue / Bug Report</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 mb-1 block">Message *</label>
                  <textarea
                    rows={4}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-rose-500"
                    placeholder="Describe your inquiry or question..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Send size={14} />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
