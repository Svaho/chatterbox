import React, { Component } from 'react';
import Messages from './components/Messages';
import Input from './components/Input';



function randomName() {
  const ime = [
   'Marko', 'Ante', 'Tino', 'Dino', 'Ino', 'Idriz', 'Krpa', 'Brajo', 'Stari', 'Mirza', 'Tomo', 'Tomislav', 'Antea', 'Antena', 'Magdalena', 'Matilda', 'Zdeslav', 'Svaho',
   'Tito', 'Marin', 'Elizabeta', 'Vili', 'Hrvoje'
  ];
  const prezime = [
    'Prže', 'Borat', 'Dužević', 'Marin', 'Jakovljević', 'Hrvatić', 'Prezime', 'Hadžihafizbegović', 'Bašić', 'Žlica', 'Bego', 'Didović', 'Pavlović', 'Ignocije', 'Muha',
    'Antonulović', 'Kim', 'Punjač', 'Balota', 'Bolanča', 'Bakičić', 'Uspinjač', 'Troković'
  ];
  const Name = ime[Math.floor(Math.random() * ime.length )];
  const Surname = prezime[Math.floor(Math.random() * prezime.length)];
  return Name + " " + Surname;
}

function memberColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

class App extends Component {
  state = {
    messages: [],
    member: {
      username: randomName(),
      color: memberColor(),
    }
  }

  constructor() {
    super();
    this.drone = new window.Scaledrone("CDahfIPuz2ImfY73", {
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