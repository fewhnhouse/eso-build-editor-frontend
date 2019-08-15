import React, { useState } from "react";
import { List, Card, Divider, Typography } from "antd";
import styled from "styled-components";
import { Redirect } from "react-router";

const { Text } = Typography;

const Description = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: ${(props: { newEffect?: boolean }) =>
    props.newEffect ? '#2ecc71' : 'rgba(0, 0, 0, 0.45)'};
  text-align: left;
`

const Title = styled.div`
  font-size: 16px;
  line-height: 1.5;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
`


const StyledCard = styled(Card)`
  border-color: rgb(232, 232, 232);
  background: 'white';
  border-width: 2px;
  margin: 10px;
  width: 90%;
  max-width: 400px;
`

const StyledList = styled(List)`
    overflow-y: scroll;
    height: 300px;
    background: white;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
`

const StyledImg = styled.img`
    width: 25px;
    height: 25px;
`

interface IOwnerProps {
    name: string
}

interface IBuildProps {
    id: number,
    name: string,
    esoClass: string,
    race: string,
    applicationArea: string,
    owner: IOwnerProps
}

interface IRaidRoleProps {
    builds: IBuildProps[]
}

interface IRaidProps {
    id: number,
    name: string,
    applicationArea: string,
    owner: IOwnerProps,
    roles: IRaidRoleProps[]
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
                                <StyledCard key={find.id} hoverable onClick={() => handleClick(`/editBuild/${find.id}/0`)}>
                                    <Title>{find.name? find.name : "Unnamed build"} <Text style={{fontWeight: "normal"}}>{find.applicationArea}</Text></Title>
                                    <Description>
                                        <StyledImg src={`${process.env.REACT_APP_IMAGE_SERVICE}/classes/${find.esoClass}.png`} /> {find.esoClass}
                                        <StyledImg style={{marginLeft: "10px"}} src={`${process.env.REACT_APP_IMAGE_SERVICE}/races/${find.race}.png`} /> {find.race}
                                        <br />
                                        Created by {find.owner.name}
                                    </Description>
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
                                <StyledCard key={find.id} hoverable onClick={() => handleClick(`/editRaid/${find.id}/0`)}>
                                    <Title>{find.name? find.name : "Unnamed raid"} <Text style={{fontWeight: "normal"}}>{find.applicationArea}</Text></Title>
                                    <Description>
                                        Group size: {find.roles.reduce( (prev,curr)=> prev+curr.builds.length, 0)}<br />
                                        Created by {find.owner.name}
                                    </Description>
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