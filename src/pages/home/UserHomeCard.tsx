import React, { useState } from "react";
import { List, Card } from "antd";
import styled from "styled-components";
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

interface IBuildProps {
    id: number,
    name: string,
    esoClass: string,
    race: string,
    applicationArea: string
}

interface IRaidProps {
    id: number,
    name: string,
    applicationArea: string
}

interface IUserDataProps {
    userBuildData?: IBuildProps[],
    userRaidData?: IRaidProps[]
};

const UserHomeCard = ({userBuildData, userRaidData}: IUserDataProps) => {

    const [path, setRedirect] = useState("");
    const handleClick = ( path: string) => {
        setRedirect(path);
    }

    if (path !== "") {
        return (
            <Redirect push to={`${path}`} />
        )
    } else {
        if (userBuildData) {
            return (
                <StyledList
                    dataSource={userBuildData}
                    renderItem={ (item, index) => {
                        const find = userBuildData[index];
                        return (
                            <List.Item style={{justifyContent: "center"}}>
                                <StyledCard key={find.id} title={find.name} hoverable onClick={() => handleClick(`/editBuild/${find.id}/0`)}>
                                    Build id: {find.id}<br />{find.applicationArea} {find.race} {find.esoClass}
                                </StyledCard>
                            </List.Item>
                        );
                    }}>
                </StyledList>
            )
        } else if (userRaidData) {
            return (
                <StyledList
                    dataSource={userRaidData}
                    renderItem={ (item, index) => {
                        const find = userRaidData[index];
                        return (
                            <List.Item style={{justifyContent: "center"}}>
                                <StyledCard key={find.id} title={find.name} hoverable onClick={() => handleClick(`/raidreview/${find.id}`)}>
                                    Raid id: {find.id}<br />{find.applicationArea}
                                </StyledCard>
                            </List.Item>
                        );
                    }}>
                </StyledList>
            )
        }
    } return null;
}

export default UserHomeCard;