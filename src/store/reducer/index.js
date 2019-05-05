import { SWICTH_MENU } from '../actionTypes'

const defaultState = {
  menuName: '首页'
}

const reducer = (state=defaultState, action) => {
  switch(action.type) {
    case SWICTH_MENU:
      return {
        ...state, ...{ menuName: action.menuName}
      }
    default:
     return state
  }
}


export default reducer