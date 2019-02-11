// import: third party modules
const server = require('express')();
const line = require('@line/bot-sdk');

// parameters for line message api
const params = {
	channelAccessToken: 'JnqZehgGyZChr/1BnB2arUTHUIXz+xZ4hxR92lDMuhtu8tHNH9nS2JV+DL9wAF/DZJmjzvjCwjRIFHGEKDL2vFfBOyrUcIFtC4dthwoSWl49GfY6kvZP8ToLvKF8hbElxATPuYwNsepq/95HZvgn4wdB04t89/1O/w1cDnyilFU=',
	channelSecret: '8a3b1aa4f536f68a6ae581a5af55bfbf'
}

// instance for bot
const bot = new line.Client(params);

// sever build
server.listen(process.env.PORT);

// routing
// リクエストを受信する
server.post('/',line.middleware(params), (req,res,next)=>{
	res.sendStatus(200);

	req.body.events.forEach((event)=>{

		eventHandle(event).then((response)=>{ // message handler
			return reply(event.replyToken,response); // reply
		}).catch((err)=>{
			console.error(err);
		});
	});

});

// message handler
// どんなメッセージに対してもHelloWorldを後ろにつけて返す
// メッセージがテキストタイプでなかったらHelloWorldだけ返す
const eventHandle = (event)=>{
	return Promise.resolve({
		type: 'text',
		text: (event.message.text || '')+'HelloWorld'
	});
}

// reply
// 返事を返す
const reply = (token,message)=>{
	return bot.replyMessage(token,message);
}