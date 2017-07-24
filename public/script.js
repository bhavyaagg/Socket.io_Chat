/**
 * Created by bhavya on 21/2/17.
 */



const conn = io();

$(function () {

    const user=prompt("Enter username");
    conn.on("init",function (data) {
        for(var i=0;i<data.length;i++){
            console.log("hi");
            $('#chats').append("<li>Username:" +data[i].username+" Message:" + data[i].msg+ "</li>")
        }
    })
    conn.emit("user",user);
    $('#send').click(function () {
        conn.emit("send_msg",{ user:user,msg:$('#msg').val()});
    });

    conn.on("recv_msg", function (data) {
        $('#chats').append("<li>Username:" +data.user+" Message:" + data.msg+ "</li>")
    });
})