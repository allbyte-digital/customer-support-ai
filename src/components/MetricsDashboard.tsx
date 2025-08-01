import React from 'react';
import { BarChart3, TrendingUp, Clock, Users, AlertCircle, CheckCircle } from 'lucide-react';
import { SupportMetrics } from '../types';

interface MetricsDashboardProps {
  metrics: SupportMetrics;
}

export const MetricsDashboard: React.FC<MetricsDashboardProps> = ({ metrics }) => {
  const accuracyRate = (metrics.resolvedQueries / metrics.totalQueries) * 100;

  const metricCards = [
    {
      icon: Users,
      title: 'Total Queries',
      value: metrics.totalQueries.toLocaleString(),
      color: 'bg-blue-100 text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: CheckCircle,
      title: 'Resolution Rate',
      value: `${accuracyRate.toFixed(1)}%`,
      color: 'bg-green-100 text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Clock,
      title: 'Avg Response Time',
      value: `${metrics.averageResponseTime}s`,
      color: 'bg-purple-100 text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: TrendingUp,
      title: 'Satisfaction Rate',
      value: `${metrics.customerSatisfactionRate}%`,
      color: 'bg-emerald-100 text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      icon: AlertCircle,
      title: 'Escalation Rate',
      value: `${metrics.escalationRate}%`,
      color: 'bg-orange-100 text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <BarChart3 className="text-blue-600" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Performance Metrics</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {metricCards.map((card, index) => (
          <div key={index} className={`${card.bgColor} p-4 rounded-lg border`}>
            <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center mb-3`}>
              <card.icon size={24} />
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{card.title}</h3>
            <p className="text-2xl font-bold text-gray-800">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Performance Indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-3">Resolution Accuracy</h3>
          <div className="flex items-center space-x-3">
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div 
                className="bg-green-500 h-3 rounded-full transition-all duration-500" 
                style={{ width: `${accuracyRate}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-700">{accuracyRate.toFixed(1)}%</span>
          </div>
          <p className="text-xs text-gray-600 mt-2">Target: 95%</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-3">Customer Satisfaction</h3>
          <div className="flex items-center space-x-3">
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div 
                className="bg-emerald-500 h-3 rounded-full transition-all duration-500" 
                style={{ width: `${metrics.customerSatisfactionRate}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-700">{metrics.customerSatisfactionRate}%</span>
          </div>
          <p className="text-xs text-gray-600 mt-2">Target: 90%</p>
        </div>
      </div>

      {/* Status Summary */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">System Status</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">AI Assistant: Online</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">Knowledge Base: Updated</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-700">Escalation Queue: {Math.round(metrics.escalationRate)}% active</span>
          </div>
        </div>
      </div>
    </div>
  );
};