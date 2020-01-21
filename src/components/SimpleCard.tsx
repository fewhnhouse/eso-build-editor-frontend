import React from 'react'
import { Icon, Card, Avatar } from 'antd'
import styled from 'styled-components'
import { IBuild } from '../pages/build/BuildStateContext'
import { IRaid } from '../pages/raid/RaidStateContext'
import { IGroupState } from '../pages/group/GroupStateContext'

const BuildCard = styled(Card)`
  margin: ${props => `0px ${props.theme.margins.small}`};
  width: 300px;
  height: 170px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Description = styled.p`
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: break-spaces;
  margin: 0;
`

interface ISimpleCardProps {
  item?: IBuild | IRaid | IGroupState
  onEditRedirect: () => void
  onOpenRedirect: () => void
  imageSrc?: string
}
export default ({
  item,
  onEditRedirect,
  onOpenRedirect,
  imageSrc,
}: ISimpleCardProps) => {
  return item ? (
    <BuildCard
      actions={[
        <Icon
          onClick={onEditRedirect}
          key='simple-card-edit'
          type='edit'
          title='Edit'
        />,
        <Icon
          onClick={onOpenRedirect}
          key='simple-card-open'
          type='select'
          title='Open'
        />,
      ]}
    >
      <Card.Meta
        avatar={
          imageSrc && (
            <Avatar
              src={`${process.env.REACT_APP_IMAGE_SERVICE}/classes/${imageSrc}.png`}
            />
          )
        }
        title={item.name}
        description={<Description>{item.description}</Description>}
      />
    </BuildCard>
  ) : null
}
