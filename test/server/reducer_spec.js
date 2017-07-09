import {expect} from "chai"
import {fromJS,Map,List} from "immutable"
import {v1} from "uuid"

import coreReducer from '../../src/server/reducer'
import {addRoom,removeRoom} from "../../src/server/actionCreator.js"

describe("#server端核心reducer",()=>{
	it("可以当做一个reducer",() => {
		var id = v1()
		var actions = [
			{type:"ADD_ROOM",room:{id,name:"1",owner:"seaseeyoul"}},//自带id
			{type:"ADD_ROOM",room:{name:"2",owner:"mogoethe"}},
			{type:"ADD_ROOM",room:{name:"3",owner:"seaseeyoul"}},
			{type:"REMOVE_ROOM",payload:{id:id,user:"seaseeyoul"}},
		]

		const finalState = actions.reduce(coreReducer,undefined)
		expect(finalState.get("rooms").size).to.equal(2)
		expect(finalState.getIn(["rooms",0,"owner"])).to.equal("mogoethe")
	})

	it("使用actionCreator",()=>{
		var id = v1();
		var actions = [
			addRoom({id,name:"1",owner:"seaseeyoul"}),
			addRoom({name:"2",owner:"mogoethe"}),
			addRoom({name:"3",owner:"seaseeyoul"}),
			removeRoom({id:id,user:"seaseeyoul"}),
		]
		const finalState = actions.reduce(coreReducer,undefined)
		expect(finalState.get("rooms").size).to.equal(2)
		expect(finalState.getIn(["rooms",0,"owner"])).to.equal("mogoethe")
	})

})
