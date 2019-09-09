import React from 'react'
import Flex from '../../components/Flex'
import { MenuCard, ContentCard } from './Overview'
import SkillMenu from '../build/Skills/SkillMenu'
import SkillsDisplay from '../../components/SkillsDisplay'
import styled from 'styled-components'
import { ITheme } from '../../components/theme'

const StyledFlex = styled(Flex)`
  height: 100%;
  width: 100%;
  overflow: auto;
  padding: ${(props: { isMobile: boolean; theme: ITheme }) =>
    props.isMobile ? 0 : props.theme.paddings.medium};
`

interface ISetProps {
  context: React.Context<any>
  skillLine?: number
  isMobile: boolean
}

export default ({ context, skillLine, isMobile }: ISetProps) => {
  return (
    <StyledFlex direction='row' align='flex-start' isMobile={isMobile}>
      <MenuCard isMobile={isMobile}>
        <SkillMenu context={context} />
      </MenuCard>
      {isMobile ? (
        ''
      ) : (
        <ContentCard
          bodyStyle={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <SkillsDisplay skillline={skillLine || 0} />
        </ContentCard>
      )}
    </StyledFlex>
  )
}
