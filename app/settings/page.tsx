'use client';

import React, { ChangeEvent, useState } from 'react';
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  LogOut,
  Sparkles,
} from 'lucide-react';

interface FormData {
  email: string;
  name: string;
  notifications: boolean;
  darkMode: boolean;
  language: string;
  twoFactor: boolean;
}

const defaultForm: FormData = {
  email: 'user@example.com', // <-- change or fetch from API
  name: '',
  notifications: true,
  darkMode: false,
  language: 'en',
  twoFactor: false,
};

const SettingsPage = () => {
  const [formData, setFormData] = useState<FormData>(defaultForm);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSignOut = () => {
    // TODO: integrate real sign-out (NextAuth, fetch, etc.)
    alert('Signed out!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/60 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-12 h-12 rounded-full flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-light text-slate-800">Settings</h1>
              <p className="text-slate-600">Personalize your wellness space</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="flex items-center space-x-2 text-red-500 hover:text-red-600 px-5 py-2.5 rounded-2xl hover:bg-red-50/80 backdrop-blur-sm transition-all hover:-translate-y-0.5"
          >
            <LogOut className="w-4 h-4" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 grid gap-8">
        {/* Profile */}
        <Card icon={<User />} title="Profile" subtitle="Your personal information">
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
          />
          <Input label="Email Address" value={formData.email} disabled />
        </Card>

        {/* Notifications */}
        <Card icon={<Bell />} title="Notifications" subtitle="Gentle check-ins with yourself">
          <Toggle
            label="Email Notifications"
            description="Receive gentle reminders and updates"
            name="notifications"
            checked={formData.notifications}
            onChange={handleInputChange}
          />
        </Card>

        {/* Security */}
        <Card icon={<Shield />} title="Security" subtitle="Keep your wellness space safe">
          <Toggle
            label="Two-Factor Authentication"
            description="Add an extra layer of security"
            name="twoFactor"
            checked={formData.twoFactor}
            onChange={handleInputChange}
          />
          <button
            type="button"
            className="mt-4 px-6 py-3 bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-slate-700 rounded-2xl transition-all hover:-translate-y-0.5"
          >
            Change Password
          </button>
        </Card>

        {/* Preferences */}
        <Card icon={<Palette />} title="Preferences" subtitle="Customize your experience">
          <Toggle
            label="Dark Mode"
            description="Switch to a gentle dark theme"
            name="darkMode"
            checked={formData.darkMode}
            onChange={handleInputChange}
          />
          <Select
            label="Language"
            name="language"
            value={formData.language}
            onChange={handleInputChange}
            options={[
              { value: 'en', label: 'English' },
              { value: 'es', label: 'Spanish' },
              { value: 'fr', label: 'French' },
              { value: 'de', label: 'German' },
            ]}
          />
        </Card>

        {/* Save */}
        <div className="flex justify-center">
          <button
            type="button"
            className="px-12 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl transition-all hover:-translate-y-1 hover:shadow-xl font-medium text-lg"
          >
            Save Changes ✨
          </button>
        </div>

        {/* Gentle reminder */}
        <section className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 text-center shadow-lg border border-white/20">
          <h3 className="text-xl font-light text-slate-700 mb-3">Take it one day at a time</h3>
          <p className="text-slate-600 max-w-lg mx-auto">
            Your mental health matters. These settings help create a space that feels right for
            you. Remember—progress isn’t always linear.
          </p>
        </section>
      </main>
    </div>
  );
};

/* ----------  Re-usable mini-components  ---------- */
interface CardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}
const Card: React.FC<CardProps> = ({ icon, title, subtitle, children }) => (
  <section className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all">
    <div className="flex items-center space-x-3 mb-6">
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-full text-blue-600">
        {icon}
      </div>
      <div>
        <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
        <p className="text-slate-600">{subtitle}</p>
      </div>
    </div>
    <div className="space-y-6">{children}</div>
  </section>
);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
const Input: React.FC<InputProps> = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
    <input {...props} className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 bg-white/80 transition-all" />
  </div>
);

interface ToggleProps {
  label: string;
  description: string;
  name: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const Toggle: React.FC<ToggleProps> = ({ label, description, ...props }) => (
  <div className="flex items-center justify-between p-4 rounded-2xl bg-white/50 border border-white/40">
    <div>
      <h3 className="font-medium text-slate-800">{label}</h3>
      <p className="text-sm text-slate-600 mt-1">{description}</p>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" {...props} className="sr-only peer" />
      <div className="w-14 h-7 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-blue-600" />
    </label>
  </div>
);

interface SelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}
const Select: React.FC<SelectProps> = ({ label, options, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-2">
      <Globe className="w-4 h-4 inline mr-1.5" />
      {label}
    </label>
    <select {...props} className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 bg-white/80 transition-all">
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  </div>
);

export default SettingsPage;