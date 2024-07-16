import {Dispatch, SetStateAction} from "react";
import {DayDropdown} from "./DayDropdown";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Button} from "react-bootstrap";
import styled from "styled-components";
import Container from "react-bootstrap/Container";

type Props = {
    selectedDay: string;
    setSelectedDay: Dispatch<SetStateAction<string>>;
    showCaseys: boolean,
    setShowCaseys: Dispatch<SetStateAction<boolean>>;
    showMyLocation: boolean,
    setShowMyLocation: Dispatch<SetStateAction<boolean>>;
};

const TeamHeaderDiv = styled.div`
  width: 100%;
  font-size: x-large;
  text-align: justify-all;
  font-family: "Future Condensed",sans-serif;
`

const HeaderYearSpan = styled.span`
    color: #00ccff;
`

export function AppHeader({
                              selectedDay,
                              setSelectedDay,
                              showCaseys,
                              setShowCaseys,
                              showMyLocation,
                              setShowMyLocation
                          }: Props) {
    return (
        <div>
            <TeamHeaderDiv>
                <b><HeaderYearSpan>2024</HeaderYearSpan> GOOD BEER BAR GUIDE</b>
            </TeamHeaderDiv>
        <Navbar expand="lg" className="bg-body-tertiary">

            <Container>
                <DayDropdown
                    selectedDay={selectedDay}
                    setSelectedDay={setSelectedDay}
                    showCaseys={showCaseys}
                    setShowCaseys={setShowCaseys}
                    showMyLocation={showMyLocation}
                    setShowMyLocation={setShowMyLocation}
                />
                <Nav.Link href="https://www.teamgoodbeer.org/s/2024-Bar-Guide.pdf" target="_blank"
                          rel="noreferrer noopener">
                    <Button variant="primary"
                    style={ {
                        background: "#ce9cfd",
                        color: "white",
                        borderWidth: "0"
                    } }>Download PDF</Button>
                </Nav.Link>
            </Container>
        </Navbar>
        </div>
    );
}
