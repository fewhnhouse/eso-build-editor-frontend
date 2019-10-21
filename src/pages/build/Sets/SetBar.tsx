import React, { useContext } from 'react'
import styled from 'styled-components'
import { Divider, Empty } from 'antd'
import GearView from '../../../components/GearView'
import { ISet } from '../../../components/GearSlot'
import { BuildContext, WeaponType, SetTab } from '../BuildStateContext'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Scrollbars from 'react-custom-scrollbars'
import { specialWeaponSets, getSetups } from './selectionDetails'
import { getSetsCount } from './Sets'

const OuterContainer = styled.div`
  flex: 1;
  height: 100%;
  padding: ${props => props.theme.paddings.medium};
  max-width: ${props => props.theme.widths.medium};
  background: white;
`

const StyledScrollbars = styled(Scrollbars)`
  background-color: white;
  max-width: ${props => props.theme.widths.medium};
`

interface ISetBarProps {
  hasSelectedSet: boolean
}

const StyledEmpty = styled(Empty)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

export default ({ hasSelectedSet }: ISetBarProps) => {
  const [state] = useContext(BuildContext)
  const {
    setTabKey,
    armorType,
    weaponType,
    bigPieceSelection,
    smallPieceSelection,
    frontbarSelection,
    backbarSelection,
    jewelrySelection,
    selectedSet,
  } = state!

  const mySetups = getSetups({
    armorType,
    selectedSet,
    bigPieceSelection,
    smallPieceSelection,
    frontbarSelection,
    backbarSelection,
    jewelrySelection,
  })

  const showGear = (key: string) => {
    const specialWeaponSet: any = specialWeaponSets.find(
      set => selectedSet && selectedSet.name.includes(set.name)
    )
    if (specialWeaponSet) {
      const actualSetup = mySetups.find(
        setup => setup.id === specialWeaponSet.type
      )
      return actualSetup
        ? [
            {
              ...actualSetup,
              data: actualSetup.data.filter(setupData =>
                specialWeaponSet
                  ? specialWeaponSet.weaponTypes.find(
                      (type: any) => setupData.weaponType === type
                    )
                  : false
              ),
            },
          ]
        : []
    }

    if (key === SetTab.frontbar) {
      if (weaponType === WeaponType.onehanded) {
        return mySetups.filter(setup => setup.id === 'onehanded')
      } else {
        return mySetups.filter(setup => setup.id === 'twohanded')
      }
    } else if (key === SetTab.backbar) {
      if (weaponType === WeaponType.onehanded) {
        return mySetups.filter(setup => setup.id === 'onehanded')
      } else {
        return mySetups.filter(setup => setup.id === 'twohanded')
      }
    } else if (key === SetTab.armor) {
      return mySetups.filter(
        setup => setup.id === 'bigpieces' || setup.id === 'smallpieces'
      )
    } else {
      return mySetups.filter(setup => setup.id === 'jewelry')
    }
  }

  const selectedSetup = [
    {
      id: 'bigpieces',
      label: 'Big Pieces',
      data: bigPieceSelection || [],
    },
    {
      id: 'smallpieces',
      label: 'Small Pieces',
      data: smallPieceSelection || [],
    },
    { id: 'jewelry', label: 'Jewelry', data: jewelrySelection || [] },
    {
      id: 'frontbar',
      label: 'Frontbar',
      data: frontbarSelection || [],
    },
    { id: 'backbar', label: 'Backbar', data: backbarSelection || [] },
  ]

  const showSetup = (key: string) => {
    if (key === SetTab.frontbar) {
      return selectedSetup.filter(setup => setup.id === 'frontbar')
    } else if (key === SetTab.backbar) {
      return selectedSetup.filter(setup => setup.id === 'backbar')
    } else if (key === SetTab.armor) {
      return selectedSetup.filter(
        setup => setup.id === 'bigpieces' || setup.id === 'smallpieces'
      )
    } else {
      return selectedSetup.filter(setup => setup.id === 'jewelry')
    }
  }

  const setsCount = getSetsCount(
    bigPieceSelection,
    smallPieceSelection,
    jewelrySelection,
    frontbarSelection,
    backbarSelection
  )

  return (
    <DndProvider backend={HTML5Backend}>
      <StyledScrollbars autoHide>
        <OuterContainer>
          {hasSelectedSet ? (
            <>
              <Divider>Active Selection</Divider>
              <GearView setups={showGear(setTabKey)} setsCount={setsCount} />
            </>
          ) : (
            <StyledEmpty>Select a set to get started.</StyledEmpty>
          )}
          <Divider>Setup</Divider>
          <GearView
            droppable
            setups={showSetup(setTabKey)}
            setsCount={setsCount}
          />
        </OuterContainer>
      </StyledScrollbars>
    </DndProvider>
  )
}
