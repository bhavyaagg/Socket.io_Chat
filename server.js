/**
 * Created by bhavya on 21/2/17.
 */

const express = require('express');
const app = express();
const socket = require('socket.io');
const http = require('http');
const server = http.Server(app);

const io = socket(server);
const users={};
const messages=[];
io.on("connection", function (conn) {
    console.log("Client connected = " + conn.id);

    conn.on("user",function (user) {
        users[user]=conn.id;
        conn.emit("init",messages);
    });
    conn.on("send_msg", function (data) {
        if (data.msg[0] != '@') {
            messages.push({username:data.user,msg:data.msg});
            io.emit("recv_msg", data);
        }
        else{
            console.log(users);

            const to=data.msg.split(" ");
            const msg=to.splice(1).join(" ");
            console.log(to);
            console.log(msg);
            io.to(users[to[0].slice(1)]).emit("recv_msg",{user:data.user,msg:msg});
            conn.emit("recv_msg",{user:data.user,msg:msg});
        }
    })

})


app.use('/', express.static(__dirname + "/public"));

server.listen(4444, () => {
    console.log("Started at 4444");
});