import React, { useState } from 'react'
import { IMundus } from '../build/BuildStateContext'
import Flex from '../../components/Flex'
import styled from 'styled-components'
import { MenuCard, Image, Description, ContentCard } from './Overview'
import MundusMenu from '../build/consumables/mundus/MundusMenu'
import { Typography, Divider, Card, Modal, Empty } from 'antd'
import Scrollbars from 'react-custom-scrollbars'

interface IMundusStoneProps {
  context: React.Context<any>
  mundusStone?: IMundus
  isMobile: boolean
}

const StyledCard = styled(Card)`
  margin: ${(props) => props.theme.margins.small};
`
const StyledCardWrapper = styled(Card)`
  width: 100%;
`

const AllianceIcon = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 10px;
`

const Map = styled.img`
  width: 256px;
  height: 256px;
  border: 2px solid rgba(0, 0, 0, 0.45);
  border-radius: ${(props) => props.theme.borderRadius};
`

const ModalMap = styled.img`
  width: 100%;
  height: 100%;
  border: 2px solid rgba(0, 0, 0, 0.45);
  border-radius: ${(props) => props.theme.borderRadius};
`

const StyledFlexTitle = styled(Flex)`
  margin-left: ${(props) => props.theme.margins.medium};
  max-width: 600px;
`

const StyledTitle = styled(Typography.Title)`
  margin: 0;
`

const StyledDidiver = styled(Divider)`
  margin: ${(props) => props.theme.margins.small} 0px;
`

const StyledSpan = styled.span`
  font-style: italic;
`

const StyledModal = styled(Modal)`
  width: 60%;
  height: 60%;
`

const StyledFlex = styled(Flex)`
  height: 100%;
  width: 100%;
  padding: ${(flexProps: { isMobile: boolean }) =>
    flexProps.isMobile ? 0 : (props) => props.theme.paddings.medium};
`

const StyledEmpty = styled(Empty)`
  display: flex;
  justify-content: center;
  flex: 2;
  flex-direction: column;
  align-items: center;
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
    <Scrollbars autoHide>
      <Flex direction='column' fluid>
        <StyledCardWrapper>
          <Flex direction='row' align='flex-start' justify='center' fluid>
            <Image
              src={
                mundusStone
                  ? `${process.env.REACT_APP_IMAGE_SERVICE}/mundusStones/${mundusStone.icon}`
                  : ''
              }
            />
            <StyledFlexTitle direction='column' fluid>
              <StyledTitle level={3}>
                {mundusStone && mundusStone.name}
              </StyledTitle>
              <StyledDidiver />
              <Description>
                {mundusStone.effect.trim() + ' by ' + mundusStone.value}
                <StyledSpan>
                  {' '}
                  ({Math.round(
                    parsedMundusValue * 0.525 + parsedMundusValue
                  )}{' '}
                  with 7 divines)
                </StyledSpan>
              </Description>
            </StyledFlexTitle>
          </Flex>
        </StyledCardWrapper>

        <Divider>Locations</Divider>
        <Flex direction='row' wrap justify='center'>
          <StyledCard
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
          >
            <Map
              src={`${
                process.env.REACT_APP_IMAGE_SERVICE
              }/mundusMaps/${mundusStone.aldmeri.replace(/\s+/g, '')}.jpg`}
            />
          </StyledCard>
          <StyledCard
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
          >
            <Map
              src={`${
                process.env.REACT_APP_IMAGE_SERVICE
              }/mundusMaps/${mundusStone.ebonheart.replace(/\s+/g, '')}.jpg`}
            />
          </StyledCard>
          <StyledCard
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
          >
            <Map
              src={`${
                process.env.REACT_APP_IMAGE_SERVICE
              }/mundusMaps/${mundusStone.daggerfall.replace(/\s+/g, '')}.jpg`}
            />
          </StyledCard>
          <StyledCard
            onClick={handleImageClick('Cyrodiil')}
            title={<span>Cyrodiil</span>}
            hoverable
          >
            <Map
              src={`${process.env.REACT_APP_IMAGE_SERVICE}/mundusMaps/Cyrodiil.jpg`}
            />
          </StyledCard>
        </Flex>

        <StyledModal
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
        >
          <ModalMap
            src={`${
              process.env.REACT_APP_IMAGE_SERVICE
            }/mundusMaps/${modalImage.replace(/\s+/g, '')}.jpg`}
          />
        </StyledModal>
      </Flex>
    </Scrollbars>
  )
}

export default ({ context, mundusStone, isMobile }: IMundusStoneProps) => {
  return (
    <StyledFlex direction='row' align='flex-start' isMobile={isMobile}>
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
            <StyledEmpty>Select a Mundus Stone to get started.</StyledEmpty>
          )}
        </ContentCard>
      )}
    </StyledFlex>
  )
}
