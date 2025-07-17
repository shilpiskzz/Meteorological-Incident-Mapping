// src/components/IncidentTable.jsx
import React from "react";
import { CalendarDays, MapPin, Eye } from "lucide-react";
import dummyData from "../data/dummyData";

const IncidentTable = () => {
    return (
        <div className="bg-white p-6 rounded shadow mt-6">
            <h2 className="text-2xl font-bold mb-4">⚠️ Incident Records ({dummyData.incidents.length})</h2>
            <div className="space-y-4">
                {dummyData.incidents.map((incident) => (
                    <div
                        key={incident.id}
                        className="bg-gray-50 rounded p-4 border border-gray-200 hover:shadow transition"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                            {/* Name + Date */}
                            <div className="md:col-span-1">
                                <div className="text-lg font-semibold">{incident.state}</div>
                                <div className="text-sm text-gray-600">{incident.type} {incident.year}</div>
                                <div className="text-xs text-gray-500">Source: <a href={incident.source} className="underline">{incident.source}</a></div>
                            </div>

                            {/* Date + Location */}
                            <div className="flex items-center gap-2 text-sm">
                                <CalendarDays size={16} />
                                {new Date(incident.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <MapPin size={16} />
                                {incident.district}, {incident.state}
                            </div>

                            {/* Type */}
                            <div>
                                <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                                    {incident.type}
                                </span>
                            </div>

                            {/* Status */}
                            <div>
                                <span
                                    className={`px-3 py-1 text-xs rounded-full ${incident.severity === "High"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-green-100 text-green-700"
                                        }`}
                                >
                                    {incident.severity === "High" ? "Under Verification" : "Resolved"}
                                </span>
                            </div>

                            {/* Casualties */}
                            <div className="text-sm space-y-1">
                                <div className="text-red-600">Dead: {incident.deaths}</div>
                                <div className="text-orange-600">Injured: {incident.injuries}</div>
                                <div className="text-yellow-600">Affected: {incident.affected}</div>
                            </div>

                            {/* Action */}
                            <div>
                                <button className="flex items-center gap-2 px-4 py-1 bg-gray-100 text-sm rounded hover:bg-gray-200 transition">
                                    <Eye size={16} /> View
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IncidentTable;





// import React from "react";
// import { CalendarDays, MapPin, Eye } from "lucide-react";
// import dummyData from "../data/dummyData";

// const IncidentTable = () => {
//     return (
//         <div className="bg-white p-6 rounded shadow mt-6">
//             <h2 className="text-2xl font-semibold mb-4">⚠️ Incident Records ({dummyData.incidents.length})</h2>
//             <div className="space-y-4">
//                 {dummyData.incidents.map((incident) => (
//                     <div key={incident.id} className="bg-gray-50 rounded-lg p-4 shadow border hover:shadow-md transition">
//                         <div className="grid grid-cols-1 md:grid-cols-6 gap-4">

//                             {/* Incident Name */}
//                             <div className="md:col-span-1">
//                                 <h3 className="font-semibold text-lg">{incident.state}</h3>
//                                 <p className="text-sm text-gray-600">{incident.type} {new Date(incident.date).getFullYear()}</p>
//                                 <p className="text-xs text-gray-500">Source: <a href={incident.source} className="underline" target="_blank" rel="noreferrer">Link</a></p>
//                             </div>

//                             {/* Date */}
//                             <div className="flex items-start gap-2 text-sm text-gray-700">
//                                 <CalendarDays className="w-4 h-4 mt-0.5" />
//                                 {new Date(incident.date).toLocaleDateString("en-GB")}
//                             </div>

//                             {/* Location */}
//                             <div>
//                                 <div className="flex items-start gap-2 text-sm">
//                                     <MapPin className="w-4 h-4 mt-0.5 text-gray-500" />
//                                     <div>
//                                         <div className="font-medium">{incident.district}</div>
//                                         <div className="text-gray-500 text-sm">{incident.state}</div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Type */}
//                             <div>
//                                 <span className={`px-2 py-1 rounded text-sm font-medium bg-opacity-20
//                   ${incident.type === "Flood" ? "bg-blue-200 text-blue-700" :
//                                         incident.type === "Landslide" ? "bg-yellow-300 text-yellow-800" :
//                                             incident.type === "Cyclone" ? "bg-purple-200 text-purple-700" :
//                                                 incident.type === "Earthquake" ? "bg-red-200 text-red-700" :
//                                                     "bg-orange-100 text-orange-800"
//                                     }`}>
//                                     {incident.type}
//                                 </span>
//                             </div>

//                             {/* Status */}
//                             <div>
//                                 <span className={`px-2 py-1 text-sm font-medium rounded-full
//                   ${incident.severity === "High" ? "bg-red-100 text-red-700" :
//                                         incident.severity === "Medium" ? "bg-yellow-100 text-yellow-700" :
//                                             "bg-green-100 text-green-700"}`}>
//                                     {incident.severity === "High" ? "Under Verification" : "Resolved"}
//                                 </span>
//                             </div>

//                             {/* Casualties */}
//                             <div className="text-sm">
//                                 <div className="text-red-600 font-medium">Dead: {incident.deaths}</div>
//                                 <div className="text-orange-600">Injured: {incident.injuries}</div>
//                                 {incident.missing && <div className="text-yellow-600">Missing: {incident.missing}</div>}
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default IncidentTable;



// import React, { useState } from "react";

// const IncidentTable = ({ incidents }) => {
//     const [searchTerm, setSearchTerm] = useState("");

//     const filtered = incidents.filter((incident) =>
//         incident.state.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div className="bg-white mt-6 p-4 shadow rounded">
//             <h2 className="text-xl font-semibold mb-4">Incident List</h2>

//             {/* Search bar */}
//             <input
//                 type="text"
//                 placeholder="Search by State/District"
//                 className="p-2 border rounded mb-4 w-full"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//             />

//             {/* Table */}
//             <div className="overflow-x-auto">
//                 <table className="min-w-full text-left text-sm">
//                     <thead className="bg-gray-100">
//                         <tr>
//                             <th className="px-4 py-2">Date</th>
//                             <th className="px-4 py-2">Type</th>
//                             <th className="px-4 py-2">Location</th>
//                             <th className="px-4 py-2">Deaths</th>
//                             <th className="px-4 py-2">Injured</th>
//                             <th className="px-4 py-2">Source</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filtered.map((incident, i) => (
//                             <tr key={i} className="border-t">
//                                 <td className="px-4 py-2">{incident.date}</td>
//                                 <td className="px-4 py-2">{incident.type}</td>
//                                 <td className="px-4 py-2">{incident.district}, {incident.state}</td>
//                                 <td className="px-4 py-2">{incident.deaths}</td>
//                                 <td className="px-4 py-2">{incident.injured}</td>
//                                 <td className="px-4 py-2">
//                                     <a href={incident.source} target="_blank" className="text-blue-500 underline">Link</a>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default IncidentTable;


// import React, { useState } from "react";
// import { CSVLink } from "react-csv";

// const IncidentTable = ({ incidents }) => {
//     const [search, setSearch] = useState("");

//     const filtered = incidents.filter((i) =>
//         i.state.toLowerCase().includes(search.toLowerCase()) ||
//         i.district.toLowerCase().includes(search.toLowerCase()) ||
//         i.type.toLowerCase().includes(search.toLowerCase())
//     );

//     const headers = [
//         { label: "Date", key: "date" },
//         { label: "Type", key: "type" },
//         { label: "Location", key: "district" },
//         { label: "State", key: "state" },
//         { label: "Deaths", key: "deaths" },
//         { label: "Injured", key: "injuries" },
//         { label: "Source", key: "source" }
//     ];

//     return (
//         <div className="bg-white p-4 rounded shadow my-4">
//             <div className="flex justify-between items-center mb-2">
//                 <h2 className="text-xl font-semibold">Incident Table</h2>
//                 <CSVLink data={filtered} headers={headers} filename={"incidents.csv"}>
//                     <button className="bg-blue-600 text-white px-3 py-1 rounded">Export CSV</button>
//                 </CSVLink>
//             </div>

//             <input
//                 className="w-full border p-2 mb-3 rounded"
//                 placeholder="Search..."
//                 onChange={(e) => setSearch(e.target.value)}
//             />

//             <table className="table-auto w-full text-left">
//                 <thead>
//                     <tr className="bg-gray-100">
//                         <th>Date</th>
//                         <th>Type</th>
//                         <th>District</th>
//                         <th>State</th>
//                         <th>Deaths</th>
//                         <th>Injured</th>
//                         <th>Source</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filtered.map((i, idx) => (
//                         <tr key={idx} className="border-t">
//                             <td>{i.date}</td>
//                             <td>{i.type}</td>
//                             <td>{i.district}</td>
//                             <td>{i.state}</td>
//                             <td>{i.deaths}</td>
//                             <td>{i.injuries}</td>
//                             <td>
//                                 <a href={i.source} target="_blank" className="text-blue-500 underline">Link</a>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default IncidentTable;

