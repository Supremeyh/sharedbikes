import { SWICTH_MENU } from '../actionTypes'

const switchMenuAction = (menuName) => {
  return {
    type: SWICTH_MENU,
    menuName
  }
}



export { switchMenuAction }