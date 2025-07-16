import React, { useState } from "react";

const IncidentForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        type: "",
        state: "",
        district: "",
        date: "",
        description: "",
        severity: "Medium",
        image: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newIncident = {
            ...formData,
            id: Date.now(),
            deaths: 0,
            injuries: 0,
            affected: 0,
            source: "https://dummy-submitted.inc"
        };
        onSubmit(prev => [...prev, newIncident]);
        setFormData({
            type: "",
            state: "",
            district: "",
            date: "",
            description: "",
            severity: "Medium",
            image: null
        });
    };

    return (
        <div className="bg-white p-4 rounded shadow mt-6">
            <h2 className="text-xl font-semibold mb-2">Submit New Incident (Demo)</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium">Incident Type</label>
                    <select name="type" value={formData.type} onChange={handleChange} required className="w-full border p-2 rounded">
                        <option value="">Select Type</option>
                        <option value="Flood">Flood</option>
                        <option value="Fire">Fire</option>
                        <option value="Earthquake">Earthquake</option>
                        <option value="Landslide">Landslide</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium">State</label>
                    <input name="state" value={formData.state} onChange={handleChange} required className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">District</label>
                    <input name="district" value={formData.district} onChange={handleChange} required className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Date</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Severity</label>
                    <select name="severity" value={formData.severity} onChange={handleChange} className="w-full border p-2 rounded">
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium">Upload Image (optional)</label>
                    <input type="file" name="image" accept="image/*" onChange={handleChange} className="w-full p-2" />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full border p-2 rounded" />
                </div>
                <div className="md:col-span-2">
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Submit Incident</button>
                </div>
            </form>
        </div>
    );
};

export default IncidentForm;
