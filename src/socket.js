import React, { useState, useEffect} from "react";
import socketClient from "socket.io-client";
const SERVER = 'http://localhost:3002';
const socket = socketClient.connect(SERVER);
const Socket = () => {
    const [message, setMessage] = useState('');
    const [rmessage, setRmessage] = useState('');
    const [room, setRoom] = useState('');
    // socket.on('connection', () => {
    //     console.log(`I'm connected with the back-end`);
    // });

    useEffect(() => {
        socket.on('recieve_Message', (data) => {
            console.log('ininininni => ', data);
            // alert(data.message);
            setRmessage(data.message)
        })
    }, [socket])

    const sendMsg = () => {
        socket.emit('send_msg', { message, room })
    }

    const roomJoin = () => {
        socket.emit('join_room', { room })
    }
    
    return <div>
        Socket Practice here!
        <br />
        <input placeholder="Enter Room" onChange={(event) => setRoom(event.target.value)}/>
        <button onClick={roomJoin}>Join Room</button> <br />
        <input placeholder="Message..." onChange={(event) => setMessage(event.target.value)}/>
        <button onClick={sendMsg}>Send Message</button>
        {
            rmessage ? <h4>{rmessage}</h4>: null
        }
    </div>
}

export default Socket;