import React from "react";

const IncidentFilters = ({ filters, setFilters }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bg-white p-4 rounded shadow mt-6">
            <h2 className="text-lg font-semibold mb-4">Filter Incidents</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Time Filter */}
                <select name="time" value={filters.time} onChange={handleChange} className="p-2 border rounded">
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                </select>

                {/* Type Filter */}
                <select name="type" value={filters.type} onChange={handleChange} className="p-2 border rounded">
                    <option value="all">All Types</option>
                    <option value="Flood">Flood</option>
                    <option value="Earthquake">Earthquake</option>
                    <option value="Fire">Fire</option>
                    <option value="Landslide">Landslide</option>
                    <option value="Other">Other</option>
                </select>

                {/* State Filter */}
                <select name="state" value={filters.state} onChange={handleChange} className="p-2 border rounded">
                    <option value="all">All States</option>
                    <option value="Assam">Assam</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                    {/* Add more as needed */}
                </select>

                {/* Severity Filter */}
                <select name="severity" value={filters.severity} onChange={handleChange} className="p-2 border rounded">
                    <option value="all">All Severity</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
        </div>
    );
};

export default IncidentFilters;
