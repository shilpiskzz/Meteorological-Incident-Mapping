import React from 'react';

const IncidentList = ({ incidents }) => {
    return (
        <div>
            <h2 className="text-xl font-bold mb-2">Incidents</h2>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id} className="mb-2 p-2 border rounded bg-white shadow">
                        <strong>{incident.title}</strong><br />
                        {incident.location} — {incident.date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default IncidentList;
