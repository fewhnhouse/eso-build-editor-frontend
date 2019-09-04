import React, { useState } from 'react'
import { IMundus } from '../build/BuildStateContext'
import Flex from '../../components/Flex'
import styled from 'styled-components'
import { MenuCard, Image, Description, ContentCard } from './Overview'
import MundusMenu from '../build/consumables/MundusMenu'
import { Typography, Divider, Card, Modal, Empty } from 'antd'

interface IMundusStoneProps {
  context: React.Context<any>
  mundusStone?: IMundus
  isMobile: boolean
}

const AllianceIcon = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 10px;
`

const Map = styled.img`
  width: 256px;
  height: 256px;
  border: 2px solid rgba(0, 0, 0, 0.45);
  border-radius: 4px;
`

const ModalMap = styled.img`
  width: 100%;
  height: 100%;
  border: 2px solid rgba(0, 0, 0, 0.45);
  border-radius: 4px;
`
interface IMundusCardProps {
  mundusStone: IMundus
}
export const MundusCard = ({ mundusStone }: IMundusCardProps) => {
  const [modalImage, setModalImage] = useState('')

  const handleCancelModal = () => {
    setModalImage('')
  }
  const handleImageClick = (image: string) => () => {
    setModalImage(image)
  }
  const parsedMundusValue = parseInt(mundusStone ? mundusStone.value : '0', 10)

  return (
    <Flex direction='column' fluid>
      <Card style={{ width: '100%' }}>
        <Flex direction='row' align='flex-start' justify='center' fluid>
          <Image
            src={
              mundusStone
                ? `${process.env.REACT_APP_IMAGE_SERVICE}/mundusStones/${mundusStone.icon}`
                : ''
            }
          />
          <Flex
            direction='column'
            fluid
            style={{ marginLeft: 20, maxWidth: 600 }}
          >
            <Typography.Title style={{ margin: 0 }}>
              {mundusStone && mundusStone.name}
            </Typography.Title>
            <Divider style={{ margin: '10px 0px' }} />
            <Description>
              {mundusStone.effect.trim() + ' by ' + mundusStone.value}
              <span style={{ fontStyle: 'italic' }}>
                {' '}
                ({Math.round(
                  parsedMundusValue * 0.525 + parsedMundusValue
                )}{' '}
                with 7 divines)
              </span>
            </Description>
          </Flex>
        </Flex>
      </Card>

      <Divider>Locations</Divider>
      <Flex direction='row' wrap justify='center'>
        <Card
          onClick={handleImageClick(mundusStone.aldmeri)}
          title={
            <span>
              <AllianceIcon
                src={`${process.env.REACT_APP_IMAGE_SERVICE}/alliances/alliance_aldmeri.png`}
              />
              {mundusStone.aldmeri}
            </span>
          }
          hoverable
          style={{ margin: 10 }}
        >
          <Map
            src={`${
              process.env.REACT_APP_IMAGE_SERVICE
            }/mundusMaps/${mundusStone.aldmeri.replace(/\s+/g, '')}.jpg`}
          />
        </Card>
        <Card
          onClick={handleImageClick(mundusStone.ebonheart)}
          title={
            <span>
              <AllianceIcon
                src={`${process.env.REACT_APP_IMAGE_SERVICE}/alliances/alliance_ebonheart.png`}
              />
              {mundusStone.ebonheart}
            </span>
          }
          hoverable
          style={{ margin: 10 }}
        >
          <Map
            src={`${
              process.env.REACT_APP_IMAGE_SERVICE
            }/mundusMaps/${mundusStone.ebonheart.replace(/\s+/g, '')}.jpg`}
          />
        </Card>
        <Card
          onClick={handleImageClick(mundusStone.daggerfall)}
          title={
            <span>
              <AllianceIcon
                src={`${process.env.REACT_APP_IMAGE_SERVICE}/alliances/alliance_daggerfall.png`}
              />
              {mundusStone.daggerfall}
            </span>
          }
          hoverable
          style={{ margin: 10 }}
        >
          <Map
            src={`${
              process.env.REACT_APP_IMAGE_SERVICE
            }/mundusMaps/${mundusStone.daggerfall.replace(/\s+/g, '')}.jpg`}
          />
        </Card>
        <Card
          onClick={handleImageClick('Cyrodiil')}
          title={<span>Cyrodiil</span>}
          hoverable
          style={{ margin: 10 }}
        >
          <Map
            src={`${process.env.REACT_APP_IMAGE_SERVICE}/mundusMaps/Cyrodiil.jpg`}
          />
        </Card>
      </Flex>

      <Modal
        visible={modalImage !== ''}
        title={
          <span>
            {modalImage !== 'Cyrodiil' && (
              <AllianceIcon
                src={`${
                  process.env.REACT_APP_IMAGE_SERVICE
                }/alliances/alliance_${
                  mundusStone.aldmeri === modalImage
                    ? 'aldmeri'
                    : mundusStone.ebonheart === modalImage
                    ? 'ebonheart'
                    : mundusStone.daggerfall === modalImage
                    ? 'daggerfall'
                    : ''
                }.png`}
              />
            )}
            {modalImage}
          </span>
        }
        onCancel={handleCancelModal}
        footer={null}
        style={{ width: '60%', height: '60%' }}
      >
        <ModalMap
          src={`${
            process.env.REACT_APP_IMAGE_SERVICE
          }/mundusMaps/${modalImage.replace(/\s+/g, '')}.jpg`}
        />
      </Modal>
    </Flex>
  )
}

export default ({ context, mundusStone, isMobile }: IMundusStoneProps) => {
  return (
    <Flex
      direction='row'
      align='flex-start'
      style={{
        height: 'calc(100% - 100px)',
        width: '100%',
        padding: isMobile ? 0 : 20,
      }}
    >
      <MenuCard isMobile={isMobile || false}>
        <MundusMenu context={context} />
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
            overflow: 'auto',
          }}
        >
          {mundusStone ? (
            <MundusCard mundusStone={mundusStone} />
          ) : (
            <Empty
              style={{
                display: 'flex',
                justifyContent: 'center',
                flex: 2,
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              Select a Mundus Stone to get started.
            </Empty>
          )}
        </ContentCard>
      )}
    </Flex>
  )
}
