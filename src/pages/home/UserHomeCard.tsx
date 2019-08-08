import React from "react";
import { List, Card } from "antd";
import styled from "styled-components";
import { IBuildState } from "../build/BuildStateContext";

const StyledCard = styled(Card)`
    width: 350px;
    margin-left: 20px;
    margin-right: 20px;
`

interface IBuildProps extends IBuildState {
    id: number
}

interface IUserBuildsProps {
    userBuilds: IBuildProps[]
};

const UserHomeCard = ({userBuilds}: IUserBuildsProps) => {
    return (
        <List style={{width: "100%", maxHeight: "500px", overflowY: "scroll"}}
            dataSource={userBuilds}
            renderItem={ (item, index) => {
                const find = userBuilds[index];
                return (
                    <List.Item style={{justifyContent: "center"}}>
                        <StyledCard key={find.id} title={find.name} hoverable>
                            {find.race} {find.esoClass}
                        </StyledCard>
                    </List.Item>
                );
            }}>
        </List>
    )
}

export default UserHomeCard;