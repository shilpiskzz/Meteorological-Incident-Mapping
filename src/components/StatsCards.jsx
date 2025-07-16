import React from "react";

const StatsCards = ({ incidents }) => {
    const totalIncidents = incidents.length;
    const totalDeaths = incidents.reduce((sum, i) => sum + i.deaths, 0);
    const totalInjuries = incidents.reduce((sum, i) => sum + i.injuries, 0);
    const totalAffected = incidents.reduce((sum, i) => sum + (i.affected || 0), 0);
    const last30 = incidents.filter((i) => new Date(i.date) > new Date(Date.now() - 30 * 86400000)).length;

    const stats = [
        { label: "Total Incidents", value: totalIncidents },
        { label: "Total Deaths", value: totalDeaths },
        { label: "Total Injuries", value: totalInjuries },
        { label: "Total Affected", value: totalAffected },
        { label: "Incidents (Last 30 days)", value: last30 },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 my-4">
            {stats.map((stat) => (
                <div key={stat.label} className="bg-white p-4 rounded shadow text-center">
                    <h3 className="text-lg font-bold">{stat.value}</h3>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
            ))}
        </div>
    );
};

export default StatsCards;
