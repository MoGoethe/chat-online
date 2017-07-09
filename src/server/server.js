import express from "express";
//const express = require("express");
import {Server} from "http";
//const HTTP = require("http");

const app = express();
const http = Server(app);

const rootPath = require("path").normalize(__dirname+'/../..');

app.set('views',__dirname+'/views');
app.set('view engine','ejs');

app.use(express.static(rootPath+"/public"));

const io = require("socket.io")(http);

import {makeStore} from "./store";
import listenWebSocket from "./io";

const store = makeStore();
listenWebSocket(io,store);

app.get("/",(req,res)=>{
	res.render("index");
})

http.listen(3001,()=>{
	console.log("listening on port 3001");
})