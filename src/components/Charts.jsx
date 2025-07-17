import React from "react";
import {
    BarChart, Bar,
    PieChart, Pie, Cell,
    LineChart, Line,
    XAxis, YAxis,
    CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { format, parseISO } from "date-fns";

const COLORS = ["#42A5F5", "#66BB6A", "#FF7043", "#BA68C8", "#FFD54F", "#4DD0E1", "#EF5350"];

const Charts = ({ incidents, only = null }) => {
    // 1️⃣ Incidents by State
    const stateCounts = incidents.reduce((acc, cur) => {
        acc[cur.state] = (acc[cur.state] || 0) + 1;
        return acc;
    }, {});
    const stateData = Object.entries(stateCounts).map(([state, count]) => ({
        state,
        incidents: count,
    }));

    // 2️⃣ Type Distribution
    const typeCounts = incidents.reduce((acc, cur) => {
        acc[cur.type] = (acc[cur.type] || 0) + 1;
        return acc;
    }, {});
    const typeData = Object.entries(typeCounts).map(([type, value]) => ({
        name: type,
        value,
    }));

    // 3️⃣ Monthly Trend
    const monthData = {};
    incidents.forEach((incident) => {
        const month = format(parseISO(incident.date), "yyyy-MM");
        if (!monthData[month]) {
            monthData[month] = { month, incidents: 0, casualties: 0 };
        }
        monthData[month].incidents += 1;
        monthData[month].casualties += (incident.deaths || 0) + (incident.injuries || 0);
    });
    const monthlyData = Object.values(monthData).sort((a, b) => a.month.localeCompare(b.month));

    return (
        <div className="w-full space-y-6 mt-4">
            {/* Bar Chart */}
            {(only === "bar" || only === null) && (
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold mb-2">📊 Incidents by State</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={stateData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="state" />
                            <YAxis
                                allowDecimals={false}
                                domain={[
                                    0,
                                    Math.max(...stateData.map((d) => d.incidents)) + 5,
                                ]}
                            />
                            <Tooltip />
                            <Bar dataKey="incidents" fill="#f44336" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

            {/* Pie Chart */}
            {(only === "pie" || only === null) && (
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold mb-2">🕒 Incident Types Distribution</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={typeData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label={({ name, percent }) =>
                                    `${name}: ${(percent * 100).toFixed(0)}%`
                                }
                            >
                                {typeData.map((_, index) => (
                                    <Cell
                                        key={index}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip formatter={(v, n) => [`${v} incidents`, n]} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            )}

            {/* Line Chart */}
            {(only === "line" || only === null) && (
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold mb-2">📈 Monthly Incident Trends</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip
                                labelFormatter={(label) => `Month: ${label}`}
                                formatter={(value, name) =>
                                    name === "casualties"
                                        ? [`${value}`, "Casualties"]
                                        : [`${value}`, "Incidents"]
                                }
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="incidents"
                                stroke="#2196f3"
                                strokeWidth={2}
                                dot
                            />
                            <Line
                                type="monotone"
                                dataKey="casualties"
                                stroke="#f44336"
                                strokeWidth={2}
                                dot
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
};

export default Charts;





// import React from "react";
// import {
//     BarChart, Bar,
//     PieChart, Pie, Cell,
//     LineChart, Line,
//     XAxis, YAxis,
//     CartesianGrid, Tooltip, ResponsiveContainer, Legend
// } from "recharts";
// import { format, parseISO } from "date-fns";

// const COLORS = ["#42A5F5", "#66BB6A", "#FF7043", "#BA68C8", "#FFD54F", "#4DD0E1", "#EF5350"];

// const Charts = ({ incidents, only = null }) => {
//     // 1️⃣ Incidents by State
//     const stateCounts = incidents.reduce((acc, cur) => {
//         acc[cur.state] = (acc[cur.state] || 0) + 1;
//         return acc;
//     }, {});
//     const stateData = Object.entries(stateCounts).map(([state, count]) => ({
//         state,
//         incidents: count,
//     }));

//     // 2️⃣ Type Distribution
//     const typeCounts = incidents.reduce((acc, cur) => {
//         acc[cur.type] = (acc[cur.type] || 0) + 1;
//         return acc;
//     }, {});

//     const typeData = Object.entries(typeCounts).map(([type, value]) => ({
//         name: type,
//         value,
//     }));

//     // 3️⃣ Monthly Trend
//     const monthData = {};
//     incidents.forEach((incident) => {
//         const month = format(parseISO(incident.date), "yyyy-MM");
//         if (!monthData[month]) {
//             monthData[month] = { month, incidents: 0, casualties: 0 };
//         }
//         monthData[month].incidents += 1;
//         monthData[month].casualties += (incident.deaths || 0) + (incident.injuries || 0);
//     });
//     const monthlyData = Object.values(monthData).sort((a, b) => a.month.localeCompare(b.month));

//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
//             {/* Bar Chart */}
//             <div className="bg-white p-4 rounded shadow">
//                 <h2 className="text-lg font-semibold mb-2">📊 Incidents by State</h2>
//                 <ResponsiveContainer width="100%" height={300}>
//                     <BarChart data={stateData}>
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="state" />
//                         <YAxis
//                             allowDecimals={false}
//                             domain={[
//                                 0,
//                                 Math.max(...stateData.map((d) => d.incidents)) + 5
//                             ]}
//                         />
//                         <Tooltip />
//                         <Bar dataKey="incidents" fill="#f44336" />
//                     </BarChart>
//                 </ResponsiveContainer>
//             </div>

//             {/* Pie Chart */}
//             <div className="bg-white p-4 rounded shadow">
//                 <h2 className="text-lg font-semibold mb-2">🕒 Incident Types Distribution</h2>
//                 <ResponsiveContainer width="100%" height={300}>
//                     <PieChart>
//                         <Pie
//                             data={typeData}
//                             dataKey="value"
//                             nameKey="name"
//                             cx="50%"
//                             cy="50%"
//                             outerRadius={100}
//                             label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                         >
//                             {typeData.map((_, index) => (
//                                 <Cell key={index} fill={COLORS[index % COLORS.length]} />
//                             ))}
//                         </Pie>
//                         <Tooltip formatter={(v, n) => [`${v} incidents`, n]} />
//                         <Legend />
//                     </PieChart>
//                 </ResponsiveContainer>
//             </div>

//             {/* Line Chart */}
//             <div className="bg-white p-4 rounded shadow">
//                 <h2 className="text-lg font-semibold mb-2">📈 Monthly Incident Trends</h2>
//                 <ResponsiveContainer width="100%" height={300}>
//                     <LineChart data={monthlyData}>
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="month" />
//                         <YAxis />
//                         <Tooltip
//                             labelFormatter={(label) => `Month: ${label}`}
//                             formatter={(value, name) => {
//                                 return name === "casualties"
//                                     ? [`${value}`, "Casualties"]
//                                     : [`${value}`, "Incidents"];
//                             }}
//                             contentStyle={{ fontSize: "14px" }}
//                             itemStyle={(item) => ({
//                                 color: item.dataKey === "casualties" ? "#f44336" : "#2196f3",
//                             })}
//                         />
//                         <Legend />
//                         <Line type="monotone" dataKey="incidents" stroke="#2196f3" strokeWidth={2} dot />
//                         <Line type="monotone" dataKey="casualties" stroke="#f44336" strokeWidth={2} dot />
//                     </LineChart>
//                 </ResponsiveContainer>
//             </div>
//         </div>
//     );
// };

// export default Charts;


