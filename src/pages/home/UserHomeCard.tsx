import React from "react";
import { List, Card } from "antd";
import styled from "styled-components";
import { IBuildState } from "../build/BuildStateContext";

const StyledCard = styled(Card)`
    background-color: #e8e8e8;
    width: 90%;
    min-width: 250px;
`

const StyledList = styled(List)`
    overflow-y: scroll;
    background-color: #d1d1d1;
    height: 500px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
`

interface IBuildProps extends IBuildState {
    id: number,
    name: string,
    esoClass: string,
    race: string,
    applicationArea: string
}

interface IUserBuildsProps {
    userBuilds: IBuildProps[]
};

const UserHomeCard = ({userBuilds}: IUserBuildsProps) => {
    return (
        <StyledList
            dataSource={userBuilds}
            renderItem={ (item, index) => {
                const find = userBuilds[index];
                return (
                    <List.Item style={{justifyContent: "center"}}>
                        <StyledCard key={find.id} title={find.name} hoverable>
                            Build id: {find.id}<br />{find.applicationArea} {find.race} {find.esoClass}
                        </StyledCard>
                    </List.Item>
                );
            }}>
        </StyledList>
    )
}

export default UserHomeCard;