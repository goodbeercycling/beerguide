import {DayRoute, defaultRoutes} from "./DayRoute";


it('converts to map types', async () => {
    const routes = await defaultRoutes();
    const route: DayRoute = routes["Thursday"];
    // expect(route.origin.lat).toEqual(41.6002055);
    // expect(route.destination.lat).toEqual(41.9711091);
    expect(route.waypoints.length).toEqual(8);
    expect(Object.values(route.bars).length).toEqual(13);
});

export {}