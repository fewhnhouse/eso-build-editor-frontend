import React, { useState } from 'react'
import { List, Card, Typography, Divider, Icon } from 'antd'
import styled from 'styled-components'
import { Redirect } from 'react-router'
import { applicationAreas } from '../raid/general/RaidGeneral'
import Flex from '../../components/Flex'
import Scrollbars from 'react-custom-scrollbars'
import { useMediaQuery } from 'react-responsive'

const { Text } = Typography

const Description = styled.div`
  font-size: ${props => props.theme.fontSizes.small};
  line-height: 1.5;
  color: ${(props: { newEffect?: boolean }) =>
    props.newEffect ? '#2ecc71' : 'rgba(0, 0, 0, 0.45)'};
  text-align: left;
`

const Title = styled.div`
  font-size: ${props => props.theme.fontSizes.normal};
  line-height: 1.5;
  font-weight: 500;
  color: ${props => props.theme.colors.grey.dark};
  margin-bottom: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
`

const StyledCard = styled(Card)`
  border-color: ${props => props.theme.mainBorderColor};
  background: 'white';
  border-width: 2px;
  margin: ${props => props.theme.margins.small};
  width: 90%;
  max-width: ${props => props.theme.widths.medium};
`

const StyledList = styled(List)`
  background: white;
  border-bottom-left-radius: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '0px' : '10px'};
  border-bottom-right-radius: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '0px' : '10px'};
`

const StyledListItem = styled(List.Item)`
  justify-content: center;
`

const StyledScrollbars = styled(Scrollbars)`
  height: calc(100% - 120px);
`

const StyledDivider = styled(Divider)`
  margin: ${props => props.theme.margins.mini} 0px;
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
            <StyledListItem>
              <StyledCard
                key={raid.id}
                hoverable
                onClick={onCardClick(raid.id)}
              >
                <Title>
                  <Flex direction='row' justify='space-between'>
                    {raid.name ? raid.name : 'Unnamed raid'}
                    <Text>
                      <Icon type='team' />
                      {size}
                    </Text>
                  </Flex>
                </Title>
                <StyledDivider />
                <Description>
                  {applicationArea ? applicationArea.label : ''}
                </Description>
              </StyledCard>
            </StyledListItem>
          )
        }}
      />
    </StyledScrollbars>
  )
}

export default RaidCard
