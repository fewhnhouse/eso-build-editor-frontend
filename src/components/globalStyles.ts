const theme = {
  flexDisplay: "flex",
  ttWidth: "400px",
  relativePos: "relative",
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
    StamDD: "rgb(169, 212, 102)",
    StamPale: "rgb(250, 255, 242)",
    MagDD: "rgb(128, 210, 255)",
    MagPale: "rgb(224, 244, 255)",
    StamSupp: "rgb(109, 237, 186)",
    StamSuppPale: "rgb(236, 242, 230)",
    MagSupp: "rgb(181, 135, 255)",
    MagSuppPale: "rgb(216, 223, 227)"
  },
  statsHeal: "yellow",
  statsRes: "cyan",
  MyAvatar: {
    width: "40px",
    height: "40px",
    borderRadius: "3px"
  },
};

export interface ITheme {
  flexDisplay: string,
  ttWidth: string,
  relativePos: string,
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
