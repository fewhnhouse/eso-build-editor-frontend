import React from 'react'
import Flex from '../../components/Flex'
import styled from 'styled-components'
import { Typography, Divider, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useHistory, Link } from 'react-router-dom'

const { Title } = Typography

const HeaderContainer = styled(Flex)`
  padding: 0px 10px;
  width: calc(100% - 40px);
`

const Header = styled(Title)`
  margin-bottom: 0px;
`

const SectionHeader = ({
  createPath,
  allPath,
  title,
}: {
  createPath: string
  allPath: string
  title: string
}) => {
  const history = useHistory()

  const handleAddClick = () => {
    history.push(createPath)
  }
  return (
    <>
      <HeaderContainer fluid justify='space-between'>
        <Flex style={{ width: '100%' }} direction='column'>
          <Header level={3}>{title}</Header>
          <Link to={allPath}>See all</Link>
        </Flex>
        <Button
          icon={<PlusOutlined />}
          onClick={handleAddClick}
          size='large'
          type='primary'
        >
          Create
        </Button>
      </HeaderContainer>
      <Divider />
    </>
  )
}

export default SectionHeader
