import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { 
  User, 
  Heart, 
  Shield, 
  Calendar,
  Edit,
  Save,
  AlertCircle,
  Plus,
  Trash2,
  Activity,
  Clock,
  Settings
} from 'lucide-react';

const Profile = () => {
  const { state, dispatch } = useHealth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...state.user });
  const [newAllergy, setNewAllergy] = useState('');
  const [newCondition, setNewCondition] = useState('');

  const handleSave = () => {
    dispatch({ type: 'UPDATE_USER', payload: editedUser });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser({ ...state.user });
    setIsEditing(false);
  };

  const addAllergy = () => {
    if (newAllergy.trim()) {
      setEditedUser(prev => ({
        ...prev,
        allergies: [...prev.allergies, newAllergy.trim()]
      }));
      setNewAllergy('');
    }
  };

  const removeAllergy = (index) => {
    setEditedUser(prev => ({
      ...prev,
      allergies: prev.allergies.filter((_, i) => i !== index)
    }));
  };

  const addCondition = () => {
    if (newCondition.trim()) {
      setEditedUser(prev => ({
        ...prev,
        conditions: [...prev.conditions, newCondition.trim()]
      }));
      setNewCondition('');
    }
  };

  const removeCondition = (index) => {
    setEditedUser(prev => ({
      ...prev,
      conditions: prev.conditions.filter((_, i) => i !== index)
    }));
  };

  const healthStats = [
    {
      label: 'Active Medications',
      value: state.medications.length,
      icon: Heart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Symptom Logs',
      value: state.symptoms.length,
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Vital Records',
      value: state.vitals.length,
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      label: 'Emergency Contacts',
      value: state.emergencyContacts.length,
      icon: Shield,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-10 h-10 text-sky-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Profile</h1>
        <p className="text-gray-600">Manage your personal health information and preferences</p>
      </div>

      {/* Health Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {healthStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Profile Information */}
        <div className="lg:col-span-2 space-y-8">
          {/* Personal Information */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center px-4 py-2 text-sky-600 hover:text-sky-700 font-medium"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </button>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedUser.name}
                    onChange={(e) => setEditedUser(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <p className="p-3 bg-gray-50 rounded-lg text-gray-900">
                    {state.user.name || 'Not specified'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={editedUser.age}
                    onChange={(e) => setEditedUser(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder="Enter your age"
                  />
                ) : (
                  <p className="p-3 bg-gray-50 rounded-lg text-gray-900">
                    {state.user.age || 'Not specified'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                {isEditing ? (
                  <select
                    value={editedUser.gender}
                    onChange={(e) => setEditedUser(prev => ({ ...prev, gender: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                ) : (
                  <p className="p-3 bg-gray-50 rounded-lg text-gray-900">
                    {state.user.gender || 'Not specified'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type</label>
                {isEditing ? (
                  <select
                    value={editedUser.bloodType}
                    onChange={(e) => setEditedUser(prev => ({ ...prev, bloodType: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  >
                    <option value="">Select blood type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                ) : (
                  <p className="p-3 bg-gray-50 rounded-lg text-gray-900">
                    {state.user.bloodType || 'Not specified'}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Allergies */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <AlertCircle className="w-5 h-5 text-amber-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Allergies</h2>
            </div>

            {isEditing && (
              <div className="flex space-x-2 mb-4">
                <input
                  type="text"
                  value={newAllergy}
                  onChange={(e) => setNewAllergy(e.target.value)}
                  placeholder="Add new allergy"
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && addAllergy()}
                />
                <button
                  onClick={addAllergy}
                  className="px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="space-y-2">
              {editedUser.allergies.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No allergies recorded</p>
              ) : (
                editedUser.allergies.map((allergy, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                    <span className="text-amber-800">{allergy}</span>
                    {isEditing && (
                      <button
                        onClick={() => removeAllergy(index)}
                        className="text-amber-600 hover:text-amber-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Medical Conditions */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <Heart className="w-5 h-5 text-red-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Medical Conditions</h2>
            </div>

            {isEditing && (
              <div className="flex space-x-2 mb-4">
                <input
                  type="text"
                  value={newCondition}
                  onChange={(e) => setNewCondition(e.target.value)}
                  placeholder="Add medical condition"
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && addCondition()}
                />
                <button
                  onClick={addCondition}
                  className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="space-y-2">
              {editedUser.conditions.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No medical conditions recorded</p>
              ) : (
                editedUser.conditions.map((condition, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <span className="text-red-800">{condition}</span>
                    {isEditing && (
                      <button
                        onClick={() => removeCondition(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {state.symptoms.slice(-3).map((symptom, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Activity className="w-4 h-4 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Symptom check</p>
                    <p className="text-xs text-gray-600">{new Date(symptom.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
              
              {state.vitals.slice(-2).map((vital, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Heart className="w-4 h-4 text-red-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Vital signs recorded</p>
                    <p className="text-xs text-gray-600">{new Date(vital.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}

              {state.symptoms.length === 0 && state.vitals.length === 0 && (
                <p className="text-gray-500 text-center py-4 text-sm">No recent activity</p>
              )}
            </div>
          </div>

          {/* Health Summary */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Health Summary</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Profile Completion</span>
                <div className="flex items-center">
                  <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ 
                        width: `${Math.round(
                          (Object.values(state.user).filter(v => v && (Array.isArray(v) ? v.length > 0 : true)).length / 
                          Object.keys(state.user).length) * 100
                        )}%` 
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {Math.round(
                      (Object.values(state.user).filter(v => v && (Array.isArray(v) ? v.length > 0 : true)).length / 
                      Object.keys(state.user).length) * 100
                    )}%
                  </span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Last updated:</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <Settings className="w-5 h-5 text-gray-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
            </div>
            <div className="space-y-3">
              <button className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <span className="font-medium text-gray-700">Notification Preferences</span>
              </button>
              <button className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <span className="font-medium text-gray-700">Privacy Settings</span>
              </button>
              <button className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <span className="font-medium text-gray-700">Export Health Data</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;