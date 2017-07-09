import {fromJS} from "immutable";
import {expect} from "chai";
import {addRoom} from "../../src/server/actionCreator.js";
import {makeStore} from "../../src/server/store.js";

describe("#server store",()=>{
	it("dispatch actions",(done)=>{
		const  mokeStore = fromJS({
			rooms:[]
		});
		const store = makeStore(mokeStore);
		store.subscribe(()=>{
			const state = store.getState();
			expect(state.get("rooms").size).to.equal(1);
			done();
		});
		store.dispatch(addRoom({
			name:"聊天室",
			owner:"seaseeyoul",
		}))
	})
})