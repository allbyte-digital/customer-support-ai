import { FAQ, SupportMetrics } from '../types';

export const faqData: FAQ[] = [
  {
    id: '1',
    category: 'Account',
    question: 'How do I reset my password?',
    answer: 'To reset your password: 1) Go to the login page, 2) Click "Forgot Password", 3) Enter your email address, 4) Check your email for reset instructions, 5) Follow the link to create a new password.',
    tags: ['password', 'account', 'login']
  },
  {
    id: '2',
    category: 'Billing',
    question: 'When will I be charged?',
    answer: 'You will be charged on the same date each month as your initial subscription. For example, if you subscribed on the 15th, you\'ll be charged on the 15th of each month.',
    tags: ['billing', 'subscription', 'payment']
  },
  {
    id: '3',
    category: 'Orders',
    question: 'How can I track my order?',
    answer: 'You can track your order by: 1) Logging into your account, 2) Going to "My Orders", 3) Clicking on the order number, 4) Viewing the tracking information and estimated delivery date.',
    tags: ['orders', 'shipping', 'tracking']
  },
  {
    id: '4',
    category: 'Technical',
    question: 'The app is running slowly. What should I do?',
    answer: 'Try these troubleshooting steps: 1) Clear your browser cache, 2) Disable browser extensions, 3) Check your internet connection, 4) Try using a different browser, 5) Restart your device if the issue persists.',
    tags: ['technical', 'performance', 'troubleshooting']
  },
  {
    id: '5',
    category: 'Returns',
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy. Items must be unused and in original packaging. To initiate a return: 1) Contact customer support, 2) Receive return authorization, 3) Ship item back using provided label, 4) Refund processed within 5-7 business days.',
    tags: ['returns', 'refund', 'policy']
  }
];

export const supportMetrics: SupportMetrics = {
  totalQueries: 1247,
  resolvedQueries: 1184,
  averageResponseTime: 2.3,
  customerSatisfactionRate: 94.8,
  escalationRate: 5.1
};

export const commonResponses = {
  greeting: "Hello! I'm here to help you with any questions or concerns you may have. How can I assist you today?",
  orderStatus: "I'd be happy to help you check your order status. Could you please provide your order number so I can look that up for you?",
  technicalIssue: "I understand you're experiencing a technical issue. Let me help you troubleshoot this step by step. Can you describe what's happening in more detail?",
  billing: "I can help you with billing questions. For your security, I'll need to verify some information. Could you please provide the email address associated with your account?",
  escalation: "I understand this situation requires additional attention. I'm escalating your case to one of our specialist agents who will contact you within 2 hours. Is there anything else I can help you with in the meantime?"
};