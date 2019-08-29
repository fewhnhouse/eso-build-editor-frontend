import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { useQuery } from 'react-apollo'
import Build from './Build'
import { Spin, message } from 'antd'
import { defaultBuildState } from './BuildStateContext'
import gql from 'graphql-tag'
import { build } from '../../util/fragments'

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
  const { loading, error, data } = useQuery(GET_BUILD, {
    variables: { id: buildId },
  })
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
