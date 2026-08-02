import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCog, FaUserCog, FaPaintBrush, FaBell, 
  FaLock, FaDatabase, FaGlobe, FaSave,
  FaSpinner, FaCheckCircle, FaTimesCircle,
  FaArrowLeft, FaArrowRight, FaInfoCircle,
  FaShieldAlt, FaUserShield, FaEnvelope,
  FaClock, FaQuestionCircle, FaRocket,
  FaSlidersH, FaToggleOn, FaToggleOff,
  FaChevronDown, FaEye, FaUserPlus,
  FaChartLine, FaFileExport, FaFileImport,
  FaCloudUploadAlt, FaCertificate, FaAward,
  FaGamepad, FaMobileAlt, FaDesktop,
  FaLanguage, FaMoneyBillWave, FaCreditCard,
  FaTag, FaLink, FaShareAlt, FaPrint,
  FaHistory, FaUndo, FaRedo, FaSync,
  FaPlug, FaWifi, FaServer, FaCode,
  FaBug, FaShieldVirus, FaUserSecret,
  FaLockOpen, FaKey, FaFingerprint,
  FaHourglassHalf, FaStopwatch, FaCalendarAlt,
  FaUsers, FaUserFriends, FaUserTie,
  FaGraduationCap, FaChalkboardTeacher,
  FaClipboardList, FaPoll, FaVoteYea,
  FaStar, FaMedal, FaTrophy, FaGift,
  FaRandom, FaPause, FaMinus, FaCheck,
  FaFont, FaHeadphones, FaKeyboard, FaImage,
  FaCompress, FaFileArchive, FaEdit,
  FaPhone, FaBan, FaCookie, FaVideo,
  FaFolderOpen, FaPlus, FaPercent,
  FaSlack, FaDiscord, FaBolt,
  FaSearch, FaFilter, FaDownload, FaWrench,
  FaChartPie, FaFileAlt
} from 'react-icons/fa';
import toast from 'react-hot-toast';

