import React, { useEffect, useState } from "react";
import axios from "axios";

// --- SVG Icon ---
const DomainIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 2a14.5 14.5 0 0 0 0 20M2 12h20"></path>
  </svg>
);

// --- Severity Badge ---
const SeverityBadge = ({ severity }) => {
  const colorMap = {
    HIGH: "bg-pink-800 text-pink-200",
    MEDIUM: "bg-yellow-700 text-yellow-100",
    LOW: "bg-green-700 text-green-100",
  };
  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full ${
        colorMap[severity] || "bg-gray-700 text-gray-200"
      }`}
    >
      {severity}
    </span>
  );
};

// --- Status Badge ---
const StatusBadge = ({ status }) => {
  const colorMap = {
    OPEN: "bg-pink-800 text-pink-200",
    RESOLVED: "bg-pink-900 text-pink-300",
  };
  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full ${
        colorMap[status] || "bg-gray-700 text-gray-300"
      }`}
    >
      {status}
    </span>
  );
};

// --- Details Modal (All merged incidents) ---
const DetailsModal = ({ group, onClose }) => {
  if (!group) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#0f2747] text-gray-100 w-full max-w-3xl rounded-2xl shadow-2xl border border-blue-800/40 overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-blue-800/40">
          <div>
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <svg
                className="w-5 h-5 text-pink-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                />
              </svg>
              Incident Group:{" "}
              <span className="text-blue-300">{group.targetValue}</span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-pink-500 transition text-xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[80vh]">
          {group.incidents.map((incident, index) => (
            <div
              key={incident._id + index}
              className="bg-[#132c52] border border-blue-800/40 rounded-xl p-4 space-y-3"
            >
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-blue-300">
                  {incident.breachData?.Name}
                </h4>
                <div className="flex items-center space-x-2">
                <SeverityBadge severity={incident.severity || "HIGH"} />
                <StatusBadge
                  status={incident.status ? "OPEN" : "RESOLVED"}
                />
                </div>
              </div>

              <div className="text-sm text-gray-300">
                <p>
                  <strong>Incident ID:</strong> {incident.incidentId}
                </p>
                <p>
                  <strong>Detected:</strong>{" "}
                  {new Date(incident.detectedAt).toLocaleString("en-IN")}
                </p>
                <p>
                  <strong>Source:</strong>{" "}
                  {incident.breachData?.Name || "Unknown"}
                </p>
              </div>

              {incident.breachData?.Description && (
                <p
                  className="text-gray-200 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: incident.breachData.Description,
                  }}
                />
              )}

              {incident.breachData?.DataClasses?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {incident.breachData.DataClasses.map((item, i) => (
                    <span
                      key={i}
                      className="bg-blue-900/60 border border-blue-800/40 px-3 py-1 text-xs rounded-full text-gray-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-blue-800/40 text-right">
          <button
            onClick={onClose}
            className="bg-pink-600 hover:bg-pink-500 px-5 py-2 rounded-md font-medium text-white transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---
const IncidentManagement = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const res = await axios.get(
          "http://195.35.21.108:7001/auth/api/v1/dark-web-monitoring/incidents?userId=6911e77cf1fe8011a0dcc486"
        );
        if (res.data.success) {
          // --- Group by domain/email ---
          const grouped = Object.values(
            res.data.data.reduce((acc, inc) => {
              const key = inc.targetValue;
              if (!acc[key]) acc[key] = { targetValue: key, incidents: [] };
              acc[key].incidents.push(inc); // include duplicates here
              return acc;
            }, {})
          );
          setIncidents(grouped);
        }
      } catch (err) {
        console.error("Error fetching incidents:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchIncidents();
  }, []);

  const handleResolve = (targetValue) => {
    setIncidents((prev) =>
      prev.map((group) =>
        group.targetValue === targetValue
          ? {
              ...group,
              incidents: group.incidents.map((inc) => ({
                ...inc,
                status: false,
              })),
            }
          : group
      )
    );
  };

  const filteredGroups = incidents.filter((group) => {
    if (filter === "All") return true;
    if (filter === "Open")
      return group.incidents.some((i) => i.status === true);
    if (filter === "Resolved")
      return group.incidents.every((i) => i.status === false);
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0b203a] text-white px-6 py-10 font-sans">
      <div className="max-w-8xl mx-auto bg-[#0b203a] p-5 border border-blue-800 rounded-2xl shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">
            <span className="text-pink-600 mr-3">⚠ </span>Incident Management
          </h2>
          <div className="flex space-x-3">
            {["All", "Open", "Resolved"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-1 rounded-lg font-medium text-sm ${
                  filter === tab
                    ? "bg-pink-600 text-white"
                    : "bg-blue-900 text-gray-300 hover:bg-purple-800"
                }`}
              >
                {tab} (
                {tab === "All"
                  ? incidents.length
                  : incidents.filter((group) =>
                      tab === "Open"
                        ? group.incidents.some((i) => i.status)
                        : group.incidents.every((i) => !i.status)
                    ).length}
                )
              </button>
            ))}
          </div>
        </div>

        {/* Loading / Empty / Table */}
        {loading ? (
          <div className="text-gray-400 text-center py-10">
            Loading incidents...
          </div>
        ) : filteredGroups.length === 0 ? (
          <div className="text-gray-400 text-center py-10">
            No incidents found.
          </div>
        ) : (
          <div className="overflow-x-auto border border-blue-800 rounded-xl">
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="bg-blue-900/40 text-gray-200 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">Incident ID</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Target</th>
                  <th className="px-6 py-3">Sources</th>
                  <th className="px-6 py-3">Detected</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Severity</th>
                  <th className="px-6 py-3 pl-24">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredGroups.map((group) => {
                  const allIds = [
                    ...new Set(group.incidents.map((i) => i.incidentId)),
                  ].join(", ");
                  const allSources = [
                    ...new Set(
                      group.incidents.map((i) => i.breachData?.Name || "Unknown")
                    ),
                  ].join(", ");
                  const allDetected = [
                    ...new Set(
                      group.incidents.map((i) =>
                        new Date(i.detectedAt).toLocaleDateString("en-IN")
                      )
                    ),
                  ].join(", ");
                  const anyOpen = group.incidents.some((i) => i.status);

                  return (
                    <tr
                      key={group.targetValue}
                      className="border-t border-blue-800 hover:bg-blue-900/20 transition-all"
                    >
                      <td className="px-6 py-4">{allIds}</td>
                      <td className="px-6 py-4">
                        {group.incidents[0].targetType}
                      </td>
                      <td className="px-6 py-4 flex items-center mt-5 gap-2 font-semibold text-white">
                        <DomainIcon className="h-4 w-4 text-pink-400" />{" "}
                        {group.targetValue}
                      </td>
                      <td className="px-6 py-4">{allSources}</td>
                      <td className="px-6 py-4">{allDetected}</td>
                      <td className="px-6 py-4">
                        <StatusBadge
                          status={anyOpen ? "OPEN" : "RESOLVED"}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <SeverityBadge severity="HIGH" />
                      </td>
                      <td className="px-6 py-4 space-x-2">
                        <button
                          onClick={() => setSelectedGroup(group)}
                          className="bg-gray-800 hover:bg-purple-800 px-3 py-1 rounded-md text-sm mb-4"
                        >
                          View Details
                        </button>
                        {anyOpen && (
                          <button
                            onClick={() => handleResolve(group.targetValue)}
                            className="bg-gray-800 hover:bg-purple-800 px-3 py-1 rounded-md text-sm"
                          >
                            Resolve All
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Popup Modal */}
      {selectedGroup && (
        <DetailsModal
          group={selectedGroup}
          onClose={() => setSelectedGroup(null)}
        />
      )}
    </div>
  );
};

export default IncidentManagement;
