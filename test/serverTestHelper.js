/*

//数据结构
client:
	{
		rooms:[
			{name,id,owner}
		],
		username,
		current,
		message:{
			id:[{
				content,user,time
			}],
			id2:[{

			}]
		}
	}

serve:
	{
		rooms:[
			{name,id,owner}
		],
	}
*/
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

chai.use(chaiImmutable)