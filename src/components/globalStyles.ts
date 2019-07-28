const theme = {

  primary: "blue",
  mainBg: "rgb(155, 155, 155)",

  baseStatColors: {
    healthRed: "red",
    stamGreen: "green",
    magBlue: "blue"
  },

  dmgStatColors: {
    statsWeaponDmg: "green",
    statsSpellDmg: "blue"
  },

  roleCardColors: {
    StamDD: "rgb(108, 209, 0)",
    MagDD: "rgb(0, 136, 209)",
    StamSupp: "rgb(49, 94, 0)",
    MagSupp: "rgb(0, 66, 102)"
  },

  statsHeal: "yellow",
  statsRes: "cyan"
};

export interface ITheme {
  primary: string;
  baseStatColors: {
    healthRed: string,
    stamGreen:string,
    magBlue: string
  },
  statsHeal: string;
  statsRes: string;
  dmgStatColors: {
    statsWeaponDmg: string,
    statsSpellDmg: string,
  },
  roleCardColors: {
    StamDD: string,
    MagDD: string,
    StamSupp: string,
    MagSupp: string,
  },
  mainBg: string;
}

export default theme;
