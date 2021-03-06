import React, { useContext } from 'react'
import styled from 'styled-components'
import { Card, Popconfirm } from 'antd'
import { BuildContext } from '../BuildStateContext'
const { Meta } = Card

interface IRootCard {
  title: string
  description: string
  imageSource: string | undefined
}

interface ICardProps extends IRootCard {
  type: 'SET_RACE' | 'SET_CLASS'
}

const Cover = styled.img`
  width: 48px;
  height: 48px;
  transform: ${(props: IMetaProps) =>
    props.selected ? 'scale(1.3) translate(0px, 20px)' : 'scale(1)'};
  filter: invert();
  transition: transform 0.5s ease-in-out;
`

interface IMetaProps {
  selected: boolean
}

const CoverContainer = styled.div`
  display: flex;
  width: ${(props) => props.theme.widths.small};
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.paddings.medium};
`

const StyledCard = styled(Card)`
  margin: ${(props) => props.theme.margins.medium};
  background: ${(props: IMetaProps) =>
    props.selected ? 'rgba(0, 0, 0,0.1)' : 'white'};
  border-color: ${(props: IMetaProps) => (props.selected ? '#1890ff' : '')};
  width: ${(props) => props.theme.widths.small};
`
const MyCard = ({ title, imageSource, type, description }: ICardProps) => {
  const [state, dispatch] = useContext(BuildContext)
  const selected =
    type === 'SET_CLASS' ? state!.esoClass === title : state!.race === title
  const handleClick = () => {
    console.log('handleclick reset skills')
    if (type === 'SET_CLASS') {
      dispatch!({
        type: 'RESET_SKILLS',
        payload: {},
      })
    }
    dispatch!({
      type,
      payload: selected ? '' : title,
    })
  }

  const confirm = () => {
    handleClick()
  }

  return !selected && state!.esoClass !== '' && type === 'SET_CLASS' ? (
    <Popconfirm
      title='Are you sure you want to swap classes? This will reset your class skills.'
      onConfirm={confirm}
      okText='Yes'
      cancelText='No'
    >
      <StyledCard
        selected={selected}
        cover={
          <CoverContainer>
            <Cover selected={selected} src={imageSource} />
          </CoverContainer>
        }
      >
        <Meta title={title} description={description} />
      </StyledCard>
    </Popconfirm>
  ) : (
    <StyledCard
      selected={selected}
      onClick={selected ? undefined : handleClick}
      cover={
        <CoverContainer>
          <Cover selected={selected} src={imageSource} />
        </CoverContainer>
      }
    >
      <Meta title={title} description={description} />
    </StyledCard>
  )
}

export const EsoClassCard = ({
  title,
  imageSource,
  description,
}: IRootCard) => {
  return (
    <MyCard
      title={title}
      imageSource={imageSource}
      type='SET_CLASS'
      description={description}
    />
  )
}

export const RaceCard = ({ title, imageSource, description }: IRootCard) => (
  <MyCard
    title={title}
    imageSource={imageSource}
    type='SET_RACE'
    description={description}
  />
)
