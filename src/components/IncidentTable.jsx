import React, { useState } from "react";
import { CSVLink } from "react-csv";

const IncidentTable = ({ incidents }) => {
    const [search, setSearch] = useState("");

    const filtered = incidents.filter((i) =>
        i.state.toLowerCase().includes(search.toLowerCase()) ||
        i.district.toLowerCase().includes(search.toLowerCase()) ||
        i.type.toLowerCase().includes(search.toLowerCase())
    );

    const headers = [
        { label: "Date", key: "date" },
        { label: "Type", key: "type" },
        { label: "Location", key: "district" },
        { label: "State", key: "state" },
        { label: "Deaths", key: "deaths" },
        { label: "Injured", key: "injuries" },
        { label: "Source", key: "source" }
    ];

    return (
        <div className="bg-white p-4 rounded shadow my-4">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">Incident Table</h2>
                <CSVLink data={filtered} headers={headers} filename={"incidents.csv"}>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded">Export CSV</button>
                </CSVLink>
            </div>

            <input
                className="w-full border p-2 mb-3 rounded"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
            />

            <table className="table-auto w-full text-left">
                <thead>
                    <tr className="bg-gray-100">
                        <th>Date</th>
                        <th>Type</th>
                        <th>District</th>
                        <th>State</th>
                        <th>Deaths</th>
                        <th>Injured</th>
                        <th>Source</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((i, idx) => (
                        <tr key={idx} className="border-t">
                            <td>{i.date}</td>
                            <td>{i.type}</td>
                            <td>{i.district}</td>
                            <td>{i.state}</td>
                            <td>{i.deaths}</td>
                            <td>{i.injuries}</td>
                            <td>
                                <a href={i.source} target="_blank" className="text-blue-500 underline">Link</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default IncidentTable;

