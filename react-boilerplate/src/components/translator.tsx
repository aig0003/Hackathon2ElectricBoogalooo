import * as React from "react";
import * as ReactDOM from "react-dom";
import { observable } from "mobx";
import { observer } from "mobx-react";
import DevTools from "mobx-react-devtools";

var data = require("../data/items.json");

export default class Translator {
  public appState = observable({
    currentFoodItem: "Click 'Generate!' to begin",
    currentFoodCategory: ""
  });

  /**
   * Takes a key and a category and looks for them within the data JSON object.
   * @param category This is the category that the item belongs in.
   * @param key This is the specific numeric key that the item has.
   */
  public findByKeyAndCategory(category: string, key: string): any {
    try {
      return data[category][key];
    } catch (e) {
      throw new Error("There was no item matching the supplied values");
    }
  }

  public generateRandomFoodCategory(): void {
    let catKeys: string[] = Object.keys(data);
    let random = Math.floor(Math.random() * catKeys.length);
    this.appState.currentFoodCategory = catKeys[random];
  }

  public generateRandomFoodItem(): void {
    this.generateRandomFoodCategory();
    let items = data[this.appState.currentFoodCategory];
    let random = Math.floor(Math.random() * items.length);
    this.appState.currentFoodItem = items[random];
  }
}
