import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import indiaTopo from "../data/india.topo.json";
import { Tooltip } from "react-tooltip";

const Map = ({ incidents }) => {
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

    return (
        <div className="bg-white p-4 shadow rounded">
            <h2 className="text-xl font-semibold mb-2">India Map</h2>
            <ComposableMap projection="geoMercator" projectionConfig={{ scale: 1000 }} width={500} height={600}>
                <Geographies geography={indiaTopo}>
                    {({ geographies }) =>
                        geographies.map((geo) => {
                            const stateName = geo.properties.ST_NM;
                            const count = incidentCountByState[stateName];
                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill={getColor(count)}
                                    stroke="#FFF"
                                    data-tooltip-id="map-tooltip"
                                    data-tooltip-content={`${stateName} – ${count || 0} incidents`}
                                    style={{
                                        default: { outline: "none" },
                                        hover: { fill: "#FF5722", outline: "none" },
                                        pressed: { outline: "none" },
                                    }}
                                />
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>
            <Tooltip id="map-tooltip" />
        </div>
    );
};

export default Map;
