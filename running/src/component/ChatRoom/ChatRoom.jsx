import React, { useState, useEffect } from "react";
import { Form, Container, Button } from "react-bootstrap";
import io from "socket.io-client";

const URL = process.env.REACT_APP_URL;
const socket = io.connect("http://localhost:5555/");

export default function ChatRoom(props) {
  const [state, setState] = useState({ message: "", username: "" });
  const [chat, setChat] = useState([]);

  useEffect(() => {
    if (props.user) {
      setState({ username: `${props.user.username}`, message: "" });
      console.log("chatroom useeffect " + JSON.stringify(props.user.username));
    }
  }, [props.user]);

  useEffect(() => {
    if (state.username) {
      socket.on("message", ({ username, message }) => {
        setChat([...chat, { username, message }]);
      });
    }
  });

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const { username, message } = state;
    console.log(`dsads ${username}`);
    socket.emit("message", { username, message });
    setState({ message: "", username });
  };

  const renderChat = () => {
    return chat.map(({ username, message }, index) => (
      <div key={index}>
        <h3>
          {username}: <span>{message}</span>
        </h3>
      </div>
    ));
  };
  return (
    <div className="App">
      <div className="render-chat">
        <h1>Chat Log</h1>
        {renderChat()}
      </div>
      <Container>
        <Form.Control
          size="lg"
          type="text"
          placeholder="Message"
          name="message"
          onChange={(e) => onTextChange(e)}
          value={state.message}
          label="Message"
        ></Form.Control>
        <Button onClick={sendMessage}>Send Message</Button>
      </Container>
    </div>
  );
}
