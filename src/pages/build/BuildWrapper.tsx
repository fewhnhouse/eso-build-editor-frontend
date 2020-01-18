import React, { useEffect, useContext } from 'react'
import { RouteComponentProps } from 'react-router'
import { useQuery } from 'react-apollo'
import Build from './Build'
import { Spin, message } from 'antd'
import { defaultBuildState } from './BuildStateContext'
import gql from 'graphql-tag'
import { build } from '../../util/fragments'
import { useMediaQuery } from 'react-responsive'
import ErrorPage from '../../components/ErrorPage'
import { AppContext } from '../../components/AppContainer'

const GET_BUILD = gql`
  query Build($id: ID!) {
    build(id: $id) {
      ...Build
    }
  }
  ${build}
`

interface IBuildWrapperProps
  extends RouteComponentProps<{ pageIndex: string; id: string }> {
  edit?: boolean
}
export default ({ edit, match }: IBuildWrapperProps) => {
  const { pageIndex, id } = match.params
  const actualPageIndex = parseInt(pageIndex || '0', 10)
  const isDesktopOrLaptop = useMediaQuery({
    minWidth: 1100,
  })
  const [, appDispatch] = useContext(AppContext)

  useEffect(() => {
    appDispatch!({
      type: 'SET_HEADER_TITLE',
      payload: { headerTitle: 'Build Editor' },
    })
    appDispatch!({
      type: 'SET_HEADER_SUBTITLE',
      payload: { headerSubTitle: '' },
    })
  }, [appDispatch])

  const { loading, error, data } = useQuery(GET_BUILD, {
    variables: { id: id },
  })
  if (!isDesktopOrLaptop) {
    return (
      <ErrorPage
        status='warning'
        title='Unfortunately, editing builds is not supported on small screens yet.'
        subTitle='Please try opening this page on a bigger screen.'
      />
    )
  }
  if (edit) {
    if (loading) {
      return <Spin />
    }
    if (error) {
      return <div>Error.</div>
    }
    if (data) {
      return (
        <Build
          edit
          path={`/editBuild/${id}`}
          build={{ ...defaultBuildState, ...data.build }}
          pageIndex={actualPageIndex}
        />
      )
    }
    return null
  } else {
    return <NewBuild pageIndex={actualPageIndex} />
  }
}

const NewBuild = ({ pageIndex }: { pageIndex: number }) => {
  const savedBuildState = localStorage.getItem('buildState')
  useEffect(() => {
    try {
      const parsedBuildState = savedBuildState
        ? JSON.parse(savedBuildState)
        : false
      if (parsedBuildState) {
        message.info('Your settings have been restored.')
      }
    } catch (e) {
      console.error(e)
    }
  }, [savedBuildState])
  try {
    const parsedBuildState = JSON.parse(savedBuildState || '')
    return (
      <Build
        path='/buildEditor'
        build={parsedBuildState}
        pageIndex={pageIndex}
      />
    )
  } catch (e) {
    return (
      <Build
        path='/buildEditor'
        build={defaultBuildState}
        pageIndex={pageIndex}
      />
    )
  }
}
