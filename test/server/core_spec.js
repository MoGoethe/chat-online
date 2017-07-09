import {expect} from 'chai';
import {v1} from 'uuid';
import {fromJS,Map,List} from 'immutable';
import {
	addRoom,
	removeRoom
} from '../../src/server/core.js';


describe("#rooms",()=>{
	//可以新增一个房间
	it("新增一个房间：addRooms",()=>{
		var firstRoom = {name:"first room",id:v1(),owner:"seaseeyoul"};
		const nextState = addRoom(undefined,firstRoom);
		const rooms = nextState.get("rooms");
		expect(rooms).to.be.ok;
		expect(rooms.get(0)).to.equal(Map(firstRoom));

		const nextNextState = addRoom(nextState,{
			name:"second room",owner:"mogoethe"
		});
		expect(nextNextState.getIn(["rooms",1,"name"])).to.equal("second room");
	})
	//新增一个默认的state
	const mockState = fromJS({
		rooms:[{name:"first room",id:v1(),owner:"seaseeyoul"}]
	})
	//保证这个房间能被创建者删除
	it("能被创建者删除：removeRoom",() => {
		const state = removeRoom(mockState,{
			id:mockState.getIn(["rooms",0,"id"]),
			user:"seaseeyoul",
		});

		expect(state.get("rooms").size).to.equal(0);
	})

	it("不能被其他人删除：removeRoom",()=>{
		const state = removeRoom(mockState,{
			id:mockState.getIn(["rooms",0,"id"]),
			user:"mogoethe",
		});

		expect(state.get("rooms").size).to.equal(1);
	})
})

















