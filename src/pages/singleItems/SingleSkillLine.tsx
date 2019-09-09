import React, { useContext, useEffect } from 'react'
import Flex from '../../components/Flex'
import { RouteComponentProps, withRouter } from 'react-router'
import SkillsDisplay from '../../components/SkillsDisplay'
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive'
import { ITheme } from '../../components/theme'
import { AppContext } from '../../components/AppContainer'
import { classSkillLines, skillLines } from '../build/Skills/SkillMenu'
import Scrollbars from 'react-custom-scrollbars'

const StyledFlex = styled(Flex)`
  width: 100%;
  height: 100%;
  padding: ${(props: { isMobile: boolean; theme: ITheme }) =>
    props.isMobile ? '0px' : props.theme.paddings.medium};
`

const SingleSkillLine = ({ match }: RouteComponentProps<any>) => {
  const { id } = match.params
  const [, appDispatch] = useContext(AppContext)

  useEffect(() => {
    appDispatch!({
      type: 'SET_HEADER_TITLE',
      payload: { headerTitle: 'Skill Line' },
    })
    const skillLine = [...classSkillLines, ...skillLines]
      .map(skillLine => skillLine.items)
      .flat()
      .find((item: any) => item.id === parseInt(id))
    appDispatch!({
      type: 'SET_HEADER_SUBTITLE',
      payload: { headerSubTitle: skillLine ? skillLine.title : '' },
    })
  }, [appDispatch, id])
  const isMobile = useMediaQuery({ maxWidth: 800 })

  return (
    <Scrollbars>
      <StyledFlex isMobile={isMobile} direction='row' align='flex-start'>
        <SkillsDisplay skillline={id || 0} />
      </StyledFlex>
    </Scrollbars>
  )
}

export default withRouter(SingleSkillLine)
