import React, { Component } from 'react';
import Messages from './components/Messages';
import Input from './components/Input';
import getMemberColor from './utils/NameAndColor';
import getRandomName from './utils/NameAndColor';

class App extends Component {
  state = {
    messages: [],
    member: {
      username: getRandomName(),
      color: getMemberColor(),
    }
  }

  constructor() {
    super();
    this.drone = new window.Scaledrone(process.env.REACT_APP_SCALEDRONE_API_KEY, {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });
    const room = this.drone.subscribe("observable-room");
    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({member, text: data});
      this.setState({messages});
    });
  }

  render() {
    return (
      <>
       <div className="App">
        <div className="App-header">
          <h1>Chatterbox</h1>
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input
          onSendMessage={this.onSendMessage}
        />
      </div>
      </>
     
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  }

}

export default App;