function AdminSettings() {
  const [settings, setSettings] = useState({
    // General Settings
    siteName: 'QuizMaster LMS',
    siteDescription: 'Online Quiz & Assessment Platform',
    siteLogo: '',
    favicon: '',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    defaultLanguage: 'en',
    allowedLanguages: ['en', 'es', 'fr', 'de', 'zh', 'ar'],

    // Quiz Settings
    passPercentage: 90,
    timerPerQuestion: 10,
    maxAttemptsPerQuiz: 3,
    autoSubmit: true,
    allowReview: true,
    showCorrectAnswers: true,
    showDetailedFeedback: true,
    allowRetakeAfterPass: false,
    questionPoolSize: 10,
    shuffleQuestions: true,
    shuffleOptions: true,
    timeoutWarning: 30,
    autoSaveInterval: 30,
    allowPause: true,
    resumeAfterTimeout: false,

    // Assessment & Grading
    gradingScale: 'percentage',
    passingGrade: 70,
    excellentGrade: 90,
    goodGrade: 75,
    averageGrade: 60,
    gradingSystem: 'points',
    pointsPerQuestion: 1,
    negativeMarking: false,
    negativeMarkValue: 0.25,
    partialCredits: true,

    // Student Management
    registrationOpen: true,
    requireEmailVerification: true,
    requirePhoneVerification: false,
    studentSelfRegistration: true,
    studentCanViewHistory: true,
    studentCanDownloadCertificate: true,
    allowGuestAccess: false,
    maxStudentsPerClass: 50,
    autoGenerateUsername: true,
    usernameFormat: 'firstname.lastname',

    // Email & Notifications
    emailNotifications: true,
    welcomeEmail: true,
    quizReminderEmail: true,
    resultEmail: true,
    certificateEmail: true,
    adminNotificationEmail: true,
    dailyReportEmail: true,
    weeklyReportEmail: true,
    monthlyReportEmail: true,
    emailSignature: 'Team QuizMaster',
    senderEmail: 'noreply@quizmaster.com',
    smtpHost: '',
    smtpPort: 587,
    smtpEncryption: 'tls',

    // Security
    twoFactorAuth: false,
    maintenanceMode: false,
    forcePasswordChange: false,
    passwordComplexity: 'medium',
    sessionTimeout: 60,
    maxLoginAttempts: 5,
    lockoutDuration: 30,
    requireCaptcha: true,
    ipWhitelist: '',
    ipBlacklist: '',
    sslEnabled: true,
    cookieSecure: true,
    rateLimit: 100,

    // Appearance
    darkMode: 'system',
    primaryColor: '#8b5cf6',
    secondaryColor: '#6366f1',
    accentColor: '#06b6d4',
    fontFamily: 'Inter',
    layoutStyle: 'modern',
    showBranding: true,
    showFooterLinks: true,
    customCSS: '',
    customJS: '',

    // Content Management
    allowContentCreation: true,
    requireContentApproval: true,
    enableTags: true,
    enableCategories: true,
    maxTagsPerQuiz: 5,
    contentModeration: 'manual',
    allowUserGeneratedContent: false,

    // Performance & Analytics
    enableAnalytics: true,
    trackUserBehavior: true,
    trackQuizAnalytics: true,
    enableHeatmaps: false,
    enableSessionRecording: false,
    dataRetentionPeriod: 365,
    anonymizeData: true,
    exportUserData: true,

    // Integrations
    enableAPI: true,
    enableWebhooks: false,
    enableSSO: false,
    ssoProvider: 'none',
    oAuthEnabled: false,
    oAuthProviders: [],
    enableLMSIntegration: false,
    lmsType: 'none',
    enableSlackIntegration: false,
    enableDiscordIntegration: false,
    enableZapierIntegration: false,
    webhookURL: '',
    apiRateLimit: 1000,

    // Certifications & Badges
    enableCertificates: true,
    certificateTemplate: 'standard',
    enableBadges: true,
    badgeCriteria: 'score',
    autoAwardBadges: true,
    enableLeaderboard: true,
    leaderboardScope: 'global',
    showTopPerformers: true,
    topPerformersCount: 10,

    // Payment & Monetization
    enablePayments: false,
    currency: 'USD',
    subscriptionModel: false,
    freeTrialDays: 0,
    paymentGateway: 'none',
    stripeAPIKey: '',
    paypalClientId: '',
    quizPrice: 0,
    bundleDiscount: 0,

    // Accessibility
    enableAccessibility: true,
    highContrastMode: false,
    fontSizeMultiplier: 1,
    screenReaderCompatible: true,
    keyboardNavigation: true,
    altTextRequired: true,

    // Advanced
    enableDebugMode: false,
    enableCache: true,
    cacheDuration: 3600,
    enableCDN: true,
    cdnURL: '',
    enableCompression: true,
    enableMinification: true,
    enableGZIP: true,
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Load saved settings on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('adminSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error('Error loading settings:', e);
      }
    }
  }, []);

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      localStorage.setItem('adminSettings', JSON.stringify(settings));
      setSaving(false);
      setSaved(true);
      toast.success('All settings saved successfully! ✅');
      setTimeout(() => setSaved(false), 3000);
    }, 800);
  };

  const handleReset = () => {
    const defaultSettings = {
      siteName: 'QuizMaster LMS',
      siteDescription: 'Online Quiz & Assessment Platform',
      siteLogo: '',
      favicon: '',
      timezone: 'UTC',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h',
      defaultLanguage: 'en',
      allowedLanguages: ['en', 'es', 'fr', 'de', 'zh', 'ar'],
      passPercentage: 90,
      timerPerQuestion: 10,
      maxAttemptsPerQuiz: 3,
      autoSubmit: true,
      allowReview: true,
      showCorrectAnswers: true,
      showDetailedFeedback: true,
      allowRetakeAfterPass: false,
      questionPoolSize: 10,
      shuffleQuestions: true,
      shuffleOptions: true,
      timeoutWarning: 30,
      autoSaveInterval: 30,
      allowPause: true,
      resumeAfterTimeout: false,
      gradingScale: 'percentage',
      passingGrade: 70,
      excellentGrade: 90,
      goodGrade: 75,
      averageGrade: 60,
      gradingSystem: 'points',
      pointsPerQuestion: 1,
      negativeMarking: false,
      negativeMarkValue: 0.25,
      partialCredits: true,
      registrationOpen: true,
      requireEmailVerification: true,
      requirePhoneVerification: false,
      studentSelfRegistration: true,
      studentCanViewHistory: true,
      studentCanDownloadCertificate: true,
      allowGuestAccess: false,
      maxStudentsPerClass: 50,
      autoGenerateUsername: true,
      usernameFormat: 'firstname.lastname',
      emailNotifications: true,
      welcomeEmail: true,
      quizReminderEmail: true,
      resultEmail: true,
      certificateEmail: true,
      adminNotificationEmail: true,
      dailyReportEmail: true,
      weeklyReportEmail: true,
      monthlyReportEmail: true,
      emailSignature: 'Team QuizMaster',
      senderEmail: 'noreply@quizmaster.com',
      smtpHost: '',
      smtpPort: 587,
      smtpEncryption: 'tls',
      twoFactorAuth: false,
      maintenanceMode: false,
      forcePasswordChange: false,
      passwordComplexity: 'medium',
      sessionTimeout: 60,
      maxLoginAttempts: 5,
      lockoutDuration: 30,
      requireCaptcha: true,
      ipWhitelist: '',
      ipBlacklist: '',
      sslEnabled: true,
      cookieSecure: true,
      rateLimit: 100,
      darkMode: 'system',
      primaryColor: '#8b5cf6',
      secondaryColor: '#6366f1',
      accentColor: '#06b6d4',
      fontFamily: 'Inter',
      layoutStyle: 'modern',
      showBranding: true,
      showFooterLinks: true,
      customCSS: '',
      customJS: '',
      allowContentCreation: true,
      requireContentApproval: true,
      enableTags: true,
      enableCategories: true,
      maxTagsPerQuiz: 5,
      contentModeration: 'manual',
      allowUserGeneratedContent: false,
      enableAnalytics: true,
      trackUserBehavior: true,
      trackQuizAnalytics: true,
      enableHeatmaps: false,
      enableSessionRecording: false,
      dataRetentionPeriod: 365,
      anonymizeData: true,
      exportUserData: true,
      enableAPI: true,
      enableWebhooks: false,
      enableSSO: false,
      ssoProvider: 'none',
      oAuthEnabled: false,
      oAuthProviders: [],
      enableLMSIntegration: false,
      lmsType: 'none',
      enableSlackIntegration: false,
      enableDiscordIntegration: false,
      enableZapierIntegration: false,
      webhookURL: '',
      apiRateLimit: 1000,
      enableCertificates: true,
      certificateTemplate: 'standard',
      enableBadges: true,
      badgeCriteria: 'score',
      autoAwardBadges: true,
      enableLeaderboard: true,
      leaderboardScope: 'global',
      showTopPerformers: true,
      topPerformersCount: 10,
      enablePayments: false,
      currency: 'USD',
      subscriptionModel: false,
      freeTrialDays: 0,
      paymentGateway: 'none',
      stripeAPIKey: '',
      paypalClientId: '',
      quizPrice: 0,
      bundleDiscount: 0,
      enableAccessibility: true,
      highContrastMode: false,
      fontSizeMultiplier: 1,
      screenReaderCompatible: true,
      keyboardNavigation: true,
      altTextRequired: true,
      enableDebugMode: false,
      enableCache: true,
      cacheDuration: 3600,
      enableCDN: true,
      cdnURL: '',
      enableCompression: true,
      enableMinification: true,
      enableGZIP: true,
    };
    setSettings(defaultSettings);
    toast.info('All settings reset to defaults');
  };

  const settingSections = [
    {
      id: 'general',
      title: 'General Settings',
      icon: FaCog,
      description: 'Basic platform configuration',
      fields: [
        { key: 'siteName', label: 'Site Name', type: 'text', placeholder: 'Enter site name', icon: FaGlobe },
        { key: 'siteDescription', label: 'Site Description', type: 'text', placeholder: 'Enter site description', icon: FaInfoCircle },
        { key: 'timezone', label: 'Timezone', type: 'select', options: ['UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo', 'Australia/Sydney'], icon: FaClock },
        { key: 'dateFormat', label: 'Date Format', type: 'select', options: ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'], icon: FaCalendarAlt },
        { key: 'timeFormat', label: 'Time Format', type: 'select', options: ['12h', '24h'], icon: FaClock },
        { key: 'defaultLanguage', label: 'Default Language', type: 'select', options: ['en', 'es', 'fr', 'de', 'zh', 'ar'], icon: FaLanguage },
      ],
    },
    {
      id: 'quiz',
      title: 'Quiz Settings',
      icon: FaDatabase,
      description: 'Configure quiz rules and behavior',
      fields: [
        { key: 'passPercentage', label: 'Pass Percentage', type: 'number', suffix: '%', min: 0, max: 100, icon: FaCheckCircle },
        { key: 'timerPerQuestion', label: 'Timer Per Question', type: 'number', suffix: 's', min: 5, max: 60, icon: FaStopwatch },
        { key: 'maxAttemptsPerQuiz', label: 'Max Attempts Per Quiz', type: 'number', min: 1, max: 10, icon: FaHourglassHalf },
        { key: 'timeoutWarning', label: 'Timeout Warning', type: 'number', suffix: 's', min: 5, max: 60, icon: FaBell },
        { key: 'autoSaveInterval', label: 'Auto Save Interval', type: 'number', suffix: 's', min: 10, max: 120, icon: FaSave },
        { key: 'questionPoolSize', label: 'Question Pool Size', type: 'number', min: 5, max: 50, icon: FaDatabase },
        { key: 'autoSubmit', label: 'Auto Submit on Timeout', type: 'checkbox', icon: FaRocket },
        { key: 'allowReview', label: 'Allow Review After Submission', type: 'checkbox', icon: FaEye },
        { key: 'showCorrectAnswers', label: 'Show Correct Answers', type: 'checkbox', icon: FaCheckCircle },
        { key: 'showDetailedFeedback', label: 'Show Detailed Feedback', type: 'checkbox', icon: FaInfoCircle },
        { key: 'allowRetakeAfterPass', label: 'Allow Retake After Passing', type: 'checkbox', icon: FaRedo },
        { key: 'shuffleQuestions', label: 'Shuffle Questions', type: 'checkbox', icon: FaRandom },
        { key: 'shuffleOptions', label: 'Shuffle Options', type: 'checkbox', icon: FaRandom },
        { key: 'allowPause', label: 'Allow Pausing Quiz', type: 'checkbox', icon: FaPause },
        { key: 'resumeAfterTimeout', label: 'Resume After Timeout', type: 'checkbox', icon: FaUndo },
      ],
    },
    {
      id: 'grading',
      title: 'Assessment & Grading',
      icon: FaChartLine,
      description: 'Configure grading rules and scales',
      fields: [
        { key: 'gradingScale', label: 'Grading Scale', type: 'select', options: ['percentage', 'letter', 'points', 'gpa'], icon: FaChartLine },
        { key: 'gradingSystem', label: 'Grading System', type: 'select', options: ['points', 'weighted', 'cumulative'], icon: FaPoll },
        { key: 'pointsPerQuestion', label: 'Points Per Question', type: 'number', min: 1, max: 10, icon: FaStar },
        { key: 'passingGrade', label: 'Passing Grade', type: 'number', suffix: '%', min: 0, max: 100, icon: FaCheckCircle },
        { key: 'excellentGrade', label: 'Excellent Grade Threshold', type: 'number', suffix: '%', min: 0, max: 100, icon: FaAward },
        { key: 'goodGrade', label: 'Good Grade Threshold', type: 'number', suffix: '%', min: 0, max: 100, icon: FaMedal },
        { key: 'averageGrade', label: 'Average Grade Threshold', type: 'number', suffix: '%', min: 0, max: 100, icon: FaChartLine },
        { key: 'negativeMarking', label: 'Enable Negative Marking', type: 'checkbox', icon: FaTimesCircle },
        { key: 'negativeMarkValue', label: 'Negative Mark Value', type: 'number', suffix: 'pts', min: 0, max: 1, step: 0.1, icon: FaMinus },
        { key: 'partialCredits', label: 'Enable Partial Credits', type: 'checkbox', icon: FaCheck },
      ],
    },
    {
      id: 'students',
      title: 'Student Management',
      icon: FaUsers,
      description: 'Configure student accounts and access',
      fields: [
        { key: 'registrationOpen', label: 'Open Registration', type: 'checkbox', icon: FaUserPlus },
        { key: 'studentSelfRegistration', label: 'Student Self-Registration', type: 'checkbox', icon: FaUserPlus },
        { key: 'requireEmailVerification', label: 'Require Email Verification', type: 'checkbox', icon: FaEnvelope },
        { key: 'requirePhoneVerification', label: 'Require Phone Verification', type: 'checkbox', icon: FaPhone },
        { key: 'studentCanViewHistory', label: 'Student Can View History', type: 'checkbox', icon: FaHistory },
        { key: 'studentCanDownloadCertificate', label: 'Student Can Download Certificate', type: 'checkbox', icon: FaCertificate },
        { key: 'allowGuestAccess', label: 'Allow Guest Access', type: 'checkbox', icon: FaUserSecret },
        { key: 'maxStudentsPerClass', label: 'Max Students Per Class', type: 'number', min: 10, max: 500, icon: FaUsers },
        { key: 'autoGenerateUsername', label: 'Auto Generate Username', type: 'checkbox', icon: FaUserCog },
        { key: 'usernameFormat', label: 'Username Format', type: 'select', options: ['firstname.lastname', 'firstname', 'email', 'custom'], icon: FaUserTie },
      ],
    },
    {
      id: 'email',
      title: 'Email & Notifications',
      icon: FaEnvelope,
      description: 'Configure email settings and notifications',
      fields: [
        { key: 'emailNotifications', label: 'Enable Email Notifications', type: 'checkbox', icon: FaBell },
        { key: 'welcomeEmail', label: 'Welcome Email', type: 'checkbox', icon: FaUserPlus },
        { key: 'quizReminderEmail', label: 'Quiz Reminder Email', type: 'checkbox', icon: FaBell },
        { key: 'resultEmail', label: 'Result Email', type: 'checkbox', icon: FaChartLine },
        { key: 'certificateEmail', label: 'Certificate Email', type: 'checkbox', icon: FaCertificate },
        { key: 'adminNotificationEmail', label: 'Admin Notification Email', type: 'checkbox', icon: FaUserShield },
        { key: 'dailyReportEmail', label: 'Daily Report Email', type: 'checkbox', icon: FaFileExport },
        { key: 'weeklyReportEmail', label: 'Weekly Report Email', type: 'checkbox', icon: FaFileExport },
        { key: 'monthlyReportEmail', label: 'Monthly Report Email', type: 'checkbox', icon: FaFileExport },
        { key: 'senderEmail', label: 'Sender Email', type: 'email', placeholder: 'noreply@example.com', icon: FaEnvelope },
        { key: 'emailSignature', label: 'Email Signature', type: 'text', placeholder: 'Team QuizMaster', icon: FaEdit },
        { key: 'smtpHost', label: 'SMTP Host', type: 'text', placeholder: 'smtp.example.com', icon: FaServer },
        { key: 'smtpPort', label: 'SMTP Port', type: 'number', min: 1, max: 65535, icon: FaPlug },
        { key: 'smtpEncryption', label: 'SMTP Encryption', type: 'select', options: ['none', 'tls', 'ssl'], icon: FaLock },
      ],
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      icon: FaLock,
      description: 'Manage security settings and compliance',
      fields: [
        { key: 'twoFactorAuth', label: 'Two-Factor Authentication', type: 'checkbox', icon: FaFingerprint },
        { key: 'maintenanceMode', label: 'Maintenance Mode', type: 'checkbox', icon: FaWrench },
        { key: 'forcePasswordChange', label: 'Force Password Change', type: 'checkbox', icon: FaKey },
        { key: 'passwordComplexity', label: 'Password Complexity', type: 'select', options: ['low', 'medium', 'high', 'very high'], icon: FaShieldAlt },
        { key: 'sessionTimeout', label: 'Session Timeout', type: 'number', suffix: 'min', min: 15, max: 480, icon: FaClock },
        { key: 'maxLoginAttempts', label: 'Max Login Attempts', type: 'number', min: 3, max: 10, icon: FaUserShield },
        { key: 'lockoutDuration', label: 'Lockout Duration', type: 'number', suffix: 'min', min: 5, max: 120, icon: FaLock },
        { key: 'requireCaptcha', label: 'Require CAPTCHA', type: 'checkbox', icon: FaShieldVirus },
        { key: 'rateLimit', label: 'API Rate Limit', type: 'number', suffix: 'req/min', min: 10, max: 1000, icon: FaServer },
        { key: 'sslEnabled', label: 'Force SSL/HTTPS', type: 'checkbox', icon: FaLock },
        { key: 'cookieSecure', label: 'Secure Cookies', type: 'checkbox', icon: FaCookie },
        { key: 'ipWhitelist', label: 'IP Whitelist', type: 'text', placeholder: 'Comma separated IPs', icon: FaUserShield },
        { key: 'ipBlacklist', label: 'IP Blacklist', type: 'text', placeholder: 'Comma separated IPs', icon: FaBan },
      ],
    },
    {
      id: 'appearance',
      title: 'Appearance',
      icon: FaPaintBrush,
      description: 'Customize the look and feel',
      fields: [
        { key: 'darkMode', label: 'Theme Preference', type: 'select', options: ['light', 'dark', 'system'], icon: FaPaintBrush },
        { key: 'primaryColor', label: 'Primary Color', type: 'color', icon: FaPaintBrush },
        { key: 'secondaryColor', label: 'Secondary Color', type: 'color', icon: FaPaintBrush },
        { key: 'accentColor', label: 'Accent Color', type: 'color', icon: FaPaintBrush },
        { key: 'fontFamily', label: 'Font Family', type: 'select', options: ['Inter', 'Roboto', 'Open Sans', 'Nunito', 'Poppins'], icon: FaFont },
        { key: 'layoutStyle', label: 'Layout Style', type: 'select', options: ['modern', 'classic', 'minimal', 'bold'], icon: FaDesktop },
        { key: 'showBranding', label: 'Show Branding', type: 'checkbox', icon: FaTag },
        { key: 'showFooterLinks', label: 'Show Footer Links', type: 'checkbox', icon: FaLink },
        { key: 'customCSS', label: 'Custom CSS', type: 'textarea', placeholder: '/* Add your custom CSS here */', icon: FaCode },
        { key: 'customJS', label: 'Custom JavaScript', type: 'textarea', placeholder: '// Add your custom JavaScript here', icon: FaCode },
      ],
    },
    {
      id: 'content',
      title: 'Content Management',
      icon: FaDatabase,
      description: 'Configure content creation and moderation',
      fields: [
        { key: 'allowContentCreation', label: 'Allow Content Creation', type: 'checkbox', icon: FaPlus },
        { key: 'requireContentApproval', label: 'Require Content Approval', type: 'checkbox', icon: FaCheckCircle },
        { key: 'enableTags', label: 'Enable Tags', type: 'checkbox', icon: FaTag },
        { key: 'enableCategories', label: 'Enable Categories', type: 'checkbox', icon: FaFolderOpen },
        { key: 'maxTagsPerQuiz', label: 'Max Tags Per Quiz', type: 'number', min: 1, max: 20, icon: FaTag },
        { key: 'contentModeration', label: 'Content Moderation', type: 'select', options: ['manual', 'semi-automatic', 'automatic'], icon: FaShieldAlt },
        { key: 'allowUserGeneratedContent', label: 'Allow User-Generated Content', type: 'checkbox', icon: FaUsers },
      ],
    },
    {
      id: 'analytics',
      title: 'Performance & Analytics',
      icon: FaChartLine,
      description: 'Configure analytics and tracking',
      fields: [
        { key: 'enableAnalytics', label: 'Enable Analytics', type: 'checkbox', icon: FaChartLine },
        { key: 'trackUserBehavior', label: 'Track User Behavior', type: 'checkbox', icon: FaUsers },
        { key: 'trackQuizAnalytics', label: 'Track Quiz Analytics', type: 'checkbox', icon: FaPoll },
        { key: 'enableHeatmaps', label: 'Enable Heatmaps', type: 'checkbox', icon: FaChartPie },
        { key: 'enableSessionRecording', label: 'Enable Session Recording', type: 'checkbox', icon: FaVideo },
        { key: 'dataRetentionPeriod', label: 'Data Retention Period', type: 'number', suffix: 'days', min: 30, max: 1095, icon: FaCalendarAlt },
        { key: 'anonymizeData', label: 'Anonymize User Data', type: 'checkbox', icon: FaUserSecret },
        { key: 'exportUserData', label: 'Allow User Data Export', type: 'checkbox', icon: FaFileExport },
      ],
    },
    {
      id: 'integrations',
      title: 'Integrations & API',
      icon: FaPlug,
      description: 'Configure third-party integrations',
      fields: [
        { key: 'enableAPI', label: 'Enable REST API', type: 'checkbox', icon: FaCode },
        { key: 'enableWebhooks', label: 'Enable Webhooks', type: 'checkbox', icon: FaLink },
        { key: 'enableSSO', label: 'Enable Single Sign-On (SSO)', type: 'checkbox', icon: FaUserShield },
        { key: 'ssoProvider', label: 'SSO Provider', type: 'select', options: ['none', 'google', 'facebook', 'github', 'microsoft', 'saml'], icon: FaUserShield },
        { key: 'oAuthEnabled', label: 'Enable OAuth', type: 'checkbox', icon: FaKey },
        { key: 'enableLMSIntegration', label: 'Enable LMS Integration', type: 'checkbox', icon: FaGraduationCap },
        { key: 'lmsType', label: 'LMS Type', type: 'select', options: ['none', 'moodle', 'canvas', 'blackboard', 'schoology'], icon: FaChalkboardTeacher },
        { key: 'enableSlackIntegration', label: 'Enable Slack Integration', type: 'checkbox', icon: FaSlack },
        { key: 'enableDiscordIntegration', label: 'Enable Discord Integration', type: 'checkbox', icon: FaDiscord },
        { key: 'enableZapierIntegration', label: 'Enable Zapier Integration', type: 'checkbox', icon: FaBolt },
        { key: 'webhookURL', label: 'Webhook URL', type: 'text', placeholder: 'https://example.com/webhook', icon: FaLink },
        { key: 'apiRateLimit', label: 'API Rate Limit', type: 'number', suffix: 'req/day', min: 100, max: 10000, icon: FaServer },
      ],
    },
    {
      id: 'certifications',
      title: 'Certifications & Badges',
      icon: FaCertificate,
      description: 'Configure certificates and achievement badges',
      fields: [
        { key: 'enableCertificates', label: 'Enable Certificates', type: 'checkbox', icon: FaCertificate },
        { key: 'certificateTemplate', label: 'Certificate Template', type: 'select', options: ['standard', 'premium', 'minimal', 'corporate'], icon: FaFileAlt },
        { key: 'enableBadges', label: 'Enable Achievement Badges', type: 'checkbox', icon: FaAward },
        { key: 'badgeCriteria', label: 'Badge Criteria', type: 'select', options: ['score', 'attempts', 'streak', 'completion'], icon: FaMedal },
        { key: 'autoAwardBadges', label: 'Auto-Award Badges', type: 'checkbox', icon: FaRocket },
        { key: 'enableLeaderboard', label: 'Enable Leaderboard', type: 'checkbox', icon: FaTrophy },
        { key: 'leaderboardScope', label: 'Leaderboard Scope', type: 'select', options: ['global', 'class', 'course', 'period'], icon: FaGlobe },
        { key: 'showTopPerformers', label: 'Show Top Performers', type: 'checkbox', icon: FaStar },
        { key: 'topPerformersCount', label: 'Top Performers Count', type: 'number', min: 3, max: 50, icon: FaUsers },
      ],
    },
    {
      id: 'payments',
      title: 'Payment & Monetization',
      icon: FaMoneyBillWave,
      description: 'Configure payment gateways and monetization',
      fields: [
        { key: 'enablePayments', label: 'Enable Payments', type: 'checkbox', icon: FaMoneyBillWave },
        { key: 'currency', label: 'Currency', type: 'select', options: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY'], icon: FaTag },
        { key: 'subscriptionModel', label: 'Enable Subscription Model', type: 'checkbox', icon: FaCalendarAlt },
        { key: 'freeTrialDays', label: 'Free Trial Days', type: 'number', min: 0, max: 90, icon: FaGift },
        { key: 'paymentGateway', label: 'Payment Gateway', type: 'select', options: ['none', 'stripe', 'paypal', 'square', 'razorpay'], icon: FaCreditCard },
        { key: 'quizPrice', label: 'Default Quiz Price', type: 'number', suffix: 'currency', min: 0, icon: FaTag },
        { key: 'bundleDiscount', label: 'Bundle Discount %', type: 'number', suffix: '%', min: 0, max: 100, icon: FaPercent },
      ],
    },
    {
      id: 'accessibility',
      title: 'Accessibility',
      icon: FaUserFriends,
      description: 'Configure accessibility features',
      fields: [
        { key: 'enableAccessibility', label: 'Enable Accessibility Features', type: 'checkbox', icon: FaUserFriends },
        { key: 'highContrastMode', label: 'High Contrast Mode', type: 'checkbox', icon: FaEye },
        { key: 'fontSizeMultiplier', label: 'Font Size Multiplier', type: 'number', suffix: 'x', min: 0.8, max: 2, step: 0.1, icon: FaFont },
        { key: 'screenReaderCompatible', label: 'Screen Reader Compatible', type: 'checkbox', icon: FaHeadphones },
        { key: 'keyboardNavigation', label: 'Keyboard Navigation', type: 'checkbox', icon: FaKeyboard },
        { key: 'altTextRequired', label: 'Require Alt Text for Images', type: 'checkbox', icon: FaImage },
      ],
    },
    {
      id: 'advanced',
      title: 'Advanced Settings',
      icon: FaCode,
      description: 'Performance and advanced configuration',
      fields: [
        { key: 'enableDebugMode', label: 'Enable Debug Mode', type: 'checkbox', icon: FaBug },
        { key: 'enableCache', label: 'Enable Cache', type: 'checkbox', icon: FaDatabase },
        { key: 'cacheDuration', label: 'Cache Duration', type: 'number', suffix: 's', min: 60, max: 86400, icon: FaClock },
        { key: 'enableCDN', label: 'Enable CDN', type: 'checkbox', icon: FaCloudUploadAlt },
        { key: 'cdnURL', label: 'CDN URL', type: 'text', placeholder: 'https://cdn.example.com', icon: FaLink },
        { key: 'enableCompression', label: 'Enable Compression', type: 'checkbox', icon: FaCompress },
        { key: 'enableMinification', label: 'Enable Minification', type: 'checkbox', icon: FaCode },
        { key: 'enableGZIP', label: 'Enable GZIP Compression', type: 'checkbox', icon: FaFileArchive },
      ],
    },
  ];

  // Filter sections based on search
  const filteredSections = settingSections.filter(section => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return section.title.toLowerCase().includes(searchLower) ||
           section.description.toLowerCase().includes(searchLower) ||
           section.fields.some(f => f.label.toLowerCase().includes(searchLower));
  });

  const getFieldIcon = (field) => {
    if (field.icon) {
      const Icon = field.icon;
      return <Icon className="text-gray-400 text-sm" />;
    }
    return null;
  };

  const getSectionProgress = (section) => {
    const total = section.fields.length;
    const filled = section.fields.filter(f => {
      const value = settings[f.key];
      return value !== '' && value !== null && value !== undefined;
    }).length;
    return Math.round((filled / total) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300/10 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300/10 dark:bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-300/5 dark:bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl blur-xl opacity-20 animate-pulse" />
            <div className="relative p-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-2xl shadow-purple-500/30">
              <FaCog className="text-white text-2xl animate-spin-slow" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
              Settings
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Configure your platform settings
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 flex-wrap"
        >
          <AnimatePresence>
            {saved && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-100/50 dark:bg-emerald-900/30 rounded-2xl border border-emerald-200/50 dark:border-emerald-700/30"
              >
                <FaCheckCircle className="text-emerald-500" />
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">All Saved</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="px-4 py-2.5 bg-gray-100/50 dark:bg-gray-700/50 hover:bg-gray-200/50 dark:hover:bg-gray-600/50 text-gray-700 dark:text-gray-300 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
          >
            <FaUndo className="text-gray-400" />
            Reset
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50"
          >
            {saving ? (
              <>
                <FaSpinner className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <FaSave />
                Save All Settings
              </>
            )}
          </motion.button>
        </motion.div>
      </div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className="relative max-w-md">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search settings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-400"
          />
        </div>
      </motion.div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSections.map((section, sectionIndex) => {
          const Icon = section.icon;
          const progress = getSectionProgress(section);
          
          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.05, duration: 0.4 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br from-purple-100/50 to-indigo-100/50 dark:from-purple-900/20 dark:to-indigo-900/20 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="text-purple-500 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {section.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {section.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 bg-gray-100/50 dark:bg-gray-700/50 rounded-full text-gray-500 dark:text-gray-400">
                      {section.fields.length} fields
                    </span>
                    <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Settings Fields - Fixed placeholder text for dark mode */}
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {section.fields.map((field) => (
                    <motion.div
                      key={field.key}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 }}
                      className="group/field"
                    >
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-2">
                        {getFieldIcon(field)}
                        {field.label}
                        {field.suffix && field.type !== 'checkbox' && (
                          <span className="text-xs text-gray-400 dark:text-gray-500">
                            ({field.suffix})
                          </span>
                        )}
                      </label>
                      
                      {field.type === 'checkbox' ? (
                        <button
                          onClick={() => handleChange(field.key, !settings[field.key])}
                          className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-all duration-300 group/btn"
                        >
                          <div className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                            settings[field.key] 
                              ? 'bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg shadow-purple-500/30' 
                              : 'bg-gray-300 dark:bg-gray-700'
                          }`}>
                            <motion.div
                              className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-all duration-300 ${
                                settings[field.key] ? 'right-0.5' : 'left-0.5'
                              }`}
                              animate={{ 
                                x: settings[field.key] ? 26 : 0 
                              }}
                            />
                          </div>
                          <span className={`text-sm font-medium transition-colors duration-300 ${
                            settings[field.key] 
                              ? 'text-purple-600 dark:text-purple-400' 
                              : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {settings[field.key] ? 'Enabled' : 'Disabled'}
                          </span>
                        </button>
                      ) : field.type === 'select' ? (
                        <div className="relative">
                          <select
                            value={settings[field.key]}
                            onChange={(e) => handleChange(field.key, e.target.value)}
                            className="w-full px-4 py-2.5 bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 appearance-none text-gray-800 dark:text-gray-200"
                          >
                            {field.options.map((opt) => (
                              <option key={opt} value={opt} className="text-gray-800 dark:text-gray-200">
                                {opt.charAt(0).toUpperCase() + opt.slice(1).replace(/_/g, ' ')}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <FaChevronDown className="text-gray-400" />
                          </div>
                        </div>
                      ) : field.type === 'color' ? (
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={settings[field.key]}
                            onChange={(e) => handleChange(field.key, e.target.value)}
                            className="w-12 h-10 rounded-xl cursor-pointer border border-gray-200/50 dark:border-gray-700/50 p-1 bg-white/50 dark:bg-gray-800/50"
                          />
                          <input
                            type="text"
                            value={settings[field.key]}
                            onChange={(e) => handleChange(field.key, e.target.value)}
                            className="flex-1 px-4 py-2.5 bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 font-mono text-gray-800 dark:text-gray-200"
                          />
                        </div>
                      ) : field.type === 'textarea' ? (
                        <textarea
                          value={settings[field.key]}
                          onChange={(e) => handleChange(field.key, e.target.value)}
                          rows={3}
                          placeholder={field.placeholder}
                          className="w-full px-4 py-2.5 bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 font-mono resize-none text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-400"
                        />
                      ) : (
                        <div className="relative">
                          <input
                            type={field.type}
                            value={settings[field.key]}
                            onChange={(e) => handleChange(field.key, field.type === 'number' ? Number(e.target.value) : e.target.value)}
                            min={field.min}
                            max={field.max}
                            step={field.step || 1}
                            placeholder={field.placeholder}
                            className="w-full px-4 py-2.5 bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-400"
                          />
                          {field.suffix && (
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 text-sm font-medium">
                              {field.suffix}
                            </span>
                          )}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50 flex justify-between items-center">
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {section.fields.length} setting{section.fields.length > 1 ? 's' : ''} • {progress}% complete
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    className="text-xs font-medium text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
                  >
                    <FaSave className="text-xs" />
                    Save Changes
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Help Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 p-6 bg-gradient-to-r from-purple-50/50 to-indigo-50/50 dark:from-purple-900/10 dark:to-indigo-900/10 rounded-2xl border border-purple-200/50 dark:border-purple-800/30"
      >
        <div className="flex flex-wrap items-start gap-4">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
            <FaQuestionCircle className="text-purple-500 text-xl" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">
              Platform Configuration Guide
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Settings are saved automatically to your browser. Changes will apply immediately.
              {settings.maintenanceMode && (
                <span className="block text-amber-500 mt-1">
                  ⚠️ Maintenance mode is enabled. Users may experience limited access.
                </span>
              )}
              {settings.allowGuestAccess && (
                <span className="block text-blue-500 mt-1">
                  ℹ️ Guest access is enabled. Non-registered users can view content.
                </span>
              )}
              {settings.registrationOpen && settings.studentSelfRegistration && (
                <span className="block text-emerald-500 mt-1">
                  ✅ Self-registration is open. New students can create accounts.
                </span>
              )}
              {settings.enablePayments && (
                <span className="block text-purple-500 mt-1">
                  💰 Payment system is active. Monetization features are enabled.
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {settingSections.length} sections
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {Object.keys(settings).length} total settings
            </span>
          </div>
        </div>
      </motion.div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #6366f1);
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}

export default AdminSettings;