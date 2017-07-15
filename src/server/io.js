import { toJS } from "immutable"
const DEFAULT_ROOM = "0"

export default function listenWebSocket( io, store ){
	io.on("connection", socket=>{
		console.log("one client connected")
		
		socket.emit("state", store.getState() )
		// join this to the default room
		socket.join( DEFAULT_ROOM )
		// add/remove room logic goes here
		socket.on("action",action => {
			console.log("client action:", action )
			switch( action.type ){
				case "SWITCH_ROOM":
					return switchRoom( socket, store, action.roomId || DEFAULT_ROOM )
				
				// send this message back
				case "NEW_MESSAGE":
					if( socket.rooms  ){
						store.getState().get('rooms').map(room=>{
							socket.to( room.get('id') ).emit("message", action.message)	
						})
					}else{
						socket.emit( "message", action.message )
					}
					return
			}

			store.dispatch(action)
			// now send back new state
			socket.emit("state", store.getState() )
			if( ["ADD_ROOM","REMOVE_ROOM"].indexOf(action.type) > -1){
				socket.broadcast.emit("state", store.getState() )
			}
		})


		socket.on('disconnect', () => {
		  console.log('user disconnected');
		});
	})
}

function switchRoom(socket,store,roomId){

	store.getState().get('rooms').map( (room,index)=>{
		if( index > 0 ){
			socket.leave( room )	
		}
	})

	setTimeout(()=>{
		socket.join( roomId )
	},200)
}