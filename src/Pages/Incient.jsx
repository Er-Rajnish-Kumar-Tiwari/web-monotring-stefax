import React, { useEffect, useState } from "react";
import axios from "axios";
const userId = "6911e77cf1fe8011a0dcc486";

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

// --- Details Modal ---
const DetailsModal = ({ group, onClose }) => {
  if (!group) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#0f2747] text-gray-100 w-full max-w-3xl rounded-2xl shadow-2xl border border-blue-800/40 overflow-hidden">
        <div className="flex items-start justify-between p-6 border-b border-blue-800/40">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            Incident ID:{" "}
            <span className="text-blue-300">{group.incidentId}</span>
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-pink-500 transition text-xl"
          >
            ✕
          </button>
        </div>

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
                  <StatusBadge status={incident.incidentStatus} />
                </div>
              </div>

              <div className="text-sm text-gray-300">
                <p>
                  <strong>Target:</strong> {incident.targetValue}
                </p>
                <p>
                  <strong>Type:</strong> {incident.targetType}
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

// --- MAIN COMPONENT ---
const IncidentManagement = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const res = await axios.get(
          `http://195.35.21.108:7001/auth/api/v1/dark-web-monitoring/incidents?userId=${userId}`
        );

        if (res.data.success) {
          // --- GROUP BY incidentId (NEW) ---
          const grouped = Object.values(
            res.data.data.reduce((acc, inc) => {
              const key = inc.incidentId; // ONLY incidentId
              if (!acc[key])
                acc[key] = {
                  incidentId: key,
                  incidents: [],
                };
              acc[key].incidents.push(inc);
              return acc;
            }, {})
          );

          setIncidents(grouped);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchIncidents();
  }, []);

  // Resolve handler
  // Resolve handler USING API CALL
  const handleResolve = async (group) => {
    try {
      // group ke pehle incident ka targetValue + targetType lenge
      const { targetValue, targetType } = group.incidents[0];

      const payload = {
        targetValue,
        targetType,
      };

      await axios.post(
        "http://195.35.21.108:7001/auth/api/v1/dark-web-monitoring/incidents/resolve-by-target",
        payload
      );

      // UI update after API success
      setIncidents((prev) =>
        prev.map((g) =>
          g.incidentId === group.incidentId
            ? {
                ...g,
                incidents: g.incidents.map((inc) => ({
                  ...inc,
                  incidentStatus: "resolved",
                })),
              }
            : g
        )
      );
    } catch (error) {
      console.error("Resolve API Error:", error);
    }
  };

  // Tab filter logic
  const filteredGroups = incidents.filter((group) => {
    if (filter === "All") return true;
    if (filter === "Open")
      return group.incidents.some((x) => x.incidentStatus === "open");
    if (filter === "Resolved")
      return group.incidents.every((x) => x.incidentStatus === "resolved");
    return true;
  });

  const capitalizeFirst = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

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
                    ? "bg-pink-600"
                    : "bg-blue-900 hover:bg-purple-800"
                }`}
              >
                {tab} (
                {
                  incidents.filter((g) =>
                    tab === "All"
                      ? true
                      : tab === "Open"
                      ? g.incidents.some((i) => i.incidentStatus === "open")
                      : g.incidents.every(
                          (i) => i.incidentStatus === "resolved"
                        )
                  ).length
                }
                )
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
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
                  const allTargets = [
                    ...new Set(group.incidents.map((i) => i.targetValue)),
                  ].join(", ");

                  const allTypes = [
                    ...new Set(group.incidents.map((i) => i.targetType)),
                  ].join(", ");

                  const allSources = [
                    ...new Set(
                      group.incidents.map(
                        (i) => i.breachData?.Name || "Unknown"
                      )
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
                      key={group.incidentId}
                      className="border-t border-blue-800 hover:bg-blue-900/20 transition-all"
                    >
                      <td className="px-6 py-4">{group.incidentId}</td>
                      <td className="px-6 py-4">{capitalizeFirst(allTypes)}</td>

                      <td className="px-6 py-4 flex mt-5 items-center gap-2 font-semibold text-white">
                        <DomainIcon className="h-4 w-4 text-pink-400" />{" "}
                        {capitalizeFirst(allTargets)}
                      </td>

                      <td className="px-6 py-4">{allSources}</td>
                      <td className="px-6 py-4">{allDetected}</td>

                      <td className="px-6 py-4">
                        <StatusBadge
                          status={group.incidents[0].incidentStatus.toUpperCase()}
                        />
                      </td>

                      <td className="px-6 py-4">
                        <SeverityBadge severity="HIGH" />
                      </td>

                      <td className="px-6 py-4 space-x-2">
                        <button
                          onClick={() => setSelectedGroup(group)}
                          className="bg-gray-800 hover:bg-purple-800 px-3 py-1 rounded-md text-sm mb-3"
                        >
                          View Details
                        </button>

                        {group.incidents.some(
                          (i) => i.incidentStatus === "open"
                        ) && (
                          <button
                            onClick={() => handleResolve(group)}
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
