import React, { useContext, useEffect } from 'react'
import { Divider, Input, Select, Typography } from 'antd'
import { chooseRace, chooseClass } from '../../../util/utils'
import styled from 'styled-components'
import { EsoClassCard, RaceCard } from './Card'
import { BuildContext } from '../BuildStateContext'

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`

const GeneralContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 400px;
`
export default () => {
  const races = [
    {
      title: 'Altmer',
      description:
        'The racial skills of the High Elves reflect their magical affinity by increasing their damage with destructive spells, increasing their rate of regaining magicka, and giving them bonuses to base magicka and experience gain.',
    },
    {
      title: 'Dunmer',
      description:
        'The racial skills of the Dark Elves reflect their intellect and natural agility, giving them bonuses in stamina, magicka, dual wielding, fire magic, fire resistance, lava resistance, and elemental damage, including frost, flame, and shock damage.',
    },
    {
      title: 'Imperial',
      description:
        'The racial skills of the Imperials reflect their training and perseverance in battle, giving them bonuses to gold drop rates, shields, health, and stamina.',
    },
    {
      title: 'Breton',
      description:
        'The racial skills of the Bretons reflect their affinity for the arcane, giving them bonuses to magicka, magicka recovery, light armor, alliance point gain, and spell resistance.',
    },
    {
      title: 'Khajiit',
      description:
        'The racial skills of the feline Khajiit reflect their natural agility, giving them bonuses to pickpocketing, stealth, stamina recovery, and weapon damage.',
    },
    {
      title: 'Bosmer',
      description:
        'The diversified racial skills of the Wood Elves reflect their woodland affinity. Improved archery, stamina, stamina recovery, stealth, reduced fall damage, and disease resistance make them dangerous foes.',
    },
    {
      title: 'Orc',
      description:
        "The racial skills of the Orcs reflect their people's harsh mountain environment, giving them bonuses to heavy armor use, health, health regeneration, healing received, stamina, melee attacks, inspiration gain, and sprinting.",
    },
    {
      title: 'Argonian',
      description:
        "The racial skills of the Argonians reflect their people's perilous swamp environment, giving them bonuses to healing, healing received, restoration staves, poison resistance, potion use, swimming speed, health and magicka.",
    },
    {
      title: 'Nord',
      description:
        'The racial skills of the Nords reflect their strong and hardy natures, giving them bonuses to two-handed weapon use, duration of effects from drinks, resistance to incoming damage, base health, health regeneration, frost resistance, and stamina.',
    },
    {
      title: 'Redguard',
      description:
        'The racial skills of the Redguards reflect their ancestral legacy as swordmasters, giving them bonuses to shields, stamina, stamina regeneration, stamina regeneration during combat, and duration of effects from food.',
    },
  ]

  const classes = [
    {
      title: 'Necromancer',
      description:
        'Masters of death, Necromancers can call upon corpses to serve as undead thralls and weave ghastly spells to both harm and heal.',
    },
    {
      title: 'Dragonknight',
      description:
        'These skillful masters-at-arms use the ancient Akaviri martial tradition of battle-spirit, and wield fearsome magic that pounds, shatters and physically alters the world around them.',
    },
    {
      title: 'Sorcerer',
      description:
        'Sorcerers summon and control weather phenomenon: hurling lightning bolts and creating electrified fields, summoning tornadoes and impenetrable fog, and calling upon Daedric forces to summon Storm Atronachs and magical armor',
    },
    { title: 'Warden', description: '' },
    {
      title: 'Nightblade',
      description:
        'Nightblades are adventurers and opportunists with a gift for getting in and out of trouble. Relying variously on stealth, blades, and speed, Nightblades thrive on conflict and misfortune, trusting to their luck and cunning to survive.',
    },
    {
      title: 'Templar',
      description:
        'These traveling knights call upon the powers of light and the burning sun to deal massive damage to their enemies while restoring health, magicka, and stamina to their allies.',
    },
  ]
  const [state] = useContext(BuildContext)
  useEffect(() => {
    localStorage.setItem('buildState', JSON.stringify(state))
  }, [state])
  return (
    <div>
      <Divider>General Information</Divider>
      <GeneralContainer>
        <Typography.Text>Build Name</Typography.Text>
        <Input size='large' placeholder='Type name...' />
        <Typography.Text>Application Area</Typography.Text>

        <Select size='large' placeholder="Select application area...">
          <Select.Option value='battlegrounds'>Battlegrounds</Select.Option>
          <Select.Option value='cyrodiil_raid'>Cyrodiil - Raid</Select.Option>
          <Select.Option value='cyrodiil_smallscale'>
            Cyrodiil - Small Scale
          </Select.Option>
          <Select.Option value='cyrodiil_solo'>Cyrodiil - Solo</Select.Option>
          <Select.Option value='pve_dungeons'>PvE - Dungeons</Select.Option>
          <Select.Option value='pve_arena'>PvE - Arena</Select.Option>
          <Select.Option value='pve_raid'>PvE - Raids</Select.Option>
          <Select.Option value='pve_openworld'>PvE - Open World</Select.Option>
        </Select>
      </GeneralContainer>

      <Divider>Race</Divider>
      <CardContainer>
        {races.map(race => (
          <RaceCard
            title={race.title}
            imageSource={chooseRace(race.title)}
            description={race.description}
          />
        ))}
      </CardContainer>
      <Divider>Class</Divider>
      <CardContainer>
        {classes.map(esoClass => (
          <EsoClassCard
            description={esoClass.description}
            title={esoClass.title}
            imageSource={chooseClass(esoClass.title)}
          />
        ))}
      </CardContainer>
    </div>
  )
}
