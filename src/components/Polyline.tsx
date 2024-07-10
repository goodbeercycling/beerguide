import React, {useEffect, useState} from 'react';
import {useMap} from '@vis.gl/react-google-maps';
import {MapView} from "./DayRoute";

// Ref: https://developers.google.com/maps/documentation/javascript/examples/polyline-simple
// https://github.com/visgl/react-google-maps/blob/main/examples/directions/src/app.tsx#L26

type Props = {
    isTgb?: boolean;
    dontRecenter?: boolean;
    center: MapView;
    waypoints: Array<google.maps.LatLngLiteral>;
};

export function Polyline({dontRecenter, center, waypoints}: Props) {
    const [polyline, setPolyline] = useState<google.maps.Polyline>();
    const map = useMap();
    useEffect(() => {
        if (!map) {
            return;
        }
        if (polyline) {
            polyline.setMap(null);
        }
        const route = new google.maps.Polyline({
            path: waypoints,
            geodesic: true,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
        });
        setPolyline(route);
        route.setMap(map);
        if (!dontRecenter) {
            map.setCenter(center.position);
            map.setZoom(center.zoom);
        }
    }, [map, waypoints]);
    if (!map) {
        return null;
    }

    return (
        <div className="polyline">
        </div>
    );
}