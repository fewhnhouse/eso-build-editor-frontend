import castle from '../../../assets/icons/castle-ico.png'
import circle from '../../../assets/icons/circle-ico.png'
import hammer from '../../../assets/icons/hammer-ico.png'
import leaf from '../../../assets/icons/leaf-ico.png'
import myt from '../../../assets/icons/myt-ico.png'
import shield from '../../../assets/icons/shield-ico.png'
import helmet from '../../../assets/icons/helmet-ico.png'

export const classSkillLines = [
  {
    esoClass: 'Nightblade',
    items: [
      { title: 'Assassination', id: 10 },
      { title: 'Shadow', id: 11 },
      { title: 'Siphoning', id: 12 },
    ],
  },
  {
    esoClass: 'Sorcerer',
    items: [
      { title: 'Dark Magic', id: 7 },
      { title: 'Daedric Summoning', id: 8 },
      { title: 'Storm Calling', id: 9 },
    ],
  },
  {
    esoClass: 'Necromancer',
    items: [
      { title: 'Grave Lord', id: 54 },
      { title: 'Bone Tyrant', id: 55 },
      { title: 'Living Death', id: 56 },
    ],
  },
  {
    esoClass: 'Templar',
    items: [
      { title: 'Aedric Spear', id: 4 },
      { title: 'Dawn´s Wrath', id: 5 },
      { title: 'Restoring Light', id: 6 },
    ],
  },
  {
    esoClass: 'Dragonknight',
    items: [
      { title: 'Ardent Flame', id: 1 },
      { title: 'Draconic Power', id: 2 },
      { title: 'Earthen Heart', id: 3 },
    ],
  },
  {
    esoClass: 'Warden',
    items: [
      { title: 'Animal Companions', id: 13 },
      { title: 'Winter´s Embrace', id: 15 },
      { title: 'Green Balance', id: 14 },
    ],
  },
]

export const skillLines = [
  {
    title: 'Weapon',
    icon: shield,
    items: [
      { title: 'Two Handed', id: 16 },
      { title: 'One Hand and Shield', id: 17 },
      { title: 'Dual Wield', id: 18 },
      { title: 'Bow', id: 19 },
      { title: 'Destruction Staff', id: 20 },
      { title: 'Restoration Staff', id: 21 },
    ],
  },
  {
    title: 'Armor',
    icon: helmet,
    items: [
      { title: 'Light Armor', id: 22 },
      { title: 'Medium Armor', id: 23 },
      { title: 'Heavy Armor', id: 24 },
    ],
  },
  {
    title: 'World',
    icon: circle,
    items: [
      { title: 'Soul Magic', id: 25 },
      { title: 'Legerdemain', id: 28 },
      { title: 'Vampirism', id: 26 },
      { title: 'Werewolf', id: 27 },
      { title: 'Scrying', id: 59 },
      { title: 'Excavation', id: 60 },
    ],
  },
  {
    title: 'Guild',
    icon: myt,
    items: [
      { title: 'Mages Guild', id: 30 },
      { title: 'Fighters Guild', id: 29 },
      { title: 'Psijic Order', id: 34 },
      { title: 'Undaunted', id: 31 },
      { title: 'Thieves Guild', id: 32 },
      { title: 'Dark Brotherhood', id: 33 },
    ],
  },
  {
    title: 'Alliance War',
    icon: castle,
    items: [
      { title: 'Assault', id: 35 },
      { title: 'Support', id: 36 },
    ],
  },
  {
    title: 'Racial',
    icon: leaf,
    items: [
      { title: 'Breton', id: 44 },
      { title: 'Redguard', id: 45 },
      { title: 'Orc', id: 46 },
      { title: 'Nord', id: 47 },
      { title: 'Dunmer', id: 48 },
      { title: 'Argonian', id: 49 },
      { title: 'Altmer', id: 50 },
      { title: 'Bosmer', id: 51 },
      { title: 'Khajiit', id: 52 },
      { title: 'Imperial', id: 53 },
    ],
  },
  {
    title: 'Craft',
    icon: hammer,
    items: [
      { title: 'Alchemy', id: 37 },
      { title: 'Blacksmithing', id: 1 },
      { title: 'Clothing', id: 1 },
      { title: 'Enchanting', id: 1 },
      { title: 'Jewelry Crafting', id: 1 },
      { title: 'Provisioning', id: 1 },
      { title: 'Woodworking', id: 1 },
    ],
  },
]
