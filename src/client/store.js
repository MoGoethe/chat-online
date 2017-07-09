import {Map,fromJS,toJS} from "immutable"

const STATE_KEY = "CHAT_APP_STATE"

export function saveToStorage(state){
	var storageString = JSON.stringify(state.toJS ? state.toJS() : state)
	localStorage.setItem(STATE_KEY,storageString)
}

export function getInitialState(state){
	var stateString = localStorage.getItem( STATE_KEY )
	if(!stateString){
		return fromJS({
			rooms:[],
			messages:{},
			username:prompt("username")
		})
	}
	return fromJS(JSON.parse(stateString))
}