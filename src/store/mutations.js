
import {
  CHANGE_SUBSCRIBE
} from './mutation-types.js'

import {setStorage} from '../config/mUtils'


export default {
  [CHANGE_SUBSCRIBE](state,type){
    console.log(type);
    state.subscribeType = type;
    console.log(state);
		setStorage('subscribe',state.subscribeType)
	},
}


