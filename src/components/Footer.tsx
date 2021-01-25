import React, { useState } from 'react'
import styled from 'styled-components'
import Flex from './Flex'
import { useMediaQuery } from 'react-responsive'
import { Layout, Divider, Popconfirm, Button, message } from 'antd'
import Scrollbars from 'react-custom-scrollbars'
import InformationCard from './InformationCard'
import RevisionDrawer from './RevisionDrawer'
import { IBuildState } from '../pages/build/BuildStateContext'
import { IRaidState } from '../pages/raid/RaidStateContext'
import { IGroupState } from '../pages/group/GroupStateContext'
import {
  DeleteOutlined,
  EditOutlined,
  CopyOutlined,
  InteractionOutlined,
  LinkOutlined,
} from '@ant-design/icons'
import { useParams } from 'react-router'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const { Footer } = Layout

const StyledFooter = styled(Footer)`
  height: ${(props: { isMobile: boolean }) =>
    `${props.isMobile ? '140px' : '80px'}`};
  flex-direction: ${(props: { isMobile: boolean }) =>
    `${props.isMobile ? 'column' : 'row'}`};
  display: flex;
  padding: 0px ${(props) => props.theme.paddings.medium};
  overflow: hidden;
  justify-content: center;
  align-items: center;
  box-shadow: 0 -2px 6px 0 rgba(0, 0, 0, 0.1);
`

const ActionButton = styled(Button)`
  width: 110px;
  margin: ${(props) => props.theme.margins.small};
`

const StyledFlex80 = styled(Flex)`
  height: 80px;
`

const StyledScrollbars = styled(Scrollbars)`
  height: 80px !important;
`

const StyledDivider = styled(Divider)`
  height: 50px;
  margin: 0px ${(props) => props.theme.paddings.medium};
`
interface IInformation {
  Icon?: any
  title: string
  description: string
}
interface IFooterProps {
  information: IInformation[]
  state: IBuildState | IRaidState | IGroupState
  owner?: {
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
  const { id } = useParams<{ id: string }>()
  const [drawerVisible, setDrawerVisible] = useState(false)
  const isMobile = useMediaQuery({ maxWidth: 800 })

  const handleClose = () => setDrawerVisible(false)

  const handleRevisionOpen = () => setDrawerVisible(true)

  return (
    <StyledFooter isMobile={isMobile}>
      <StyledScrollbars autoHide>
        <StyledFlex80 direction='row' justify='flex-start' align='center'>
          {information.map(({ Icon, title, description }, index) => (
            <>
              <InformationCard
                Icon={Icon}
                title={title}
                description={description}
              />
              {index < information.length && <StyledDivider type='vertical' />}
            </>
          ))}
        </StyledFlex80>
      </StyledScrollbars>

      {(owner && owner.id) === (me && me.id) && (
        <Flex direction='row'>
          {(type === 'build' || type === 'raid') && (
            <ActionButton
              onClick={handleRevisionOpen}
              loading={loading}
              disabled={saved}
              icon={<InteractionOutlined />}
              size='large'
            >
              Revision
            </ActionButton>
          )}
          {isMobile && (
            <CopyToClipboard
              text={`${window.location.origin}/${type}s/${id}`}
              onCopy={() => message.success('Copied to clipboard.')}
            >
              <ActionButton icon={<LinkOutlined />} size='large'>
                Link
              </ActionButton>
            </CopyToClipboard>
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
                icon={<CopyOutlined />}
                size='large'
              >
                Copy
              </ActionButton>
            </Popconfirm>
          )}

          {!isMobile && (
            <ActionButton
              onClick={onEdit}
              icon={<EditOutlined />}
              size='large'
              type='primary'
            >
              Edit
            </ActionButton>
          )}

          <ActionButton
            onClick={onDelete}
            icon={<DeleteOutlined />}
            size='large'
            danger
          >
            Delete
          </ActionButton>
        </Flex>
      )}
      {(type === 'build' || type === 'raid') &&
        (state as IBuildState | IRaidState).revision && (
          <RevisionDrawer
            //@ts-ignore
            revisionId={(state as IBuildState | IRaidState).revision.id}
            visible={drawerVisible}
            onClose={handleClose}
          />
        )}
    </StyledFooter>
  )
}
