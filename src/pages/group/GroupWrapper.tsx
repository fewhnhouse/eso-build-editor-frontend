import React, { useEffect, useContext } from 'react'
import { RouteComponentProps } from 'react-router'
import { defaultGroupState } from './GroupStateContext'
import Group from './Group'
import { message, Spin } from 'antd'
import { AppContext } from '../../components/AppContainer'
import { useMediaQuery } from 'react-responsive'
import ErrorPage from '../../components/ErrorPage'
import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { group } from '../../util/fragments'

const GET_GROUP = gql`
  query group($id: ID!) {
    group(id: $id) {
      ...Group
    }
  }
  ${group}
`
// ${group}

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
`

const StyledSpin = styled(Spin)`
  margin-top: ${props => props.theme.margins.small};
`

interface IGroupWrapperProps
  extends RouteComponentProps<{ id: string; pageIndex: string }> {
  edit?: boolean
}

export default ({ edit, match }: IGroupWrapperProps) => {
  const { pageIndex, id } = match.params
  const actualPageIndex = parseInt(pageIndex || '0', 10)
  const isDesktopOrLaptop = useMediaQuery({
    minWidth: 900,
  })
  const [, appDispatch] = useContext(AppContext)
  const { loading, error, data } = useQuery(GET_GROUP, {
    variables: { id },
  })

  useEffect(() => {
    appDispatch!({
      type: 'SET_HEADER_TITLE',
      payload: { headerTitle: 'Group Editor' },
    })
    appDispatch!({
      type: 'SET_HEADER_SUBTITLE',
      payload: { headerSubTitle: '' },
    })
  }, [appDispatch])

  if (!isDesktopOrLaptop) {
    return (
      <ErrorPage
        status='warning'
        title='Unfortunately, editing groups is not supported on small screens yet.'
        subTitle='Please try opening this page on a bigger screen.'
      />
    )
  }
  if (edit) {
    if (loading) {
      return (
        <StyledDiv>
          <StyledSpin />
        </StyledDiv>
      )
    }
    if (error) {
      return <div>Error.</div>
    }
    if (data) {
      return (
        <Group
          initialGroupBuilds={data.group.groupBuilds}
          edit
          path={`/editGroup/${id}`}
          group={{ ...defaultGroupState, ...data.group }}
          pageIndex={actualPageIndex}
        />
      )
    }
    return null
  } else {
    return <NewGroup pageIndex={actualPageIndex} />
  }
}

interface INewGroupProps {
  pageIndex: number
}

const NewGroup = ({ pageIndex }: INewGroupProps) => {
  const savedGroupState = localStorage.getItem('groupState')
  useEffect(() => {
    try {
      const parsedGroupState = savedGroupState
        ? JSON.parse(savedGroupState)
        : false
      if (parsedGroupState) {
        message.info('Your settings have been restored.')
      }
    } catch (e) {
      console.error(e)
    }
  }, [savedGroupState])
  try {
    const parsedGroupState = JSON.parse(savedGroupState || '')
    return (
      <Group
        path='/groupEditor'
        group={parsedGroupState}
        pageIndex={pageIndex}
      />
    )
  } catch (e) {
    return (
      <Group
        path='/groupEditor'
        group={defaultGroupState}
        pageIndex={pageIndex}
      />
    )
  }
}
