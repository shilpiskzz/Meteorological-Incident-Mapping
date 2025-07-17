import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tooltip } from "react-tooltip";

const Map = ({ incidents }) => {
    const [geoData, setGeoData] = useState(null);

    useEffect(() => {
        fetch("/india.geo.json")
            .then((res) => res.json())
            .then((data) => {
                console.log("✅ GeoJSON loaded:", data);
                setGeoData(data);
            })
            .catch((err) => console.error("❌ Failed to load GeoJSON", err));
    }, []);

    const incidentCountByState = {};
    incidents.forEach((inc) => {
        incidentCountByState[inc.state] = (incidentCountByState[inc.state] || 0) + 1;
    });

    const getColor = (count) => {
        if (!count) return "#E0E0E0";
        if (count < 3) return "#90CAF9";
        if (count < 10) return "#42A5F5";
        return "#1565C0";
    };

    if (!geoData) return <div>Loading map...</div>;

    return (
        <div className="bg-white p-4 shadow rounded h-full flex flex-col">
            {/* <h2 className="text-xl font-semibold mb-4">India Map</h2> */}
            <div className="flex-grow w-full">
                <ComposableMap
                    projection="geoMercator"
                    projectionConfig={{ scale: 1320, center: [80, 22] }}
                    style={{ width: "100%", height: "100%" }}
                >
                    <Geographies geography={geoData}>
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                const stateName = geo.properties?.st_nm || geo.properties?.NAME_1;
                                const count = incidentCountByState[stateName];
                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill={getColor(count)}
                                        stroke="#FFFFFF"
                                        data-tooltip-id="map-tooltip"
                                        data-tooltip-content={`${stateName || "Unknown"} – ${count || 0} incidents`}
                                        style={{
                                            default: { outline: "none" },
                                            hover: { fill: "#FF7043", outline: "none" },
                                            pressed: { fill: "#FF5722", outline: "none" },
                                        }}
                                    />
                                );
                            })
                        }
                    </Geographies>
                </ComposableMap>
            </div>
            <Tooltip id="map-tooltip" />
        </div>
    );
};

export default Map;






// import React, { useEffect, useState } from "react";
// import { ComposableMap, Geographies, Geography } from "react-simple-maps";
// import { Tooltip } from "react-tooltip";

// const Map = ({ incidents }) => {
//     const [geoData, setGeoData] = useState(null);

//     useEffect(() => {
//         fetch("/india.geo.json")
//             .then((res) => res.json())
//             .then((data) => {
//                 console.log("✅ GeoJSON loaded:", data);
//                 setGeoData(data);
//             })
//             .catch((err) => console.error("❌ Failed to load GeoJSON", err));
//     }, []);

//     const incidentCountByState = {};
//     incidents.forEach((inc) => {
//         incidentCountByState[inc.state] = (incidentCountByState[inc.state] || 0) + 1;
//     });

//     const getColor = (count) => {
//         if (!count) return "#E0E0E0";
//         if (count < 3) return "#90CAF9";
//         if (count < 10) return "#42A5F5";
//         return "#1565C0";
//     };

//     if (!geoData) return <div>Loading map...</div>;

//     return (
//         <div className="bg-white p-4 shadow rounded h-full">
//             <h2 className="text-xl font-semibold mb-4">India Map</h2>
//             <div className="w-full h-[85%]">
//                 <ComposableMap
//                     projection="geoMercator"
//                     projectionConfig={{ scale: 1200, center: [80, 22] }}
//                     width={800}
//                     height={800}
//                     style={{ width: "100%", height: "100%" }}
//                 >
//                     <Geographies geography={geoData}>
//                         {({ geographies }) =>
//                             geographies.map((geo) => {
//                                 const stateName = geo.properties?.st_nm || geo.properties?.NAME_1;
//                                 const count = incidentCountByState[stateName];
//                                 return (
//                                     <Geography
//                                         key={geo.rsmKey}
//                                         geography={geo}
//                                         fill={getColor(count)}
//                                         stroke="#FFFFFF"
//                                         data-tooltip-id="map-tooltip"
//                                         data-tooltip-content={`${stateName || "Unknown"} – ${count || 0} incidents`}
//                                         style={{
//                                             default: { outline: "none" },
//                                             hover: { fill: "#FF7043", outline: "none" },
//                                             pressed: { fill: "#FF5722", outline: "none" },
//                                         }}
//                                     />
//                                 );
//                             })
//                         }
//                     </Geographies>
//                 </ComposableMap>
//             </div>
//             <Tooltip id="map-tooltip" />
//         </div>
//     );
// };

// export default Map;






