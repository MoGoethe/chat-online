import React,{ Component } from "react"
import Message from "./Message"

class MessageList extends Component{

	isSelf(message){
		return this.props.username === message.get("user")
	}

	getMessageList(messages){
		if(!messages || messages.size ==0)return <p>no message</p>

		return messages.map((message,index) => {
			return <Message 
						key={index} 
						isSelf={this.isSelf(message)}
						message = {message}
					/>
		})
	}

	render(){
		const { messages } = this.props

		return(
			<ul className="chat-messages">
				{
					this.getMessageList(messages)
				}
			</ul>
		)
	}
}

import PureRenderMixin from "react-addons-pure-render-mixin"
import reactMixin from "react-mixin"
reactMixin.onClass(MessageList,PureRenderMixin)

export default MessageList 