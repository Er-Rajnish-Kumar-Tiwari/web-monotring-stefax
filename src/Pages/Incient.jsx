import React from 'react';

// --- Inline SVG Icons (Reliable replacements for react-icons) ---

// Logo Icon (Hexagon/Diamond)
const DiamondIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 12l10 10 10-10L12 2zM12 5.17l5.83 5.83L12 18.83 6.17 11z"/>
  </svg>
);

// Monitoring/Refresh Icon
const RefreshIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.55 16.27a8.77 8.77 0 0 0 11.23.63"/><path d="M20.45 7.73a8.77 8.77 0 0 0-11.23-.63"/>
  </svg>
);

// Domain Icon (Globe)
const DomainIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20M2 12h20"></path>
  </svg>
);

// Email Icon (Mail)
const EmailIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

// Alert/Warning Icon (Triangle with Exclamation)
const WarningIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 17a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM12 13V9a1 1 0 0 1 2 0v4a1 1 0 0 1-2 0z"/>
  </svg>
);

// Calendar Icon
const CalendarIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

// --- Dummy Data ---
const incidentsData = [
  {
    id: 1,
    type: 'domain',
    title: 'example.com',
    description: 'Domain credentials found on paste site',
    detectedDate: '1/15/2024',
    severity: 'HIGH',
    status: 'OPEN'
  },
  {
    id: 2,
    type: 'email',
    title: 'user@company.com',
    description: 'Email associated with recent data breach',
    detectedDate: '1/14/2024',
    severity: 'MEDIUM',
    status: 'INVESTIGATING'
  },
  {
    id: 3,
    type: 'email',
    title: 'admin@company.com',
    description: 'Admin credentials compromised in marketplace',
    detectedDate: '1/13/2024',
    severity: 'HIGH',
    status: 'OPEN'
  },
];

// --- Custom Components ---

// Incident Severity Badge
const SeverityBadge = ({ severity }) => {
  let colorClass = '';
  switch (severity) {
    case 'HIGH':
      colorClass = 'bg-red-600 text-red-100';
      break;
    case 'MEDIUM':
      colorClass = 'bg-pink-600 text-pink-100';
      break;
    case 'LOW':
      colorClass = 'bg-green-600 text-green-100';
      break;
    default:
      colorClass = 'bg-gray-600 text-gray-100';
  }
  return (
    <span className={`px-2 py-0.5 text-xs font-semibold rounded ${colorClass}`}>
      {severity}
    </span>
  );
};

// Incident Status Badge
const StatusBadge = ({ status }) => {
  let colorClass = '';
  switch (status) {
    case 'OPEN':
      colorClass = 'bg-red-900/50 text-red-300 border border-red-500/50';
      break;
    case 'INVESTIGATING':
      colorClass = 'bg-purple-900/50 text-purple-300 border border-purple-500/50';
      break;
    case 'RESOLVED':
      colorClass = 'bg-green-900/50 text-green-300 border border-green-500/50';
      break;
    default:
      colorClass = 'bg-gray-900/50 text-gray-300 border border-gray-500/50';
  }
  return (
    <span className={`px-2 py-0.5 text-xs font-semibold rounded ${colorClass}`}>
      {status}
    </span>
  );
};


// Single Incident Card
const IncidentCard = ({ incident }) => {
  const IconComponent = incident.type === 'domain' ? DomainIcon : EmailIcon;

  return (
    <div className="bg-[#1e3a63] p-6 rounded-xl shadow-xl border border-blue-700/50 flex justify-between items-center transition-all duration-300 hover:border-pink-500/50">
      
      {/* Incident Details Left Side */}
      <div className="flex items-start space-x-4 flex-grow">
        
        {/* Warning Icon Container */}
        <div className="p-2 mt-1 rounded-full bg-red-800/30 text-red-400">
          <WarningIcon className="h-5 w-5" />
        </div>

        {/* Text Content */}
        <div>
          <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
            <IconComponent className="h-5 w-5 text-pink-400" />
            <span>{incident.title}</span>
          </h3>
          <p className="text-sm text-gray-300 mt-1">{incident.description}</p>
          
          <div className="flex items-center space-x-2 text-sm text-gray-400 mt-3">
            <CalendarIcon className="h-4 w-4" />
            <span>Detected: {incident.detectedDate}</span>
          </div>
        </div>
      </div>

      {/* Status and Action Right Side */}
      <div className="flex flex-col items-end space-y-3">
        <div className="flex space-x-2">
          <SeverityBadge severity={incident.severity} />
          <StatusBadge status={incident.status} />
        </div>
        
        <button className="px-4 py-2 text-sm font-medium rounded-lg text-white transition-colors duration-200
                           bg-blue-700 hover:bg-blue-600 flex items-center space-x-2">
          <span>View Details</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </button>
      </div>

    </div>
  );
};


// --- Main Application Component (Combines Header, Incidents List, and Footer) ---
const Icients = () => {
  const activeIncidentsCount = incidentsData.filter(i => i.status !== 'RESOLVED').length;
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-[#0b203a] flex flex-col font-sans">
      
      {/* 2. Main Incidents List Content Area */}
      <main className="flex-grow flex flex-col items-center pt-10 pb-20 px-4">
        
        <div className="max-w-7xl w-full mx-auto">
          
          {/* Dashboard Header (Image 8547b9.jpg top section) */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">Security Incidents</h2>
            <p className="text-base text-gray-500 font-medium">
              {activeIncidentsCount} active incidents
            </p>
          </div>

          {/* Incidents List */}
          <div className="space-y-4">
            {incidentsData.map(incident => (
              <IncidentCard key={incident.id} incident={incident} />
            ))}
          </div>

        </div>
      </main>

      
    </div>
  );
};

export default Icients;