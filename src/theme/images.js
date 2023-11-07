/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/no-unresolved */
import { Asset } from 'expo-asset'

const images = {
  logo_sm: require('../../assets/images/logo-sm.png'),
  logo_lg: require('../../assets/images/logo-lg.png'),
  background_img: require('../../assets/images/background.png'),
  donation_img: require('../../assets/images/donation.png'),
  profile_img: require('../../assets/images/profile.png'),
  stats: require('../../assets/images/stats.png'),
  requestReceived: require('../../assets/images/requestReceived.png'),
}

// image preloading
export const imageAssets = Object.keys(images).map((key) =>
  Asset.fromModule(images[key]).downloadAsync(),
)

export default images
