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
    StamPale: "rgb(243, 255, 230)",
    MagDD: "rgb(0, 136, 209)",
    MagPale: "rgb(224, 244, 255)",
    StamSupp: "rgb(49, 94, 0)",
    StamSuppPale: "rgb(236, 242, 230)",
    MagSupp: "rgb(0, 66, 102)",
    MagSuppPale: "rgb(216, 223, 227)"
  },

  statsHeal: "yellow",
  statsRes: "cyan"
};

export interface ITheme {
  primary: string;
  baseStatColors: {
    healthRed: string;
    stamGreen: string;
    magBlue: string;
  };
  statsHeal: string;
  statsRes: string;
  dmgStatColors: {
    statsWeaponDmg: string;
    statsSpellDmg: string;
  };
  roleCardColors: {
    StamDD: string;
    StamPale: string,
    MagDD: string;
    MagPale: string,
    StamSupp: string;
    StamSuppPale: string,
    MagSupp: string;
    MagSuppPale: string
  };
  mainBg: string;
}

export default theme;
