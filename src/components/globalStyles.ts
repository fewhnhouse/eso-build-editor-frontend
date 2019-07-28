const theme = {
  primary: "blue",
  healthRed: "red",
  stamGreen: "green",
  magBlue: "blue",
  statsHeal: "yellow",
  statsRes: "cyan",
  statsWeaponDmg: "green",
  statsSpellDmg: "blue",
  roleStamDD: "rgb(108, 209, 0)",
  roleMagDD: "rgb(0, 136, 209)",
  roleStamSupp: "rgb(49, 94, 0)",
  roleMagSupp: "rgb(0, 66, 102)",
  mainBg: "rgb(155, 155, 155)"
};

export interface ITheme {
  primary: string;
  healthRed: string;
  stamGreen: string;
  magBlue: string;
  statsHeal: string;
  statsRes: string;
  statsWeaponDmg: string,
  statsSpellDmg: string,
  roleStamDD: string,
  roleMagDD: string,
  roleStamSupp: string,
  roleMagSupp: string,
  mainBg: string;
}

export default theme;
