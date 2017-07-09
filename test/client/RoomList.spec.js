import React from "react";
import ReactDom from "react-dom";
import {fromJS,Map,List} from "immutable";
import {expect} from "chai";
import RoomList from "../../src/client/components/RoomList";

import TestUtil,{
	Simulate,
	renderIntoDocument,
	isCompositeComponentWithType,
	scryRenderedDOMComponentsWithTag,//
	scryRenderedDOMComponentsWithClass,
} from "react-addons-test-utils";

describe("#RoomList",()=>{
	it("render roomlist",()=>{
		const rooms = fromJS([
			{id:"0",name:"room1",owner:"seaseeyoul"},
			{id:"1",name:"room2",owner:"mogoethe"}
		]);

		const component = renderIntoDocument(
			<RoomList rooms={rooms} currentRoom = "1" />
		);
		//从组件中获取所有的a标签
		const $rooms = scryRenderedDOMComponentsWithTag(component,"a");
		expect($rooms.length).to.equal(2);
		const $activeRoom = scryRenderedDOMComponentsWithClass(component,"active");
		expect($activeRoom.length).to.equal(1);
	})

	it("change room",()=>{
		const rooms = fromJS([
			{id:"0",name:"room1",owner:"seaseeyoul"},
			{id:"1",name:"room2",owner:"mogoethe"}
		]);
		let currentRoom = "0";
		const switchRoom = (id)=>{
			currentRoom = id;
		};
		const RoomListEle = (
			<RoomList 
				rooms = {rooms}
				currentRoom = {currentRoom}
				switchRoom = {switchRoom}
			/>
		);
		const component = renderIntoDocument(RoomListEle);
		const $rooms = scryRenderedDOMComponentsWithTag(component,"a");
		Simulate.click(ReactDom.findDOMNode($rooms[1]));
		expect(currentRoom).to.equal("1");

		expect(isCompositeComponentWithType(component,RoomList)).to.be.true;
		//console.log("isElement",TestUtil.isElement(RoomListEle));
		//console.log("isElementOfType",TestUtil.isElementOfType(RoomListEle,RoomList));
		//console.log("TestUtil.isDOMComponent",TestUtil.isDOMComponent(component));
		//console.log("isCompositeComponent",TestUtil.isCompositeComponent(component));
	})
})






















