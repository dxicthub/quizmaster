import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaGraduationCap, FaUsers, FaBook, FaQuestionCircle, FaChartBar,
  FaTrophy, FaClock, FaMobileAlt, FaShieldAlt, FaArrowRight,
  FaStar, FaQuoteLeft, FaFacebook, FaTwitter, FaInstagram,
  FaLinkedin, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaChevronLeft, FaChevronRight, FaPlay, FaInfoCircle,
  FaCheckCircle, FaRocket, FaLightbulb, FaAward, FaBolt,
  FaUserGraduate, FaCertificate, FaHandsHelping, FaHeadset,
  FaWhatsapp, FaTimes, FaFileContract, FaShieldAlt as FaShieldIcon,
  FaSpinner
} from 'react-icons/fa';
import { SiGoogleanalytics, SiTailwindcss } from 'react-icons/si';
import { useAuth } from '../../context/AuthContext.jsx';
import { useQuiz } from '../../context/QuizContext.jsx';
import { quizCategories } from '../../data/quizCategories.js';
import RoleSelectionModal from '../../components/Landing/RoleSelectionModal.jsx';
import toast from 'react-hot-toast';

// SVG placeholders for images (you can replace these with actual image URLs)
const heroBg = 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&q=80';
const featureImg1 = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80';
const featureImg2 = 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80';
const featureImg3 = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80';
const featureImg4 = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80';

