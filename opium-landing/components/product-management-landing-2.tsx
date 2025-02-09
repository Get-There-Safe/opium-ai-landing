
'use client'
import React, { useState } from 'react';
import { Sparkles, Brain, BarChart3, MessageSquare, GitBranch, Mail } from 'lucide-react';

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  
    // Perform basic validation (you can expand this)
    if (!email || !email.includes('@')) {
      alert("Please enter a valid email.");
      return;
    }
  
    // Send the email to the backend
    try {
      const response = await fetch('http://localhost:5001/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), // send email as payload
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setSubmitted(true); // Show success message
        setEmail(''); // Reset email field
      } else {
        alert(data.message || 'There was an issue submitting your email.');
      }
    } catch (err) {
      console.error("Error submitting email:", err);
      alert('There was an error submitting your email.');
    }
  };
  


  const features = [
    {
      title: "Intelligent Data Processing",
      description: "Transform unstructured feedback from sales emails, user interactions, and call transcripts into actionable product insights.",
      icon: <MessageSquare className="w-6 h-6 text-indigo-200" />
    },
    {
      title: "Autonomous Planning",
      description: "Let AI handle your product planning with smart feature roadmaps and development strategies.",
      icon: <Brain className="w-6 h-6 text-indigo-200" />
    },
    {
      title: "User Activity Analysis",
      description: "Track and analyze in-product metrics to understand user behavior and optimize feature development.",
      icon: <BarChart3 className="w-6 h-6 text-indigo-200" />
    },
    {
      title: "Strategic Documentation",
      description: "Generate comprehensive playbooks and documentation for your entire business operation automatically.",
      icon: <GitBranch className="w-6 h-6 text-indigo-200" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Previous sections remain the same */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-white flex items-center">
            <Sparkles className="w-8 h-8 mr-2 text-indigo-300" />
            opium.ai
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
            {/* <a href="#how-it-works" className="text-gray-300 hover:text-white transition">How it Works</a> */}
            <a href="#contact" className="text-gray-300 hover:text-white transition">Contact</a>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">
              Your AI Product Management Assistant
            </h1>
            <p className="text-xl text-gray-300 mb-12">
              Revolutionize your product development with autonomous AI that transforms user feedback into product excellence. Let opium.ai handle the complexity while you focus on innovation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {/* <button className="bg-indigo-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-600 transition flex items-center justify-center">
                Start Free Trial
                <ChevronRight className="w-5 h-5 ml-2" />
              </button> */}
              <button
                onClick={() => {window.location.href = 'https://calendly.com/khareanushka2015/30min';  // Calendly link
                }}
                className="border border-gray-300 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
              >
                Schedule Demo
              </button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="container mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            AI-Powered Product Management Suite
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 p-6 rounded-lg backdrop-blur-sm hover:bg-white/15 transition">
                <div className="flex items-center mb-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold text-white ml-3">{feature.title}</h3>
                </div>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Metrics Section */}
        <section className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/5 p-6 rounded-lg backdrop-blur-sm">
              <div className="text-4xl font-bold text-indigo-300 mb-2">85%</div>
              <p className="text-gray-300">Reduction in Planning Time</p>
            </div>
            <div className="bg-white/5 p-6 rounded-lg backdrop-blur-sm">
              <div className="text-4xl font-bold text-indigo-300 mb-2">3x</div>
              <p className="text-gray-300">Faster Feature Deployment</p>
            </div>
            <div className="bg-white/5 p-6 rounded-lg backdrop-blur-sm">
              <div className="text-4xl font-bold text-indigo-300 mb-2">24/7</div>
              <p className="text-gray-300">Autonomous Planning</p>
            </div>
          </div>
        </section>

        {/* Newsletter Signup Section */}
        
        <section className="container mx-auto px-6 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm">
              <Mail className="w-12 h-12 text-indigo-300 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Stay Updated with opium.ai
              </h2>
              <p className="text-gray-300 mb-8">
                Join our newsletter to get the latest updates on AI-powered product management and exclusive beta access.
              </p>
              
              {submitted ? (
                <div className="bg-indigo-500/20 p-4 rounded-lg">
                  <p className="text-white">Thanks for subscribing! We will be in touch soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-indigo-300/20 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-300 transition"
                  />
                  <button
                    type="submit"
                    className="bg-indigo-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-600 transition whitespace-nowrap"
                  >
                    Sign Up
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
