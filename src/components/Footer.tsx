import React, { useState } from 'react'
import styled from 'styled-components'
import Flex from './Flex'
import { useMediaQuery } from 'react-responsive'
import { Layout, Divider, Popconfirm, Button } from 'antd'
import Scrollbars from 'react-custom-scrollbars'
import InformationCard from './InformationCard'
import RevisionDrawer from './RevisionDrawer'
import { IBuildState } from '../pages/build/BuildStateContext'
import { IRaidState } from '../pages/raid/RaidStateContext'
import { IGroupState } from '../pages/group/GroupStateContext'

const { Footer } = Layout

const StyledFooter = styled(Footer)`
  height: ${(props: { isMobile: boolean }) =>
    `${props.isMobile ? '140px' : '80px'}`};
  flex-direction: ${(props: { isMobile: boolean }) =>
    `${props.isMobile ? 'column' : 'row'}`};
  display: flex;
  padding: 0px ${props => props.theme.paddings.medium};
  overflow: hidden;
  justify-content: center;
  align-items: center;
  box-shadow: 0 -2px 6px 0 rgba(0, 0, 0, 0.1);
`

const ActionButton = styled(Button)`
  width: 110px;
  margin: ${props => props.theme.margins.small};
`

const StyledFlex80 = styled(Flex)`
  height: 80px;
`

const StyledScrollbars = styled(Scrollbars)`
  height: 80px !important;
`

const StyledDivider = styled(Divider)`
  height: 50px;
  margin: 0px ${props => props.theme.paddings.medium};
`
interface IInformation {
  icon: string
  title: string
  description: string
}
interface IFooterProps {
  information: IInformation[]
  state: IBuildState | IRaidState | IGroupState
  owner: {
    name: string
    id: string
  }
  me: {
    id: string
  }
  onCopy: (e?: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => void
  onEdit: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onDelete: (e?: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => void
  type: 'build' | 'raid' | 'group'
  loading: boolean
  saved: boolean
}

export default ({
  information,
  state,
  owner,
  me,
  onCopy,
  onEdit,
  onDelete,
  type,
  loading,
  saved,
}: IFooterProps) => {
  const [drawerVisible, setDrawerVisible] = useState(false)
  const isMobile = useMediaQuery({ maxWidth: 800 })

  const handleClose = () => setDrawerVisible(false)

  const handleRevisionOpen = () => setDrawerVisible(true)

  return (
    <StyledFooter isMobile={isMobile}>
      <StyledScrollbars autoHide>
        <StyledFlex80 direction='row' justify='flex-start' align='center'>
          {information.map((info, index) => (
            <>
              <InformationCard
                icon={info.icon}
                title={info.title}
                description={info.description}
              />
              {index < information.length && <StyledDivider type='vertical' />}
            </>
          ))}
        </StyledFlex80>
      </StyledScrollbars>

      {(owner && owner.id) === (me && me.id) && (
        <Flex direction='row'>
          {type === 'build' && (
            <ActionButton
              onClick={handleRevisionOpen}
              loading={loading}
              disabled={saved}
              icon='interaction'
              size='large'
              type='default'
            >
              Revision
            </ActionButton>
          )}
          {!isMobile && (
            <Popconfirm
              title={`Are you sure you want to copy this ${type}?`}
              onConfirm={onCopy}
              okText='Yes'
              cancelText='No'
            >
              <ActionButton
                loading={loading}
                disabled={saved}
                icon='copy'
                size='large'
                type='default'
              >
                Copy
              </ActionButton>
            </Popconfirm>
          )}

          {!isMobile && (
            <ActionButton
              onClick={onEdit}
              icon='edit'
              size='large'
              type='primary'
            >
              Edit
            </ActionButton>
          )}

          <ActionButton
            onClick={onDelete}
            icon='delete'
            size='large'
            type='danger'
          >
            Delete
          </ActionButton>
        </Flex>
      )}
      {type === 'build' && (state as IBuildState).revision && (
        <RevisionDrawer
          //@ts-ignore
          revisionId={(state as IBuildState).revision.id}
          visible={drawerVisible}
          onClose={handleClose}
        />
      )}
    </StyledFooter>
  )
}
