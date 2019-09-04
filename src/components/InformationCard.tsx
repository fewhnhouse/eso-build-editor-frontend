import React from "react"
import styled from "styled-components"
import Flex from "./Flex"
import { Avatar, Typography } from "antd"

interface IInformationCardProps {
  icon: string
  title: string
  description: string | number
}

const FlexCard = styled(Flex)`
  padding: 10px;
  border: 1px solid rgb(232, 232, 232);
  border-radius: 2px;
  background: white;
`

export default ({ icon, title, description }: IInformationCardProps) => {
  return (
    <FlexCard direction="row">
      <Avatar icon={icon} shape="square" />
      <Flex align="flex-start" style={{ marginLeft: 10 }} direction="column">
        <Typography.Text
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          strong
        >
          {title}
        </Typography.Text>
        <Typography.Text
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {description}
        </Typography.Text>
      </Flex>
    </FlexCard>
  )
}
