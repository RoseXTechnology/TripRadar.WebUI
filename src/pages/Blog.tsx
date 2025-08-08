import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  FileText,
  Calendar,
  Tag,
  Search,
  Plus,
  ArrowLeft,
  MessageSquare,
  Heart,
  Share,
  Bookmark,
  ChevronRight,
  Clock,
  Eye,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Sample blog data
const blogPosts = [
  {
    id: '1',
    title: '10 Essential Travel Tips for First-Time Visitors to Japan',
    excerpt: 'Planning your first trip to Japan? Here are the essential tips you need to know before you go.',
    content: `
      <p>Japan is a fascinating country with a rich culture, delicious food, and stunning landscapes. If you're planning your first visit, here are some essential tips to help you make the most of your trip:</p>
      
      <h3>1. Learn Basic Japanese Phrases</h3>
      <p>While many people in tourist areas speak some English, learning a few basic Japanese phrases can go a long way. Simple greetings like "Konnichiwa" (hello) and "Arigatou" (thank you) are appreciated by locals.</p>
      
      <h3>2. Get a Japan Rail Pass</h3>
      <p>If you plan to travel between cities, a Japan Rail Pass can save you a lot of money. It must be purchased before you arrive in Japan and allows unlimited travel on JR trains, including most Shinkansen (bullet trains).</p>
      
      <h3>3. Use Public Transportation</h3>
      <p>Japan's public transportation system is efficient, clean, and punctual. In major cities like Tokyo and Osaka, the subway and bus networks can take you almost anywhere you need to go.</p>
      
      <h3>4. Try the Local Cuisine</h3>
      <p>Japanese food is much more than just sushi. Don't miss out on ramen, tempura, okonomiyaki, and takoyaki. Be adventurous with your food choices!</p>
      
      <h3>5. Respect Local Customs</h3>
      <p>Japan has many customs and etiquette rules. Remove your shoes when entering homes and some restaurants, bow when greeting people, and be mindful of noise levels in public places.</p>
      
      <h3>6. Cash is King</h3>
      <p>While credit cards are becoming more widely accepted, many places in Japan still prefer cash. Make sure to have enough yen on hand, especially when visiting rural areas.</p>
      
      <h3>7. Stay Connected</h3>
      <p>Renting a pocket WiFi or getting a local SIM card will help you navigate and translate on the go. Many accommodations offer free pocket WiFi rental.</p>
      
      <h3>8. Visit During Off-Peak Seasons</h3>
      <p>Cherry blossom season (late March to early April) and autumn foliage (November) are beautiful but crowded. Consider visiting during off-peak times for fewer tourists and lower prices.</p>
      
      <h3>9. Experience Traditional Accommodations</h3>
      <p>Stay at least one night in a ryokan (traditional Japanese inn) for an authentic experience, complete with tatami floors, futon beds, and often an onsen (hot spring bath).</p>
      
      <h3>10. Explore Beyond the Major Cities</h3>
      <p>While Tokyo, Kyoto, and Osaka are must-visit destinations, don't miss the charm of smaller towns and rural areas like Takayama, Kanazawa, or the islands of Okinawa.</p>
    `,
    author: {
      name: 'Mika Tanaka',
      avatar:
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1',
      role: 'Travel Writer',
    },
    publishedAt: '2024-01-15',
    readTime: '8 min read',
    category: 'Travel Tips',
    tags: ['Japan', 'Travel Tips', 'First-Time Travelers', 'Asia'],
    image:
      'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&dpr=1',
    views: 3542,
    comments: 24,
    likes: 156,
  },
  {
    id: '2',
    title: 'The Ultimate Guide to Budget Travel in Southeast Asia',
    excerpt: 'Discover how to explore Southeast Asia on a budget without compromising on experiences.',
    content: `
      <p>Southeast Asia is a paradise for budget travelers, offering incredible experiences at a fraction of the cost of other destinations. Here's how to make the most of your money while exploring this vibrant region:</p>
      
      <h3>Accommodation Strategies</h3>
      <p>From hostels to guesthouses, Southeast Asia offers plenty of affordable accommodation options. In Thailand, you can find decent hostels for $5-10 per night, while in Vietnam, you might pay $3-8. For longer stays, consider negotiating weekly or monthly rates.</p>
      
      <h3>Transportation Hacks</h3>
      <p>Local buses, trains, and motorbike rentals are incredibly affordable. For longer distances, budget airlines like AirAsia, Lion Air, and VietJet offer competitive fares, especially when booked in advance.</p>
      
      <h3>Food on a Budget</h3>
      <p>Street food is not only cheap but often the most delicious option! In Thailand, a pad thai might cost $1-2, while in Vietnam, a bowl of pho could be as little as $1. Local markets are also great for fresh fruit and snacks.</p>
      
      <h3>Free and Low-Cost Activities</h3>
      <p>Many temples, parks, and beaches are free to visit. Walking tours, hiking, and simply wandering through local neighborhoods cost nothing but offer authentic experiences.</p>
      
      <h3>Best Value Destinations</h3>
      <p>Vietnam, northern Thailand, and parts of Indonesia offer the best value for money. Cities like Hanoi, Chiang Mai, and Yogyakarta combine low costs with rich cultural experiences.</p>
    `,
    author: {
      name: 'Alex Thompson',
      avatar:
        'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1',
      role: 'Budget Travel Expert',
    },
    publishedAt: '2024-01-10',
    readTime: '10 min read',
    category: 'Budget Travel',
    tags: ['Southeast Asia', 'Budget Travel', 'Backpacking', 'Travel Tips'],
    image:
      'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&dpr=1',
    views: 4210,
    comments: 32,
    likes: 189,
  },
  {
    id: '3',
    title: 'How to Pack for a Year-Long Round-the-World Trip',
    excerpt: 'Essential packing tips and strategies for long-term travelers embarking on a global adventure.',
    content: `
      <p>Packing for a year-long journey around the world presents unique challenges. You need to be prepared for multiple climates, activities, and situations while keeping your luggage manageable. Here's how to pack efficiently for long-term travel:</p>
      
      <h3>Choose the Right Luggage</h3>
      <p>A 40-50L backpack is ideal for most long-term travelers. Look for one with good weight distribution, comfortable straps, and multiple compartments. Consider a front-loading pack for easier access.</p>
      
      <h3>Clothing Strategy</h3>
      <p>Follow the 5-5-5 rule: 5 tops, 5 bottoms, 5 pairs of underwear. Choose quick-dry, wrinkle-resistant fabrics that can be layered. Stick to a consistent color palette so everything matches.</p>
      
      <h3>Footwear Fundamentals</h3>
      <p>Limit yourself to 2-3 pairs: comfortable walking shoes, sandals, and possibly hiking boots if needed. Break them in before your trip to avoid blisters.</p>
      
      <h3>Tech and Electronics</h3>
      <p>Bring only what you truly need: a smartphone, perhaps a tablet or lightweight laptop, a universal adapter, and minimal chargers. Consider a portable battery pack for long travel days.</p>
      
      <h3>Toiletries and Health</h3>
      <p>Pack travel-sized toiletries to start, then buy locally as needed. Don't forget a comprehensive first-aid kit, prescription medications, and basic over-the-counter remedies.</p>
      
      <h3>Documents and Money</h3>
      <p>Keep digital and physical copies of important documents. Bring multiple payment methods: a travel-friendly credit card, a backup card, and some cash for emergencies.</p>
      
      <h3>The One-Third Rule</h3>
      <p>Pack your bag, then remove one-third of what you've packed. You'll likely still have more than you need, and you can always buy things locally if necessary.</p>
    `,
    author: {
      name: 'Sarah Johnson',
      avatar:
        'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1',
      role: 'Digital Nomad',
    },
    publishedAt: '2024-01-05',
    readTime: '12 min read',
    category: 'Travel Planning',
    tags: ['Packing Tips', 'Round-the-World', 'Long-Term Travel', 'Travel Planning'],
    image:
      'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&dpr=1',
    views: 2876,
    comments: 18,
    likes: 132,
  },
];

