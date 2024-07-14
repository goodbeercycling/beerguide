import {BarDetailRecords, BarTown} from "./BarDetails";
import React, {Dispatch, SetStateAction} from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";


type Props = {
    setSelectedBar: Dispatch<SetStateAction<string>>;
    barTowns: Array<BarTown>,
    barDetails: BarDetailRecords,
};

const TownDiv = styled.div`
  //border-width: 1px;
  //border-color: black;
  //border-style: solid;
  margin: 2px;
  background: #ffea00;
`;
const BarDiv = styled.div`
  border-width: 1px;
  border-color: black;
  border-style: solid;
  margin: 2px 1px;
  background: #ffffff;

  &:hover {
    background: #ffed5f;
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

export function BarList({setSelectedBar, barTowns, barDetails}: Props) {
    const barList = [];
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
            <TownDiv>{value.name}</TownDiv>
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
