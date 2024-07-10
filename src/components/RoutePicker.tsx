import React, {useState} from "react";
import {APIProvider, Map} from "@vis.gl/react-google-maps";
import {Polyline} from "./Polyline";
import {MapMouseEvent} from "@vis.gl/react-google-maps/src/components/map/use-map-events";

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;

export function RoutePicker() {
    const view = {
        position: {
            "lat": 41.7958242,
            "lng": -93.1595035
        }, zoom: 10
    }
    const [waypoints, setWaypoints] = useState<google.maps.LatLngLiteral[]>([]);

    const updateWaypoints = function (e: MapMouseEvent) {
        const position = e.detail.latLng;
        if (position === null) {
            return
        }
        setWaypoints([...waypoints, position]);
    }
    const deleteLast = function () {
        waypoints.pop();
        setWaypoints([...waypoints]);
    }
    const clear = function () {
        setWaypoints([]);
    }
    const printWaypoints = function () {
        console.log(waypoints);
    }
    let mapStyle = {
        height: "90%"
    }
    return (
        <div style={mapStyle}>
            <APIProvider apiKey={API_KEY}>
                <Map
                    defaultCenter={view.position}
                    defaultZoom={view.zoom}
                    mapId={"TGB_BEER_GUIDE_MAP"}
                    onClick={updateWaypoints}
                >
                </Map>
                <Polyline
                    center={view}
                    waypoints={waypoints}
                    dontRecenter={true}
                />
            </APIProvider>
            <button onClick={deleteLast}>Delete last</button>
            <button onClick={clear}>Clear</button>
            <button onClick={printWaypoints}>Print</button>
        </div>
    );
}
