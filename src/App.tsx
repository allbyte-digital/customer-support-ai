import React, { useState } from 'react';
import { MessageCircle, Book, AlertTriangle, BarChart3, Headphones } from 'lucide-react';
import { ChatInterface } from './components/ChatInterface';
import { KnowledgeBase } from './components/KnowledgeBase';
import { EscalationPanel } from './components/EscalationPanel';
import { MetricsDashboard } from './components/MetricsDashboard';
import { Ticket, Message } from './types';
import { supportMetrics } from './data/mockData';

function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const [escalatedTickets, setEscalatedTickets] = useState<Ticket[]>([]);

  const handleEscalation = (reason: string) => {
    const newTicket: Ticket = {
      id: `ticket-${Date.now()}`,
      customerId: `customer-${Math.floor(Math.random() * 1000)}`,
      subject: reason,
      priority: 'high',
      status: 'escalated',
      messages: [
        {
          id: '1',
          type: 'system',
          content: `Ticket escalated: ${reason}`,
          timestamp: new Date()
        }
      ],
      createdAt: new Date()
    };

    setEscalatedTickets(prev => [...prev, newTicket]);
    setActiveTab('escalation');
  };

  const handleResolveTicket = (ticketId: string) => {
    setEscalatedTickets(prev => 
      prev.map(ticket => 
        ticket.id === ticketId 
          ? { ...ticket, status: 'resolved', resolvedAt: new Date() }
          : ticket
      )
    );
  };

  const tabs = [
    { id: 'chat', label: 'Live Chat', icon: MessageCircle },
    { id: 'knowledge', label: 'Knowledge Base', icon: Book },
    { id: 'escalation', label: 'Escalations', icon: AlertTriangle },
    { id: 'metrics', label: 'Metrics', icon: BarChart3 }
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatInterface onEscalate={handleEscalation} />;
      case 'knowledge':
        return <KnowledgeBase />;
      case 'escalation':
        return <EscalationPanel escalatedTickets={escalatedTickets} onResolveTicket={handleResolveTicket} />;
      case 'metrics':
        return <MetricsDashboard metrics={supportMetrics} />;
      default:
        return <ChatInterface onEscalate={handleEscalation} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Headphones className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Customer Support AI</h1>
                <p className="text-sm text-gray-600">Intelligent 24/7 Customer Service</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Online</span>
              </div>
              <div className="text-sm text-gray-600">
                Accuracy: <span className="font-semibold text-green-600">95.1%</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon size={18} />
                <span>{tab.label}</span>
                {tab.id === 'escalation' && escalatedTickets.filter(t => t.status === 'escalated').length > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {escalatedTickets.filter(t => t.status === 'escalated').length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-[calc(100vh-200px)]">
          {renderActiveTab()}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <p>© 2025 Customer Support AI. Powered by advanced AI technology.</p>
            <div className="flex items-center space-x-4">
              <span>Response Time: &lt;3 seconds</span>
              <span>Uptime: 99.9%</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;