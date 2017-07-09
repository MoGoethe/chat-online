import {fromJS} from "immutable"
import {expect} from "chai"
import rootReducer from "../../src/client/reducer"

import {
	newMessage,
	setState,
	switchRoom,
	setUsername,
} from "../../src/client/actionCreators"

const fakeState = fromJS({
	rooms:[
		{id:"0",name:"room1",owner:"seaseeyoul"},
		{id:"1",name:"room2",owner:"mogoethe"}
	],
	currentRoom:"1",
	username:"seaseeyoul",
	messages:{
		"1":[
			{user:"seaseeyoul",content:"react is cool",time:"14:48"},
			{user:"mogoethe",content:"react is cool",time:"14:49"}
		]
	}
})

describe("#client root reducer",()=>{
	it("set state",()=>{
		const nextState = rootReducer(fakeState,
			setState(fromJS({username:"Joan",currentRoom:"0"}))
		)
		expect(nextState.get("username")).to.equal("Joan")
		expect(nextState.get("rooms").size).to.equal(2)
	})

	it("set username",()=>{
		const nextState = rootReducer(fakeState,setUsername("Terry"))
		expect(nextState.get("username")).to.equal("Terry")
	})

	it("switch chat room",()=>{
		const nextState = rootReducer(fakeState,switchRoom("0"))
		expect(nextState.get("currentRoom")).to.equal("0")
	})

	it("send new message",()=>{
		const action = newMessage({
			roomId:"0",user:"seaseeyoul",content:"hello world!"
		})

		expect(action.message.time).to.be.ok
		const nextState = rootReducer(fakeState,action)

		expect( nextState.getIn(["messages","0"]).size ).to.equal(1)

		const nextNextState = rootReducer(fakeState,{
			type:"NEW_MESSAGE",
			message:{
				roomId:"1",
				user:"Terry",
				content:"hello my name is Terry",
				time:"12:00"
			}
		})
		expect(nextNextState.getIn(["messages","1"]).size).to.equal(3)

	})
})










