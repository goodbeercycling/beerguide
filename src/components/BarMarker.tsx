import {AdvancedMarker, Pin} from "@vis.gl/react-google-maps";
import React, {Dispatch, SetStateAction} from "react";
import {BarDetails} from "./BarDetails";
import {Marker} from "@googlemaps/markerclusterer";

const UnselectedBarPin = (<Pin background={'#f6f30c'} glyphColor={'#383814'} borderColor={'#383814'}>&#127866;</Pin>);
const SelectedBarPin = (<Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'}/>);
type Props = {
    position: { lat: number, lng: number };
    selectedBar: string;
    setSelectedBar: Dispatch<SetStateAction<string>>;
    barName: string;
    barDetails: BarDetails;
    setMarkerRef: (marker: Marker | null, key: string) => void;
};

export function BarMarker({position, selectedBar, setSelectedBar, barName, barDetails, setMarkerRef}: Props) {
    let activeBar = selectedBar === barName;
    let pin = activeBar ? SelectedBarPin : UnselectedBarPin;
    const town = barDetails.town;
    if (!town) {
        return (
            <AdvancedMarker
                key={barName}
                title={barName}
                position={position}
                onClick={() => {
                    setSelectedBar(barName);
                }}>
                {pin}
            </AdvancedMarker>
        );
    }
    return (
        <AdvancedMarker
            key={barName}
            title={barName}
            position={position}
            ref={marker => setMarkerRef(marker, barName) }
            onClick={() => {
                setSelectedBar(barName);
            }}>
            {pin}
        </AdvancedMarker>
    );
}
