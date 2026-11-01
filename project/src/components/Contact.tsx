import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  timeline: string;
  project_details: string;
}

const INITIAL: FormData = {
  name: '',
  email: '',
  phone: '',
  service: '',
  timeline: '',
  project_details: '',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  borderRadius: '8px',
  border: '1px solid rgba(255,255,255,0.08)',
  backgroundColor: 'rgba(255,255,255,0.04)',
  padding: '12px 16px',
  fontSize: '14px',
  color: 'rgba(255,255,255,0.85)',
  fontFamily: "'Lato', sans-serif",
  outline: 'none',
  transition: 'border-color 0.2s',
};

const labelStyle: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: 600,
  color: 'rgba(255,255,255,0.55)',
  fontFamily: "'Lato', sans-serif",
};

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label style={labelStyle}>
        {label} {required && <span style={{ color: '#fd6f00' }}>*</span>}
      </label>
      {children}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = '#fd6f00';
    e.target.style.boxShadow = '0 0 0 2px rgba(253,111,0,0.15)';
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'rgba(255,255,255,0.08)';
    e.target.style.boxShadow = 'none';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setStatus('loading');
    const { error } = await supabase.from('contact_messages').insert([form]);
    if (error) {
      setStatus('error');
    } else {
      setStatus('success');
      setForm(INITIAL);
    }
  };

  return (
    <section id="contact" className="w-full">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-14 px-6 xl:px-20">
        <div className="flex flex-col items-center gap-3 text-center">
          <p
            className="text-lg font-semibold uppercase tracking-[0.2em] text-[#fd6f00]"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Get In Touch
          </p>
          <h2
            className="text-4xl font-black text-white sm:text-5xl"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Contact Me
          </h2>
          <p
            className="max-w-md text-base"
            style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Lato', sans-serif" }}
          >
            Cultivating Connections: Reach Out And Connect With Me
          </p>
        </div>

        <div className="w-full max-w-3xl">
          {status === 'success' ? (
            <div
              className="flex flex-col items-center gap-4 rounded-2xl py-16 text-center"
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <CheckCircle size={48} className="text-[#fd6f00]" />
              <h3
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                Message Sent!
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Lato', sans-serif" }}>
                Thank you for reaching out. I'll get back to you soon.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-2 rounded-lg bg-gradient-to-br from-[#fd6f00] to-[#e46400] px-8 py-2.5 font-bold text-white hover:opacity-90"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Name" required>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Your full name"
                    required
                    style={inputStyle}
                  />
                </Field>
                <Field label="Email" required>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="your@email.com"
                    required
                    style={inputStyle}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Phone Number">
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="+91 98765 43210"
                    style={inputStyle}
                  />
                </Field>
                <Field label="Service Needed">
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={{ ...inputStyle, appearance: 'none' }}
                  >
                    <option value="" style={{ backgroundColor: '#1a1a1a' }}>Select a service</option>
                    {['Full-Stack Development', 'Machine Learning', 'Backend & API Development', 'Frontend Development', 'Database Design', 'Data Analysis'].map(
                      (s) => (
                        <option key={s} value={s} style={{ backgroundColor: '#1a1a1a' }}>
                          {s}
                        </option>
                      )
                    )}
                  </select>
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Timeline">
                  <input
                    name="timeline"
                    value={form.timeline}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="e.g. 2 weeks, 1 month"
                    style={inputStyle}
                  />
                </Field>
                <Field label="Project Details">
                  <input
                    name="project_details"
                    value={form.project_details}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Brief description of your project"
                    style={inputStyle}
                  />
                </Field>
              </div>

              {status === 'error' && (
                <div
                  className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm"
                  style={{
                    backgroundColor: 'rgba(220,38,38,0.1)',
                    border: '1px solid rgba(220,38,38,0.3)',
                    color: '#f87171',
                  }}
                >
                  <AlertCircle size={16} />
                  Something went wrong. Please try again.
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="flex items-center gap-2 rounded-lg px-10 py-3 text-base font-bold transition-all disabled:opacity-60"
                  style={{
                    border: '1px solid rgba(149,149,149,0.5)',
                    backgroundColor: 'transparent',
                    color: 'rgba(255,255,255,0.75)',
                    fontFamily: "'Lato', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = '#fd6f00';
                    (e.currentTarget as HTMLElement).style.color = '#fd6f00';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(149,149,149,0.5)';
                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.75)';
                  }}
                >
                  <Send size={16} />
                  {status === 'loading' ? 'Sending...' : 'Send'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
