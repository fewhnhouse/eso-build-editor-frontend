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
  margin: 10px;
  width: 90%;
  max-width: 400px;
`

const StyledList = styled(List)`
  background: white;
  border-bottom-left-radius: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '0px' : '10px'};
  border-bottom-right-radius: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '0px' : '10px'};
`

const StyledImg = styled.img`
  width: 25px;
  height: 25px;
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
    <Scrollbars style={{ height: 'calc(100% - 120px)' }}>
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
            <List.Item style={{ justifyContent: 'center' }}>
              <StyledCard
                key={build.id}
                hoverable
                onClick={handleClick(`/builds/${build.id}`)}
              >
                <Title>
                  {build.name ? build.name : 'Unnamed build'}
                  <Text style={{ fontWeight: 'normal' }} />
                </Title>
                <Divider style={{ margin: '5px 0px' }} />

                <Description>
                  <StyledImg
                    style={{ marginRight: '5px' }}
                    src={`${process.env.REACT_APP_IMAGE_SERVICE}/classes/${build.esoClass}.png`}
                  />
                  {build.esoClass}
                  <StyledImg
                    style={{ marginLeft: '10px', marginRight: '5px' }}
                    src={`${process.env.REACT_APP_IMAGE_SERVICE}/races/${build.race}.png`}
                  />
                  {build.race}
                  <Divider style={{ margin: '5px 0px' }} />
                  {applicationArea ? applicationArea.label : ''}
                </Description>
              </StyledCard>
            </List.Item>
          )
        }}
      />
    </Scrollbars>
  )
}

export default BuildCard
