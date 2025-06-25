import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { 
  Activity, 
  Heart, 
  Pill, 
  Calendar,
  TrendingUp,
  AlertCircle,
  Plus,
  Clock,
  CheckCircle,
  Target
} from 'lucide-react';

const Dashboard = () => {
  const { state } = useHealth();
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const quickStats = [
    {
      title: 'Heart Rate',
      value: '72 BPM',
      change: '+2%',
      trend: 'up',
      icon: Heart,
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Blood Pressure',
      value: '120/80',
      change: 'Normal',
      trend: 'stable',
      icon: Activity,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Active Medications',
      value: state.medications.length.toString(),
      change: 'On track',
      trend: 'stable',
      icon: Pill,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Health Score',
      value: '85/100',
      change: '+5 pts',
      trend: 'up',
      icon: Target,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    }
  ];

  const recentActivities = [
    {
      type: 'medication',
      title: 'Took Vitamin D',
      time: '2 hours ago',
      icon: Pill,
      color: 'text-blue-500'
    },
    {
      type: 'vital',
      title: 'Recorded blood pressure',
      time: '1 day ago',
      icon: Activity,
      color: 'text-green-500'
    },
    {
      type: 'symptom',
      title: 'Completed symptom check',
      time: '2 days ago',
      icon: CheckCircle,
      color: 'text-purple-500'
    },
    {
      type: 'appointment',
      title: 'Upcoming: Dr. Smith',
      time: 'Tomorrow 2:00 PM',
      icon: Calendar,
      color: 'text-orange-500'
    }
  ];

  const upcomingMedications = [
    { name: 'Vitamin D', time: '2:00 PM', status: 'upcoming' },
    { name: 'Blood Pressure Med', time: '6:00 PM', status: 'upcoming' },
    { name: 'Omega-3', time: '8:00 PM', status: 'upcoming' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Dashboard</h1>
        <p className="text-gray-600">Track your health metrics and stay on top of your wellness journey</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Health Trends Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Health Trends</h2>
              <div className="flex space-x-2">
                {['week', 'month', 'year'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      selectedPeriod === period
                        ? 'bg-sky-100 text-sky-700'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Simulated Chart */}
            <div className="h-64 bg-gradient-to-br from-sky-50 to-emerald-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-sky-500 mx-auto mb-4" />
                <p className="text-gray-600">Health trends visualization</p>
                <p className="text-sm text-gray-500 mt-2">Your health metrics are trending positively</p>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
              <button className="text-sky-600 hover:text-sky-700 text-sm font-medium">
                View all
              </button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <Icon className={`w-5 h-5 ${activity.color} mr-3`} />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Upcoming Medications */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Today's Medications</h2>
              <Clock className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {upcomingMedications.map((med, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-sky-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{med.name}</p>
                    <p className="text-sm text-gray-600">{med.time}</p>
                  </div>
                  <div className="w-6 h-6 bg-sky-200 rounded-full"></div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-sky-600 hover:text-sky-700 font-medium text-sm">
              View all medications
            </button>
          </div>

          {/* Health Alerts */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <AlertCircle className="w-5 h-5 text-amber-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Health Alerts</h2>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm font-medium text-amber-800">Medication Reminder</p>
                <p className="text-xs text-amber-700 mt-1">Don't forget your evening dose</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm font-medium text-blue-800">Health Check Due</p>
                <p className="text-xs text-blue-700 mt-1">Schedule your monthly check-up</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center p-3 text-left bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors">
                <Plus className="w-5 h-5 text-sky-600 mr-3" />
                <span className="font-medium text-sky-700">Log Symptoms</span>
              </button>
              <button className="w-full flex items-center p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <Activity className="w-5 h-5 text-green-600 mr-3" />
                <span className="font-medium text-green-700">Record Vitals</span>
              </button>
              <button className="w-full flex items-center p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                <Calendar className="w-5 h-5 text-purple-600 mr-3" />
                <span className="font-medium text-purple-700">Schedule Appointment</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;