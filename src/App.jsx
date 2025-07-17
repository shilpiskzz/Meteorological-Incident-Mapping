
import React, { useState } from "react";
import StatsCards from "./components/StatsCards";
import Map from "./components/Map";
import IncidentTable from "./components/IncidentTable";
import IncidentFilters from "./components/IncidentFilters";
import dummyData from "./data/dummyData";
import Charts from "./components/Charts";
import IncidentForm from "./components/IncidentForm";

const App = () => {
    const [filters, setFilters] = useState({
        time: "all",
        type: "all",
        state: "all",
        severity: "all",
    });

    const [incidentList, setIncidentList] = useState(dummyData.incidents);

    const applyFilters = (incidents) => {
        return incidents.filter((i) => {
            const { time, type, state, severity } = filters;
            const today = new Date();
            const incidentDate = new Date(i.date);

            const matchTime =
                time === "all" ||
                (time === "today" && incidentDate.toDateString() === today.toDateString()) ||
                (time === "week" && incidentDate >= new Date(today - 7 * 86400000)) ||
                (time === "month" && incidentDate >= new Date(today - 30 * 86400000));

            const matchType = type === "all" || i.type === type;
            const matchState = state === "all" || i.state === state;
            const matchSeverity = severity === "all" || i.severity === severity;

            return matchTime && matchType && matchState && matchSeverity;
        });
    };

    const filteredIncidents = applyFilters(incidentList);

    const handleIncidentSubmit = (newIncident) => {
        setIncidentList((prev) => [...prev, newIncident]);
    };

    return (
        <div className="flex h-screen overflow-hidden">
            {/* LEFT PANEL */}
            <div className="w-full md:w-[65%] xl:w-[70%] overflow-y-auto p-4 bg-gray-50 space-y-6">
                <h1 className="text-3xl font-bold mb-4">India Incident Portal</h1>

                <IncidentFilters filters={filters} setFilters={setFilters} />

                <StatsCards incidents={filteredIncidents} />

                {/* Keep default Charts */}
                <div className="space-y-4">
                    {/* Only Bar Chart */}
                    <div className="bg-white p-4 rounded shadow">
                        <Charts incidents={filteredIncidents} only="bar" />
                    </div>

                    {/* Pie and Line charts side by side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded shadow">
                            <Charts incidents={filteredIncidents} only="pie" />
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                            <Charts incidents={filteredIncidents} only="line" />
                        </div>
                    </div>
                </div>


                <IncidentTable incidents={filteredIncidents} />
                <IncidentForm onSubmit={handleIncidentSubmit} />
            </div>

            {/* RIGHT PANEL: Map */}
            <div className="hidden md:block w-[70%] xl:w-[70%] h-full overflow-y-auto p-4 bg-white shadow-inner">
                <Map incidents={filteredIncidents} />
            </div>
        </div>
    );
};

export default App;



