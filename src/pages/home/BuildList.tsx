import React, { useState } from 'react'
import { List, Avatar, Skeleton, Button } from 'antd'
import styled from 'styled-components'
import { Redirect } from 'react-router'
import { applicationAreas } from '../build/RaceAndClass/RaceClass'
import Scrollbars from 'react-custom-scrollbars'
import { useMediaQuery } from 'react-responsive'
import { IBuild } from '../build/BuildStateContext'

const ActionButton = styled(Button)`
  width: 50px;
`

const ListMeta = styled(List.Item.Meta)`
  padding: ${props => props.theme.paddings.small};
  text-align: start;
`

const ListItem = styled(List.Item)`
  padding: 0;
  margin: ${props => props.theme.margins.small};
`

const StyledList = styled(List)`
  background: white;
  border-bottom-left-radius: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '0px' : '10px'};
  border-bottom-right-radius: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '0px' : '10px'};
`

const StyledScrollbars = styled(Scrollbars)`
  height: calc(100% - 120px);
`

interface IOwnerProps {
  name: string
}

interface IBuildProps {
  id: number
  name: string
  esoClass: string
  race: string
  applicationArea: string
  owner: IOwnerProps
}

interface IUserDataProps {
  data: IBuild[]
  loading: boolean
}

const BuildCard = ({ data, loading }: IUserDataProps) => {
  const [path, setRedirect] = useState('')
  const handleClick = (path: string) => () => {
    setRedirect(path)
  }
  const isMobile = useMediaQuery({ maxWidth: 800 })

  if (path !== '') {
    return <Redirect push to={`${path}`} />
  }

  return (
    <StyledScrollbars>
      <StyledList
        isMobile={isMobile}
        loading={loading}
        dataSource={data}
        renderItem={(_, index: number) => {
          const build = data[index]
          const applicationArea = applicationAreas.find(
            area => area.key === build.applicationArea
          )
          return (
            <ListItem
              actions={[
                <ActionButton
                  onClick={handleClick(`/editBuild/${build.id}/0`)}
                  size='small'
                  type='default'
                  key='list-edit'
                >
                  Edit
                </ActionButton>,
                <ActionButton
                  onClick={handleClick(`/builds/${build.id}`)}
                  size='small'
                  type='primary'
                  key='list-view'
                >
                  View
                </ActionButton>,
              ]}
            >
              <ListMeta
                style={{ textAlign: 'start' }}
                avatar={
                  <Avatar
                    src={`${process.env.REACT_APP_IMAGE_SERVICE}/classes/${build.esoClass}.png`}
                  />
                }
                title={build.name || ''}
                description={applicationArea?.label || ''}
              />
            </ListItem>
          )
        }}
      />
    </StyledScrollbars>
  )
}

export default BuildCard
