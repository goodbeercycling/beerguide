import React, {useEffect, useState} from "react";
import {AdvancedMarker, Pin, useMap} from "@vis.gl/react-google-maps";


type Props = {
    showUserLocation: boolean
}

export function UserLocation({showUserLocation}: Props) {
    const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral>();
    const map = useMap();
    useEffect(() => {
        if (!map || !showUserLocation) {
            return;
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position: GeolocationPosition) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setUserLocation(pos);
                    console.log("user location: " + pos);
                },
                () => {
                    return;
                }
            );
        }
    }, [map, showUserLocation])
    if (!userLocation || !showUserLocation) {
        return null;
    }
    return (
        <AdvancedMarker
            key={"user-location"}
            position={userLocation}>
            <Pin background={'#FFFFFF'} glyphColor={'#FFFFFF'} borderColor={'#000000'} >&#x1F6B2;</Pin>
        </AdvancedMarker>
    )
}