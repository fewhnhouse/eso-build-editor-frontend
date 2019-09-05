import React from 'react'
import styled from 'styled-components'
import { IBuildState } from '../pages/build/BuildStateContext'
import { IRole, IRaidState } from '../pages/raid/RaidStateContext'
import BuildReviewDetails from '../pages/build/Review/BuildReviewDetails'
import RaidReviewDetails from '../pages/raid/Review/RaidReviewDetails'
import { Layout, Button, Spin, Popconfirm, Divider } from 'antd'

import Flex from './Flex'
import InformationCard from './InformationCard'
import { applicationAreas } from '../pages/build/RaceAndClass/RaceClass'
import ErrorPage from './ErrorPage'
import Scrollbars from 'react-custom-scrollbars'
import { useMediaQuery } from 'react-responsive'
import { ApolloError } from 'apollo-client'

const { Content, Footer } = Layout

const ActionButton = styled(Button)`
  width: 100px;
  margin: ${props => props.theme.margins.small};
`

const Container = styled(Content)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: ${(props: { isMobile: boolean }) =>
    `calc(100% - ${props.isMobile ? '204px' : '144px'})`};
  color: ${props => props.theme.mainBg};
`

const StyledScrollbars = styled(Scrollbars)`
  height: 80px !important;
`

const StyledFooter = styled(Footer)`
  height: ${(props: { isMobile: boolean }) =>
    `${props.isMobile ? '140px' : '80px'}`};
  flex-direction: ${(props: { isMobile: boolean }) =>
    `${props.isMobile ? 'column' : 'row'}`};
  display: flex;
  padding: 0px ${props => props.theme.paddings.medium};
  overflow: hidden;
  justify-content: center;
  align-items: center;
  box-shadow: 0 -2px 6px 0 rgba(0, 0, 0, 0.1);
`

const StyledFlex80 = styled(Flex)`
  height: 80px;
`

const StyledSpin = styled(Spin)`
  margin-top: ${props => props.theme.paddings.mini};
`

const StyledDivider = styled(Divider)`
  height: 50px;
  margin: 0px ${props => props.theme.paddings.medium};
`

interface IReviewProps {
  local?: boolean
  data: any
  me: {
    id: string
    name: string
  }
  loading: boolean
  error?: ApolloError
  onCopy: () => void
  onEdit: () => void
  onDelete: () => void
  isBuild: boolean
  saved: boolean
  state: IBuildState | IRaidState
}
const Review = ({
  local,
  data,
  me,
  loading,
  error,
  onCopy,
  onEdit,
  onDelete,
  isBuild,
  saved,
  state,
}: IReviewProps) => {
  const isMobile = useMediaQuery({ maxWidth: 800 })

  if (!local) {
    if (loading) {
      return (
        <Container isMobile={false}>
          <StyledSpin />
        </Container>
      )
    }
    if (error) {
      return <ErrorPage />
    }
    if (data && me) {
      const {
        name,
        owner,
        description,
        applicationArea,
        roles,
        published,
      } = data
      const area = applicationAreas.find(area => area.key === applicationArea)

      return (
        <>
          <Container isMobile={isMobile}>
            {isBuild ? (
              <BuildReviewDetails loadedData={data} />
            ) : (
              <RaidReviewDetails loadedData={data} />
            )}
          </Container>
          <StyledFooter isMobile={isMobile}>
            <StyledScrollbars autoHide>
              <StyledFlex80 direction='row' justify='flex-start' align='center'>
                <InformationCard
                  icon='highlight'
                  title='Title'
                  description={name || ''}
                />
                <StyledDivider type='vertical' />
                <InformationCard
                  icon='edit'
                  title='Description'
                  description={description || ''}
                />
                <StyledDivider type='vertical' />
                <InformationCard
                  icon='user'
                  title='Owner'
                  description={owner ? owner.name : ''}
                />
                <StyledDivider type='vertical' />
                <InformationCard
                  icon='environment'
                  title='Application Area'
                  description={area ? area.label : ''}
                />
                <StyledDivider type='vertical' />
                {!isBuild && (
                  <>
                    <InformationCard
                      icon='team'
                      title='Group Size'
                      description={roles.reduce(
                        (prev: number, curr: IRole) =>
                          prev + curr.builds.length,
                        0
                      )}
                    />
                    <StyledDivider type='vertical' />
                  </>
                )}
                <InformationCard
                  icon={published ? 'unlock' : 'lock'}
                  title='Access Rights'
                  description={published ? 'Public' : 'Private'}
                />
              </StyledFlex80>
            </StyledScrollbars>
            {(owner && owner.id) === (me && me.id) && (
              <Flex direction='row'>
                <Popconfirm
                  title={`Are you sure you want to copy this ${
                    isBuild ? 'Build' : 'Raid'
                  }?`}
                  onConfirm={onCopy}
                  okText='Yes'
                  cancelText='No'
                >
                  <ActionButton
                    loading={loading}
                    disabled={saved}
                    icon='copy'
                    size='large'
                    type='default'
                  >
                    Copy
                  </ActionButton>
                </Popconfirm>

                <ActionButton
                  onClick={onEdit}
                  icon='edit'
                  size='large'
                  type='primary'
                >
                  Edit
                </ActionButton>
                <Popconfirm
                  title={`Are you sure you want to delete this ${
                    isBuild ? 'Build' : 'Raid'
                  }?`}
                  onConfirm={onDelete}
                  okText='Yes'
                  cancelText='No'
                >
                  <ActionButton icon='delete' size='large' type='danger'>
                    Delete
                  </ActionButton>
                </Popconfirm>
              </Flex>
            )}
          </StyledFooter>
        </>
      )
    } else {
      return null
    }
  } else {
    return isBuild ? (
      <BuildReviewDetails local loadedData={state! as IBuildState} />
    ) : (
      <RaidReviewDetails local loadedData={state! as IRaidState} />
    )
  }
}

export default Review
