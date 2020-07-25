import React from 'react'
import styled from 'styled-components'
import { IBuildState, IBuild } from '../pages/build/BuildStateContext'
import { IRole, IRaidState, IRaid } from '../pages/raid/RaidStateContext'
import BuildReviewDetails from '../pages/build/Review/BuildReviewDetails'
import RaidReviewDetails from '../pages/raid/Review/RaidReviewDetails'
import { Layout, Spin } from 'antd'
import {
  applicationAreas,
  accessRightOptions,
} from '../pages/build/RaceAndClass/RaceClass'
import ErrorPage from './ErrorPage'
import { useMediaQuery } from 'react-responsive'
import { ApolloError } from 'apollo-client'
import Footer from './Footer'
import {
  UnlockOutlined,
  LockOutlined,
  HighlightOutlined,
  EditOutlined,
  UserOutlined,
  EnvironmentOutlined,
  TeamOutlined,
} from '@ant-design/icons'

const { Content } = Layout

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
  color: ${(props) => props.theme.mainBg};
`

const StyledSpin = styled(Spin)`
  margin-top: ${(props) => props.theme.paddings.mini};
`

interface IReviewProps {
  local?: boolean
  data?: IBuild | IRaid
  me: {
    id: string
    name: string
  }
  loading: boolean
  dataError?: ApolloError
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
  dataError,
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
    if (dataError) {
      return <ErrorPage />
    }
    if (data) {
      const {
        name,
        owner,
        description,
        applicationArea,
        published,
        accessRights,
      } = data
      const area = applicationAreas.find((area) => area.key === applicationArea)
      const access = accessRightOptions.find((el) => el.key === accessRights)

      const information = [
        {
          Icon: HighlightOutlined,
          title: 'Title',
          description: name || '',
        },
        {
          Icon: EditOutlined,
          title: 'Description',
          description: description || '',
        },
        {
          Icon: UserOutlined,
          title: 'Owner',
          description: owner ? owner.name : '',
        },
        {
          Icon: EnvironmentOutlined,
          title: 'Application Area',
          description: area ? area.label : '',
        },
        ...(!isBuild
          ? [
              {
                Icon: TeamOutlined,
                title: 'Group Size',
                description: (data as IRaid).roles
                  .reduce(
                    (prev: number, curr: IRole) => prev + curr.builds.length,
                    0
                  )
                  .toString(),
              },
            ]
          : []),
        {
          icon: access
            ? access.Icon
            : published
            ? UnlockOutlined
            : LockOutlined,
          title: 'Access Rights',
          description: access ? access.label : published ? 'Public' : 'Private',
        },
      ]
      return (
        <>
          <Container isMobile={isMobile}>
            {isBuild ? (
              <BuildReviewDetails loadedData={data as IBuildState} />
            ) : (
              <RaidReviewDetails loadedData={data as IRaidState} />
            )}
          </Container>
          <Footer
            information={information}
            onCopy={onCopy}
            onEdit={onEdit}
            onDelete={onDelete}
            owner={owner}
            state={data as IBuildState | IRaidState}
            me={me}
            type={isBuild ? 'build' : 'raid'}
            loading={loading}
            saved={saved}
          />
        </>
      )
    } else {
      return null
    }
  } else {
    return isBuild ? (
      <BuildReviewDetails local loadedData={state as IBuildState} />
    ) : (
      <RaidReviewDetails local loadedData={state as IRaidState} />
    )
  }
}

export default Review
