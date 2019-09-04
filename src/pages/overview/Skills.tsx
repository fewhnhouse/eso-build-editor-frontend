import React from "react"
import Flex from "../../components/Flex"
import { MenuCard, ContentCard } from "./Overview"
import SkillMenu from "../build/Skills/SkillMenu"
import gql from "graphql-tag"
import { skill } from "../../util/fragments"
import { ISkill } from "../../components/SkillSlot"
import { useQuery } from "react-apollo"
import { Spin } from "antd"
import SkillsDisplay from "../../components/SkillsDisplay"
import { defaultUltimate } from "../build/Skills/Skills"

interface ISetProps {
  context: React.Context<any>
  skillLine?: number
  isMobile: boolean
}

const GET_SKILLS = gql`
  query {
    skills {
      ...Skill
    }
  }
  ${skill}
`

export default ({ context, skillLine, isMobile }: ISetProps) => {
  const { loading, error, data } = useQuery(GET_SKILLS)
  if (loading) {
    return (
      <Flex fluid justify="center">
        <Spin />
      </Flex>
    )
  }
  if (error) {
    return <div>Error.</div>
  }
  if (data && data.skills) {
    const { skills } = data
    const selectedSkillLine: ISkill[] = skills.filter(
      (skill: ISkill) => skill.skillline === skillLine
    )
    const actives = selectedSkillLine.filter(skill => skill.type === 1)
    const passives = selectedSkillLine.filter(skill => skill.type === 2)
    const ultimates = selectedSkillLine.filter(skill => skill.type === 3)

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
          overflow: "auto",
          padding: isMobile ? 0 : 20,
        }}
      >
        <MenuCard isMobile={isMobile}>
          <SkillMenu context={context} />
        </MenuCard>
        {isMobile ? (
          ""
        ) : (
          <ContentCard
            bodyStyle={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SkillsDisplay
              morphedActives={morphedActives}
              morphs={morphs}
              baseActives={baseActives}
              baseUltimate={baseUltimate}
              passives={passives}
              skillLine={skillLine || 0}
            />
          </ContentCard>
        )}
      </Flex>
    )
  }
  return null
}
