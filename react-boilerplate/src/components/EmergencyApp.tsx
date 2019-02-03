import * as React from "react";
import * as ReactDOM from "react-dom";
import { observable } from "mobx";
import { observer } from "mobx-react";
import DevTools from "mobx-react-devtools";


import "./styles.css";
// require("style!css-loader!styles.css");

@observer
export default class EmergencyApp extends React.Component<
{},
{
  backend: RandomBackend;
  randomNum: Number;
}
> {
  public backend = new RandomBackend();
  constructor() {
    super();
  }

  render() {
    console.log(this.props);
    return (
      <div>
        Temp
      </div>
    );
  }
}

class RandomBackend {
  @observable randomNum: Number = -1;

  public pickRandomOfTen(): Number {
    this.randomNum = Math.floor(Math.random() * 10);
    return this.randomNum;
  }
}
