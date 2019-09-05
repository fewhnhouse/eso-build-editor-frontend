import React, { useContext, useEffect } from 'react'
import Flex from '../../components/Flex'
import { RouteComponentProps, withRouter } from 'react-router'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import SkillsDisplay from '../../components/SkillsDisplay'
import { skill } from '../../util/fragments'
import { ISkill } from '../../components/SkillSlot'
import { defaultUltimate } from '../build/Skills/Skills'
import { Spin } from 'antd'
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive'
import { ITheme } from '../../components/theme'
import { AppContext } from '../../components/AppContainer'
import { classSkillLines, skillLines } from '../build/Skills/SkillMenu'

const StyledFlex = styled(Flex)`
  width: 100%;
  height: 100%;
  padding: ${(props: { isMobile: boolean; theme: ITheme }) =>
    props.isMobile ? '0px' : props.theme.paddings.medium};
`

const GET_SKILLS_BY_SKILLLINE_ID = gql`
  query Skills($id: Int!) {
    skills(where: { skillline: $id }) {
      ...Skill
    }
  }
  ${skill}
`

const SingleSkillLine = ({ match }: RouteComponentProps<any>) => {
  const { id } = match.params
  const [, appDispatch] = useContext(AppContext)

  const { data } = useQuery(GET_SKILLS_BY_SKILLLINE_ID, {
    variables: { id: parseInt(id) },
  })
  useEffect(() => {
    appDispatch!({
      type: 'SET_HEADER_TITLE',
      payload: { headerTitle: 'Skill Line' },
    })
    if (data.skills) {
      console.log(
        [...classSkillLines, ...skillLines]
          .map(skillLine => skillLine.items)
          .flat()
      )
      const skillLine = [...classSkillLines, ...skillLines]
        .map(skillLine => skillLine.items)
        .flat()
        .find((item: any) => item.id === parseInt(id))
      appDispatch!({
        type: 'SET_HEADER_SUBTITLE',
        payload: { headerSubTitle: skillLine ? skillLine.title : '' },
      })
    }
  }, [appDispatch, data.skills, id])
  const isMobile = useMediaQuery({ maxWidth: 800 })

  const skillLine: ISkill[] = data.skills ? data.skills : ''

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
      <StyledFlex isMobile={isMobile} direction='row' align='flex-start'>
        <SkillsDisplay
          morphedActives={morphedActives}
          morphs={morphs}
          baseActives={baseActives}
          baseUltimate={baseUltimate}
          passives={passives}
          skillLine={id || 0}
        />
      </StyledFlex>
    )
  } else {
    return (
      <Flex fluid justify='center'>
        <Spin />
      </Flex>
    )
  }
}

export default withRouter(SingleSkillLine)
