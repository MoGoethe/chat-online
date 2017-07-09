import React from "react"
import ReactDom from "react-dom"
import {fromJS,Map,List} from "immutable"
import {expect} from "chai"
import InputBox from "../../src/client/components/InputBox"

import TestUtil,{
	Simulate,
	renderIntoDocument,
	isCompositeComponentWithType,
	findRenderedDOMComponentWithTag,
	scryRenderedDOMComponentsWithTag,
	scryRenderedDOMComponentsWithClass,
} from "react-addons-test-utils"

describe("#InputBox",()=>{
	it("send message",()=>{
		var message
		function sendMessage(msg){
			message =msg
		}
		const instance = renderIntoDocument(
			<InputBox sendMessage={sendMessage} />
		)
		
		const $textarea = findRenderedDOMComponentWithTag(instance,"textarea")
		expect($textarea).to.be.ok

		$textarea.value = "some message"

		const $form = findRenderedDOMComponentWithTag(instance,"form")
		Simulate.submit($form)

		expect(message).to.equal("some message")
	})
})