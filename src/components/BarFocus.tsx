import {BarDetails} from "./BarDetails";
import CloseButton from 'react-bootstrap/CloseButton';
import styled from "styled-components";
import {Dispatch, SetStateAction} from "react";
import {Button} from "react-bootstrap";

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;

type Props = {
    selectedBar: string,
    setSelectedBar: Dispatch<SetStateAction<string>>;
    barDetails: BarDetails,
};

const BarFocusDiv = styled.div`
  padding-top: 10px;
  width: 100%;
`;
const BarNameDiv = styled.div`
  font-size: x-large;
`;
const BarFocusCloseDiv = styled.div`
  text-align: right;
`;
const BarAddressDiv = styled.div`
  font-size: x-small;
`;
const BarCommentDiv = styled.div`
  font-size: medium;
`;

export function BarFocus({selectedBar, setSelectedBar, barDetails}: Props) {
    if (!barDetails) {
        return null;
    }
    let img = null;

    if (barDetails.image) {
        const imageSrc = "assets/images/" + barDetails.image
        console.log("showing image at: " + imageSrc)
        // const image = require(imageSrc);
        img = (<img src={imageSrc}/>);
    } else if (barDetails.photoRef) {
        let imageSrc = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&key=" + API_KEY + "&photo_reference=" + barDetails.photoRef;
        img = (<img src={imageSrc}/>);
    }

    return (
        <BarFocusDiv>
            <BarFocusCloseDiv><CloseButton onClick={() => setSelectedBar("")}/></BarFocusCloseDiv>
            <BarNameDiv>{barDetails.name}</BarNameDiv>
            <BarAddressDiv>{barDetails.address}</BarAddressDiv>
            <BarCommentDiv>{barDetails.comments}</BarCommentDiv>
            <div className={"rounded"}>{img}</div>
        </BarFocusDiv>
    );
}