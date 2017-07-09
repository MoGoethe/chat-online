import React from "react"
import ReactDom from "react-dom"
import {fromJS,Map,List} from "immutable"
import {expect} from "chai"
import Message from "../../src/client/components/Message"

import TestUtil,{
	Simulate,
	renderIntoDocument,
	isCompositeComponentWithType,
	findRenderedDOMComponentWithTag,
	scryRenderedDOMComponentsWithTag,
	scryRenderedDOMComponentsWithClass,
} from "react-addons-test-utils"

describe("#Message",()=>{
	it("render messgae",()=>{
		const message1 = fromJS([
			{user:"seaseeyoul",content:"A new message",time:"14:28"}
		])

		const component = renderIntoDocument(
			<Message isSelf={true} message={message1} />
		)

		const $message = scryRenderedDOMComponentsWithClass(component,"message-self")
		expect($message.length).to.equal(1)
	})
})