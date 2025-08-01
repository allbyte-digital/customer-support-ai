import React, { useState } from 'react';
import { AlertTriangle, Clock, User, ArrowUp, CheckCircle, XCircle } from 'lucide-react';
import { Ticket } from '../types';

interface EscalationPanelProps {
  escalatedTickets: Ticket[];
  onResolveTicket: (ticketId: string) => void;
}

export const EscalationPanel: React.FC<EscalationPanelProps> = ({ 
  escalatedTickets, 
  onResolveTicket 
}) => {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'escalated': return 'text-red-600 bg-red-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <AlertTriangle className="text-orange-600" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Escalation Management</h2>
      </div>

      {escalatedTickets.length === 0 ? (
        <div className="text-center py-12">
          <CheckCircle className="mx-auto mb-4 text-green-500" size={64} />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">All Clear!</h3>
          <p className="text-gray-600">No tickets currently require escalation.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {escalatedTickets.map(ticket => (
            <div key={ticket.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-gray-800">{ticket.subject}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                      {ticket.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <User size={16} />
                      <span>Customer ID: {ticket.customerId}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={16} />
                      <span>Created: {ticket.createdAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedTicket(selectedTicket === ticket.id ? null : ticket.id)}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors duration-200"
                  >
                    {selectedTicket === ticket.id ? 'Hide Details' : 'View Details'}
                  </button>
                  {ticket.status !== 'resolved' && (
                    <button
                      onClick={() => onResolveTicket(ticket.id)}
                      className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors duration-200"
                    >
                      Mark Resolved
                    </button>
                  )}
                </div>
              </div>

              {selectedTicket === ticket.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-gray-800 mb-3">Conversation History</h4>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {ticket.messages.map(message => (
                      <div key={message.id} className={`p-3 rounded-lg ${
                        message.type === 'user' ? 'bg-blue-50 ml-4' : 'bg-gray-50 mr-4'
                      }`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-800">
                            {message.type === 'user' ? 'Customer' : 'Assistant'}
                          </span>
                          <span className="text-xs text-gray-500">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{message.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};