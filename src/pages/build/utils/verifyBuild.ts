import { WeaponType, IBuild } from '../BuildStateContext'

export const verifyBuild = (build: IBuild, tab: number) => {
  const {
    frontbarSelection,
    backbarSelection,
    bigPieceSelection,
    smallPieceSelection,
    jewelrySelection,
    newBarOne,
    newBarTwo,
    ultimateOne,
    ultimateTwo,
  } = build!

  const hasValidFrontbar = frontbarSelection[0].selectedSet
    ? frontbarSelection[0].type === WeaponType.onehanded
      ? frontbarSelection[1].selectedSet
        ? true
        : false
      : true
    : false
  const hasValidBackbar = backbarSelection[0].selectedSet
    ? backbarSelection[0].type === WeaponType.onehanded
      ? backbarSelection[1].selectedSet
        ? true
        : false
      : true
    : false

  const hasValidBigPieces = bigPieceSelection.reduce(
    (prev, curr) => (prev && curr.selectedSet ? true : false),
    true
  )
  const hasValidSmallPieces = smallPieceSelection.reduce(
    (prev, curr) => (prev && curr.selectedSet ? true : false),
    true
  )
  const hasValidJewelry = jewelrySelection.reduce(
    (prev, curr) => (prev && curr.selectedSet ? true : false),
    true
  )

  const hasValidSkillBarOne = newBarOne.reduce(
    (prev, curr) =>
      prev && curr.skill && curr.skill.skillId !== 0 ? true : false,
    true
  )
  const hasValidSkillBarTwo = newBarTwo.reduce(
    (prev, curr) =>
      prev && curr.skill && curr.skill.skillId !== 0 ? true : false,
    true
  )
  const hasValidUltimateOne = ultimateOne && ultimateOne.skillId !== 0
  const hasValidUltimateTwo = ultimateTwo && ultimateTwo.skillId !== 0

  const isDisabled =
    (tab === 0 && (build.race === '' || build.esoClass === '')) ||
    (tab === 1 &&
      !(
        hasValidSkillBarOne &&
        hasValidSkillBarTwo &&
        hasValidUltimateOne &&
        hasValidUltimateTwo
      )) ||
    (tab === 2 &&
      !(
        hasValidJewelry &&
        hasValidBigPieces &&
        hasValidSmallPieces &&
        hasValidFrontbar &&
        hasValidBackbar
      ))
  return isDisabled
}
