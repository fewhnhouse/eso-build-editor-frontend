import React, { useState } from "react";
import { List, Card } from "antd";
import styled from "styled-components";
import { IBuildState } from "../build/BuildStateContext";
import { Redirect } from "react-router";

const StyledCard = styled(Card)`
    background-color: #e8e8e8;
    width: 90%;
    min-width: 250px;
`

const StyledList = styled(List)`
    overflow-y: scroll;
    height: 300px;
    background: white;
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

    const [clickID, setIDRedirect] = useState(0);

    const handleClick = (id: number) => {
        setIDRedirect(id);
    }

    if (clickID !== 0) {
        return (
            <Redirect push to={`/details/${clickID}`} />
        )
    } else {
        return (
            <StyledList
                dataSource={userBuilds}
                renderItem={ (item, index) => {
                    const find = userBuilds[index];
                    return (
                        <List.Item style={{justifyContent: "center"}}>
                            <StyledCard key={find.id} title={find.name} hoverable onClick={() => handleClick(find.id)}>
                                Build id: {find.id}<br />{find.applicationArea} {find.race} {find.esoClass}
                            </StyledCard>
                        </List.Item>
                    );
                }}>
            </StyledList>
        )
    }
}

export default UserHomeCard;