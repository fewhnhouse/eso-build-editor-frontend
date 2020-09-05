import styled from 'styled-components'
import { Button, List, Card, Typography } from 'antd'
import Scrollbars from 'react-custom-scrollbars'
import { ITheme } from '../../components/theme'
import Flex from '../../components/Flex'

const { Title } = Typography

export const ActionButton = styled(Button)`
  width: 50px;
`

export const ListMeta = styled(List.Item.Meta)`
  padding: ${(props) => props.theme.paddings.small};
  text-align: start;
`

export const ListItem = styled(List.Item)`
  padding: 0;
  margin: ${(props) => props.theme.margins.small};
`

export const StyledList = styled(List)`
  background: white;
  border-bottom-left-radius: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '0px' : '10px'};
  border-bottom-right-radius: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '0px' : '10px'};
`

export const StyledScrollbars = styled(Scrollbars)`
  height: calc(100% - 120px);
`

export const Wrapper = styled(Flex)`
  width: 100%;
  margin-top: ${(props) => props.theme.margins.medium};
  height: ${(props: { isMobile: boolean }) =>
    props.isMobile ? 'calc(100vh - 130px)' : ''};
`

export const Container = styled(Flex)`
  width: 100%;
  height: 100%;
  padding: 10px;
  overflow: auto;
`

export const StyledCard = styled(Card)`
  min-width: 300px;
  width: ${(props: { isMobile: boolean; theme: ITheme }) =>
    props.isMobile ? `calc(100% - 20px)` : '250px'};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 170px;
  margin: ${(props: { isMobile: boolean; theme: ITheme }) =>
    props.isMobile
      ? `${props.theme.margins.small}`
      : `0px ${props.theme.margins.small}`};
  text-align: start;
`

export const Description = styled.p`
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: break-spaces;
  margin: 0;
`

export const CardContainer = styled(Flex)`
  flex: 1;
  height: ${(props: { isMobile: boolean }) =>
    props.isMobile ? 'calc(100vh - 120px)' : 'calc(100vh - 100px)'};
  min-height: 500px;
  max-height: 800px;
  padding-bottom: ${(props: { isMobile: boolean }) =>
    props.isMobile ? '0px' : '20px'};
`

export const ListCard = styled(Card)`
  width: 100%;
  height: 100%;
  min-width: ${(props: { isMobile: boolean; theme: ITheme }) =>
    props.isMobile ? props.theme.widths.small : props.theme.widths.medium};
  display: flex;
  flex-direction: column;
  max-width: ${(props: { isMobile: boolean; theme: ITheme }) =>
    props.isMobile ? '100%' : props.theme.widths.large};
  margin: 0px;
`
export const CardTitle = styled(Title)`
  display: flex;
  margin-bottom: 0;
  width: 100%;
  justify-content: space-between;
`

export const CardHeader = styled(Flex)`
  background-color: ${(props: { isMobile: boolean }) =>
    props.isMobile ? 'transparent' : '#e8e8e8'};
  margin-bottom: 0;
  padding: ${(props) => props.theme.paddings.medium};
`

export const StyledFlexFull = styled(Flex)`
  width: 100%;
`

export const StyledButton = styled(Button)`
  margin-left: ${(props) => props.theme.margins.mini};
`
