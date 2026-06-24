import React, { useState } from 'react';
import { Play, Upload, Calendar, BarChart3, Settings, Plus, Trash2, Download, Share2 } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ClipAIApp = () => {
  const [activeTab, setActiveTab] = useState('generator');
  const [videoFile, setVideoFile] = useState(null);
  const [aiStyle, setAiStyle] = useState('Viral Hooks');
  const [clips, setClips] = useState([
    { id: 1, name: 'Clip 1', duration: 30, captions: 'Amazing hook content!', style: 'Bold Pop', platform: 'TikTok', brroll: 'Sunset Footage' },
    { id: 2, name: 'Clip 2', duration: 20, captions: 'Educational moment', style: 'Minimal', platform: 'Reels', brroll: 'Nature B-roll' },
  ]);
  const [activeClip, setActiveClip] = useState(1);
  const [scheduledPosts, setScheduledPosts] = useState([
    { id: 1, clip: 'Clip 1', platform: 'TikTok', date: '2024-01-25', time: '19:00' },
    { id: 2, clip: 'Clip 2', platform: 'Reels', date: '2024-01-26', time: '12:30' },
  ]);
  const [timeRange, setTimeRange] = useState('7d');

  // Analytics Data
  const viewsData = [
    { day: 'Day 1', TikTok: 2400, Instagram: 2210 },
    { day: 'Day 2', TikTok: 1398, Instagram: 2290 },
    { day: 'Day 3', TikTok: 9800, Instagram: 2000 },
    { day: 'Day 4', TikTok: 3908, Instagram: 2108 },
    { day: 'Day 5', TikTok: 4800, Instagram: 2310 },
    { day: 'Day 6', TikTok: 3800, Instagram: 2250 },
    { day: 'Day 7', TikTok: 4300, Instagram: 2100 },
  ];

  const platformBreakdown = [
    { name: 'TikTok', value: 45, color: '#000' },
    { name: 'Instagram', value: 35, color: '#E4405F' },
    { name: 'YouTube', value: 20, color: '#FF0000' },
  ];

  const clipPerformance = [
    { name: 'Clip 1', views: 12400, retention: 85, reach: 8900 },
    { name: 'Clip 2', views: 9200, retention: 72, reach: 6800 },
    { name: 'Clip 3', views: 15600, retention: 92, reach: 12400 },
    { name: 'Clip 4', views: 8900, retention: 65, reach: 5600 },
    { name: 'Clip 5', views: 11200, retention: 78, reach: 8200 },
  ];

  const handleAddClip = () => {
    const newClip = {
      id: clips.length + 1,
      name: `Clip ${clips.length + 1}`,
      duration: 15,
      captions: 'New content...',
      style: 'Bold Pop',
      platform: 'TikTok',
      brroll: 'Select footage',
    };
    setClips([...clips, newClip]);
    setActiveClip(newClip.id);
  };

  const handleDeleteClip = (id) => {
    setClips(clips.filter(c => c.id !== id));
    if (activeClip === id) setActiveClip(clips[0]?.id || 1);
  };

  const handleSchedulePost = (clipId, platform, date, time) => {
    const newPost = {
      id: scheduledPosts.length + 1,
      clip: `Clip ${clipId}`,
      platform,
      date,
      time,
    };
    setScheduledPosts([...scheduledPosts, newPost]);
  };

  const bestTimes = {
    TikTok: { time: '7:00 PM', boost: '+34% views' },
    Instagram: { time: '12:30 PM', boost: '+28% engagement' },
    'YouTube Shorts': { time: '9:00 AM', boost: '+19% reach' },
  };

  // Render Generator Tab
  const renderGenerator = () => (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">🎬 AI Short Clips Generator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Upload Video</label>
          <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:bg-blue-50 cursor-pointer">
            <Upload className="mx-auto mb-2 text-blue-500" size={32} />
            <p className="text-gray-600">Drag & drop or click to upload</p>
            <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files?.[0])} className="hidden" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <label className="block text-sm font-semibold text-gray-700 mb-3">AI Style</label>
          <select 
            value={aiStyle} 
            onChange={(e) => setAiStyle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
          >
            <option>Viral Hooks</option>
            <option>Educational</option>
            <option>Highlights</option>
            <option>Comedy</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <input type="number" placeholder="Duration (secs)" className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" defaultValue="30" />
        <select className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500">
          <option>TikTok</option>
          <option>Reels</option>
          <option>Shorts</option>
        </select>
        <input type="number" placeholder="Clips Count" className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" defaultValue="3" />
        <select className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500">
          <option>English</option>
          <option>Hindi</option>
          <option>Spanish</option>
        </select>
      </div>

      <button className="mt-6 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition">
        🚀 Generate AI Clips
      </button>
    </div>
  );

  // Render Editor Tab
  const renderEditor = () => (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">✂️ Captions + B-roll Editor</h2>
      
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {clips.map(clip => (
          <button
            key={clip.id}
            onClick={() => setActiveClip(clip.id)}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition ${activeClip === clip.id ? 'bg-purple-600 text-white' : 'bg-white border border-gray-300'}`}
          >
            {clip.name}
          </button>
        ))}
        <button onClick={handleAddClip} className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 flex items-center gap-1">
          <Plus size={18} /> Add
        </button>
      </div>

      {clips.filter(c => c.id === activeClip).map(clip => (
        <div key={clip.id} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-md">
            <div className="bg-gray-900 text-white p-6 rounded-lg mb-4 text-center relative h-64 flex items-center justify-center overflow-hidden">
              <div className="text-center">
                <Play className="mx-auto mb-3 opacity-50" size={40} />
                <p className="text-sm opacity-70">Video Preview</p>
                <p className="text-2xl font-bold mt-2 text-white">{clip.captions}</p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-semibold text-gray-700 mb-2">Caption Timeline</h4>
              <div className="bg-gray-100 p-4 rounded-lg h-20 flex items-center">
                <div className="flex-1 bg-purple-400 h-12 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                  {clip.duration}s
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Caption Style</label>
              <select className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-purple-500" defaultValue={clip.style}>
                <option>Bold Pop</option>
                <option>Minimal</option>
                <option>Karaoke</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Font Size</label>
              <input type="range" min="12" max="48" className="w-full" defaultValue="24" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">B-roll Footage</label>
              <select className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-purple-500" defaultValue={clip.brroll}>
                <option>Sunset Footage</option>
                <option>Nature B-roll</option>
                <option>City Timelapse</option>
                <option>Particle Effects</option>
              </select>
              <button className="mt-2 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 font-semibold flex items-center justify-center gap-1">
                <Plus size={16} /> Add
              </button>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Export Format</label>
              <select className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-purple-500">
                <option>MP4</option>
                <option>WebM</option>
                <option>MOV</option>
              </select>
            </div>

            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 font-semibold flex items-center justify-center gap-2">
              <Download size={16} /> Export
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  // Render Scheduler Tab
  const renderScheduler = () => (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">📅 Social Media Scheduler</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {['TikTok', 'Instagram', 'YouTube Shorts'].map(platform => (
          <div key={platform} className="bg-white p-6 rounded-xl shadow-md border-2 border-gray-200 hover:border-green-500 cursor-pointer transition">
            <h4 className="font-bold text-lg mb-2">{platform}</h4>
            <p className="text-sm text-gray-600">Best time: <strong>{bestTimes[platform]?.time}</strong></p>
            <p className="text-xs text-green-600 font-semibold">{bestTimes[platform]?.boost}</p>
            <button className="mt-3 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 font-semibold">Connect</button>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h4 className="font-bold text-lg mb-4">Scheduled Posts</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Clip</th>
                <th className="px-4 py-2 text-left">Platform</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Time</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {scheduledPosts.map(post => (
                <tr key={post.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{post.clip}</td>
                  <td className="px-4 py-2"><span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">{post.platform}</span></td>
                  <td className="px-4 py-2">{post.date}</td>
                  <td className="px-4 py-2 font-semibold">{post.time}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button className="text-blue-500 hover:text-blue-700"><Share2 size={16} /></button>
                    <button className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Render Analytics Tab
  const renderAnalytics = () => (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">📊 Analytics Dashboard</h2>
      
      <div className="flex gap-2 mb-6">
        {['7d', '30d', '90d'].map(range => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${timeRange === range ? 'bg-orange-600 text-white' : 'bg-white border border-gray-300'}`}
          >
            {range === '7d' ? 'Last 7 Days' : range === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <p className="text-gray-600 text-sm mb-2">Total Views</p>
          <p className="text-3xl font-bold text-blue-600">52.4K</p>
          <p className="text-xs text-green-600 mt-1">↑ 12% from last period</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <p className="text-gray-600 text-sm mb-2">Avg Engagement</p>
          <p className="text-3xl font-bold text-green-600">78.5%</p>
          <p className="text-xs text-green-600 mt-1">↑ 5% from last period</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <p className="text-gray-600 text-sm mb-2">Total Reach</p>
          <p className="text-3xl font-bold text-purple-600">41.9K</p>
          <p className="text-xs text-green-600 mt-1">↑ 8% from last period</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <p className="text-gray-600 text-sm mb-2">Avg Watch Time</p>
          <p className="text-3xl font-bold text-orange-600">18.2s</p>
          <p className="text-xs text-green-600 mt-1">↑ 3% from last period</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h4 className="font-bold text-lg mb-4">Views Over Time</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={viewsData}>
              <CartesianGrid />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="TikTok" stroke="#000" strokeWidth={2} />
              <Line type="monotone" dataKey="Instagram" stroke="#E4405F" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h4 className="font-bold text-lg mb-4">Platform Breakdown</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={platformBreakdown} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name} ${value}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                {platformBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h4 className="font-bold text-lg mb-4">Top 5 Clips by Reach</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={clipPerformance}>
            <CartesianGrid />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="views" fill="#3B82F6" name="Views" />
            <Bar dataKey="reach" fill="#10B981" name="Reach" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">🎬 ClipAI</h1>
          <p className="text-blue-100">Ssemble jaisa AI-powered video editing platform</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex gap-1 px-6 py-4 overflow-x-auto">
          {[
            { id: 'generator', label: '🎬 Generator', icon: 'Upload' },
            { id: 'editor', label: '✂️ Editor', icon: 'Edit' },
            { id: 'scheduler', label: '📅 Scheduler', icon: 'Calendar' },
            { id: 'analytics', label: '📊 Analytics', icon: 'BarChart' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-semibold whitespace-nowrap transition rounded-lg ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {activeTab === 'generator' && renderGenerator()}
        {activeTab === 'editor' && renderEditor()}
        {activeTab === 'scheduler' && renderScheduler()}
        {activeTab === 'analytics' && renderAnalytics()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>© 2024 ClipAI | Made with ❤️ | Deploy karo aur earn karo! 🚀</p>
        </div>
      </footer>
    </div>
  );
};

export default ClipAIApp;