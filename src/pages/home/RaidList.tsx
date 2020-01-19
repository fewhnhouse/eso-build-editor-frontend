import React, { useState } from 'react'
import { List, Divider, Icon, Button } from 'antd'
import styled from 'styled-components'
import { applicationAreas } from '../raid/general/RaidGeneral'
import Scrollbars from 'react-custom-scrollbars'
import { useMediaQuery } from 'react-responsive'
import { Redirect } from 'react-router'

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

interface IRaidRoleProps {
  builds: IBuildProps[]
}

interface IRaidProps {
  id: number
  name: string
  applicationArea: string
  owner: IOwnerProps
  roles: IRaidRoleProps[]
}

interface IUserDataProps {
  data: IRaidProps[]
  loading: boolean
  onCardClick?: any
}

const RaidCard = ({ data, loading, onCardClick }: IUserDataProps) => {
  const isMobile = useMediaQuery({ maxWidth: 800 })
  const [path, setRedirect] = useState('')

  const handleClick = (path: string) => () => {
    setRedirect(path)
  }

  if (path) {
    return <Redirect push to={`${path}`} />
  }
  return (
    <StyledScrollbars>
      <StyledList
        isMobile={isMobile}
        loading={loading}
        dataSource={data}
        renderItem={(item, index) => {
          const raid = data[index]
          const applicationArea = applicationAreas.find(
            area => area.key === raid.applicationArea
          )
          const size = raid.roles.reduce((prev, curr) => {
            return prev + curr.builds.length
          }, 0)
          return (
            <ListItem
              actions={[
                <ActionButton
                  onClick={handleClick(`/editRaid/${raid.id}/0`)}
                  size='small'
                  type='default'
                  key='list-edit'
                >
                  Edit
                </ActionButton>,
                <ActionButton
                  onClick={handleClick(`/raids/${raid.id}`)}
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
                title={
                  <>
                    <Icon type='team' />
                    {size}
                    <Divider type='vertical' />
                    {raid.name || ''}
                  </>
                }
                description={applicationArea?.label || ''}
              />
            </ListItem>
          )
        }}
      />
    </StyledScrollbars>
  )
}

export default RaidCard
