import React, { useState } from 'react'
import { List, Card, Typography, Divider } from 'antd'
import styled from 'styled-components'
import { Redirect } from 'react-router'
import { applicationAreas } from '../build/RaceAndClass/RaceClass'
import Scrollbars from 'react-custom-scrollbars'
import { useMediaQuery } from 'react-responsive'

const { Text } = Typography

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

const StyledScrollbars = styled(Scrollbars)`
  height: calc(100% - 120px);
`

const StyledListItem = styled(List.Item)`
  justify-content: center;
`

const StyledImg = styled.img`
  width: 25px;
  height: 25px;
  margin-right: ${props => props.theme.margins.mini};
`

const StyledImgSpace = styled.img`
  width: 25px;
  height: 25px;
  margin-left: ${props => props.theme.margins.small};
  margin-right: ${props => props.theme.margins.mini};
`

const StyledNormalText = styled(Text)`
  font-weight: normal;
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

interface IUserDataProps {
  data: IBuildProps[]
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
        renderItem={(item, index: number) => {
          const build = data[index]
          const applicationArea = applicationAreas.find(
            area => area.key === build.applicationArea
          )
          return (
            <StyledListItem>
              <StyledCard
                key={build.id}
                hoverable
                onClick={handleClick(`/builds/${build.id}`)}
              >
                <Title>
                  {build.name ? build.name : 'Unnamed build'}
                  <StyledNormalText />
                </Title>
                <StyledDivider />

                <Description>
                  <StyledImg
                    src={`${process.env.REACT_APP_IMAGE_SERVICE}/classes/${build.esoClass}.png`}
                  />
                  {build.esoClass}
                  <StyledImgSpace
                    src={`${process.env.REACT_APP_IMAGE_SERVICE}/races/${build.race}.png`}
                  />
                  {build.race}
                  <StyledDivider />
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

export default BuildCard
