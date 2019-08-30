import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { useQuery } from 'react-apollo'
import Build from './Build'
import { Spin, message } from 'antd'
import { defaultBuildState } from './BuildStateContext'
import gql from 'graphql-tag'
import { build } from '../../util/fragments'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import ErrorPage from '../../components/ErrorPage'

const GET_BUILD = gql`
  query Build($id: ID!) {
    build(id: $id) {
      ...Build
    }
  }
  ${build}
`

interface IBuildWrapperProps
  extends RouteComponentProps<{ id: string; buildId: string }> {
  edit?: boolean
}
export default ({ edit, match }: IBuildWrapperProps) => {
  const { id, buildId } = match.params
  const pageIndex = parseInt(id || '0', 10)
  const isDesktopOrLaptop = useMediaQuery({
    minWidth: 1224,
  })

  const { loading, error, data } = useQuery(GET_BUILD, {
    variables: { id: buildId },
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
          path={`/editBuild/${buildId}`}
          build={{ ...defaultBuildState, ...data.build }}
          pageIndex={pageIndex}
        />
      )
    }
    return null
  } else {
    return <NewBuild pageIndex={pageIndex} />
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
