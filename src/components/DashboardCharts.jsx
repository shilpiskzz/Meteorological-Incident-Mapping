import React from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend
} from "recharts";

// Color palette for pie chart
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#f56969", "#00C49F"];

const DashboardCharts = ({ incidents }) => {
    // 🔷 Group incidents by state
    const stateCounts = {};
    const typeCounts = {};
    const monthCounts = {};

    incidents.forEach((inc) => {
        stateCounts[inc.state] = (stateCounts[inc.state] || 0) + 1;
        typeCounts[inc.type] = (typeCounts[inc.type] || 0) + 1;

        const month = new Date(inc.date).toLocaleString("default", { month: "short", year: "numeric" });
        monthCounts[month] = (monthCounts[month] || 0) + 1;
    });

    const stateData = Object.entries(stateCounts).map(([state, count]) => ({ state, count }));
    const typeData = Object.entries(typeCounts).map(([type, value]) => ({ name: type, value }));
    const lineData = Object.entries(monthCounts)
        .map(([month, count]) => ({ month, count }))
        .sort((a, b) => new Date("01 " + a.month) - new Date("01 " + b.month));

    return (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bar Chart: Incidents per State */}
            <div className="bg-white p-4 rounded shadow">
                <h3 className="text-md font-semibold mb-2">Incidents per State</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={stateData}>
                        <XAxis dataKey="state" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Pie Chart: Types */}
            <div className="bg-white p-4 rounded shadow">
                <h3 className="text-md font-semibold mb-2">Incident Types</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie
                            data={typeData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            label
                        >
                            {typeData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Line Chart: Trend over Time */}
            <div className="bg-white p-4 rounded shadow">
                <h3 className="text-md font-semibold mb-2">Incidents over Time</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={lineData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Legend />
                        <Line type="monotone" dataKey="count" stroke="#f56969" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DashboardCharts;
