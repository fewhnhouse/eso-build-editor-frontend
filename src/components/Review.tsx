import React from 'react'
import styled, { withTheme, ThemeProps } from 'styled-components'
import { ITheme } from './globalStyles'
import { IBuildState } from '../pages/build/BuildStateContext'
import { IRole, IRaidState } from '../pages/raid/RaidStateContext'
import BuildReviewDetails from '../pages/build/Review/BuildReviewDetails'
import RaidReviewDetails from '../pages/raid/Review/RaidReviewDetails'
import { Layout, Typography, Button, Spin, Popconfirm, Divider } from 'antd'

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
  margin: 10px;
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
    `calc(100vh - ${props.isMobile ? '204px' : '144px'})`};
  color: rgb(155, 155, 155);
`
interface IReviewProps extends ThemeProps<ITheme> {
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
          <Spin style={{ marginTop: 5 }} />
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
          <Footer
            style={{
              height: isMobile ? 140 : 80,
              padding: '0px 20px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 -2px 6px 0 rgba(0, 0, 0, 0.1)',
            }}
          >
            <Scrollbars autoHide>
              <Flex
                direction='row'
                justify='flex-start'
                align='center'
                style={{ height: 80 }}
              >
                <Flex
                  direction='column'
                  align='flex-start'
                  style={{ width: 200 }}
                >
                  <Typography.Title
                    style={{
                      marginBottom: 0,
                      width: 180,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                    level={3}
                  >
                    {name}
                  </Typography.Title>
                  <Typography.Text
                    style={{
                      whiteSpace: 'nowrap',
                      width: 180,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {description}
                  </Typography.Text>
                </Flex>
                <Divider
                  type='vertical'
                  style={{ height: 50, margin: '0px 20px' }}
                />
                <InformationCard
                  icon='user'
                  title='Owner'
                  description={owner ? owner.name : ''}
                />
                <Divider
                  type='vertical'
                  style={{ height: 50, margin: '0px 20px' }}
                />
                <InformationCard
                  icon='environment'
                  title='Application Area'
                  description={area ? area.label : ''}
                />
                <Divider
                  type='vertical'
                  style={{ height: 50, margin: '0px 20px' }}
                />
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
                    <Divider
                      type='vertical'
                      style={{ height: 50, margin: '0px 20px' }}
                    />
                  </>
                )}
                <InformationCard
                  icon={published ? 'unlock' : 'lock'}
                  title='Access Rights'
                  description={published ? 'Public' : 'Private'}
                />
              </Flex>
            </Scrollbars>
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
          </Footer>
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

export default withTheme(Review)
