import * as React from "react";
import * as ReactDOM from "react-dom";
import { observable } from "mobx";
import { observer } from "mobx-react";
import DevTools from "mobx-react-devtools";

import RandomSelector from "./components/EmergencyApp";
import { URL } from "url";
import http = require('http');

import axios from 'axios';

class AppState {
  @observable timer = 0;
  @observable news = [];

  constructor() {
    setInterval(() => {
      this.timer += 1;
    }, 1000);
  }

  resetTimer() {
    this.timer = 0;
  }

  setNews(newsIn) {
    this.news = newsIn;
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

@observer
class GetNews extends React.Component<{ appState: AppState }, {}> {
  // state = {
  //   news: []
  // }

  componentDidMount() {
    axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=f2825310410d47a7a3d372f11c7a6e3a`)
      .then(res => {
        console.log(res);
        const news = res.data.articles;
        // console.log(this.state.news);
        // this.setState({ news });
        this.props.appState.setNews(news);
      });
  }

  render() {
    return (<div>
      <button onClick={this.getNews}>
        Do a thing for michael
      </button>
      <div>
        <ul>
          {/* {this.state.news} */}
        </ul>
        <ul>
          {/* {this.state.news.map(news =>
            <li key={news.publishedAt}>{news.title}</li>
          )} */}
          {this.props.appState.news.map(news => <li key={news.publishedAt}>{news.title}</li>)}
        </ul>
      </div>
    </div>
    )
  }

  getNews = () => {
    console.log("The news:");
    // console.log(this.state.news);
  }
}

const appState = new AppState();
// const randomBackend = new RandomBackend();
ReactDOM.render(
  <div>
    <TimerView appState={appState} />
    <RandomSelector />
    <SendMessageView appState={appState} />
    <GetNews appState={appState} />
  </div >,
  document.getElementById("root")
);
