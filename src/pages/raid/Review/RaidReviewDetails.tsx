import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import Flex from '../../../components/Flex'
import { Card, Typography, Divider } from 'antd'
import { IRaidState, IRole } from '../RaidStateContext'
import { Redirect } from 'react-router'
import BuildCard from '../builds/BuildCard'
import InformationCard from '../../../components/InformationCard'
import { applicationAreas } from '../general/RaidGeneral'
import { useMediaQuery } from 'react-responsive'
import Scrollbars from 'react-custom-scrollbars'
import { AppContext } from '../../../components/AppContainer'
import BuildReview from '../../build/Review/BuildReview'

const { Title } = Typography

const Wrapper = styled(Flex)`
  padding: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '0px' : '20px'};
`

const RaidContent = styled(Flex)`
  width: 100%;
  flex-wrap: wrap;
  padding: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '0px' : '20px'};
  flex: 1;
  max-height: ${(props: { local?: boolean; isMobile: boolean }) =>
    props.isMobile ? '' : props.local ? '80%' : '90%'};
`

const RaidContentList = styled(Flex)`
  flex-wrap: nowrap;
  padding: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '0px' : '20px'};
  flex: 1;
  max-height: ${(props: { local?: boolean; isMobile: boolean }) =>
    props.isMobile ? '' : props.local ? '80%' : '100%'};
`

const BuildInformation = styled(Card)`
  flex: 2;
  flex-wrap: wrap;
  overflow: ${(props: { isMobile: boolean }) =>
    props.isMobile ? 'hidden' : 'auto'};
  height: ${(props: { isMobile: boolean }) => (props.isMobile ? '' : '100%')};
  min-width: 370px;
`

const BuildInformationList = styled(Card)`
  height: 100%;
  flex: 1;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow: ${(props: { isMobile: boolean }) =>
    props.isMobile ? 'hidden' : 'auto'};
  height: ${(props: { isMobile: boolean }) => (props.isMobile ? '' : '100%')};
`

const BuildReviewList = styled(Flex)`
  flex: 2;
`

const CardList = styled(Flex)`
  flex-wrap: wrap;
  width: 100%;
`

const StyledFlex = styled(Flex)`
  width: 100%;
`

const StyledDivider = styled(Divider)`
  height: 50px;
  margin: 0px ${props => props.theme.margins.medium};
`

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`

interface IRaidReviewDetailsProps {
  loadedData: IRaidState
  local?: boolean
  isListView?: boolean
}

const RaidReviewDetails = ({
  loadedData,
  local,
  isListView,
}: IRaidReviewDetailsProps) => {
  const { name, roles, applicationArea, description, published } = loadedData
  const [path] = useState('')
  const area = applicationAreas.find(area => area.key === applicationArea)

  const isMobile = useMediaQuery({ maxWidth: 800 })
  const [, appDispatch] = useContext(AppContext)
  useEffect(() => {
    appDispatch!({
      type: 'SET_HEADER_SUBTITLE',
      payload: { headerSubTitle: name },
    })
  }, [name, appDispatch])
  if (path !== '') {
    return <Redirect push to={`${path}`} />
  } else {
    return isListView ? (
      <StyledDiv>
        <RaidContentList
          isMobile={isMobile}
          local={local}
          direction='row'
          align='flex-start'
        >
          <BuildInformationList
            bodyStyle={{ padding: isMobile ? '0px' : '24px' }}
            isMobile={isMobile}
            title={<Title level={2}>Builds</Title>}
          >
            {roles.map((role, index) => {
              return (
                <React.Fragment key={index}>
                  <Divider>
                    <Title level={3}>{role.name}</Title>
                  </Divider>
                  <CardList direction='column' justify='space-around'>
                    {role.builds.map((build, index) => {
                      return (
                        <BuildCard
                          isListView={isListView}
                          item={build.build}
                          draggable={false}
                          key={index}
                        />
                      )
                    })}
                  </CardList>
                </React.Fragment>
              )
            })}
          </BuildInformationList>
          <BuildReviewList direction='column'>
            <BuildReview />
          </BuildReviewList>
        </RaidContentList>
      </StyledDiv>
    ) : (
      <Scrollbars autoHide disabled={!isMobile}>
        <Wrapper
          isMobile={isMobile}
          direction='column'
          fluid
          justify='flex-start'
        >
          <StyledFlex direction='column' align='center' justify='center'>
            {!isMobile && <Typography.Title>{name}</Typography.Title>}

            {local && (
              <Flex direction='row'>
                <InformationCard
                  icon='edit'
                  title='Description'
                  description={description}
                />
                <StyledDivider type='vertical' />
                <InformationCard
                  icon='environment'
                  title='Application Area'
                  description={area ? area.label : ''}
                />
                <StyledDivider type='vertical' />
                <InformationCard
                  icon='team'
                  title='Group Size'
                  description={roles.reduce(
                    (prev: number, curr: IRole) => prev + curr.builds.length,
                    0
                  )}
                />
                <StyledDivider type='vertical' />
                <InformationCard
                  icon={published ? 'unlock' : 'lock'}
                  title='Access Rights'
                  description={published ? 'Public' : 'Private'}
                />
              </Flex>
            )}
          </StyledFlex>
          <RaidContent
            isMobile={isMobile}
            local={local}
            direction='row'
            align='flex-start'
          >
            <BuildInformation
              bodyStyle={{ padding: isMobile ? '0px' : '24px' }}
              isMobile={isMobile}
              title={<Title level={2}>Builds</Title>}
            >
              {roles.map((role, index) => {
                return (
                  <React.Fragment key={index}>
                    <Divider>
                      <Title level={3}>{role.name}</Title>
                    </Divider>
                    <CardList direction='row' justify='space-around'>
                      {role.builds.map((build, index) => {
                        return (
                          <BuildCard
                            item={build.build}
                            draggable={false}
                            key={index}
                          />
                        )
                      })}
                    </CardList>
                  </React.Fragment>
                )
              })}
            </BuildInformation>
          </RaidContent>
        </Wrapper>
      </Scrollbars>
    )
  }
}
export default RaidReviewDetails
