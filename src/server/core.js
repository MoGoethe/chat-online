import {v1} from 'uuid';
import {fromJS,Map,List} from 'immutable';

export const INITIAL_STATE = fromJS({
	rooms:[],

});
//state=INITIAL_STATE es6 初始变量
export function addRoom(state=INITIAL_STATE,room){
	if(!room || !room.owner) return state;

	return state.update("rooms",rooms=>rooms.push(Map({
		id:room.id || v1(),
		name:room.name || "no name",
		owner:room.owner,
	})))
}

export function removeRoom(state,{id,user}){
	const rooms = state.get("rooms");
	var index = rooms.findIndex(r => r.get("id") === id);
	// -1 表示未找到
	if(index == -1 || rooms.getIn([index,"owner"]) !== user){
		console.log("非房间创建者，不能删除该房间");
		return state;
	}
	return state.update("rooms",rooms => rooms.splice(index,1))
	//和普通的数组函数一样
}