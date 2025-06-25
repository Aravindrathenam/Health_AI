import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { 
  Search, 
  Brain, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Thermometer,
  Activity,
  User,
  Calendar,
  ArrowRight,
  Info,
  Phone
} from 'lucide-react';

const SymptomChecker = () => {
  const { dispatch } = useHealth();
  const [currentStep, setCurrentStep] = useState('symptoms');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [severity, setSeverity] = useState(5);
  const [duration, setDuration] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [assessment, setAssessment] = useState(null);

  const commonSymptoms = [
    'Fever', 'Headache', 'Cough', 'Fatigue', 'Nausea', 'Dizziness',
    'Sore throat', 'Runny nose', 'Body aches', 'Shortness of breath',
    'Chest pain', 'Abdominal pain', 'Vomiting', 'Diarrhea', 'Rash',
    'Joint pain', 'Back pain', 'Loss of appetite', 'Difficulty sleeping'
  ];

  const bodyParts = [
    'Head', 'Neck', 'Chest', 'Abdomen', 'Back', 'Arms', 'Legs', 'Skin'
  ];

  const handleSymptomToggle = (symptom) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const analyzeSymptoms = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockAssessment = {
      condition: 'Upper Respiratory Infection',
      probability: 75,
      urgency: 'Low',
      description: 'Based on your symptoms, you may have a common cold or upper respiratory infection. This is typically caused by viral infections and usually resolves on its own.',
      recommendations: [
        'Get plenty of rest',
        'Stay hydrated with water and warm fluids',
        'Consider over-the-counter pain relievers for aches',
        'Use a humidifier or breathe steam',
        'Monitor symptoms for worsening'
      ],
      whenToSeekCare: [
        'Fever above 101.3°F (38.5°C) for more than 3 days',
        'Difficulty breathing or persistent chest pain',
        'Symptoms worsen after initial improvement',
        'Severe headache or neck stiffness'
      ],
      followUp: 'If symptoms persist for more than 10 days or worsen, consult with a healthcare provider.'
    };

    setAssessment(mockAssessment);
    setIsAnalyzing(false);
    setCurrentStep('results');

    // Save to health context
    const symptomLog = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      symptoms: selectedSymptoms,
      severity: severity,
      aiAssessment: mockAssessment.condition
    };

    dispatch({ type: 'ADD_SYMPTOM_LOG', payload: symptomLog });
  };

  const resetChecker = () => {
    setCurrentStep('symptoms');
    setSelectedSymptoms([]);
    setSeverity(5);
    setDuration('');
    setAge('');
    setGender('');
    setAssessment(null);
    setIsAnalyzing(false);
  };

  if (currentStep === 'results' && assessment) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analysis Complete</h1>
            <p className="text-gray-600">Here's what our AI assessment found</p>
          </div>

          {/* Assessment Result */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <div className="flex items-center mb-4">
              <Brain className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Possible Condition</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-2xl font-bold text-blue-600">{assessment.condition}</p>
                <p className="text-sm text-gray-600">Most likely condition</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{assessment.probability}%</p>
                <p className="text-sm text-gray-600">Confidence level</p>
              </div>
              <div>
                <p className={`text-2xl font-bold ${
                  assessment.urgency === 'High' ? 'text-red-600' :
                  assessment.urgency === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {assessment.urgency}
                </p>
                <p className="text-sm text-gray-600">Urgency level</p>
              </div>
            </div>
            <p className="text-gray-700 mt-4">{assessment.description}</p>
          </div>

          {/* Recommendations */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-green-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Recommended Actions</h3>
              </div>
              <ul className="space-y-2">
                {assessment.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-6 h-6 text-amber-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">When to Seek Care</h3>
              </div>
              <ul className="space-y-2">
                {assessment.whenToSeekCare.map((warning, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Follow-up */}
          <div className="bg-blue-50 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <Info className="w-5 h-5 text-blue-600 mr-3" />
              <p className="text-blue-800 font-medium">Follow-up Advice</p>
            </div>
            <p className="text-blue-700 mt-2">{assessment.followUp}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetChecker}
              className="px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-medium"
            >
              New Assessment
            </button>
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center">
              <Phone className="w-5 h-5 mr-2" />
              Find Healthcare Provider
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Save Report
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Brain className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Analyzing Your Symptoms</h2>
          <p className="text-gray-600 mb-8">Our AI is processing your information to provide the best assessment...</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
          </div>
          <p className="text-sm text-gray-500">This may take a few moments</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Brain className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Symptom Checker</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Tell us about your symptoms and get an AI-powered health assessment. This tool provides guidance but does not replace professional medical advice.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          <div className={`flex items-center ${currentStep === 'symptoms' ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep === 'symptoms' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}>
              1
            </div>
            <span className="ml-2 font-medium">Symptoms</span>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400" />
          <div className={`flex items-center ${currentStep === 'details' ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep === 'details' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}>
              2
            </div>
            <span className="ml-2 font-medium">Details</span>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400" />
          <div className={`flex items-center ${currentStep === 'analysis' ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep === 'analysis' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}>
              3
            </div>
            <span className="ml-2 font-medium">Analysis</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        {currentStep === 'symptoms' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Your Symptoms</h2>
            
            {/* Search */}
            <div className="relative mb-6">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search for symptoms..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Common Symptoms */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Common Symptoms</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {commonSymptoms.map((symptom) => (
                  <button
                    key={symptom}
                    onClick={() => handleSymptomToggle(symptom)}
                    className={`p-3 text-left rounded-lg border transition-all ${
                      selectedSymptoms.includes(symptom)
                        ? 'bg-blue-50 border-blue-300 text-blue-700'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {symptom}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Symptoms */}
            {selectedSymptoms.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Selected Symptoms ({selectedSymptoms.length})</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSymptoms.map((symptom) => (
                    <span
                      key={symptom}
                      className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {symptom}
                      <button
                        onClick={() => handleSymptomToggle(symptom)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={() => setCurrentStep('details')}
                disabled={selectedSymptoms.length === 0}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {currentStep === 'details' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Additional Details</h2>
            
            <div className="space-y-6">
              {/* Severity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  How severe are your symptoms? (1 = Mild, 10 = Severe)
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                    className="flex-1"
                  />
                  <span className="w-12 text-center font-semibold text-blue-600">{severity}/10</span>
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  How long have you had these symptoms?
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select duration</option>
                  <option value="few-hours">A few hours</option>
                  <option value="1-day">1 day</option>
                  <option value="2-3-days">2-3 days</option>
                  <option value="1-week">About a week</option>
                  <option value="2-weeks">2 weeks</option>
                  <option value="1-month">About a month</option>
                  <option value="longer">Longer than a month</option>
                </select>
              </div>

              {/* Age and Gender */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Age</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter your age"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentStep('symptoms')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Back
              </button>
              <button
                onClick={analyzeSymptoms}
                disabled={!duration || !age || !gender}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Analyze Symptoms
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-amber-600 mr-3 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-800">Medical Disclaimer</p>
            <p className="text-sm text-amber-700 mt-1">
              This symptom checker is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;