import React, { useState } from 'react'
import styled from 'styled-components'
import { IGroupState } from '../GroupStateContext'
import { Table, Button } from 'antd'
import { useMediaQuery } from 'react-responsive'
import { getColumns } from './columns'
import SingleGroupReview from './SingleGroupReview'
import { AlignLeftOutlined, UnorderedListOutlined } from '@ant-design/icons'

const ReviewContainer = styled.div`
  width: 100%;
  height: calc(100% - 140px);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  padding: ${(props) => props.theme.paddings.medium};
`

const StyledButton = styled(Button)`
  position: fixed;
  top: 100px;
  right: 40px;
  z-index: 300;
  box-shadow: 0px 0px 3px 2px #868686;
`

interface IGroupReviewDetailsProps {
  local?: boolean
  loadedData: IGroupState
}
export default ({ loadedData }: IGroupReviewDetailsProps) => {
  const { groupBuilds, members } = loadedData
  const isMobile = useMediaQuery({ maxWidth: 800 })
  const [showSingle, setShowSingle] = useState(false)

  const memberSource = groupBuilds.map((groupBuild, index) => {
    const finalMembers = members.reduce((prev, curr) => {
      const found = groupBuild.members.find(
        (buildMember) => buildMember === curr
      )
      return found ? { ...prev, [curr]: 'yes' } : { ...prev, [curr]: 'no' }
    }, {})
    return {
      key: index,
      build: groupBuild.build ?? undefined,
      ...finalMembers,
    }
  })

  const columns = getColumns(isMobile, members)

  const handleSwapView = () => setShowSingle((show) => !show)

  return (
    <ReviewContainer>
      {!isMobile && (
        <StyledButton
          type='primary'
          shape='circle'
          size='large'
          onClick={handleSwapView}
          icon={showSingle ? <AlignLeftOutlined /> : <UnorderedListOutlined />}
        ></StyledButton>
      )}
      {(showSingle || isMobile) && (
        <SingleGroupReview members={members} groupBuilds={groupBuilds} />
      )}

      {!isMobile && !showSingle && (
        <Table
          style={{ width: '100%' }}
          dataSource={memberSource}
          columns={columns}
          scroll={{
            x: true,
            y: document.body.clientHeight - 280,
          }}
        />
      )}
    </ReviewContainer>
  )
}
