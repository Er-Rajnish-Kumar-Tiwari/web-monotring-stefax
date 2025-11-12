import React, { useEffect, useState } from "react";
import axios from "axios";

// --- Inline SVG Icons ---
const DomainIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 2a14.5 14.5 0 0 0 0 20M2 12h20"></path>
  </svg>
);

const WarningIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 17a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM12 13V9a1 1 0 0 1 2 0v4a1 1 0 0 1-2 0z" />
  </svg>
);

// --- Badges ---
const SeverityBadge = ({ severity }) => {
  const colorMap = {
    HIGH: "bg-pink-700 text-pink-100",
    MEDIUM: "bg-yellow-700 text-yellow-100",
    LOW: "bg-green-700 text-green-100",
  };
  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${colorMap[severity] || "bg-gray-700 text-gray-200"}`}>
      ⚠ {severity}
    </span>
  );
};

const StatusBadge = ({ status }) => {
  const colorMap = {
    OPEN: "bg-red-800 text-red-200",
    RESOLVED: "bg-green-800 text-green-200",
  };
  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${colorMap[status]}`}>
      {status}
    </span>
  );
};

// --- Incident Row ---
const IncidentRow = ({ incident, onResolve }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-[#102A43] text-gray-200 border border-blue-700/30 rounded-xl p-4 hover:border-pink-500/40 transition-all">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <DomainIcon className="h-5 w-5 text-pink-400" />
          <span className="font-semibold text-white">{incident.targetValue}</span>
        </div>

        <div className="flex items-center gap-3">
          <SeverityBadge severity={incident.severity || "HIGH"} />
          <StatusBadge status={incident.status ? "OPEN" : "RESOLVED"} />
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="px-3 py-1 rounded-md bg-blue-700 hover:bg-blue-600 text-sm"
          >
            {showDetails ? "Hide Details" : "View Details"}
          </button>
          {incident.status && (
            <button
              onClick={() => onResolve(incident._id)}
              className="px-3 py-1 rounded-md bg-green-700 hover:bg-green-600 text-sm"
            >
              Resolve
            </button>
          )}
        </div>
      </div>

      {/* Expanded details */}
      {showDetails && (
        <div className="mt-4 border-t border-blue-800 pt-3 text-sm text-gray-300 space-y-2">
          <p><strong>Breach Source:</strong> {incident.breachData?.Name || "Unknown"}</p>
          <p><strong>Description:</strong> {incident.breachData?.Description || "No description available"}</p>
          <p><strong>Detected On:</strong> {new Date(incident.detectedAt).toLocaleDateString("en-IN")}</p>
          <p>
            <strong>More Info:</strong>{" "}
            <a
              href={incident.breachData?.DisclosureUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              View Source
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

// --- Main Component ---
const IncidentManagement = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const res = await axios.get(
          "http://195.35.21.108:7001/auth/api/v1/dark-web-monitoring/incidents?userId=6911e77cf1fe8011a0dcc486"
        );
        if (res.data.success) setIncidents(res.data.data);
      } catch (err) {
        console.error("Error fetching incidents:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchIncidents();
  }, []);

  const handleResolve = (id) => {
    setIncidents((prev) =>
      prev.map((inc) =>
        inc._id === id ? { ...inc, status: false } : inc
      )
    );
  };

  const filteredIncidents = incidents.filter((i) => {
    if (filter === "All") return true;
    if (filter === "Open") return i.status === true;
    if (filter === "Resolved") return i.status === false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0b203a] text-white px-6 py-10 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Incident Management</h2>
          <div className="flex space-x-3">
            {["All", "Open", "Resolved"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-1 rounded-lg font-medium text-sm ${
                  filter === tab
                    ? "bg-pink-600 text-white"
                    : "bg-blue-900 text-gray-300 hover:bg-blue-800"
                }`}
              >
                {tab} ({tab === "All"
                  ? incidents.length
                  : incidents.filter((i) =>
                      tab === "Open" ? i.status : !i.status
                    ).length})
              </button>
            ))}
          </div>
        </div>

        {/* Loading / Empty / Table */}
        {loading ? (
          <div className="text-gray-400 text-center py-10">Loading incidents...</div>
        ) : filteredIncidents.length === 0 ? (
          <div className="text-gray-400 text-center py-10">No incidents found.</div>
        ) : (
          <div className="space-y-4">
            {filteredIncidents.map((incident) => (
              <IncidentRow
                key={incident._id}
                incident={incident}
                onResolve={handleResolve}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default IncidentManagement;
