import {BarDetailRecords, BarTown} from "./BarDetails";
import prodData from './2024_route.json';
import caseysData from './2024_caseys.json';

export type DayRoute = {
    view: MapView;
    towns: Array<BarTown>;
    waypoints: Array<google.maps.LatLngLiteral>;
    bars: BarDetailRecords;
};

export type MapView = {
    position: google.maps.LatLngLiteral;
    zoom: number;
}

export type DayRouteRecords = Record<string, DayRoute>;

// TODO: replace this test data with an actual file/backend
export async function defaultRoutes(): Promise<DayRouteRecords> {
    return prodData;
}

export async function caseysLocations(): Promise<CaseysData> {
    return caseysData;
}

export type CaseysData = {
    caseys: Array<CaseysLocation>;
}
export type CaseysLocation = {
    lat: number;
    lng: number;
}