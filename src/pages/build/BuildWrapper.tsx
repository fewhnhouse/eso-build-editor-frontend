import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { useQuery } from '@apollo/react-hooks'
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
    const savedBuildState = localStorage.getItem('buildState')

    return <NewBuild savedBuildState={savedBuildState} pageIndex={pageIndex} />
  }
}

const NewBuild = ({
  savedBuildState,
  pageIndex,
}: {
  savedBuildState: string | null
  pageIndex: number
}) => {
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
  }, [])
  try {
    const parsedBuildState = JSON.parse(savedBuildState || '')
    return (
      <Build path='/build' build={parsedBuildState} pageIndex={pageIndex} />
    )
  } catch (e) {
    return (
      <Build path='/build' build={defaultBuildState} pageIndex={pageIndex} />
    )
  }
}
