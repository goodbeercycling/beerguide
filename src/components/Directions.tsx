import React, {useEffect, useState} from 'react';
import {useMap, useMapsLibrary} from '@vis.gl/react-google-maps';

// Ref: https://github.com/visgl/react-google-maps/blob/main/examples/directions/src/app.tsx#L26

type LatLng = { lat: number, lng: number };
type Props = {
    isTgb?: boolean;
    origin: LatLng;
    destination: LatLng;
    waypoints: Array<google.maps.DirectionsWaypoint>;
};

export function Directions({origin, destination, waypoints}: Props) {
    const map = useMap();
    const routesLibrary = useMapsLibrary('routes');
    const [directionsService, setDirectionsService] =
        useState<google.maps.DirectionsService>();
    const [directionsRenderer, setDirectionsRenderer] =
        useState<google.maps.DirectionsRenderer>();
    directionsRenderer?.setOptions({
        suppressMarkers: true,
        suppressInfoWindows: true,
    });

    // Initialize directions service and renderer
    useEffect(() => {
        if (!routesLibrary || !map) return;
        setDirectionsService(new routesLibrary.DirectionsService());
        setDirectionsRenderer(new routesLibrary.DirectionsRenderer({map}));
    }, [routesLibrary, map]);

    useEffect(() => {
        if (!directionsService || !directionsRenderer) return;

        directionsService
            .route({
                origin,
                destination,
                travelMode: google.maps.TravelMode.BICYCLING,
                provideRouteAlternatives: false,
                optimizeWaypoints: false,
                waypoints,
            })
            .then(response => {
                directionsRenderer.setDirections(response);
                // setRoutes(response.routes);
            });

        return () => directionsRenderer.setMap(null);
    }, [directionsService, directionsRenderer]);

    return (
        <div className="directions">
        </div>
    );
}