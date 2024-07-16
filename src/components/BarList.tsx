import {BarDetailRecords, BarTown} from "./BarDetails";
import React, {Dispatch, SetStateAction} from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";


type Props = {
    day: string;
    setSelectedBar: Dispatch<SetStateAction<string>>;
    barTowns: Array<BarTown>,
    barDetails: BarDetailRecords,
};

const TownDiv = styled.div`
  color: white;
  margin: 2px;
  background: #000000;
`;
const BarDiv = styled.div`
  margin: 2px 1px;
  background: #e1caf8;

  &:hover {
    background: #ffffff;
  }
`;
const SponsorDiv = styled.div`
  margin: 2px 1px 30px;
  background: #00ccff;

  &:hover {
    background: #ffffff;
  }
`;
const BarNameDiv = styled.div`
  font-size: large;
`;
const BarCommentsDiv = styled.div`
`;

const BarTable = styled.table`
  width: 100%;
`;
const BarTr = styled.tr`
  width: 100%;
  vertical-align: top;
`;
const BarTd = styled.td`
  width: 50%;
`;

export function BarList({day, setSelectedBar, barTowns, barDetails}: Props) {
    const barList = [];
    if(day === "Saturday") {
        // TODO: cleanup this sponsor hack
        let sponsorId = "Valley Monster Pub-Burlington";
        const sponsor = barDetails[sponsorId]
        if(sponsor) {
            const sponsorLove = (<div key={sponsor.name}>
                <TownDiv><b>Visit our sponsor in Burlington today!</b></TownDiv>
                <BarDiv key={sponsorId} onClick={() => setSelectedBar(sponsorId)}>
                    <SponsorDiv>{sponsor.name}</SponsorDiv>
                    <BarCommentsDiv>{sponsor.comments}</BarCommentsDiv>
                </BarDiv>
            </div>)
            barList.push(sponsorLove);
        }
    }
    for (const [key, value] of Object.entries(barTowns)) {
        const barDivs = []
        const rightBarDivs = []
        let i = 0;
        for (const [_, barId] of Object.entries(value.bars)) {
            const bar = barDetails[barId];
            const barDiv = (<BarDiv key={barId} onClick={() => setSelectedBar(barId)}>
                <BarNameDiv>{bar.name}</BarNameDiv>
                {/*<BarCommentsDiv>{bar.comments}</BarCommentsDiv>*/}
            </BarDiv>)
            if(i % 2 === 0) {
                barDivs.push(barDiv);
            } else {
                rightBarDivs.push(barDiv);
            }
            i++;
        }
        const townDiv = (<div key={key}>
            <TownDiv><b>{value.name}</b></TownDiv>
            <BarTable>
                <BarTr>
                    <BarTd>{barDivs}</BarTd>
                    <BarTd>{rightBarDivs}</BarTd>
                </BarTr>
            </BarTable>
        </div>)
        barList.push(townDiv);
    }
    return (
        <Container>{barList}</Container>
    )
}
