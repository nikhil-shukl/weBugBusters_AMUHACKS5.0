import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Brain,
  Sparkles,
  Target,
  TrendingUp,
  Award,
  CheckCircle,
  ArrowRight,
  Shield,
  Layers,
  Zap,
  Star,
  ChevronRight,
  Github,
  Linkedin,
  Menu,
  X,
  Lightbulb,
  Rocket,
  BarChart3
} from 'lucide-react';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignUp = () => {
    navigate('/signup');
  };

  // Stats data
  const stats = [
    { number: "95%", label: "Skill Accuracy" },
    { number: "3x", label: "Faster Resume" },
    { number: "100+", label: "Skills Analyzed" },
    { number: "24/7", label: "AI Support" }
  ];

  // Skills for dashboard
  const skills = [
    "React.js", "MongoDB", "Python", "AI/ML", "REST APIs", "Git", "Docker"
  ];

  // Features data
  const features = [
    {
      icon: <Layers className="w-8 h-8 text-white" />,
      title: "Skill Depth Analyzer",
      description: "AI classifies your skills from Beginner to Advanced, giving you a clear understanding of where you stand.",
      tag: "3-Level Classification"
    },
    {
      icon: <Shield className="w-8 h-8 text-white" />,
      title: "Evidence-Based Verification",
      description: "Every skill is backed by real proof from your projects. No fake skills, only trust-based verification.",
      tag: "100% Verified"
    },
    {
      icon: <Target className="w-8 h-8 text-white" />,
      title: "Personalized Roadmaps",
      description: "Get step-by-step learning paths tailored to your current skills and career goals.",
      tag: "Custom Learning Path"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-white" />,
      title: "Career Readiness Score",
      description: "A 0-100 metric that shows exactly how market-ready you are for your dream role.",
      tag: "Real-time CRS"
    }
  ];

  // Steps data
  const steps = [
    {
      number: "01",
      title: "Upload Your Work",
      description: "Share your academic projects, assignments, or any documentation of your work.",
      icon: <Rocket className="w-6 h-6" />
    },
    {
      number: "02",
      title: "AI Analysis",
      description: "Our RAG-powered AI extracts and verifies skills with actual evidence from your content.",
      icon: <Brain className="w-6 h-6" />
    },
    {
      number: "03",
      title: "Get Your Results",
      description: "Receive professional skills, resume bullets, career gaps, and personalized roadmaps.",
      icon: <Award className="w-6 h-6" />
    },
    {
      number: "04",
      title: "Level Up",
      description: "Follow your custom roadmap and watch your Career Readiness Score climb to 100.",
      icon: <Star className="w-6 h-6" />
    }
  ];

  // Team data
  const team = [
    {
      name: "Jidnyesh Badgujar",
      role: "Full Stack Developer",
      avatar: "https://i.im.ge/2026/02/11/eNa3gT.Screenshot-2026-02-11-115020.png",
      github: "#",
      linkedin: "#"
    },
    {
      name: "Nikhil Shukla",
      role: "AI/ML Engineer",
      avatar: "https://i.im.ge/2026/02/11/eNax00.Screenshot-2026-02-11-115028.png",
      github: "#",
      linkedin: "#"
    }
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating Orbs */}
      <div className="floating-orb orb-1" />
      <div className="floating-orb orb-2" />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={scrolled ? 'nav-container' : 'nav-container'}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="logo-container"
            >
              <div className="logo-icon">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="logo-text">Bridge-AI</h1>
                <p className="logo-subtext">by weBugBusters</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="nav-link">Home</a>
              <a href="#features" className="nav-link">Features</a>
              <a href="#how-it-works" className="nav-link">How it Works</a>
              <a href="#team" className="nav-link">Team</a>
              <button onClick={handleSignUp} className="btn-primary">
                Sign Up
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="md:hidden mt-4 pb-4 space-y-4"
            >
              <a href="#home" className="block nav-link">Home</a>
              <a href="#features" className="block nav-link">Features</a>
              <a href="#how-it-works" className="block nav-link">How it Works</a>
              <a href="#team" className="block nav-link">Team</a>
              <button onClick={handleSignUp} className="btn-primary w-full">
                Sign Up
              </button>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-6"
            >
              <motion.div variants={fadeInUp} className="badge">
                <Sparkles className="w-4 h-4 text-[#22d3ee]" />
                <span className="text-slate-400">AMUHACKS 5.0 Project</span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-bold leading-tight">
                Turn Your{' '}
                <span className="gradient-text">Academic Work</span>
                <br />
                Into{' '}
                <span className="gradient-text">Career Skills</span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-lg text-slate-500 leading-relaxed">
                Bridge the translation gap between college and career. Our AI-powered platform 
                converts your projects into{' '}
                <span className="text-white font-semibold">verified, industry-ready skills</span>{' '}
                with personalized roadmaps.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 pt-4">
                <button onClick={handleSignUp} className="btn-get-started">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="btn-demo">
                  Watch Demo
                </button>
              </motion.div>

              {/* Stats */}
              <motion.div variants={fadeInUp} className="stats-grid">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-item">
                    <div className="stat-number">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="dashboard-card">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="score-title">Career Readiness Score</h3>
                    <div className="score-number">87/100</div>
                  </div>
                  <div className="w-12 h-12 bg-[#22d3ee]/10 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-[#22d3ee]" />
                  </div>
                </div>

                <div className="progress-bar-bg mb-8">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '87%' }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="progress-bar-fill"
                  />
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-slate-400 mb-4">Verified Skills</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="skill-pill"
                      >
                        <CheckCircle className="w-4 h-4 text-[#22d3ee]" />
                        <span>{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section - Four Pillars */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Four Pillars of{' '}
              <span className="gradient-text">Career Transformation</span>
            </h2>
            <p className="text-lg text-slate-500 max-w-3xl mx-auto">
              Our AI-powered platform is built on four revolutionary features that bridge the gap 
              between academic learning and industry requirements.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="feature-card group"
              >
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.description}</p>
                <div className="feature-tag">
                  <Zap className="feature-tag-icon" />
                  <span className="feature-tag-text">{feature.tag}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 px-6 bg-[#0a0f1f]/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How It{' '}
              <span className="gradient-text">Actually Works</span>
            </h2>
            <p className="text-lg text-slate-500 max-w-3xl mx-auto">
              From upload to career readiness in four simple steps. Our RAG-powered AI does the heavy lifting.
            </p>
          </motion.div>

          <div className="steps-grid">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="step-card"
              >
                <div className="step-number">{step.number}</div>
                <div className="step-icon">
                  {step.icon}
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mt-16"
          >
            <button onClick={handleSignUp} className="btn-start">
              Start Your Transformation
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Meet{' '}
              <span className="gradient-text">weBugBusters</span>
            </h2>
            <p className="text-lg text-slate-500 max-w-3xl mx-auto">
              A passionate team of developers, designers, and AI enthusiasts on a mission 
              to revolutionize career readiness.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto"
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="glass-card p-6 text-center hover:border-[#c084fc]/50 transition-all duration-300"
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-[#22d3ee]"
                />
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-slate-500 text-sm mb-4">{member.role}</p>
                <div className="flex justify-center gap-4">
                  <a href={member.github} className="text-slate-500 hover:text-[#22d3ee] transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href={member.linkedin} className="text-slate-500 hover:text-[#22d3ee] transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Ready to Bridge the Gap? */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="cta-card"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#22d3ee]/5 via-[#c084fc]/5 to-[#f472b6]/5" />
            <div className="relative z-10">
              <h2 className="cta-title">
                Ready to <span className="gradient-text">Bridge the Gap?</span>
              </h2>
              <p className="cta-subtitle">
                Join hundreds of students who are transforming their academic work 
                into career-ready skills with AI.
              </p>
              <button onClick={handleSignUp} className="btn-start">
                Start Free Today
                <Rocket className="w-6 h-6" />
              </button>
              <p className="cta-note">
                No credit card required • 100% Free
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand">
              <div className="logo-container">
                <div className="logo-icon">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="logo-text">Bridge-AI</h3>
                  <p className="logo-subtext">by weBugBusters</p>
                </div>
              </div>
              <p className="footer-brand-text">
                Bridging the gap between academic learning and career success.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="footer-title">Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#home" className="footer-link">Home</a></li>
                <li><a href="#features" className="footer-link">Features</a></li>
                <li><a href="#how-it-works" className="footer-link">How it Works</a></li>
                <li><a href="#team" className="footer-link">Team</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="footer-title">Resources</h4>
              <ul className="footer-links">
                <li><a href="#" className="footer-link">Documentation</a></li>
                <li><a href="#" className="footer-link">API Reference</a></li>
                <li><a href="#" className="footer-link">Blog</a></li>
                <li><a href="#" className="footer-link">Support</a></li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="footer-title">Connect</h4>
              <div className="footer-social">
                <a href="https://github.com/nikhil-shukl/weBugBusters_AMUHACKS5.0" className="footer-social-icon">
                  <Github className="w-5 h-5 text-slate-400" />
                </a>
                <a href="#" className="footer-social-icon">
                  <Linkedin className="w-5 h-5 text-slate-400" />
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 Bridge-AI by weBugBusters. Built for AMUHACKS 5.0 | All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;