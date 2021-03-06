import ReactDOM from "react-dom"
import React from "react"
import {ConnectedApp} from "./components/App"

import { Provider } from "react-redux"

import {socket} from "./io"


import {createStore, applyMiddleware} from "redux"
import {logger, socketMiddleware} from "./middleware"

import rootReducer from "./reducer"
import {setState,newMessage} from "./actionCreators"
import {getInitialState,saveToStorage} from "./store"


//..............

import { fromJS, Map, List } from "immutable"

const createStoreWithMiddleware = applyMiddleware(
	logger, 
	socketMiddleware(socket)
)(createStore)

const store = createStoreWithMiddleware( rootReducer,getInitialState() )

socket.on("state",state=>{
	store.dispatch(setState(state))
})

socket.on("message",message=>{
	console.log("get message from server")
	store.dispatch(newMessage(message,true))
})

var $app = document.getElementById("app")

function render(){
	ReactDOM.render(
		<Provider store = {store}>
			<ConnectedApp />
		</Provider>,
		$app
	)
}
render()

store.subscribe(()=>{
	saveToStorage(store.getState())
})


