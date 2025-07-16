import React from "react";
import {
    BarChart, Bar, PieChart, Pie, Cell,
    LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const Charts = ({ incidents }) => {
    const countByState = {};
    const countByType = {};
    const monthlyTrend = {};

    incidents.forEach((i) => {
        countByState[i.state] = (countByState[i.state] || 0) + 1;
        countByType[i.type] = (countByType[i.type] || 0) + 1;

        const month = new Date(i.date).toISOString().slice(0, 7); // YYYY-MM
        monthlyTrend[month] = (monthlyTrend[month] || 0) + 1;
    });

    const barData = Object.entries(countByState).map(([state, count]) => ({ state, count }));
    const pieData = Object.entries(countByType).map(([type, value]) => ({ name: type, value }));
    const lineData = Object.entries(monthlyTrend)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([month, count]) => ({ month, count }));

    const colors = ["#42A5F5", "#66BB6A", "#FFA726", "#EF5350", "#AB47BC"];

    return (
        <div className="bg-white p-4 rounded shadow space-y-6">
            <h2 className="text-xl font-semibold mb-2">Visual Analytics</h2>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                    <XAxis dataKey="state" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#1976D2" />
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100} fill="#8884d8" label>
                        {pieData.map((_, index) => (
                            <Cell key={index} fill={colors[index % colors.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="count" stroke="#4CAF50" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Charts;

