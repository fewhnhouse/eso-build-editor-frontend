import React from "react"
import Flex from "../../components/Flex"
import { RouteComponentProps, withRouter } from "react-router"
import gql from "graphql-tag"
import { useQuery } from "react-apollo"
import SkillsDisplay from "../../components/SkillsDisplay"
import { skill } from "../../util/fragments"
import { ISkill } from "../../components/SkillSlot"
import { defaultUltimate } from "../build/Skills/Skills"
import { Spin } from "antd"

const GET_SKILLS_BY_ID = gql`
  query Skills($id: Int!) {
    skills(where: { skillline: $id }) {
      ...Skill
    }
  }
  ${skill}
`

const SingleSkillLine = ({ match }: RouteComponentProps<any>) => {
  const { id } = match.params
  const { data } = useQuery(GET_SKILLS_BY_ID, {
    variables: { id: parseInt(id) },
  })
  const skillLine: ISkill[] = data.skills ? data.skills : ""

  if (data && data.skills && skillLine) {
    const actives = skillLine.filter(skill => skill.type === 1)
    const passives = skillLine.filter(skill => skill.type === 2)
    const ultimates = skillLine.filter(skill => skill.type === 3)

    const baseActives = actives.filter(skill => skill.parent === null)

    const morphedActives = actives.filter(skill => skill.parent !== null)
    const morphedUltimates = ultimates.filter(skill => skill.parent !== null)
    const baseUltimate =
      ultimates.find(skill => skill.parent === null) || defaultUltimate

    const morphs = morphedUltimates.filter(ultimate =>
      ultimate.parent === baseUltimate.skillId ? baseUltimate.skillId : 0
    )

    return (
      <Flex
        direction="row"
        align="flex-start"
        style={{
          height: "100%",
          width: "100%",
          padding: 20,
        }}
      >
        <SkillsDisplay
          morphedActives={morphedActives}
          morphs={morphs}
          baseActives={baseActives}
          baseUltimate={baseUltimate}
          passives={passives}
          skillLine={id || 0}
        />
      </Flex>
    )
  } else {
    return (
      <Flex fluid justify="center">
        <Spin />
      </Flex>
    )
  }
}

export default withRouter(SingleSkillLine)
