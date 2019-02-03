import * as React from "react";
import * as ReactDOM from "react-dom";
import { observable } from "mobx";
import { observer } from "mobx-react";
import DevTools from "mobx-react-devtools";

import Translator from "./translator";

import "./styles.css";
// require("style!css-loader!styles.css");

@observer
export default class RandomSelector extends React.Component<
  {},
  {
    backend: RandomBackend;
    randomNum: Number;
    translator: Translator;
  }
> {
  public backend = new RandomBackend();
  public translator = new Translator();
  constructor() {
    super();
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <div>
          <button onClick={() => this.translator.generateRandomFoodItem()}>
            GENERATE!!
          </button>
        </div>
        <div className="test_category">
          {this.translator.appState.currentFoodItem}
          {this.translator.appState.currentFoodCategory}
        </div>
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
