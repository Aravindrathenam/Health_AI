import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { 
  Phone, 
  MapPin, 
  Clock, 
  AlertTriangle,
  Heart,
  Brain,
  Zap,
  Thermometer,
  Users,
  Plus,
  Edit,
  Trash2,
  Navigation,
  PhoneCall
} from 'lucide-react';

const Emergency = () => {
  const { state, dispatch } = useHealth();
  const [showAddContact, setShowAddContact] = useState(false);
  const [selectedEmergency, setSelectedEmergency] = useState(null);
  const [newContact, setNewContact] = useState({
    name: '',
    relationship: '',
    phone: ''
  });

  const emergencyNumbers = [
    { name: 'Emergency Services', number: '911', description: 'Police, Fire, Medical Emergency' },
    { name: 'Poison Control', number: '1-800-222-1222', description: 'Poison emergencies and information' },
    { name: 'Crisis Text Line', number: 'Text HOME to 741741', description: 'Mental health crisis support' },
    { name: 'National Suicide Prevention', number: '988', description: '24/7 suicide prevention lifeline' }
  ];

  const emergencyTypes = [
    {
      id: 'heart-attack',
      title: 'Heart Attack',
      icon: Heart,
      color: 'bg-red-500',
      symptoms: [
        'Chest pain or discomfort',
        'Pain in arms, neck, jaw, or back',
        'Shortness of breath',
        'Cold sweat, nausea, lightheadedness'
      ],
      actions: [
        'Call 911 immediately',
        'Chew aspirin if not allergic (check with 911 operator)',
        'Sit down and rest',
        'Loosen tight clothing',
        'Be prepared to perform CPR if person becomes unconscious'
      ]
    },
    {
      id: 'stroke',
      title: 'Stroke',
      icon: Brain,
      color: 'bg-purple-500',
      symptoms: [
        'Sudden confusion or trouble speaking',
        'Sudden trouble seeing',
        'Sudden severe headache',
        'Sudden trouble walking or loss of balance'
      ],
      actions: [
        'Call 911 immediately',
        'Note the time symptoms started',
        'Help person lie down with head slightly raised',
        'Do not give food or water',
        'Use FAST test: Face drooping, Arm weakness, Speech difficulty, Time to call 911'
      ]
    },
    {
      id: 'choking',
      title: 'Choking',
      icon: Zap,
      color: 'bg-orange-500',
      symptoms: [
        'Cannot speak or cough',
        'Difficulty breathing',
        'Hands clutching throat',
        'Turning blue in face or lips'
      ],
      actions: [
        'Call 911 if person cannot cough, speak, or breathe',
        'Perform Heimlich maneuver (abdominal thrusts)',
        'For infants: back blows and chest thrusts',
        'Continue until object is expelled or person becomes unconscious',
        'If unconscious, begin CPR'
      ]
    },
    {
      id: 'severe-allergic',
      title: 'Severe Allergic Reaction',
      icon: AlertTriangle,
      color: 'bg-yellow-500',
      symptoms: [
        'Difficulty breathing or wheezing',
        'Swelling of face, lips, tongue, or throat',
        'Rapid pulse',
        'Severe whole-body reaction'
      ],
      actions: [
        'Call 911 immediately',
        'Use epinephrine auto-injector (EpiPen) if available',
        'Help person lie flat and elevate legs',
        'Loosen tight clothing',
        'Be prepared to perform CPR if person becomes unconscious'
      ]
    },
    {
      id: 'burns',
      title: 'Severe Burns',
      icon: Thermometer,
      color: 'bg-red-600',
      symptoms: [
        'Burns larger than palm of hand',
        'Burns on face, hands, feet, genitals',
        'White or charred skin',
        'Severe pain or no pain at all'
      ],
      actions: [
        'Call 911 for severe burns',
        'Cool burn with cool (not cold) water for 10-20 minutes',
        'Remove jewelry and loose clothing before swelling occurs',
        'Cover with sterile, non-adhesive bandage',
        'Do not break blisters or apply ice, butter, or ointments'
      ]
    }
  ];

  const nearbyFacilities = [
    {
      name: 'City General Hospital',
      type: 'Emergency Room',
      distance: '0.8 miles',
      phone: '(555) 123-4567',
      address: '123 Medical Center Dr'
    },
    {
      name: 'Urgent Care Plus',
      type: 'Urgent Care',
      distance: '1.2 miles',
      phone: '(555) 234-5678',
      address: '456 Health Way'
    },
    {
      name: 'MedFast Clinic',
      type: 'Walk-in Clinic',
      distance: '2.1 miles',
      phone: '(555) 345-6789',
      address: '789 Wellness Blvd'
    }
  ];

  const handleAddContact = (e) => {
    e.preventDefault();
    const contact = {
      id: Date.now().toString(),
      ...newContact
    };
    dispatch({ type: 'ADD_EMERGENCY_CONTACT', payload: contact });
    setNewContact({ name: '', relationship: '', phone: '' });
    setShowAddContact(false);
  };

  const handleRemoveContact = (id) => {
    dispatch({ type: 'REMOVE_EMERGENCY_CONTACT', payload: id });
  };

  const callEmergency = (number) => {
    // In a real app, this would trigger a phone call
    alert(`Calling ${number}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Phone className="w-8 h-8 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Emergency Resources</h1>
        <p className="text-gray-600">Quick access to emergency contacts, first aid guides, and nearby medical facilities</p>
      </div>

      {/* Emergency Alert Banner */}
      <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
        <div className="flex">
          <AlertTriangle className="w-5 h-5 text-red-400 mr-3 mt-0.5" />
          <div>
            <p className="text-red-800 font-medium">In case of life-threatening emergency, call 911 immediately.</p>
            <p className="text-red-700 text-sm mt-1">This app is for informational purposes only and should not replace emergency medical services.</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Emergency Numbers */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Phone className="w-5 h-5 text-red-600 mr-2" />
              Emergency Numbers
            </h2>
            <div className="grid gap-4">
              {emergencyNumbers.map((emergency, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-100">
                  <div>
                    <h3 className="font-medium text-gray-900">{emergency.name}</h3>
                    <p className="text-sm text-gray-600">{emergency.description}</p>
                  </div>
                  <button
                    onClick={() => callEmergency(emergency.number)}
                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    <PhoneCall className="w-4 h-4 mr-2" />
                    {emergency.number}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Guides */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Emergency First Aid Guides</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {emergencyTypes.map((emergency) => {
                const Icon = emergency.icon;
                return (
                  <div
                    key={emergency.id}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedEmergency(emergency)}
                  >
                    <div className="flex items-center mb-3">
                      <div className={`w-10 h-10 ${emergency.color} rounded-lg flex items-center justify-center mr-3`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-medium text-gray-900">{emergency.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Key symptoms:</p>
                    <p className="text-sm text-gray-700">{emergency.symptoms.slice(0, 2).join(', ')}...</p>
                    <button className="text-red-600 text-sm font-medium mt-2 hover:text-red-700">
                      View full guide →
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Nearby Medical Facilities */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                Nearby Medical Facilities
              </h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Update location
              </button>
            </div>
            <div className="space-y-4">
              {nearbyFacilities.map((facility, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <h3 className="font-medium text-gray-900 mr-2">{facility.name}</h3>
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md">
                        {facility.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{facility.address}</p>
                    <p className="text-sm text-blue-600">{facility.distance} away</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => callEmergency(facility.phone)}
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors">
                      <Navigation className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Emergency Contacts */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Users className="w-5 h-5 text-green-600 mr-2" />
                Emergency Contacts
              </h2>
              <button
                onClick={() => setShowAddContact(true)}
                className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {state.emergencyContacts.length === 0 ? (
                <div className="text-center py-6">
                  <Users className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">No emergency contacts added</p>
                  <button
                    onClick={() => setShowAddContact(true)}
                    className="text-green-600 text-sm font-medium mt-2"
                  >
                    Add your first contact
                  </button>
                </div>
              ) : (
                state.emergencyContacts.map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{contact.name}</p>
                      <p className="text-sm text-gray-600">{contact.relationship}</p>
                      <p className="text-sm text-blue-600">{contact.phone}</p>
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => callEmergency(contact.phone)}
                        className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleRemoveContact(contact.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button
                onClick={() => callEmergency('911')}
                className="w-full flex items-center p-3 text-left bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
              >
                <Phone className="w-5 h-5 text-red-600 mr-3" />
                <span className="font-medium text-red-700">Call 911</span>
              </button>
              <button className="w-full flex items-center p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                <span className="font-medium text-blue-700">Find Nearest Hospital</span>
              </button>
              <button className="w-full flex items-center p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                <Heart className="w-5 h-5 text-purple-600 mr-3" />
                <span className="font-medium text-purple-700">Start CPR Guide</span>
              </button>
            </div>
          </div>

          {/* Medical Information */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-600">Blood Type:</p>
                <p className="font-medium text-gray-900">{state.user.bloodType || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-gray-600">Allergies:</p>
                <p className="font-medium text-gray-900">
                  {state.user.allergies.length > 0 ? state.user.allergies.join(', ') : 'None specified'}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Medical Conditions:</p>
                <p className="font-medium text-gray-900">
                  {state.user.conditions.length > 0 ? state.user.conditions.join(', ') : 'None specified'}
                </p>
              </div>
            </div>
            <button className="w-full mt-4 py-2 text-blue-600 hover:text-blue-700 font-medium text-sm">
              Update medical information
            </button>
          </div>
        </div>
      </div>

      {/* Add Contact Modal */}
      {showAddContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Add Emergency Contact</h2>
              <button
                onClick={() => setShowAddContact(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddContact} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={newContact.name}
                  onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                <input
                  type="text"
                  required
                  value={newContact.relationship}
                  onChange={(e) => setNewContact(prev => ({ ...prev, relationship: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Spouse, Parent, Friend, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={newContact.phone}
                  onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddContact(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Add Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Emergency Guide Modal */}
      {selectedEmergency && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className={`w-12 h-12 ${selectedEmergency.color} rounded-lg flex items-center justify-center mr-4`}>
                    <selectedEmergency.icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">{selectedEmergency.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedEmergency(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                    <h3 className="font-semibold text-red-800">Warning Signs</h3>
                  </div>
                  <ul className="space-y-1">
                    {selectedEmergency.symptoms.map((symptom, index) => (
                      <li key={index} className="text-red-700 text-sm flex items-start">
                        <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Clock className="w-5 h-5 text-green-600 mr-2" />
                    <h3 className="font-semibold text-green-800">What to Do</h3>
                  </div>
                  <ol className="space-y-2">
                    {selectedEmergency.actions.map((action, index) => (
                      <li key={index} className="text-green-700 text-sm flex items-start">
                        <span className="w-6 h-6 bg-green-500 text-white rounded-full text-xs flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        {action}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertTriangle className="w-5 h-5 text-amber-600 mr-2" />
                    <p className="text-amber-800 text-sm font-medium">
                      Remember: This guide is for emergency situations. Always call 911 first in life-threatening emergencies.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => callEmergency('911')}
                  className="flex-1 flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call 911
                </button>
                <button
                  onClick={() => setSelectedEmergency(null)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Close Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Emergency;