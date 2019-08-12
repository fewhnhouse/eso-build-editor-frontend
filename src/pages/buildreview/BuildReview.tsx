import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { withTheme, ThemeProps } from 'styled-components'
import { ITheme } from '../../components/globalStyles'
import { IBuildState, defaultBuildState } from '../build/BuildStateContext'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import BuildReviewDetails from './BuildReviewDetails'

interface IBuildReview extends ThemeProps<ITheme>, RouteComponentProps<any> {
  local?: boolean
}

const BUILD = gql`
  fragment SetSelection on SetSelection {
    icon
    slot
    type
    selectedSet {
      name
      location
      type
      bonus_item_1
      bonus_item_2
      bonus_item_3
      bonus_item_4
      bonus_item_5
      has_jewels
      has_weapons
      has_heavy_armor
      has_light_armor
      has_medium_armor
    }
    trait {
      type
      description
      icon
    }
    glyph {
      type
      description
      icon
    }
  }

  fragment Skill on Skill {
    name
    skillId
    icon
    range
    type
    cost
    effect_1
    effect_2
    target
  }

  fragment SkillSelection on SkillSelection {
    index
    skill {
      ...Skill
    }
  }

  query Build($id: ID!) {
    build(id: $id) {
      owner {
        name
      }
      name
      applicationArea
      role
      race
      esoClass
      bigPieceSelection {
        ...SetSelection
      }
      smallPieceSelection {
        ...SetSelection
      }
      jewelrySelection {
        ...SetSelection
      }
      frontbarSelection {
        ...SetSelection
      }
      backbarSelection {
        ...SetSelection
      }
      newBarOne {
        ...SkillSelection
      }
      newBarTwo {
        ...SkillSelection
      }
      ultimateOne {
        ...Skill
      }
      ultimateTwo {
        ...Skill
      }
      mundusStone {
        name
        effect
        value
        icon
      }
      buff {
        name
        buffDescription
        icon
        buffType
      }
    }
  }
`

const BuildReview = ({ match, theme, local }: IBuildReview) => {
  const { id } = match.params
  const buildState = localStorage.getItem('buildState')
  const parsedBuildState: IBuildState = buildState
    ? JSON.parse(buildState)
    : defaultBuildState
  const { loading, error, data } = useQuery(BUILD, { variables: { id } })
  console.log(data)
  if (!local) {
    if (loading) {
      return <div>Loading...</div>
    }
    if (data && data.build) {
      return <BuildReviewDetails loadedData={data.build} />
    } else {
      return null
    }
  } else {
    return <BuildReviewDetails loadedData={parsedBuildState} />
  }
}

export default withTheme(withRouter(BuildReview))
