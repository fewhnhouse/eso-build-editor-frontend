import gql from 'graphql-tag'

export const set = gql`
  fragment Set on Set {
    id
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
    skillId
    icon
    range
    type
    cost
    effect_1
    effect_2
    target
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
export const build = gql`
  fragment Build on Build {
    id
    name
    published
    race
    description
    applicationArea
    mundusStone {
      id
      name
      effect
      value
      icon
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
  }
  ${setSelection}
  ${skill}
  ${skillSelection}
  ${buff}
`
export const raid = gql`
  fragment Raid on Raid {
    id
    name
    published
    owner {
      name
      id
    }
    applicationArea
    roles {
      id
      name
      builds {
        ...Build
      }
    }
  }
  ${build}
`
