import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Mail, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  AlertCircle,
  Loader2
} from 'lucide-react';
import emailjs from '@emailjs/browser';

// ============ YOUR EMAILJS CREDENTIALS ============
const EMAILJS_PUBLIC_KEY = 'lkI2h92ewhmEqmfa-';
const EMAILJS_SERVICE_ID = 'service_ntk3zmm';
const EMAILJS_TEMPLATE_ID = 'template_k8af0bf';
// ==================================================

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

const SignUp = () => {
  const navigate = useNavigate();

  // State Management
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const [generatedOTP, setGeneratedOTP] = useState('');

  // Refs for OTP inputs
  const otpRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Resend timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // Auto-focus first OTP input
  useEffect(() => {
    if (step === 2 && otpRefs[0].current) {
      otpRefs[0].current.focus();
    }
  }, [step]);

  // ============ SEND OTP VIA EMAILJS ============
  const handleSendOTP = async (emailAddress) => {
  try {
    // Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOTP(otpCode);

    // Prepare email template parameters
    const templateParams = {
      email: emailAddress,
  
      otp: otpCode,

    };

    // ✅ FIXED: Added 4th parameter (Public Key)
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY   // ← THIS WAS MISSING!
    );

    if (response.status === 200) {
      return { success: true };
    } else {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('EmailJS Error Details:', {
      status: error.status,
      text: error.text,
      message: error.message
    });
    throw error;
  }
};
  // ============ HANDLE EMAIL SUBMIT ============
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const response = await handleSendOTP(email);
      if (response.success) {
        setSuccess('Verification code sent to your email!');
        setResendTimer(30);
        setTimeout(() => {
          setStep(2);
          setSuccess('');
        }, 800);
      }
    } catch (err) {
      setError('Failed to send verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // ============ VERIFY OTP ============
  const handleVerifyOTP = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const enteredOTP = otp.join('');
    if (enteredOTP.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    if (enteredOTP === generatedOTP) {
      setSuccess('Account verified successfully!');
      
      // Store mock token (you can replace with real JWT later)
      localStorage.setItem('token', 'mock-jwt-token-' + Date.now());
      localStorage.setItem('user', JSON.stringify({ 
        email, 
        isVerified: true 
      }));

      setTimeout(() => {
        navigate('/analyzer');
      }, 1500);
    } else {
      setError('Invalid verification code. Please try again.');
    }
  };

  // ============ RESEND OTP ============
  const handleResendOTP = async () => {
    if (resendTimer > 0) return;
    
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await handleSendOTP(email);
      if (response.success) {
        setSuccess('New verification code sent!');
        setResendTimer(30);
        setOtp(['', '', '', '', '', '']);
        otpRefs[0].current?.focus();
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      setError('Failed to resend code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // ============ OTP INPUT HANDLERS ============
  const handleOtpChange = (index, value) => {
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split('').concat(Array(6 - pastedData.length).fill(''));
      setOtp(newOtp);
      const nextEmptyIndex = Math.min(pastedData.length, 5);
      otpRefs[nextEmptyIndex].current?.focus();
    }
  };

  const handleBackToEmail = () => {
    setStep(1);
    setOtp(['', '', '', '', '', '']);
    setError('');
    setSuccess('');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3, ease: 'easeIn' }
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#020617] relative overflow-hidden flex items-center justify-center p-4">
      {/* Floating Orbs Background */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#22d3ee]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[#c084fc]/10 rounded-full blur-[120px]" />

      {/* Auth Card Container */}
      <div className="relative w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-[#0f172a]/50 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl p-8 md:p-10"
        >
          {/* Brand Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-r from-[#22d3ee] to-[#c084fc] rounded-2xl shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-1">Bridge-AI</h1>
            <p className="text-sm text-slate-500">by weBugBusters</p>
            <p className="text-xs text-slate-600 mt-2">Academic-to-Career Translation Tool</p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className={`h-2 w-16 rounded-full transition-all duration-300 ${
              step === 1 ? 'bg-gradient-to-r from-[#22d3ee] to-[#c084fc]' : 'bg-white/10'
            }`} />
            <div className={`h-2 w-16 rounded-full transition-all duration-300 ${
              step === 2 ? 'bg-gradient-to-r from-[#22d3ee] to-[#c084fc]' : 'bg-white/10'
            }`} />
          </div>

          {/* Error/Success Messages */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-200">{error}</p>
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-200">{success}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
                <p className="text-sm text-slate-500 mb-6">
                  Enter your email to get started with Bridge-AI
                </p>

                <form onSubmit={handleEmailSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-12 pr-4 py-3.5 bg-[#0f172a]/60 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-[#22d3ee]/50 focus:border-[#22d3ee]/50 transition-all"
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 bg-gradient-to-r from-[#22d3ee] to-[#c084fc] hover:from-[#0891b2] hover:to-[#9333ea] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-[#22d3ee]/20 hover:shadow-[#c084fc]/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending Code...
                      </>
                    ) : (
                      <>
                        Send Verification Code
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 mb-4 bg-gradient-to-br from-[#22d3ee]/20 to-[#c084fc]/20 rounded-xl border border-white/10">
                    <ShieldCheck className="w-7 h-7 text-[#22d3ee]" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Verify Your Email</h2>
                  <p className="text-sm text-slate-500">
                    Enter the 6-digit code sent to
                  </p>
                  <p className="text-sm text-[#22d3ee] font-medium mt-1">{email}</p>
                </div>

                <form onSubmit={handleVerifyOTP} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-3 text-center">
                      Verification Code
                    </label>
                    <div className="flex gap-2 justify-center">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          ref={otpRefs[index]}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          onPaste={index === 0 ? handleOtpPaste : undefined}
                          className="w-12 h-14 md:w-14 md:h-16 bg-[#0f172a]/60 border border-white/10 rounded-xl text-center text-2xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-[#22d3ee]/50 focus:border-[#22d3ee]/50 transition-all"
                          disabled={isLoading}
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 bg-gradient-to-r from-[#22d3ee] to-[#c084fc] hover:from-[#0891b2] hover:to-[#9333ea] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-[#22d3ee]/20 hover:shadow-[#c084fc]/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Verify & Create Account
                      </>
                    )}
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      disabled={resendTimer > 0 || isLoading}
                      className="text-sm text-slate-500 hover:text-[#22d3ee] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {resendTimer > 0 ? (
                        `Resend code in ${resendTimer}s`
                      ) : (
                        'Resend verification code'
                      )}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleBackToEmail}
                    disabled={isLoading}
                    className="w-full py-3 text-slate-500 hover:text-white transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Email
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <p className="text-center text-xs text-slate-600 mt-6">
          Built for AMUHACKS 5.0 • Team weBugBusters
        </p>
      </div>
    </div>
  );
};

export default SignUp;