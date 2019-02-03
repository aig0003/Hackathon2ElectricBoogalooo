import * as React from "react";
import * as ReactDOM from "react-dom";
import { observable } from "mobx";
import { observer } from "mobx-react";
import DevTools from "mobx-react-devtools";

import RandomSelector from "./components/randomSelector";
import { URL } from "url";
import http = require('http');

class AppState {
  @observable timer = 0;

  constructor() {
    setInterval(() => {
      this.timer += 1;
    }, 1000);
  }

  resetTimer() {
    this.timer = 0;
  }
}

@observer
class TimerView extends React.Component<{ appState: AppState }, {}> {
  render() {
    return (
      <div>
        <button onClick={this.onReset}>
          Seconds passed: {this.props.appState.timer}
        </button>
        <DevTools />
      </div>
    );
  }

  onReset = () => {
    this.props.appState.resetTimer();
  };
}

@observer
class SendMessageView extends React.Component<{ appState: AppState }, {}> {
  render() {
    return (
      <div>
        <button onClick={this.sendMessage}>
          Send a Text Message!
        </button>
      </div>
    )
  }
  sendMessage = () => {
    console.log("You clicked me :)");
    var accountSid = 'ACa307262eb239bfb6c410fff63f06efde'; // Your Account SID from www.twilio.com/console
    var authToken = 'fbd1a681d1baa06c1f3089d4022fbae4';   // Your Auth Token from www.twilio.com/console

    var twilio = require('twilio');
    var client = new twilio(accountSid, authToken);

    client.messages.create({
      body: 'Hello from Node',
      to: '+12054271527',  // Text this number
      from: '+12052361412' // From a valid Twilio number
    }).then((message) => console.log(message.sid));

  }
}

const appState = new AppState();
// const randomBackend = new RandomBackend();
ReactDOM.render(
  <div>
    <TimerView appState={appState} />
    <RandomSelector />
    <SendMessageView appState={appState} />
  </div >,
  document.getElementById("root")
);
