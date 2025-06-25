import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Stethoscope, 
  Activity, 
  Pill, 
  Phone, 
  Shield, 
  Clock,
  Users,
  Brain,
  ChevronRight,
  Heart,
  Star,
  CheckCircle
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI Symptom Checker',
      description: 'Get instant health assessments powered by advanced AI technology',
      link: '/symptom-checker',
      color: 'bg-blue-500'
    },
    {
      icon: Activity,
      title: 'Health Dashboard',
      description: 'Track your vitals, medications, and health progress in one place',
      link: '/dashboard',
      color: 'bg-green-500'
    },
    {
      icon: Pill,
      title: 'Medication Manager',
      description: 'Never miss a dose with smart reminders and tracking',
      link: '/medications',
      color: 'bg-purple-500'
    },
    {
      icon: Phone,
      title: 'Emergency Support',
      description: '24/7 access to emergency contacts and first aid guidance',
      link: '/emergency',
      color: 'bg-red-500'
    }
  ];

  const stats = [
    { label: 'Health Assessments', value: '10,000+' },
    { label: 'Users Helped', value: '50,000+' },
    { label: 'Medical Conditions', value: '500+' },
    { label: 'Uptime', value: '99.9%' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Patient',
      content: 'HealthAI helped me understand my symptoms and guided me to seek proper medical care. The AI assessments are incredibly accurate.',
      rating: 5
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Primary Care Physician',
      content: 'I recommend HealthAI to my patients. It provides reliable preliminary assessments and encourages proper healthcare engagement.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Chronic Care Patient',
      content: 'The medication management feature has been life-changing. I never miss doses anymore and my health has improved significantly.',
      rating: 5
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-sky-50 via-white to-emerald-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
              <div className="mb-8 lg:mb-0">
                <div className="inline-flex items-center px-4 py-2 bg-sky-100 text-sky-800 rounded-full text-sm font-medium mb-6">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Trusted by Healthcare Professionals
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Your Personal
                  <span className="text-sky-600 block">Health Assistant</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Get instant health insights, track your wellness journey, and manage your medications with our AI-powered health platform designed to keep you healthy and informed.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/symptom-checker"
                    className="inline-flex items-center px-8 py-4 bg-sky-600 text-white font-semibold rounded-xl hover:bg-sky-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Start Health Check
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Link>
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center px-8 py-4 bg-white text-sky-600 font-semibold rounded-xl border-2 border-sky-600 hover:bg-sky-50 transition-colors"
                  >
                    View Dashboard
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center mr-4">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Health Status</h3>
                      <p className="text-green-600 text-sm flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        All systems normal
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Heart Rate</span>
                      <span className="font-semibold text-gray-900">72 BPM</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Blood Pressure</span>
                      <span className="font-semibold text-gray-900">120/80</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-sky-50 rounded-lg">
                      <span className="text-gray-600">Next Medication</span>
                      <span className="font-semibold text-sky-600">2:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Better Health
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform combines AI technology with personalized care to provide you with the tools and insights needed for optimal health management.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={index}
                  to={feature.link}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group"
                >
                  <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="flex items-center text-sky-600 font-medium group-hover:text-sky-700">
                    Learn more
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-sky-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-sky-100">
              Join our growing community of health-conscious individuals
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sky-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Real experiences from real people
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-sky-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-sky-100 mb-8">
            Start your journey to better health today with our AI-powered assistant
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="inline-flex items-center px-8 py-4 bg-white text-sky-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
            >
              Get Started Free
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/health-tips"
              className="inline-flex items-center px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white hover:bg-white hover:text-sky-600 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;