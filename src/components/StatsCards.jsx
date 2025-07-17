// src/components/StatsCards.jsx
import React from "react";
import { AlertTriangle, Building2, Users, ArrowDownLeft } from "lucide-react";

const StatCard = ({ title, value, color, icon }) => (
    <div className={`p-4 rounded-lg shadow text-white ${color}`}>
        <div className="flex justify-between items-center">
            <div>
                <div className="text-sm">{title}</div>
                <div className="text-2xl font-bold">{value}</div>
            </div>
            <div className="text-3xl opacity-70">{icon}</div>
        </div>
    </div>
);

const StatsCards = ({ incidents }) => {
    const totalIncidents = incidents.length;
    const totalDeaths = incidents.reduce((sum, i) => sum + (i.deaths || 0), 0);
    const totalInjuries = incidents.reduce((sum, i) => sum + (i.injuries || 0), 0);
    const totalMissing = incidents.reduce((sum, i) => sum + (i.missing || 0), 0);
    const totalInfra = incidents.reduce((sum, i) => sum + (i.infrastructureDamage || 0), 0).toFixed(1);
    const totalLivestock = incidents.reduce((sum, i) => sum + (i.livestockLost || 0), 0).toLocaleString();

    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Summary Statistics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard title="Deaths" value={totalDeaths} color="bg-red-600" icon={<Users />} />
                <StatCard title="Injured" value={totalInjuries} color="bg-orange-500" icon={<Users />} />
                <StatCard title="Missing" value={totalMissing} color="bg-yellow-500" icon={<Users />} />
                <StatCard title="Total Incidents" value={totalIncidents} color="bg-blue-500" icon={<AlertTriangle />} />
                <StatCard title="Infrastructure Damage" value={`₹${totalInfra}Cr`} color="bg-purple-600" icon={<Building2 />} />
                <StatCard title="Livestock Lost" value={totalLivestock} color="bg-green-600" icon={<ArrowDownLeft />} />
            </div>
        </div>
    );
};

export default StatsCards;
