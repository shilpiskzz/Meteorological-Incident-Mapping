import React, { useState } from 'react';
import MapComponent from './components/MapComponent';
import IncidentList from './components/IncidentList';
import FilterPanel from './components/FilterPanel';
import incidentsData from './data/dummyIncidents.json';

const App = () => {
    const [filteredIncidents, setFilteredIncidents] = useState(incidentsData);

    const handleFilter = (filters) => {
        let filtered = incidentsData;

        if (filters.type) {
            filtered = filtered.filter(i => i.type === filters.type);
        }
        if (filters.state) {
            filtered = filtered.filter(i => i.location.includes(filters.state));
        }

        setFilteredIncidents(filtered);
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/4 p-4 bg-gray-100 overflow-y-auto">
                <FilterPanel onFilter={handleFilter} />
                <IncidentList incidents={filteredIncidents} />
            </div>
            <div className="w-3/4 h-full">
                <MapComponent incidents={filteredIncidents} />
            </div>
        </div>
    );
};

export default App;

