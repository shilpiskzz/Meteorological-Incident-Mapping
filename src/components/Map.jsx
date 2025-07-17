import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const Map = () => {
    const [geoData, setGeoData] = useState(null);

    useEffect(() => {
        fetch("/india.geo.json")
            .then((res) => res.json())
            .then((data) => {
                console.log("✅ GeoJSON loaded:", data);
                setGeoData(data);
            })
            .catch((err) => console.error("❌ GeoJSON fetch error", err));
    }, []);

    if (!geoData) return <div>Loading map...</div>;

    return (
        <div className="bg-white p-4 shadow rounded mt-4" style={{ height: "650px" }}>
            <h2 className="text-xl font-semibold mb-2">India Map</h2>
            <ComposableMap
                projection="geoMercator"
                projectionConfig={{ scale: 1000 }}
                width={600}
                height={600}
                style={{ width: "100%", height: "auto" }}
            >
                <Geographies geography={geoData}>
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill="#90CAF9"
                                stroke="#FFFFFF"
                                style={{
                                    default: { outline: "none" },
                                    hover: { fill: "#42A5F5", outline: "none" },
                                    pressed: { fill: "#1E88E5", outline: "none" },
                                }}
                            />
                        ))
                    }
                </Geographies>
            </ComposableMap>
        </div>
    );
};

export default Map;





