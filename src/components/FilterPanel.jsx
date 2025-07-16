import React, { useState } from 'react';

const FilterPanel = ({ onFilter }) => {
    const [type, setType] = useState('');
    const [state, setState] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter({ type, state });
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <h2 className="text-xl font-bold mb-2">Filter Incidents</h2>
            <div className="mb-2">
                <label className="block text-sm">Type:</label>
                <input
                    type="text"
                    value={type}
                    onChange={e => setType(e.target.value)}
                    className="w-full p-1 border rounded"
                    placeholder="Flood, Fire..."
                />
            </div>
            <div className="mb-2">
                <label className="block text-sm">State:</label>
                <input
                    type="text"
                    value={state}
                    onChange={e => setState(e.target.value)}
                    className="w-full p-1 border rounded"
                    placeholder="Bihar, Kerala..."
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">
                Apply Filters
            </button>
        </form>
    );
};

export default FilterPanel;
