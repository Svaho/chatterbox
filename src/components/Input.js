import {Component} from "react";
import React from "react";

class Input extends Component {
  state = {
    text: ""
  }

  onSubmitForm(e) {
    e.preventDefault();
    this.setState({text: ""});
    this.props.onSendMessage(this.state.text);
  }

  onChangeText(e) {
    this.setState({text: e.target.value});
  }

  render() {
    return (
      <div className="Input">
        <form onSubmit={e => this.onSubmitForm(e)}>
          <input
            onChange={e => this.onChangeText(e)}
            value={this.state.text}
            type="text"
            placeholder="Upišite poruku"
            autoFocus={true}
          />
          <button><img height={15} src="http://cdn.onlinewebfonts.com/svg/img_509221.png" alt="Pošalji"></img></button>
        </form>
      </div>
    );
  }
}

export default Input;