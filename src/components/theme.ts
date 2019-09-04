const theme = {
  primary: 'blue',
  mainBg: 'rgb(155, 155, 155)',
  borderRadius: '3px',
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

export interface ITheme {
  primary: string
  roleCardColors: {
    StamDD: string
    StamPale: string
    MagDD: string
    MagPale: string
    StamSupp: string
    StamSuppPale: string
    MagSupp: string
    MagSuppPale: string
  }
  mainBg: string
}

export default theme