export default function Blog() {
  const [posts, setPosts] = useState(blogPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
  });

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { requireAuth } = useAuth();

  // Check if we're on the new post page
  const isNewPostPage = location.pathname === '/blog/new';

  // Check if we're viewing a single post
  const isSinglePost = id && id !== 'new';

  // Get the current post if viewing a single post
  const currentPost = isSinglePost ? posts.find(post => post.id === id) : null;

  useEffect(() => {
    // If we're on the new post page, show the create form
    if (isNewPostPage) {
      // Check if user is authenticated
      if (!requireAuth()) return;
      setShowCreateForm(true);
    } else {
      setShowCreateForm(false);
    }
  }, [isNewPostPage, requireAuth]);

  const handleCreatePost = () => {
    if (!requireAuth()) return;
    navigate('/blog/new');
  };

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    // Create a new post with the form data
    const newPostData = {
      id: (posts.length + 1).toString(),
      title: newPost.title,
      excerpt: newPost.excerpt,
      content: newPost.content,
      author: {
        name: 'Alex Thompson',
        avatar:
          'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1',
        role: 'Travel Enthusiast',
      },
      publishedAt: new Date().toISOString().split('T')[0],
      readTime: '5 min read',
      category: newPost.category,
      tags: newPost.tags.split(',').map(tag => tag.trim()),
      image:
        'https://images.pexels.com/photos/1051073/pexels-photo-1051073.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&dpr=1',
      views: 0,
      comments: 0,
      likes: 0,
    };

    // Add the new post to the posts array
    setPosts([newPostData, ...posts]);

    // Reset the form
    setNewPost({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      tags: '',
    });

    // Navigate to the new post
    navigate(`/blog/${newPostData.id}`);
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === '' || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(posts.map(post => post.category)));

  // Render the single post view
  if (isSinglePost && currentPost) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pt-16 animate-fade-in">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 group transition-colors"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to all articles</span>
          </button>

          {/* Article Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{currentPost.title}</h1>

            <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400 gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{currentPost.publishedAt}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{currentPost.readTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4" />
                <span>{currentPost.views} views</span>
              </div>
              <div className="flex items-center space-x-2">
                <Tag className="h-4 w-4" />
                <span>{currentPost.category}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3 mb-6">
              <img
                src={currentPost.author.avatar}
                alt={currentPost.author.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">{currentPost.author.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{currentPost.author.role}</div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8 rounded-2xl overflow-hidden">
            <img src={currentPost.image} alt={currentPost.title} className="w-full h-auto object-cover" />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
            <div dangerouslySetInnerHTML={{ __html: currentPost.content }} />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {currentPost.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Article Actions */}
          <div className="flex items-center justify-between border-t border-b border-gray-200 dark:border-gray-700 py-4 mb-8">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <Heart className="h-5 w-5" />
                <span>{currentPost.likes}</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <MessageSquare className="h-5 w-5" />
                <span>{currentPost.comments}</span>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <Bookmark className="h-5 w-5" />
                <span>Save</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <Share className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts
                .filter(post => post.id !== currentPost.id && post.category === currentPost.category)
                .slice(0, 2)
                .map(post => (
                  <div
                    key={post.id}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <img src={post.image} alt={post.title} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">{post.title}</h4>
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>{post.publishedAt}</span>
                        <span>{post.readTime}</span>
                      </div>
                      <button
                        onClick={() => navigate(`/blog/${post.id}`)}
                        className="mt-3 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium flex items-center space-x-1"
                      >
                        <span>Read Article</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render the create post form
  if (showCreateForm) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pt-16 animate-fade-in">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 group transition-colors"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to all articles</span>
          </button>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create New Article</h1>

            <form onSubmit={handleSubmitPost} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  required
                  value={newPost.title}
                  onChange={e => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter article title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Excerpt</label>
                <input
                  type="text"
                  required
                  value={newPost.excerpt}
                  onChange={e => setNewPost(prev => ({ ...prev, excerpt: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Brief summary of the article"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                <select
                  required
                  value={newPost.category}
                  onChange={e => setNewPost(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                  <option value="New Category">New Category</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags</label>
                <input
                  type="text"
                  required
                  value={newPost.tags}
                  onChange={e => setNewPost(prev => ({ ...prev, tags: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter tags separated by commas"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content</label>
                <textarea
                  required
                  rows={12}
                  value={newPost.content}
                  onChange={e => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Write your article content here..."
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => navigate('/blog')}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Render the blog list view
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pt-16 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Blog</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Travel tips, insights, and inspiration for your next adventure
            </p>
          </div>
          <button
            onClick={handleCreatePost}
            className="mt-4 md:mt-0 bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Write Article</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <div className="mb-12">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={filteredPosts[0].image}
                    alt={filteredPosts[0].title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 px-3 py-1 rounded-full text-sm font-medium">
                        {filteredPosts[0].category}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{filteredPosts[0].readTime}</span>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{filteredPosts[0].title}</h2>

                    <p className="text-gray-600 dark:text-gray-400 mb-6">{filteredPosts[0].excerpt}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={filteredPosts[0].author.avatar}
                        alt={filteredPosts[0].author.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{filteredPosts[0].author.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{filteredPosts[0].publishedAt}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(`/blog/${filteredPosts[0].id}`)}
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium flex items-center space-x-1"
                    >
                      <span>Read More</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.slice(1).map(post => (
            <div
              key={post.id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow animate-slide-up"
            >
              <div className="relative h-48">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 dark:bg-black/70 backdrop-blur-sm text-gray-900 dark:text-white px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">{post.title}</h3>

                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="text-sm text-gray-600 dark:text-gray-400">{post.publishedAt}</div>
                  </div>

                  <button
                    onClick={() => navigate(`/blog/${post.id}`)}
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium flex items-center space-x-1"
                  >
                    <span>Read</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No articles found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
