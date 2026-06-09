import React, { useState, useEffect, useRef } from 'react';

export default function LoginPage() {
  // Application view states
  const [step, setStep] = useState('phone'); // 'phone' | 'otp' | 'success'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [resendActive, setResendActive] = useState(false);
  
  // Transition and animation states
  const [activeStep, setActiveStep] = useState('phone'); 
  const [slideAnimClass, setSlideAnimClass] = useState(''); 
  const [shakeActive, setShakeActive] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  // Refs for focusing inputs
  const phoneInputRef = useRef(null);
  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const timerRef = useRef(null);

  // Focus helper on mount
  useEffect(() => {
    if (activeStep === 'phone' && phoneInputRef.current) {
      phoneInputRef.current.focus();
    }
  }, [activeStep]);

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // --- STEP 1: PHONE VALIDATION AND FORMATTING ---
  
  const validatePhoneNumber = (number) => {
    // Validate that the number is exactly 10 digits
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(number);
  };

  const isPhoneValid = validatePhoneNumber(phone);

  const handlePhoneChange = (e) => {
    // Clean input: remove any non-digit character
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(value);
    setPhoneError('');
  };

  const triggerInputShake = () => {
    setShakeActive(true);
    setTimeout(() => setShakeActive(false), 400);
  };

  // --- STEP 1 SUBMIT: OTP SEND SIMULATION ---

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (!validatePhoneNumber(phone)) {
      setPhoneError('Please enter a valid 10-digit mobile number');
      triggerInputShake();
      return;
    }

    setLoading(true);

    // Simulate API call (800ms latency)
    setTimeout(() => {
      setLoading(false);
      transitionToStep('otp');
      startTimer();
      
      // Focus first OTP field
      setTimeout(() => {
        if (otpRefs[0].current) otpRefs[0].current.focus();
      }, 400);
    }, 800);
  };

  // --- STEP 2: OTP INTERACTIVE LOGIC ---

  const handleOtpChange = (index, value) => {
    const cleanVal = value.replace(/\D/g, '').slice(0, 1);
    const newOtp = [...otp];
    newOtp[index] = cleanVal;
    setOtp(newOtp);

    // Auto-focus next input box on entry
    if (cleanVal && index < 3) {
      if (otpRefs[index + 1].current) {
        otpRefs[index + 1].current.focus();
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Focus previous input box on backspace
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        if (otpRefs[index - 1].current) {
          otpRefs[index - 1].current.focus();
        }
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    
    if (pasteData) {
      const newOtp = [...otp];
      for (let i = 0; i < 4; i++) {
        if (pasteData[i]) {
          newOtp[i] = pasteData[i];
        }
      }
      setOtp(newOtp);
      
      // Focus last filled input
      const focusIndex = Math.min(pasteData.length - 1, 3);
      if (otpRefs[focusIndex].current) {
        otpRefs[focusIndex].current.focus();
      }
    }
  };

  const isOtpComplete = otp.every(digit => digit !== '');

  // Edit Phone click transitions back to step 1
  const handleEditPhone = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    transitionToStep('phone');
  };

  // Timer Countdown System
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimer(30);
    setResendActive(false);

    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setResendActive(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Resend trigger Action
  const handleResend = () => {
    setOtp(['', '', '', '']);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      startTimer();
      if (otpRefs[0].current) otpRefs[0].current.focus();
    }, 800);
  };

  // --- STEP 2 SUBMIT: OTP VERIFICATION ---

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (!isOtpComplete) return;

    setLoading(true);

    // Simulate OTP Validation (1200ms latency)
    setTimeout(() => {
      setLoading(false);
      transitionToStep('success');
    }, 1200);
  };

  // --- TRANSITION HELPER SYSTEM ---

  const transitionToStep = (targetStep) => {
    if (targetStep === 'otp' && activeStep === 'phone') {
      // Step forward: phone -> otp
      setSlideAnimClass('slide-out-left');
      setTimeout(() => {
        setActiveStep('otp');
        setSlideAnimClass('slide-in-right');
      }, 300);
    } else if (targetStep === 'phone' && activeStep === 'otp') {
      // Step backward: otp -> phone
      setSlideAnimClass('slide-out-right');
      setTimeout(() => {
        setActiveStep('phone');
        setSlideAnimClass('slide-in-left');
      }, 300);
    } else if (targetStep === 'success' && activeStep === 'otp') {
      // Step forward: otp -> success
      setSlideAnimClass('slide-out-left');
      setTimeout(() => {
        setActiveStep('success');
        setSlideAnimClass('slide-in-right');
      }, 300);
    }
  };

  // Format phone number for display (+91 98765-43210)
  const formatPhoneDisplay = (num) => {
    if (num.length < 5) return `+91 ${num}`;
    return `+91 ${num.slice(0, 5)}-${num.slice(5)}`;
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen flex items-center justify-center p-4 relative overflow-hidden font-sans w-full">
      
      {/* Background decorative grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      {/* Main Container */}
      <div className="w-full max-w-[420px] relative z-10">
        
        {/* Brand Logo / Badge - Minimalist */}
        <div className="flex flex-col items-center justify-center mb-8 animate-fade-in-down">
          <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center shadow-md mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Secure Access</h1>
          <p className="text-xs text-slate-500 mt-1">Sign in with your mobile number</p>
        </div>

        {/* Slightly Translucent Minimalist Card */}
        <div className="bg-white/60 backdrop-blur-xl border border-white rounded-2xl p-8 shadow-xl shadow-slate-200/40 relative overflow-hidden animate-fade-in">
          
          {/* STEP 1: MOBILE NUMBER ENTRY */}
          {activeStep === 'phone' && (
            <div className={`step-container transition-all duration-300 ${slideAnimClass}`}>
              <form onSubmit={handlePhoneSubmit} className="space-y-6">
                <div>
                  <label htmlFor="phone" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Mobile Number</label>
                  <div className={`relative flex rounded-lg border bg-white/50 focus-within:ring-2 focus-within:ring-brand-500/15 transition-all duration-200 ${
                    shakeActive ? 'shake' : ''
                  } ${
                    phoneError 
                      ? 'border-rose-400 focus-within:border-rose-400' 
                      : isPhoneValid 
                        ? 'border-emerald-400 focus-within:border-emerald-400' 
                        : 'border-slate-200 focus-within:border-brand-500'
                  }`}>
                    {/* Country Code Selector */}
                    <div className="flex items-center pl-3 pr-2 border-r border-slate-200 text-slate-600 select-none">
                      <span className="text-sm mr-1">🇮🇳</span>
                      <span className="text-xs font-bold text-slate-500">+91</span>
                    </div>
                    {/* Input */}
                    <input 
                      ref={phoneInputRef}
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      autoComplete="off"
                      placeholder="Enter 10-digit number"
                      value={phone}
                      onChange={handlePhoneChange}
                      className="w-full bg-transparent py-3 px-3 text-slate-900 text-sm placeholder-slate-400 focus:outline-none tracking-wide"
                      maxLength={10}
                    />
                    {/* Validation Status Icon */}
                    <div className={`absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5 rounded-full transition-all duration-300 ${
                      isPhoneValid ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                    }`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  {phoneError && (
                    <p className="text-xs text-rose-500 mt-2 transition-all duration-200">{phoneError}</p>
                  )}
                </div>

                {/* Instruction Text */}
                <div className="flex items-start space-x-3 bg-slate-50/70 p-3.5 rounded-lg border border-slate-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-[11px] text-slate-500 leading-relaxed">A 4-digit code will be sent to this number for identity verification.</p>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={!isPhoneValid || loading} 
                  className={`w-full py-3 px-4 rounded-lg text-xs font-bold text-white transition-all duration-300 relative flex items-center justify-center space-x-2 ${
                    isPhoneValid && !loading
                      ? 'bg-brand-600 hover:bg-brand-500 hover:scale-[1.01] active:scale-[0.99] cursor-pointer shadow-md shadow-brand-500/20'
                      : 'bg-slate-300 cursor-not-allowed'
                  }`}
                >
                  {loading ? (
                    <>
                      <span>Sending Code...</span>
                      <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </>
                  ) : (
                    <>
                      <span>Send Verification Code</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* STEP 2: OTP VERIFICATION */}
          {activeStep === 'otp' && (
            <div className={`step-container transition-all duration-300 ${slideAnimClass}`}>
              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div className="text-center mb-2">
                  <div className="text-slate-400 text-xs">We've sent a code to</div>
                  <div className="text-slate-800 font-bold text-sm mt-1 tracking-wider">{formatPhoneDisplay(phone)}</div>
                  <button 
                    type="button" 
                    onClick={handleEditPhone}
                    disabled={loading}
                    className="text-[11px] text-slate-500 hover:text-brand-600 mt-1 font-semibold hover:underline focus:outline-none"
                  >
                    Change number
                  </button>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center mb-4">Enter 4-Digit Code</label>
                  <div className="flex items-center justify-center space-x-3">
                    {otp.map((digit, idx) => (
                      <input 
                        key={idx}
                        ref={otpRefs[idx]}
                        type="text" 
                        pattern="[0-9]*" 
                        inputMode="numeric" 
                        maxLength={1} 
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        onPaste={idx === 0 ? handleOtpPaste : undefined}
                        disabled={loading}
                        className="w-12 h-12 bg-white border border-slate-200 rounded-lg text-center text-lg font-bold text-slate-800 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 focus:outline-none transition-all duration-200" 
                      />
                    ))}
                  </div>
                </div>

                {/* Resend OTP and Timer */}
                <div className="flex items-center justify-between text-[11px] px-1">
                  <span className="text-slate-400">Didn't receive the code?</span>
                  <div className="flex items-center space-x-1">
                    {!resendActive ? (
                      <span className="text-slate-400 font-medium">
                        Resend in <span className="text-brand-600 font-bold">{timer}</span>s
                      </span>
                    ) : (
                      <button 
                        type="button" 
                        onClick={handleResend}
                        disabled={loading}
                        className="text-brand-600 hover:text-brand-500 font-bold focus:outline-none cursor-pointer"
                      >
                        Resend Code
                      </button>
                    )}
                  </div>
                </div>

                {/* Verify Button */}
                <button 
                  type="submit" 
                  disabled={!isOtpComplete || loading} 
                  className={`w-full py-3 px-4 rounded-lg text-xs font-bold text-white transition-all duration-300 flex items-center justify-center space-x-2 ${
                    isOtpComplete && !loading
                      ? 'bg-brand-600 hover:bg-brand-500 hover:scale-[1.01] active:scale-[0.99] cursor-pointer shadow-md shadow-brand-500/20'
                      : 'bg-slate-300 cursor-not-allowed'
                  }`}
                >
                  {loading ? (
                    <>
                      <span>Verifying...</span>
                      <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </>
                  ) : (
                    <>
                      <span>Verify &amp; Sign In</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* STEP 3: SUCCESS STATE */}
          {activeStep === 'success' && (
            <div className={`step-container transition-all duration-300 ${slideAnimClass} flex flex-col items-center justify-center py-6 text-center`}>
              <div className="success-checkmark mb-6">
                <div className="w-14 h-14 rounded-full bg-brand-50 border-2 border-brand-500/20 flex items-center justify-center relative">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-brand-500 svg-check animate-draw" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Welcome Back!</h3>
              <p className="text-xs text-slate-500 max-w-[280px]">Your identity has been verified successfully. Redirecting you to workspace...</p>
              <div className="mt-8 flex justify-center">
                <div className="flex space-x-1.5 items-center">
                  <div className="w-2 h-2 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '0.25s' }}></div>
                  <div className="w-2 h-2 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer branding & copy - Minimalist */}
        <p className="text-center text-[10px] font-medium text-slate-400 mt-8 leading-normal">
          Secure 256-bit SSL encrypted connection.<br />
          &copy; 2026 Enterprise Inc. All rights reserved.
        </p>
      </div>

      {/* Layered Minimalist SVG Wave Pattern in the center of the screen */}
      <div className="absolute top-1/2 left-0 right-0 w-full -translate-y-1/2 overflow-hidden leading-none z-0 pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[180px]">
          {/* Wave Layer 1 */}
          <path 
            d="M0,60 C300,20 600,100 900,40 C1050,10 1150,30 1200,40 L1200,120 L0,120 Z" 
            className="fill-brand-500/8 animate-wave-slow"
          ></path>
          {/* Wave Layer 2 */}
          <path 
            d="M0,40 C300,90 600,30 900,70 C1050,90 1150,70 1200,60 L1200,120 L0,120 Z" 
            className="fill-brand-300/6 animate-wave-fast"
          ></path>
        </svg>
      </div>
    </div>
  );
}
