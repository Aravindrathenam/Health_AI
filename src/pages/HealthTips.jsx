import React, { useState } from 'react';
import { 
  BookOpen, 
  Heart, 
  Brain, 
  Activity,
  Apple,
  Moon,
  Droplets,
  Zap,
  Shield,
  Clock,
  Search,
  Filter,
  Star,
  ChevronRight,
  Play
} from 'lucide-react';

const HealthTips = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTip, setSelectedTip] = useState(null);

  const categories = [
    { id: 'all', name: 'All Topics', icon: BookOpen, color: 'text-gray-600' },
    { id: 'nutrition', name: 'Nutrition', icon: Apple, color: 'text-green-600' },
    { id: 'exercise', name: 'Exercise', icon: Activity, color: 'text-blue-600' },
    { id: 'mental-health', name: 'Mental Health', icon: Brain, color: 'text-purple-600' },
    { id: 'sleep', name: 'Sleep', icon: Moon, color: 'text-indigo-600' },
    { id: 'hydration', name: 'Hydration', icon: Droplets, color: 'text-cyan-600' },
    { id: 'prevention', name: 'Prevention', icon: Shield, color: 'text-amber-600' }
  ];

  const healthTips = [
    {
      id: 1,
      title: '8 Simple Ways to Boost Your Immune System',
      category: 'prevention',
      readTime: '5 min read',
      rating: 4.8,
      views: '12.5K',
      summary: 'Discover evidence-based strategies to strengthen your immune system naturally through diet, exercise, and lifestyle changes.',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
      content: `
        A strong immune system is your body's first line of defense against illness. Here are 8 proven ways to boost your immunity:

        1. **Eat a Rainbow of Fruits and Vegetables**
        Colorful produce is packed with antioxidants, vitamins, and minerals that support immune function.

        2. **Get Quality Sleep**
        Aim for 7-9 hours of sleep per night to allow your body to repair and strengthen its defenses.

        3. **Exercise Regularly**
        Moderate exercise enhances immune function, but avoid overtraining which can suppress immunity.

        4. **Manage Stress**
        Chronic stress weakens the immune system. Practice meditation, yoga, or other stress-reduction techniques.

        5. **Stay Hydrated**
        Water helps flush toxins from your body and keeps your immune system functioning optimally.

        6. **Limit Added Sugars**
        Excess sugar can impair immune cell function for hours after consumption.

        7. **Get Enough Vitamin D**
        Spend time in sunlight or consider supplementation, especially during winter months.

        8. **Maintain a Healthy Weight**
        Obesity can impair immune function, so maintaining a healthy weight is crucial for optimal immunity.
      `,
      tags: ['immunity', 'nutrition', 'lifestyle', 'wellness']
    },
    {
      id: 2,
      title: 'The Science of Better Sleep: Your Complete Guide',
      category: 'sleep',
      readTime: '8 min read',
      rating: 4.9,
      views: '18.2K',
      summary: 'Learn about sleep cycles, common sleep disorders, and practical strategies for improving your sleep quality.',
      image: 'https://images.pexels.com/photos/935777/pexels-photo-935777.jpeg?auto=compress&cs=tinysrgb&w=600',
      content: `
        Quality sleep is essential for physical health, mental well-being, and overall quality of life. Here's everything you need to know about getting better sleep:

        **Understanding Sleep Cycles**
        Sleep occurs in cycles of 90-110 minutes, including light sleep, deep sleep, and REM sleep phases.

        **Creating the Perfect Sleep Environment**
        - Keep your bedroom cool (60-67°F)
        - Use blackout curtains or an eye mask
        - Minimize noise with earplugs or white noise
        - Invest in a comfortable mattress and pillows

        **Developing a Sleep Routine**
        - Go to bed and wake up at the same time daily
        - Create a relaxing bedtime ritual
        - Avoid screens 1 hour before bed
        - Try reading, gentle stretching, or meditation

        **Foods and Drinks That Affect Sleep**
        - Avoid caffeine 6 hours before bedtime
        - Limit alcohol consumption
        - Try sleep-promoting foods like cherries, nuts, or herbal tea

        **When to Seek Help**
        Consult a healthcare provider if you experience persistent insomnia, loud snoring, or excessive daytime fatigue.
      `,
      tags: ['sleep', 'insomnia', 'health', 'wellness']
    },
    {
      id: 3,
      title: 'Mindful Eating: Transform Your Relationship with Food',
      category: 'nutrition',
      readTime: '6 min read',
      rating: 4.7,
      views: '9.8K',
      summary: 'Discover how mindful eating can improve digestion, help with weight management, and enhance your overall well-being.',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
      content: `
        Mindful eating is about paying full attention to the experience of eating and drinking. It can transform your relationship with food and improve your health.

        **What is Mindful Eating?**
        Mindful eating involves being fully present during meals, paying attention to hunger and satiety cues, and eating without distractions.

        **Benefits of Mindful Eating**
        - Better digestion
        - Improved portion control
        - Enhanced enjoyment of food
        - Reduced emotional eating
        - Better blood sugar control

        **How to Practice Mindful Eating**
        1. Eat without distractions (no TV, phone, or computer)
        2. Chew slowly and thoroughly
        3. Pay attention to flavors, textures, and aromas
        4. Check in with your hunger levels throughout the meal
        5. Stop eating when you feel satisfied, not full

        **Common Challenges**
        - Busy schedules
        - Emotional eating triggers
        - Social eating situations
        - Habitual fast eating

        **Tips for Success**
        - Start with one mindful meal per day
        - Practice gratitude before eating
        - Use smaller plates and utensils
        - Take breaks during meals to assess fullness
      `,
      tags: ['nutrition', 'mindfulness', 'weight-management', 'digestion']
    },
    {
      id: 4,
      title: '15-Minute Daily Exercises for Busy Professionals',
      category: 'exercise',
      readTime: '4 min read',
      rating: 4.6,
      views: '15.3K',
      summary: 'Quick, effective workout routines that fit into any schedule. No equipment needed!',
      image: 'https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=600',
      content: `
        Don't let a busy schedule derail your fitness goals. These 15-minute routines can be done anywhere, anytime.

        **Morning Energizer (5 minutes)**
        - 30 seconds jumping jacks
        - 30 seconds push-ups (modified if needed)
        - 30 seconds mountain climbers
        - 30 seconds plank hold
        - 30 seconds burpees
        - Repeat 2x with 30 seconds rest between rounds

        **Lunchtime Power (10 minutes)**
        - 2 minutes brisk walking or marching in place
        - 2 minutes bodyweight squats
        - 2 minutes desk push-ups or wall push-ups
        - 2 minutes lunges
        - 2 minutes stretching

        **Evening Wind-Down (15 minutes)**
        - 5 minutes gentle yoga flow
        - 5 minutes core strengthening exercises
        - 5 minutes relaxation and deep breathing

        **Equipment-Free Exercises**
        - Bodyweight squats
        - Push-ups (various modifications)
        - Lunges
        - Plank variations
        - Glute bridges
        - Calf raises

        **Tips for Consistency**
        - Schedule exercise like a meeting
        - Lay out workout clothes the night before
        - Find an accountability partner
        - Track your progress
        - Celebrate small wins
      `,
      tags: ['exercise', 'fitness', 'busy-schedule', 'home-workout']
    },
    {
      id: 5,
      title: 'Managing Stress: Evidence-Based Techniques That Work',
      category: 'mental-health',
      readTime: '7 min read',
      rating: 4.8,
      views: '22.1K',
      summary: 'Learn scientifically-proven methods to reduce stress and improve your mental resilience.',
      image: 'https://images.pexels.com/photos/3759656/pexels-photo-3759656.jpeg?auto=compress&cs=tinysrgb&w=600',
      content: `
        Chronic stress can impact every aspect of your health. Here are evidence-based techniques to manage stress effectively.

        **Understanding Stress**
        Stress is your body's natural response to challenges. While some stress is normal, chronic stress can lead to serious health problems.

        **Immediate Stress Relief Techniques**
        - Deep breathing exercises (4-7-8 breathing)
        - Progressive muscle relaxation
        - Quick meditation (5-10 minutes)
        - Cold water on face or wrists
        - Listening to calming music

        **Long-term Stress Management**
        1. **Regular Exercise**: Physical activity reduces stress hormones and releases endorphins
        2. **Mindfulness Meditation**: Practice 10-20 minutes daily
        3. **Social Support**: Maintain strong relationships and don't hesitate to ask for help
        4. **Time Management**: Prioritize tasks and learn to say no
        5. **Healthy Boundaries**: Separate work and personal life

        **Cognitive Techniques**
        - Challenge negative thought patterns
        - Practice gratitude daily
        - Focus on what you can control
        - Reframe stressful situations as opportunities

        **When to Seek Professional Help**
        Consider therapy or counseling if stress:
        - Interferes with daily activities
        - Leads to substance abuse
        - Causes persistent anxiety or depression
        - Affects relationships or work performance
      `,
      tags: ['stress-management', 'mental-health', 'mindfulness', 'wellness']
    },
    {
      id: 6,
      title: 'Hydration 101: How Much Water Do You Really Need?',
      category: 'hydration',
      readTime: '5 min read',
      rating: 4.5,
      views: '8.7K',
      summary: 'Debunking hydration myths and learning the truth about daily water intake requirements.',
      image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=600',
      content: `
        Proper hydration is crucial for optimal health, but how much water do you actually need?

        **Individual Water Needs**
        Water requirements vary based on:
        - Body size and composition
        - Activity level
        - Climate and temperature
        - Overall health status
        - Pregnancy or breastfeeding

        **General Guidelines**
        - Men: About 15.5 cups (3.7 liters) of fluids daily
        - Women: About 11.5 cups (2.7 liters) of fluids daily
        - These include all beverages and food moisture

        **Signs of Proper Hydration**
        - Pale yellow urine
        - Infrequent thirst
        - Moist lips and mouth
        - Good energy levels
        - Normal skin elasticity

        **Signs of Dehydration**
        - Dark yellow urine
        - Frequent thirst
        - Dry mouth or lips
        - Fatigue or dizziness
        - Constipation

        **Hydration Tips**
        - Drink water first thing in the morning
        - Keep a water bottle with you
        - Eat water-rich foods (fruits and vegetables)
        - Set reminders to drink water
        - Monitor your urine color

        **When You Need More Water**
        - During exercise
        - In hot or humid weather
        - At high altitudes
        - When you have fever, vomiting, or diarrhea
        - During pregnancy or breastfeeding
      `,
      tags: ['hydration', 'water', 'health', 'nutrition']
    }
  ];

  const featuredTips = healthTips.slice(0, 3);

  const filteredTips = healthTips.filter(tip => {
    const matchesSearch = tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tip.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tip.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || tip.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleTipClick = (tip) => {
    setSelectedTip(tip);
  };

  const closeTipModal = () => {
    setSelectedTip(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Health Tips & Resources</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Evidence-based health information to help you make informed decisions about your wellness journey
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search health tips..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center">
            <Filter className="w-5 h-5 text-gray-400 mr-2" />
            <span className="text-gray-600 mr-3">Filter by:</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-lg border transition-all ${
                  selectedCategory === category.id
                    ? 'bg-green-50 border-green-300 text-green-700'
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className={`w-4 h-4 mr-2 ${category.color}`} />
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Tips */}
      {selectedCategory === 'all' && searchTerm === '' && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Health Tips</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredTips.map((tip) => (
              <div
                key={tip.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => handleTipClick(tip)}
              >
                <div className="relative">
                  <img
                    src={tip.image}
                    alt={tip.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 bg-white bg-opacity-90 text-green-700 text-sm font-medium rounded-full">
                      {categories.find(c => c.id === tip.category)?.name}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Clock className="w-4 h-4 mr-1" />
                    {tip.readTime}
                    <div className="flex items-center ml-4">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      {tip.rating}
                    </div>
                    <span className="ml-4">{tip.views} views</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{tip.title}</h3>
                  <p className="text-gray-600 text-sm">{tip.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Tips */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedCategory === 'all' ? 'All Health Tips' : `${categories.find(c => c.id === selectedCategory)?.name} Tips`}
          </h2>
          <span className="text-gray-500">{filteredTips.length} articles found</span>
        </div>

        {filteredTips.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tips found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredTips.map((tip) => (
              <div
                key={tip.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleTipClick(tip)}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-48 flex-shrink-0">
                    <img
                      src={tip.image}
                      alt={tip.title}
                      className="w-full h-32 md:h-24 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded-md mr-3">
                        {categories.find(c => c.id === tip.category)?.name}
                      </span>
                      <Clock className="w-4 h-4 mr-1" />
                      {tip.readTime}
                      <div className="flex items-center ml-4">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        {tip.rating}
                      </div>
                      <span className="ml-4">{tip.views} views</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{tip.title}</h3>
                    <p className="text-gray-600 mb-4">{tip.summary}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {tip.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center text-green-600 font-medium">
                        Read more
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tip Detail Modal */}
      {selectedTip && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="relative">
              <img
                src={selectedTip.image}
                alt={selectedTip.title}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={closeTipModal}
                className="absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900"
              >
                ×
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="inline-block px-3 py-1 bg-white bg-opacity-90 text-green-700 font-medium rounded-full">
                  {categories.find(c => c.id === selectedTip.category)?.name}
                </span>
              </div>
            </div>
            
            <div className="p-8">
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Clock className="w-4 h-4 mr-1" />
                {selectedTip.readTime}
                <div className="flex items-center ml-4">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  {selectedTip.rating}
                </div>
                <span className="ml-4">{selectedTip.views} views</span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedTip.title}</h1>
              <p className="text-lg text-gray-600 mb-6">{selectedTip.summary}</p>
              
              <div className="prose max-w-none">
                {selectedTip.content.split('\n').map((paragraph, index) => {
                  if (paragraph.trim() === '') return null;
                  
                  if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**')) {
                    return (
                      <h3 key={index} className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                        {paragraph.trim().slice(2, -2)}
                      </h3>
                    );
                  }
                  
                  if (paragraph.trim().startsWith('- ')) {
                    return (
                      <li key={index} className="text-gray-700 mb-2">
                        {paragraph.trim().slice(2)}
                      </li>
                    );
                  }
                  
                  if (/^\d+\./.test(paragraph.trim())) {
                    return (
                      <p key={index} className="text-gray-700 mb-3 font-medium">
                        {paragraph.trim()}
                      </p>
                    );
                  }
                  
                  return (
                    <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                      {paragraph.trim()}
                    </p>
                  );
                })}
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {selectedTip.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthTips;