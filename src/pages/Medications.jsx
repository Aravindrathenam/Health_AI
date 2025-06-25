import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { 
  Pill, 
  Plus, 
  Clock, 
  Calendar,
  Bell,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  Filter
} from 'lucide-react';

const Medications = () => {
  const { state, dispatch } = useHealth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: 'daily',
    time: [''],
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    notes: ''
  });

  const frequencies = [
    { value: 'once-daily', label: 'Once daily', times: 1 },
    { value: 'twice-daily', label: 'Twice daily', times: 2 },
    { value: 'three-times', label: 'Three times daily', times: 3 },
    { value: 'four-times', label: 'Four times daily', times: 4 },
    { value: 'as-needed', label: 'As needed', times: 1 },
    { value: 'weekly', label: 'Weekly', times: 1 }
  ];

  const handleAddMedication = (e) => {
    e.preventDefault();
    
    const medication = {
      id: Date.now().toString(),
      ...newMedication,
      time: newMedication.time.filter(t => t !== '')
    };

    dispatch({ type: 'ADD_MEDICATION', payload: medication });
    
    setNewMedication({
      name: '',
      dosage: '',
      frequency: 'daily',
      time: [''],
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      notes: ''
    });
    setShowAddForm(false);
  };

  const handleRemoveMedication = (id) => {
    dispatch({ type: 'REMOVE_MEDICATION', payload: id });
  };

  const handleFrequencyChange = (frequency) => {
    const freqData = frequencies.find(f => f.value === frequency);
    const timeSlots = Array(freqData.times).fill('');
    
    setNewMedication(prev => ({
      ...prev,
      frequency,
      time: timeSlots
    }));
  };

  const updateTimeSlot = (index, time) => {
    setNewMedication(prev => ({
      ...prev,
      time: prev.time.map((t, i) => i === index ? time : t)
    }));
  };

  const getTodaysMedications = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    return state.medications.flatMap(med => 
      med.time.map(time => ({
        ...med,
        scheduledTime: time,
        timeInMinutes: convertTimeToMinutes(time),
        status: Math.random() > 0.3 ? 'taken' : 'pending' // Simulate taken status
      }))
    ).sort((a, b) => a.timeInMinutes - b.timeInMinutes);
  };

  const convertTimeToMinutes = (timeStr) => {
    if (!timeStr) return 0;
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getUpcomingMedications = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    return getTodaysMedications()
      .filter(med => med.timeInMinutes > currentTime && med.status === 'pending')
      .slice(0, 3);
  };

  const filteredMedications = state.medications.filter(med => {
    if (filter === 'all') return true;
    if (filter === 'active') return !med.endDate || new Date(med.endDate) > new Date();
    if (filter === 'completed') return med.endDate && new Date(med.endDate) <= new Date();
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Medications</h1>
          <p className="text-gray-600">Manage your medications and never miss a dose</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-medium"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Medication
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Pill className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{state.medications.length}</p>
                  <p className="text-gray-600 text-sm">Active Medications</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {getTodaysMedications().filter(m => m.status === 'taken').length}
                  </p>
                  <p className="text-gray-600 text-sm">Taken Today</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mr-4">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {getTodaysMedications().filter(m => m.status === 'pending').length}
                  </p>
                  <p className="text-gray-600 text-sm">Pending Today</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4 mb-6">
            <Filter className="w-5 h-5 text-gray-400" />
            <div className="flex space-x-2">
              {[
                { key: 'all', label: 'All' },
                { key: 'active', label: 'Active' },
                { key: 'completed', label: 'Completed' }
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    filter === key
                      ? 'bg-sky-100 text-sky-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Medications List */}
          <div className="space-y-4">
            {filteredMedications.length === 0 ? (
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
                <Pill className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No medications found</h3>
                <p className="text-gray-600 mb-4">Start by adding your first medication</p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="inline-flex items-center px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-medium"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Medication
                </button>
              </div>
            ) : (
              filteredMedications.map((medication) => (
                <div key={medication.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 mr-3">{medication.name}</h3>
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {medication.dosage}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>
                            {frequencies.find(f => f.value === medication.frequency)?.label} at{' '}
                            {medication.time.map(formatTime).join(', ')}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>
                            Started {new Date(medication.startDate).toLocaleDateString()}
                            {medication.endDate && ` - ${new Date(medication.endDate).toLocaleDateString()}`}
                          </span>
                        </div>
                      </div>
                      
                      {medication.notes && (
                        <p className="text-sm text-gray-600 mt-2">{medication.notes}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleRemoveMedication(medication.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Today's Schedule */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <Clock className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Today's Schedule</h2>
            </div>
            
            <div className="space-y-3">
              {getTodaysMedications().slice(0, 5).map((med, index) => (
                <div key={`${med.id}-${index}`} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    med.status === 'taken' ? 'bg-green-500' : 'bg-amber-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{med.name}</p>
                    <p className="text-sm text-gray-600">{formatTime(med.scheduledTime)}</p>
                  </div>
                  {med.status === 'taken' && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>
              ))}
              
              {getTodaysMedications().length === 0 && (
                <p className="text-gray-500 text-center py-4">No medications scheduled for today</p>
              )}
            </div>
          </div>

          {/* Upcoming Reminders */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <Bell className="w-5 h-5 text-purple-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Reminders</h2>
            </div>
            
            <div className="space-y-3">
              {getUpcomingMedications().map((med, index) => (
                <div key={`upcoming-${med.id}-${index}`} className="flex items-center p-3 bg-purple-50 rounded-lg">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{med.name}</p>
                    <p className="text-sm text-purple-700">in {formatTime(med.scheduledTime)}</p>
                  </div>
                </div>
              ))}
              
              {getUpcomingMedications().length === 0 && (
                <p className="text-gray-500 text-center py-4">No upcoming reminders</p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <span className="font-medium text-green-700">Mark as Taken</span>
              </button>
              <button className="w-full flex items-center p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-blue-600 mr-3" />
                <span className="font-medium text-blue-700">Set Reminder</span>
              </button>
              <button className="w-full flex items-center p-3 text-left bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors">
                <AlertCircle className="w-5 h-5 text-amber-600 mr-3" />
                <span className="font-medium text-amber-700">Report Side Effect</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Medication Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Add New Medication</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddMedication} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Medication Name</label>
                <input
                  type="text"
                  required
                  value={newMedication.name}
                  onChange={(e) => setNewMedication(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Aspirin, Lisinopril"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dosage</label>
                <input
                  type="text"
                  required
                  value={newMedication.dosage}
                  onChange={(e) => setNewMedication(prev => ({ ...prev, dosage: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 10mg, 1 tablet"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                <select
                  value={newMedication.frequency}
                  onChange={(e) => handleFrequencyChange(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {frequencies.map(freq => (
                    <option key={freq.value} value={freq.value}>{freq.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Times</label>
                {newMedication.time.map((time, index) => (
                  <input
                    key={index}
                    type="time"
                    required
                    value={time}
                    onChange={(e) => updateTimeSlot(index, e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
                  />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    required
                    value={newMedication.startDate}
                    onChange={(e) => setNewMedication(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date (Optional)</label>
                  <input
                    type="date"
                    value={newMedication.endDate}
                    onChange={(e) => setNewMedication(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                <textarea
                  value={newMedication.notes}
                  onChange={(e) => setNewMedication(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="Special instructions, side effects to watch for, etc."
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-medium"
                >
                  Add Medication
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Medications;