import {APIProvider, Map} from '@vis.gl/react-google-maps';
import {CaseysData, DayRoute} from "./DayRoute";
import React, {Dispatch, SetStateAction} from "react";
import {Polyline} from "./Polyline";
import {MapMouseEvent} from "@vis.gl/react-google-maps/src/components/map/use-map-events";
import {UserLocation} from "./UserLocation";
import {BarMarkers} from "./BarMarkers";

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;

type Props = {
    selectedDay: string,
    dayRoute: DayRoute;
    selectedBar: string;
    setSelectedBar: Dispatch<SetStateAction<string>>;
    showCaseys: boolean;
    showMyLocation: boolean,
    caseys: CaseysData;
};

export function DailyMap({dayRoute, selectedBar, setSelectedBar, showCaseys, showMyLocation, caseys}: Props) {
    const view = dayRoute.view;

    return (
        <div id="daily-map">
            <APIProvider apiKey={API_KEY}>
                <Map
                    defaultCenter={view.position}
                    defaultZoom={view.zoom}
                    mapId={"TGB_BEER_GUIDE_MAP"}
                    // TODO: this is only for debugging!!!
                    onClick={e => mouseClickEvent(e, true)}
                >
                </Map>
                <BarMarkers dayRoute={dayRoute} selectedBar={selectedBar} setSelectedBar={setSelectedBar}
                            caseysData={caseys} showCaseys={showCaseys}/>
                <Polyline
                    center={dayRoute.view}
                    waypoints={dayRoute.waypoints}
                />
                <UserLocation
                    showUserLocation={showMyLocation}
                />
            </APIProvider>
        </div>
    );
}

function mouseClickEvent(e: MapMouseEvent, isDebug: boolean) {
    if (isDebug) {
        console.log(e.detail.latLng);
    }
}