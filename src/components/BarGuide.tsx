import React, {useEffect, useState} from "react";
import {CaseysData, caseysLocations, DayRouteRecords, defaultRoutes} from "./DayRoute";
import {AppHeader} from "./AppHeader";
import {DailyMap} from "./DailyMap";
import {BarFocus} from "./BarFocus";
import {BarList} from "./BarList";

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
export function BarGuide() {
    const [routes, setRoutes] = useState<DayRouteRecords>();
    const [caseys, setCaseys] = useState<CaseysData>();
    const [showCaseys, setShowCaseys] = useState<boolean>(false);
    const [showMyLocation, setShowMyLocation] = useState<boolean>(false);
    const [selectedDay, setSelectedDay] = useState<string>(weekday[new Date().getDay()]);
    const [selectedBar, setSelectedBar] = useState<string>("");
    useEffect(() => {
        defaultRoutes().then(fetchedRoutes => {
            setRoutes(fetchedRoutes);
        });
        caseysLocations().then(data => {
            setCaseys(data);
        });
        return () => {
        }
    }, [routes]);
    if (!routes || !caseys) {
        return null
    }
    let dayRoute = routes[selectedDay];
    if (!dayRoute) {
        console.error("unable to find day route for " + selectedDay);
        return null
    }
    const barDetails = dayRoute.bars[selectedBar];
    let barFocus = null;
    if (barDetails) {
        barFocus = (<BarFocus
            selectedBar={selectedBar}
            setSelectedBar={setSelectedBar}
            barDetails={barDetails}
        />);
    } else {
        barFocus = <BarList setSelectedBar={setSelectedBar} barDetails={dayRoute.bars} barTowns={dayRoute.towns}/>
    }

    return (
        <div className="App">
            <AppHeader
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
                showCaseys={showCaseys}
                setShowCaseys={setShowCaseys}
                showMyLocation={showMyLocation}
                setShowMyLocation={setShowMyLocation}
            />
            <DailyMap
                selectedDay={selectedDay}
                dayRoute={dayRoute}
                selectedBar={selectedBar}
                showCaseys={showCaseys}
                setSelectedBar={setSelectedBar}
                showMyLocation={showMyLocation}
                caseys={caseys}
            />
            {barFocus}
        </div>
    );
}
