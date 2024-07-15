import {Dispatch, SetStateAction} from "react";
import {DayDropdown} from "./DayDropdown";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Button} from "react-bootstrap";

type Props = {
    selectedDay: string;
    setSelectedDay: Dispatch<SetStateAction<string>>;
    showCaseys: boolean,
    setShowCaseys: Dispatch<SetStateAction<boolean>>;
    showMyLocation: boolean,
    setShowMyLocation: Dispatch<SetStateAction<boolean>>;
};

export function AppHeader({
                              selectedDay,
                              setSelectedDay,
                              showCaseys,
                              setShowCaseys,
                              showMyLocation,
                              setShowMyLocation
                          }: Props) {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>TGB bar guide</Navbar.Brand>
                <Nav.Link href="https://www.teamgoodbeer.org/s/2024-Bar-Guide.pdf" target="_blank"
                          rel="noreferrer noopener">
                    <Button variant="outline-primary">Download PDF</Button>
                </Nav.Link>
                <DayDropdown
                    selectedDay={selectedDay}
                    setSelectedDay={setSelectedDay}
                    showCaseys={showCaseys}
                    setShowCaseys={setShowCaseys}
                    showMyLocation={showMyLocation}
                    setShowMyLocation={setShowMyLocation}
                />
            </Container>
        </Navbar>
    );
}
