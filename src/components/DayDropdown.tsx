import NavDropdown from 'react-bootstrap/NavDropdown';
import {Dispatch, SetStateAction} from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import styled from "styled-components";

type Props = {
    selectedDay: string;
    setSelectedDay: Dispatch<SetStateAction<string>>;
    showCaseys: boolean,
    setShowCaseys: Dispatch<SetStateAction<boolean>>;
    showMyLocation: boolean,
    setShowMyLocation: Dispatch<SetStateAction<boolean>>;
};

const CheckBoxDiv = styled.div`
  margin-left: 10px;
`;

export function DayDropdown({selectedDay, setSelectedDay, showCaseys, setShowCaseys, showMyLocation, setShowMyLocation}: Props) {
    const changeDay = function (day: string) {
        setSelectedDay(day);
    }
    return (
        <NavDropdown
            data-bs-theme="dark"
            title={selectedDay}
            drop={'down'}
            id={'dropdown-button-drop-down'}
            style={ {
             fontSize: "x-large"
            }}
        >
            <NavDropdown.Item onClick={() => changeDay("Sunday")}>Sunday</NavDropdown.Item>
            <NavDropdown.Item onClick={() => changeDay("Monday")}>Monday</NavDropdown.Item>
            <NavDropdown.Item onClick={() => changeDay("Tuesday")}>Tuesday</NavDropdown.Item>
            <NavDropdown.Item onClick={() => changeDay("Wednesday")}>Wednesday</NavDropdown.Item>
            <NavDropdown.Item onClick={() => changeDay("Thursday")}>Thursday</NavDropdown.Item>
            <NavDropdown.Item onClick={() => changeDay("Friday")}>Friday</NavDropdown.Item>
            <NavDropdown.Item onClick={() => changeDay("Saturday")}>Saturday</NavDropdown.Item>
            <Dropdown.Divider/>
            <CheckBoxDiv>
                <Form>
                    <Form.Check
                        label={"Show Casey's"}
                        onChange={(e) => {
                            setShowCaseys(e.target.checked);
                        }}
                    />
                </Form>
            </CheckBoxDiv>
            <CheckBoxDiv>
                <Form>
                    <Form.Check
                        label={"Show my location"}
                        onChange={(e) => {
                            setShowMyLocation(e.target.checked);
                        }}
                    />
                </Form>
            </CheckBoxDiv>

        </NavDropdown>
    );
}