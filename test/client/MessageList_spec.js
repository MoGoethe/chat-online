import React from "react"
import ReactDom from "react-dom"
import {fromJS,Map,List} from "immutable"
import {expect} from "chai"
import MessageList from "../../src/client/components/MessageList"

import TestUtil,{
	Simulate,
	renderIntoDocument,
	isCompositeComponentWithType,
	findRenderedDOMComponentWithTag,
	scryRenderedDOMComponentsWithTag,
	scryRenderedDOMComponentsWithClass,
} from "react-addons-test-utils"

describe("#MessageList",()=>{
	it("render messageList",()=>{
		const messages = fromJS([
			{user:"seaseeyoul",content:"A new message",time:"14:28"},
			{user:"mogoethe",content:"Another new message",time:"15:31"}
		])
		const component = renderIntoDocument(
			<MessageList username="seaseeyoul" messages={messages} />
		)

		const $messages = scryRenderedDOMComponentsWithTag(component,"li")
		const $mymessages = scryRenderedDOMComponentsWithClass(component,"message-self")

		expect($messages.length).to.equal(2)
		expect($mymessages.length).to.equal(1)
	})
})