function LandingPage() {
  const { isAuthenticated } = useAuth();
  const { state } = useQuiz();
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showHelpCenter, setShowHelpCenter] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const carouselRef = useRef(null);

  // Animation controls
  const controls = useAnimation();
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true });

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Stats animation
  useEffect(() => {
    if (isStatsInView) {
      controls.start('visible');
    }
  }, [isStatsInView, controls]);

  // Auto-slide carousel
  useEffect(() => {
    let interval;
    if (isAutoPlaying && quizCategories.length > 0) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => 
          prev === quizCategories.length - 1 ? 0 : prev + 1
        );
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, quizCategories.length]);

  const handleCarouselHover = () => setIsAutoPlaying(false);
  const handleCarouselLeave = () => setIsAutoPlaying(true);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? quizCategories.length - 1 : prev - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => 
      prev === quizCategories.length - 1 ? 0 : prev + 1
    );
  };

  const handleNavClick = (sectionId) => {
    setActiveNav(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRoleSelect = (role) => {
    setShowRoleModal(false);
    if (role === 'student') {
      if (isAuthenticated) {
        toast.info('You are already logged in');
        return;
      }
      window.location.href = '/login';
    } else if (role === 'admin') {
      window.location.href = '/admin/login';
    }
  };

  const handleActionClick = () => {
    if (isAuthenticated) {
      window.location.href = '/app';
      return;
    }
    setShowRoleModal(true);
  };

  const handleWhatsAppClick = (phone, message) => {
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Modal components
  const HelpCenterModal = () => (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="glassmorphism card-shadow rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative border border-white/20 dark:border-gray-700/30">
        <button
          onClick={() => setShowHelpCenter(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <FaTimes className="text-gray-500 dark:text-gray-400" />
        </button>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <FaHeadset className="text-white text-3xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Help Center</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">We're here to help you</p>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
              <FaHeadset className="text-blue-500" />
              Customer Support Numbers
            </h3>
            <div className="space-y-2 text-gray-600 dark:text-gray-300">
              <p className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <FaPhone className="text-blue-500" />
                <a href="tel:+2348131649230" className="hover:text-blue-600 transition-colors">+234 813 164 9230</a>
              </p>
              <p className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <FaPhone className="text-blue-500" />
                <a href="tel:+2348121720866" className="hover:text-blue-600 transition-colors">+234 812 172 0866</a>
              </p>
              <p className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <FaPhone className="text-blue-500" />
                <a href="tel:+2347061066372" className="hover:text-blue-600 transition-colors">+234 706 106 6372</a>
              </p>
            </div>
            <div className="mt-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-700 dark:text-blue-300 flex items-start gap-2">
                <FaClock className="text-blue-500 mt-0.5" />
                If you need assistance with registration, login, quizzes, or technical issues, please contact any of the support numbers below during our support hours.
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
              <FaWhatsapp className="text-green-500" />
              WhatsApp Support
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => handleWhatsAppClick('2347061066372', 'Hello Master Quiz')}
                className="w-full flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors text-left"
              >
                <FaWhatsapp className="text-green-500 text-xl" />
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">+234 706 106 6372</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Click to chat on WhatsApp</p>
                </div>
              </button>
              <button
                onClick={() => handleWhatsAppClick('2348123645507', 'Hello Master Quiz')}
                className="w-full flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors text-left"
              >
                <FaWhatsapp className="text-green-500 text-xl" />
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">+234 812 364 5507</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Click to chat on WhatsApp</p>
                </div>
              </button>
            </div>
            <div className="mt-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-700 dark:text-green-300">Our support team usually responds as quickly as possible.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PrivacyPolicyModal = () => (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="glassmorphism card-shadow rounded-3xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative border border-white/20 dark:border-gray-700/30">
        <button
          onClick={() => setShowPrivacyPolicy(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <FaTimes className="text-gray-500 dark:text-gray-400" />
        </button>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <FaShieldIcon className="text-white text-3xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Privacy Policy</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>
        <div className="space-y-6 text-gray-600 dark:text-gray-300 text-sm">
          <section>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Introduction</h3>
            <p>QuizMaster ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our online quiz and assessment platform. By using QuizMaster, you agree to the practices described in this policy.</p>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Information We Collect</h3>
            <p className="mb-2">We may collect the following types of information:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number (if provided)</li>
              <li>Quiz performance and results</li>
              <li>Login information (time, date, IP address)</li>
              <li>Device and browser information</li>
              <li>Usage patterns and preferences</li>
            </ul>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">How We Use Your Information</h3>
            <p className="mb-2">We use your information to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Provide and manage quiz services</li>
              <li>Track academic progress and performance</li>
              <li>Improve user experience and platform features</li>
              <li>Provide technical support and assistance</li>
              <li>Enhance platform security</li>
              <li>Send important notifications and updates</li>
              <li>Personalize your learning experience</li>
            </ul>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Data Protection</h3>
            <p>We implement reasonable technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, secure servers, and regular security assessments.</p>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Cookies</h3>
            <p>We use cookies and similar tracking technologies to improve functionality, remember your preferences, and analyze usage patterns. You can manage cookie preferences through your browser settings.</p>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Third-Party Services</h3>
            <p>We may use trusted third-party services to enhance our platform. These services are carefully selected and are required to maintain the same level of data protection and privacy standards.</p>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Your Rights</h3>
            <p className="mb-2">You have the right to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Access the personal information we hold about you</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data where applicable</li>
              <li>Opt-out of marketing communications</li>
              <li>Contact us regarding any privacy concerns</li>
            </ul>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Policy Updates</h3>
            <p>We may update this Privacy Policy periodically. We will notify you of any significant changes by posting the new policy on this page and updating the "Last Updated" date.</p>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Contact Us</h3>
            <p>If you have questions about this Privacy Policy or how we handle your data, please visit our <button onClick={() => { setShowPrivacyPolicy(false); setShowHelpCenter(true); }} className="text-blue-600 dark:text-blue-400 hover:underline">Help Center</button>.</p>
          </section>
        </div>
      </div>
    </div>
  );

  const TermsModal = () => (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="glassmorphism card-shadow rounded-3xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative border border-white/20 dark:border-gray-700/30">
        <button
          onClick={() => setShowTerms(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <FaTimes className="text-gray-500 dark:text-gray-400" />
        </button>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <FaFileContract className="text-white text-3xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Terms & Conditions</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>
        <div className="space-y-6 text-gray-600 dark:text-gray-300 text-sm">
          <section>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">1. Acceptance of Terms</h3>
            <p>By accessing and using QuizMaster, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our platform.</p>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">2. User Eligibility</h3>
            <p>You must be at least 13 years old to use QuizMaster. By using the platform, you represent that you meet this age requirement. If you are under 18, you confirm that you have parental or guardian consent.</p>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">3. Account Responsibilities</h3>
            <p className="mb-2">You are responsible for:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Maintaining the confidentiality of your login credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use of your account</li>
              <li>Keeping your account information accurate and up-to-date</li>
            </ul>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">4. Acceptable Use</h3>
            <p className="mb-2">You agree NOT to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Cheat or attempt to manipulate quiz results</li>
              <li>Attempt unauthorized access to any part of the platform</li>
              <li>Share your login credentials with others</li>
              <li>Disrupt or interfere with platform operations</li>
              <li>Upload malicious content or attempt to introduce viruses</li>
              <li>Use the platform for any unlawful purpose</li>
            </ul>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">5. Quiz Rules</h3>
            <p className="mb-2">By taking quizzes on our platform, you agree to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Complete quizzes within the allotted time</li>
              <li>Submit your own work without assistance from others</li>
              <li>Accept that all scores are final and recorded</li>
              <li>Respect the quiz attempt limits set by administrators</li>
              <li>Use the platform fairly and without exploiting any system vulnerabilities</li>
            </ul>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">6. Intellectual Property</h3>
            <p>All quiz materials, including questions, answers, explanations, and content, as well as the platform's design, logo, branding, and code, are the intellectual property of QuizMaster and JEO Digital Solutions unless otherwise stated. You may not reproduce, distribute, or create derivative works without explicit permission.</p>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">7. Suspension of Accounts</h3>
            <p>We reserve the right to suspend or terminate accounts that violate these terms, engage in suspicious activity, or misuse the platform. In such cases, you may lose access to your account, progress, and quiz history.</p>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">8. Disclaimer</h3>
            <p>Quiz results are provided for educational and assessment purposes. They do not constitute official certification unless explicitly stated. While we strive for accuracy, we do not guarantee the completeness or reliability of any quiz content.</p>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">9. Limitation of Liability</h3>
            <p>QuizMaster and JEO Digital Solutions shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of the platform. We are not responsible for any technical issues, data loss, or interruptions in service.</p>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">10. Changes to Terms</h3>
            <p>We may update these Terms & Conditions periodically. We will notify you of significant changes by posting the new terms on this page and updating the "Last Updated" date. Continued use of the platform constitutes acceptance of the updated terms.</p>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">11. Governing Law</h3>
            <p>These Terms & Conditions are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Nigeria.</p>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">12. Contact Us</h3>
            <p>If you have questions about these Terms & Conditions, please visit our <button onClick={() => { setShowTerms(false); setShowHelpCenter(true); }} className="text-blue-600 dark:text-blue-400 hover:underline">Help Center</button>.</p>
          </section>
        </div>
      </div>
    </div>
  );

  const stats = [
    { icon: FaUsers, label: 'Total Students', value: 12500, suffix: '+' },
    { icon: FaBook, label: 'Total Quizzes', value: 22, suffix: '' },
    { icon: FaQuestionCircle, label: 'Questions Available', value: 2200, suffix: '+' },
    { icon: FaChartBar, label: 'Tests Completed', value: 45000, suffix: '+' },
    { icon: FaTrophy, label: 'Success Rate', value: 89, suffix: '%' },
  ];

  const features = [
    {
      icon: FaQuestionCircle,
      title: 'Thousands of Questions',
      description: 'Access a vast library of questions across multiple categories and difficulty levels.',
      image: featureImg1
    },
    {
      icon: FaClock,
      title: 'Timed Assessments',
      description: 'Practice with real-time timers to improve your speed and accuracy under pressure.',
      image: featureImg2
    },
    {
      icon: FaChartBar,
      title: 'Instant Results',
      description: 'Get immediate feedback on your performance with detailed score breakdowns.',
      image: featureImg3
    },
    {
      icon: FaTrophy,
      title: 'Leaderboards',
      description: 'Compete with other learners and track your ranking on global leaderboards.',
      image: featureImg4
    },
    {
      icon: FaGraduationCap,
      title: 'Progress Tracking',
      description: 'Monitor your learning journey with comprehensive progress analytics.',
      image: featureImg1
    },
    {
      icon: SiGoogleanalytics,
      title: 'Performance Analytics',
      description: 'Deep dive into your strengths and weaknesses with detailed analytics.',
      image: featureImg2
    },
    {
      icon: FaMobileAlt,
      title: 'Mobile Friendly',
      description: 'Learn anywhere, anytime with our fully responsive mobile-optimized platform.',
      image: featureImg3
    },
    {
      icon: FaShieldAlt,
      title: 'Secure Authentication',
      description: 'Your data is protected with enterprise-grade security and authentication.',
      image: featureImg4
    },
  ];

  const benefits = [
    {
      icon: FaLightbulb,
      title: 'Improve Knowledge',
      description: 'Master concepts and expand your understanding across various subjects.'
    },
    {
      icon: FaGraduationCap,
      title: 'Prepare for Examinations',
      description: 'Practice with exam-style questions and build confidence for test day.'
    },
    {
      icon: FaChartBar,
      title: 'Track Learning Progress',
      description: 'Visualize your growth with detailed progress reports and analytics.'
    },
    {
      icon: FaRocket,
      title: 'Build Confidence',
      description: 'Gain confidence through consistent practice and instant feedback.'
    },
    {
      icon: FaUserGraduate,
      title: 'Learn at Your Own Pace',
      description: 'Study when and where it suits you with flexible learning options.'
    },
    {
      icon: FaTrophy,
      title: 'Compete on Leaderboards',
      description: 'Challenge yourself and others with friendly competition.'
    },
    {
      icon: FaCertificate,
      title: 'Earn Certificates',
      description: 'Receive recognition for your achievements and milestones.'
    },
    {
      icon: FaHandsHelping,
      title: 'Community Support',
      description: 'Join a community of learners and share your journey.'
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Software Developer',
      feedback: 'This platform transformed how I prepare for technical assessments. The instant feedback and detailed analytics helped me identify and improve my weak areas.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Computer Science Student',
      feedback: 'The variety of quiz categories and timed assessments prepared me perfectly for my final exams. I highly recommend this to any student!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Frontend Developer',
      feedback: 'I love the leaderboard feature! It keeps me motivated to improve my scores and learn more. The progress tracking is incredibly helpful.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80'
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Full Stack Developer',
      feedback: 'The best online quiz platform I have ever used. The questions are relevant, and the analytics help me focus on what matters most.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80'
    },
  ];

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'categories', label: 'Quiz Categories' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
  ];

  const faqs = [
    {
      question: 'How do I get started?',
      answer: 'Simply click "Start Quiz" or "Sign Up" on the landing page. Choose your role (Student or Admin), and you\'ll be guided through the registration process.'
    },
    {
      question: 'Is the platform free?',
      answer: 'Yes, QuizMaster is completely free for students. Administrators can access the platform to create and manage quizzes as well.'
    },
    {
      question: 'What topics are covered?',
      answer: 'We cover a wide range of topics including Programming, Web Development, Database, Cloud Computing, Cybersecurity, and more.'
    },
    {
      question: 'How are scores calculated?',
      answer: 'Scores are calculated based on the number of correct answers. Each question has a specific weight, and your final score is displayed with detailed feedback.'
    },
    {
      question: 'Can I track my progress?',
      answer: 'Yes! Your student dashboard provides comprehensive progress tracking, including your performance history, strengths, and areas for improvement.'
    },
    {
      question: 'Can I take quizzes on mobile?',
      answer: 'Absolutely! The platform is fully responsive and works seamlessly on all devices - desktop, tablet, and mobile phones.'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation - Enhanced with glassmorphism */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-gray-700/50' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-3 max-w-7xl">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group" onClick={() => setActiveNav('home')}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
                <div className="relative p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/30">
                  <FaGraduationCap className="text-white text-2xl" />
                </div>
              </div>
              <div>
                <h1 className={`text-xl font-bold transition-colors duration-300 ${
                  isScrolled ? 'text-gray-800 dark:text-white' : 'text-white'
                }`}>
                  QuizMaster
                </h1>
                <p className={`text-[10px] hidden sm:block font-medium tracking-wider uppercase transition-colors duration-300 ${
                  isScrolled ? 'text-gray-500 dark:text-gray-400' : 'text-white/80'
                }`}>
                  Learn & Master
                </p>
              </div>
            </Link>
            
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-sm font-medium transition-all duration-300 relative ${
                    activeNav === link.id
                      ? isScrolled 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-white'
                      : isScrolled
                        ? 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                        : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                  {activeNav === link.id && (
                    <motion.div
                      layoutId="activeNav"
                      className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${
                        isScrolled 
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-500' 
                          : 'bg-gradient-to-r from-yellow-400 to-yellow-300'
                      }`}
                    />
                  )}
                </button>
              ))}
            </div>
            
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => setShowRoleModal(true)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isScrolled 
                    ? 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setShowRoleModal(true)}
                className={`px-5 py-2 rounded-xl text-sm font-medium shadow-lg transition-all duration-300 hover:scale-105 ${
                  isScrolled 
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-blue-500/30 hover:shadow-blue-500/50' 
                    : 'bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 shadow-yellow-500/30 hover:shadow-yellow-500/50'
                }`}
              >
                Sign Up
              </button>
            </div>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-white/10 dark:hover:bg-white/10 transition-colors"
            >
              <svg className={`w-6 h-6 transition-colors duration-300 ${
                isScrolled ? 'text-gray-700 dark:text-white' : 'text-white'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:hidden pt-4 pb-3 border-t mt-3"
            >
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`block w-full text-left px-4 py-2.5 text-sm font-medium transition-colors rounded-lg ${
                    activeNav === link.id
                      ? isScrolled
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'bg-white/20 text-white'
                      : isScrolled
                        ? 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="flex flex-col gap-2 mt-3 px-4">
                <button
                  onClick={() => setShowRoleModal(true)}
                  className={`w-full py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isScrolled
                      ? 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setShowRoleModal(true)}
                  className={`w-full py-2.5 rounded-xl text-sm font-medium shadow-lg ${
                    isScrolled 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white' 
                      : 'bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section - Enhanced */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-indigo-700/70"></div>
        </div>
        
        {/* Animated particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/10 rounded-full"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: 0
              }}
              animate={{
                y: [null, -100, -200],
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 5 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
            />
          ))}
        </div>
        
        <div className="relative container mx-auto px-4 py-20 max-w-7xl z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              >
                Master Your Knowledge
                <br />
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  One Quiz at a Time
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg md:text-xl text-blue-100 mb-8 max-w-lg leading-relaxed"
              >
                Test your skills across 22+ categories with 100+ questions each. Get instant feedback, track your progress, and become a subject expert.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <button
                  onClick={handleActionClick}
                  className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 rounded-2xl font-semibold text-lg shadow-2xl shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-3 group"
                >
                  <FaPlay className="group-hover:scale-110 transition-transform" />
                  Start Quiz
                </button>
                <button
                  onClick={() => handleNavClick('features')}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center gap-3 group"
                >
                  <FaInfoCircle className="group-hover:rotate-12 transition-transform" />
                  Learn More
                </button>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="flex flex-wrap items-center gap-6 mt-8 text-blue-200"
              >
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-yellow-400" />
                  <span className="text-sm">100% Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-yellow-400" />
                  <span className="text-sm">22+ Categories</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-yellow-400" />
                  <span className="text-sm">Instant Results</span>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="hidden lg:flex justify-center"
            >
              {/* Hero image or illustration placeholder */}
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl blur-3xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section id="features" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4 border border-blue-200/50 dark:border-blue-700/30">
              Platform Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">QuizMaster</span>?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to master your subjects and track your progress
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glassmorphism card-shadow rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-2xl mb-4 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                  {React.createElement(feature.icon)}
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz Categories Carousel - Enhanced */}
      <section id="categories" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full text-sm font-semibold mb-4 border border-yellow-200/50 dark:border-yellow-700/30">
              Quiz Categories
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Explore Our <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">Quizzes</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Choose from 22+ categories and start learning today
            </p>
          </motion.div>
          
          <div 
            className="relative"
            onMouseEnter={handleCarouselHover}
            onMouseLeave={handleCarouselLeave}
          >
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {quizCategories.map((category, index) => (
                  <div key={category.id} className="min-w-full md:min-w-[50%] lg:min-w-[33.33%] p-4">
                    <div className="glassmorphism card-shadow rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 h-full group">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-3xl mb-4 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                        {React.createElement(
                          category.icon ? category.icon : FaBook,
                          { className: 'text-2xl' }
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                        {category.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {category.totalQuestions || 100} Questions
                        </span>
                        <button
                          onClick={handleActionClick}
                          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
                        >
                          Take Quiz <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button
              onClick={handlePrevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 hover:scale-110"
            >
              <FaChevronLeft className="text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={handleNextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 hover:scale-110"
            >
              <FaChevronRight className="text-gray-600 dark:text-gray-300" />
            </button>
            
            <div className="flex justify-center gap-2 mt-6">
              {quizCategories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'w-8 bg-gradient-to-r from-blue-500 to-indigo-500'
                      : 'w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Enhanced */}
      <section id="benefits" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-semibold mb-4 border border-green-200/50 dark:border-green-700/30">
              Why Take Quizzes?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Benefits of <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">Mastering Quizzes</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover how QuizMaster can transform your learning journey
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="glassmorphism card-shadow rounded-2xl p-6 text-center border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-yellow-500 to-orange-400 flex items-center justify-center text-white text-2xl mb-4 shadow-lg shadow-yellow-500/30 group-hover:scale-110 transition-transform duration-300">
                  {React.createElement(benefit.icon)}
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section - Enhanced */}
      <section ref={statsRef} className="py-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={controls}
                  variants={{
                    visible: { opacity: 1, scale: 1 },
                    hidden: { opacity: 0, scale: 0.8 }
                  }}
                  transition={{ delay: index * 0.1, duration: 0.6, type: 'spring' }}
                  className="text-center text-white"
                >
                  <div className="flex justify-center mb-3">
                    <Icon className="text-4xl text-yellow-400" />
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                    className="text-3xl md:text-4xl font-bold"
                  >
                    {stat.value}{stat.suffix}
                  </motion.div>
                  <div className="text-sm text-blue-200 mt-1">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Enhanced */}
      <section id="testimonials" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-semibold mb-4 border border-purple-200/50 dark:border-purple-700/30">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Students Say</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Hear from students who have transformed their learning with QuizMaster
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glassmorphism card-shadow rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-200">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm italic leading-relaxed">
                  "{testimonial.feedback}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Enhanced */}
      <section id="faq" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4 border border-blue-200/50 dark:border-blue-700/30">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">Questions</span>
            </h2>
          </motion.div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
                className="glassmorphism card-shadow rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                  <FaQuestionCircle className="text-blue-500 text-sm" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm pl-6 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ UPDATED: Contact Section - Form on Top, Cards Below */}
      <section id="contact" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-semibold mb-4 border border-green-200/50 dark:border-green-700/30">
              Contact Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Get in <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">Touch</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Have questions? We're here to help! Send us a message or reach out through any of the channels below.
            </p>
          </motion.div>
          
          {/* Contact Form - Full Width and Larger */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mb-12"
          >
            <div className="glassmorphism card-shadow rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                  <FaEnvelope className="text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Send Us a Message</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">We'll respond within 24 hours</p>
                </div>
              </div>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                toast.success('✅ Message sent successfully! We\'ll get back to you soon.');
                e.target.reset();
              }} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    />
                  </div>
                  
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-3 bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    />
                  </div>
                  
                  {/* Topic Dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Topic <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 appearance-none cursor-pointer"
                    >
                      <option value="">Select a topic...</option>
                      <option value="account-registration">Account Registration & Setup</option>
                      <option value="login-issues">Login Issues & Password Reset</option>
                      <option value="quiz-taking">Taking Quizzes & Assessment</option>
                      <option value="quiz-results">Quiz Results & Scoring</option>
                      <option value="progress-tracking">Progress Tracking & Reports</option>
                      <option value="technical-support">Technical Support & Bugs</option>
                      <option value="feature-requests">Feature Requests & Suggestions</option>
                      <option value="certificates">Certificates & Achievements</option>
                      <option value="payment-billing">Payment & Billing Questions</option>
                      <option value="general-inquiry">General Inquiry & Feedback</option>
                    </select>
                  </div>
                </div>
                
                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Describe your question or issue in detail..."
                    className="w-full px-4 py-3 bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none"
                  ></textarea>
                </div>
                
                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold text-base shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center gap-3 group"
                >
                  <span>Send Message</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
                
                <p className="text-xs text-center text-gray-400 dark:text-gray-500">
                  We'll respond within 24 hours. Your information is safe with us.
                </p>
              </form>
            </div>
          </motion.div>
          
          {/* Contact Cards - Below the form with spacing */}
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                Or reach out through our channels
              </h3>
              <div className="h-0.5 w-16 mx-auto bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-2"></div>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Email Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.03 }}
                className="glassmorphism card-shadow rounded-2xl p-6 text-center border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-2xl mb-3 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                  <FaEnvelope />
                </div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">Email</h4>
                <p className="text-gray-600 dark:text-gray-400 text-xs mt-1 break-all">support@quizmaster.com</p>
              </motion.div>
              
              {/* Phone Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.03 }}
                className="glassmorphism card-shadow rounded-2xl p-6 text-center border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-2xl mb-3 shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform duration-300">
                  <FaPhone />
                </div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">Phone</h4>
                <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">+234 813 164 9230</p>
              </motion.div>
              
              {/* Location Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.03 }}
                className="glassmorphism card-shadow rounded-2xl p-6 text-center border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl mb-3 shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
                  <FaMapMarkerAlt />
                </div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">Location</h4>
                <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Nigeria</p>
              </motion.div>
              
              {/* WhatsApp Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.03 }}
                className="glassmorphism card-shadow rounded-2xl p-6 text-center border border-green-200/50 dark:border-green-700/30 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                onClick={() => {
                  const phone = '08123645507';
                  const message = 'Hello QuizMaster, I need assistance with:';
                  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
                  window.open(url, '_blank');
                }}
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white text-2xl mb-3 shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-green-500/50">
                  <FaWhatsapp />
                </div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">WhatsApp</h4>
                <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">081 236 455 07</p>
                <div className="mt-2 inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-[10px] font-semibold">
                  Click to Chat
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Ready to Test Your <span className="text-yellow-400">Knowledge</span>?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of students mastering their subjects with QuizMaster
            </p>
            <button
              onClick={handleActionClick}
              className="px-10 py-4 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 rounded-2xl font-semibold text-lg shadow-2xl shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto group"
            >
              <FaRocket className="group-hover:scale-110 transition-transform" />
              Start Your Quiz Today
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer - Enhanced */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-xl shadow-lg shadow-blue-500/30">
                  <FaGraduationCap className="text-white text-2xl" />
                </div>
                <span className="text-xl font-bold text-white">QuizMaster</span>
              </div>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                Master your knowledge with comprehensive quizzes across 22+ categories.
              </p>
              <div className="flex gap-3">
                <a href="#" className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300 hover:scale-110" aria-label="Facebook"><FaFacebook /></a>
                <a href="#" className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300 hover:scale-110" aria-label="Twitter"><FaTwitter /></a>
                <a href="#" className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300 hover:scale-110" aria-label="Instagram"><FaInstagram /></a>
                <a href="#" className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300 hover:scale-110" aria-label="LinkedIn"><FaLinkedin /></a>
                <a href="#" className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300 hover:scale-110" aria-label="YouTube"><FaYoutube /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => handleNavClick('home')} className="hover:text-blue-400 transition-colors">Home</button></li>
                <li><button onClick={() => handleNavClick('features')} className="hover:text-blue-400 transition-colors">Features</button></li>
                <li><button onClick={() => handleNavClick('categories')} className="hover:text-blue-400 transition-colors">Categories</button></li>
                <li><button onClick={() => handleNavClick('testimonials')} className="hover:text-blue-400 transition-colors">Testimonials</button></li>
                <li><button onClick={() => handleNavClick('faq')} className="hover:text-blue-400 transition-colors">FAQ</button></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => handleNavClick('contact')} className="hover:text-blue-400 transition-colors">Contact</button></li>
                <li>
                  <button 
                    onClick={() => setShowHelpCenter(true)} 
                    className="hover:text-blue-400 transition-colors"
                  >
                    Help Center
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setShowPrivacyPolicy(true)} 
                    className="hover:text-blue-400 transition-colors"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setShowTerms(true)} 
                    className="hover:text-blue-400 transition-colors"
                  >
                    Terms & Conditions
                  </button>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="lg:col-span-1">
              <h4 className="text-white font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-400 text-sm mb-4">
                Subscribe for updates and new quiz alerts.
              </p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-gray-800 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm border border-gray-700 focus:border-transparent"
                  aria-label="Email for newsletter"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-r-xl transition-all duration-300" aria-label="Subscribe">
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} QuizMaster is Licensed to JEO Digital Solutions. All rights reserved.</p>
            <p>Powered by <span className="font-medium text-blue-600 dark:text-blue-400">DXICTHUB</span></p>
          </div>

        </div>
      </footer>

      {/* Modals */}
      {showHelpCenter && <HelpCenterModal />}
      {showPrivacyPolicy && <PrivacyPolicyModal />}
      {showTerms && <TermsModal />}

      {/* Role Selection Modal */}
      <RoleSelectionModal
        isOpen={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        onSelect={handleRoleSelect}
      />
    </div>
  );
}

export default LandingPage;