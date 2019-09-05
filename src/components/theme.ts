const theme = {
  primary: '#1890ff',
  mainBg: 'rgb(155, 155, 155)',
  mainBorderColor: 'rgb(232, 232, 232)',
  fontSizes: {
    small: '14px',
    normal: '16px',
    huge: '30px'
  },
  colors: {
    grey: {
      light: "rgba(0,0,0,0.25)",
      medium: "rgba(0,0,0,0.45)",
      normal: "rgba(0,0,0,0.65)",
      dark: "rgba(0,0,0,0.85)"
    }
  },
  borderRadius: '4px',
  widths: {
    mini: '150px',
    small: '250px',
    medium: '400px',
    large: '450px',
  },
  margins: {
    mini: '5px',
    small: '10px',
    medium: '20px',
    large: '40px',
  },
  paddings: {
    mini: '5px',
    small: '10px',
    medium: '20px',
    large: '40px',
  },
  roleCardColors: {
    StamDD: 'rgb(169, 212, 102)',
    MagDD: 'rgb(128, 210, 255)',
    StamSupp: 'rgb(109, 237, 186)',
    MagSupp: 'rgb(181, 135, 255)',
  },
  icon: {
    width: '40px',
    height: '40px',
    borderRadius: '3px',
    containerPadding: '16px',
    border: '2px solid rgba(0, 0, 0, 0.45)',
  },
  smallIcon: {
    width: '28px',
    height: '28px',
  },
  costs: {
    ultimate: '#8e44ad',
    magicka: '#2980b9',
    stamina: '#27ae60',
    default: '#e74c3c',
  },
  description: {
    newEffect: '#2ecc71',
    notNewEffect: 'rgba(0, 0, 0, 0.45)',
  },
}

export interface Widths {
  mini: string
  small: string
  medium: string
  large: string
}

export interface FontSizes {
  small: string
  normal: string
  huge: string
}

export interface Colors {
  grey: {
    light: string
    medium: string
    normal: string
    dark: string
  }
}

export interface Margins {
  mini: string
  small: string
  medium: string
  large: string
}
export interface Paddings {
  mini: string
  small: string
  medium: string
  large: string
}
export interface RoleCardColors {
  StamDD: string
  MagDD: string
  StamSupp: string
  MagSupp: string
}

export interface Icon {
  width: string
  height: string
  borderRadius: string
  containerPadding: string
  border: string
}

export interface SmallIcon {
  width: string
  height: string
}

export interface Costs {
  ultimate: string
  magicka: string
  stamina: string
  default: string
}

export interface Description {
  newEffect: string
  notNewEffect: string
}

export interface ITheme {
  primary: string
  mainBg: string
  mainBorderColor: string
  colors: Colors
  borderRadius: string
  widths: Widths
  fontSizes: FontSizes
  margins: Margins
  paddings: Paddings
  roleCardColors: RoleCardColors
  icon: Icon
  smallIcon: SmallIcon
  costs: Costs
  description: Description
}

export default theme
