import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {CaseysData, DayRoute} from "./DayRoute";
import {BarMarker} from "./BarMarker";
import {AdvancedMarker, Pin, useMap} from "@vis.gl/react-google-maps";
import {Marker, MarkerClusterer} from "@googlemaps/markerclusterer";

type Props = {
    dayRoute: DayRoute;
    selectedBar: string,
    setSelectedBar: Dispatch<SetStateAction<string>>;
    showCaseys: boolean;
    caseysData: CaseysData;
};

export function BarMarkers({dayRoute, selectedBar, setSelectedBar, showCaseys, caseysData}: Props) {
    const map = useMap();
    const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
    const clusterer = useRef<MarkerClusterer | null>(null);

    useEffect(() => {
        if (!map) return;
        if (!clusterer.current) {
            clusterer.current = new MarkerClusterer({map});
        }
    }, [map]);

    useEffect(() => {
        clusterer.current?.clearMarkers();
        clusterer.current?.addMarkers(Object.values(markers));
    }, [markers]);

    const setMarkerRef = (marker: Marker | null, key: string) => {
        if (marker && markers[key]) return;
        if (!marker && !markers[key]) return;

        setMarkers(prev => {
            if (marker) {
                return {...prev, [key]: marker};
            } else {
                const newMarkers = {...prev};
                delete newMarkers[key];
                return newMarkers;
            }
        });
    };

    let barMarkers = [];
    for (const [key, value] of Object.entries(dayRoute.bars)) {
        barMarkers.push(<BarMarker
            key={key}
            position={value.position}
            selectedBar={selectedBar}
            setSelectedBar={setSelectedBar}
            barName={key}
            barDetails={value}
            setMarkerRef={setMarkerRef}/>
        );
    }
    if (showCaseys) {
        for (const [key, value] of Object.entries(caseysData.caseys)) {
            barMarkers.push(<AdvancedMarker
                    key={key}
                    title={key}
                    position={value}
                    // ref={marker => setMarkerRef(marker, key)}
                ><Pin>C</Pin></AdvancedMarker>
            );
        }
    }
    return (
        <div>
            {barMarkers}
        </div>
    );
}
