import gql from 'graphql-tag'

export const set = gql`
  fragment Set on Set {
    id
    setId
    name
    location
    type
    slug
    uniqueItem
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
`

export const reducedSetSelection = gql`
  fragment ReducedSetSelection on SetSelection {
    id
    selectedSet {
      id
      name
      type
      uniqueItem
      bonus_item_1
      bonus_item_2
      bonus_item_3
      bonus_item_4
      bonus_item_5
    }
  }
`
export const setSelection = gql`
  fragment SetSelection on SetSelection {
    id
    icon
    slot
    type
    weaponType
    selectedSet {
      ...Set
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
  ${set}
`
export const skill = gql`
  fragment Skill on Skill {
    id
    name
    skillline
    parent
    type
    effect_1
    effect_2
    cost
    icon
    cast_time
    target
    range
    skillId
    unlocks_at
  }
`
export const skillSelection = gql`
  fragment SkillSelection on SkillSelection {
    id
    index
    skill {
      ...Skill
    }
  }
  ${skill}
`

export const buff = gql`
  fragment Buff on Buff {
    id
    name
    buffDescription
    description
    duration
    notes
    icon
    type
    buffType
    quality
  }
`

export const reducedBuild = gql`
  fragment Build on Build {
    id
    name
    published
    race
    description
    health
    magicka
    accessRights
    stamina
    applicationArea
    mundusStone {
      id
      name
      icon
    }
    buff {
      id
      name
      icon
    }
    owner {
      id
      name
    }
    esoClass
    frontbarSelection {
      ...ReducedSetSelection
    }
    backbarSelection {
      ...ReducedSetSelection
    }
    bigPieceSelection {
      ...ReducedSetSelection
    }
    smallPieceSelection {
      ...ReducedSetSelection
    }
    jewelrySelection {
      ...ReducedSetSelection
    }
  }
  ${reducedSetSelection}
`

export const linearBuild = gql`
  fragment Build on Build {
    id
    createdAt
    updatedAt
    name
    published
    race
    esoClass
    description
    accessRights
    applicationArea
    owner {
      id
      name
    }
  }
`

export const build = gql`
  fragment Build on Build {
    id
    createdAt
    updatedAt
    name
    published
    race
    description
    health
    magicka
    accessRights
    stamina
    applicationArea
    mundusStone {
      id
      name
      effect
      value
      icon
      aldmeri
      ebonheart
      daggerfall
    }
    buff {
      ...Buff
    }
    owner {
      id
      name
    }
    esoClass
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
    bigPieceSelection {
      ...SetSelection
    }
    smallPieceSelection {
      ...SetSelection
    }
    jewelrySelection {
      ...SetSelection
    }
    revision {
      id
    }
  }
  ${setSelection}
  ${skill}
  ${skillSelection}
  ${buff}
`
export const variableRaid = (buildFragment: any) => gql`
  fragment Raid on Raid {
    id
    name
    description
    published
    owner {
      name
      id
    }
    applicationArea
    revision {
      id
    }
    roles {
      id
      name
      builds {
        id
        index
        build {
          ...Build
        }
      }
    }
  }
  ${buildFragment}
`

export const raid = gql`
  fragment Raid on Raid {
    id
    name
    description
    published
    owner {
      name
      id
    }
    applicationArea
    revision {
      id
    }
    roles {
      id
      name
      builds {
        id
        index
        build {
          ...Build
        }
      }
    }
  }
  ${build}
`

export const groupBuild = gql`
  fragment GroupBuild on GroupBuild {
    id
    build {
      ...Build
    }
    members
  }
  ${reducedBuild}
`

export const group = gql`
  fragment Group on Group {
    id
    name
    owner {
      id
      name
    }
    description
    accessRights
    members
    groupBuilds {
      ...GroupBuild
    }
  }
  ${groupBuild}
`
