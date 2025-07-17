import React, { useState } from "react";
import { FilePlus, CalendarDays, MapPin, AlertCircle, Image } from "lucide-react";

const IncidentForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        type: "",
        state: "",
        district: "",
        description: "",
        date: "",
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setFormData((prev) => ({ ...prev, image: files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        alert("✅ Incident submitted successfully!");
        setFormData({
            type: "",
            state: "",
            district: "",
            description: "",
            date: "",
            image: null,
        });
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mt-10 max-w-3xl mx-auto border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <FilePlus className="text-blue-600" size={22} /> Report an Incident
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Incident Type */}
                <div>
                    <label className="text-sm font-medium text-gray-600">Incident Type</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full rounded border-gray-300 shadow-sm p-2 focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Type</option>
                        <option value="Flood">Flood</option>
                        <option value="Fire">Fire</option>
                        <option value="Earthquake">Earthquake</option>
                        <option value="Landslide">Landslide</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Date */}
                <div>
                    <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                        <CalendarDays size={16} /> Date of Incident
                    </label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full rounded border-gray-300 shadow-sm p-2 focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* State */}
                <div>
                    <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                        <MapPin size={16} /> State
                    </label>
                    <input
                        type="text"
                        name="state"
                        placeholder="e.g. Maharashtra"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full rounded border-gray-300 shadow-sm p-2 focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* District */}
                <div>
                    <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                        <MapPin size={16} /> District
                    </label>
                    <input
                        type="text"
                        name="district"
                        placeholder="e.g. Nagpur"
                        value={formData.district}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full rounded border-gray-300 shadow-sm p-2 focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                        <AlertCircle size={16} /> Description
                    </label>
                    <textarea
                        name="description"
                        rows={4}
                        placeholder="Describe what happened..."
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full rounded border-gray-300 shadow-sm p-2 focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>

                {/* File Upload */}
                <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                        <Image size={16} /> Upload Image (optional)
                    </label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
                    />
                </div>

                {/* Submit */}
                <div className="md:col-span-2 text-right mt-2">
                    <button
                        type="submit"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition duration-200"
                    >
                        Submit Incident
                    </button>
                </div>
            </form>
        </div>
    );
};

export default IncidentForm;


// import React, { useState } from "react";

// const IncidentForm = ({ onSubmit }) => {
//     const [formData, setFormData] = useState({
//         type: "",
//         state: "",
//         district: "",
//         description: "",
//         date: "",
//         image: null,
//     });

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         if (name === "image") {
//             setFormData((prev) => ({ ...prev, image: files[0] }));
//         } else {
//             setFormData((prev) => ({ ...prev, [name]: value }));
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         onSubmit(formData); // Stub: Save locally or call API
//         alert("Incident submitted!");
//         setFormData({
//             type: "",
//             state: "",
//             district: "",
//             description: "",
//             date: "",
//             image: null,
//         });
//     };

//     return (
//         <div className="bg-white p-6 rounded shadow mt-8 max-w-2xl mx-auto">
//             <h2 className="text-xl font-bold mb-4 text-gray-700">📝 Submit New Incident</h2>
//             <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
//                 <div>
//                     <label className="block text-sm font-medium text-gray-600">Incident Type</label>
//                     <select
//                         name="type"
//                         value={formData.type}
//                         onChange={handleChange}
//                         className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500"
//                         required
//                     >
//                         <option value="">Select type</option>
//                         <option value="Flood">Flood</option>
//                         <option value="Fire">Fire</option>
//                         <option value="Earthquake">Earthquake</option>
//                         <option value="Landslide">Landslide</option>
//                         <option value="Other">Other</option>
//                     </select>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-600">State</label>
//                         <input
//                             type="text"
//                             name="state"
//                             value={formData.state}
//                             onChange={handleChange}
//                             placeholder="e.g. Maharashtra"
//                             className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500"
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-600">District</label>
//                         <input
//                             type="text"
//                             name="district"
//                             value={formData.district}
//                             onChange={handleChange}
//                             placeholder="e.g. Pune"
//                             className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500"
//                             required
//                         />
//                     </div>
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium text-gray-600">Date</label>
//                     <input
//                         type="date"
//                         name="date"
//                         value={formData.date}
//                         onChange={handleChange}
//                         className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500"
//                         required
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium text-gray-600">Description</label>
//                     <textarea
//                         name="description"
//                         value={formData.description}
//                         onChange={handleChange}
//                         rows={4}
//                         placeholder="Briefly describe the incident"
//                         className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500"
//                         required
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium text-gray-600">Upload Image (optional)</label>
//                     <input
//                         type="file"
//                         name="image"
//                         accept="image/*"
//                         onChange={handleChange}
//                         className="w-full"
//                     />
//                 </div>

//                 <button
//                     type="submit"
//                     className="mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
//                 >
//                     Submit Incident
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default IncidentForm;


// import React, { useState } from "react";

// const IncidentForm = ({ onSubmit }) => {
//     const [formData, setFormData] = useState({
//         type: "",
//         state: "",
//         district: "",
//         description: "",
//         date: "",
//         severity: "Medium",
//         image: null,
//     });

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: files ? files[0] : value,
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const newIncident = {
//             ...formData,
//             id: Date.now(),
//             source: "https://mocked-submission.local",
//             deaths: 0,
//             injuries: 0,
//             affected: 0,
//         };
//         onSubmit(newIncident);
//         alert("Incident submitted (mock)!");
//         setFormData({
//             type: "",
//             state: "",
//             district: "",
//             description: "",
//             date: "",
//             severity: "Medium",
//             image: null,
//         });
//     };

//     return (
//         <div className="bg-white p-4 mt-6 shadow rounded">
//             <h2 className="text-lg font-semibold mb-4">Submit New Incident</h2>
//             <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <input name="type" placeholder="Incident Type" value={formData.type} onChange={handleChange} className="p-2 border rounded" required />
//                 <input name="state" placeholder="State" value={formData.state} onChange={handleChange} className="p-2 border rounded" required />
//                 <input name="district" placeholder="District" value={formData.district} onChange={handleChange} className="p-2 border rounded" required />
//                 <input name="date" type="date" value={formData.date} onChange={handleChange} className="p-2 border rounded" required />
//                 <select name="severity" value={formData.severity} onChange={handleChange} className="p-2 border rounded">
//                     <option value="Low">Low</option>
//                     <option value="Medium">Medium</option>
//                     <option value="High">High</option>
//                 </select>
//                 <input name="image" type="file" accept="image/*" onChange={handleChange} className="p-2 border rounded" />
//                 <textarea
//                     name="description"
//                     placeholder="Description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     className="p-2 border rounded md:col-span-2"
//                     rows="3"
//                 />
//                 <button type="submit" className="bg-blue-600 text-white p-2 rounded md:col-span-2">Submit Incident</button>
//             </form>
//         </div>
//     );
// };

// export default IncidentForm;

