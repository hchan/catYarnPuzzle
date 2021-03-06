/// <reference path="node_modules/@types/jquery/index.d.ts"/>
/// <reference path="typings/modules/react/index.d.ts"/>
/// <reference path="typings/modules/react-dom/index.d.ts"/>
import {Game} from './Game';
import {LevelSelector} from './LevelSelector';
import * as React from "react"
import * as DOM from 'react-dom';
import stylePropType from 'react-style-proptype';
export interface Props {

}


export class Welcome extends React.Component<Props, {}> {
  title : string;
  constructor() {
    super();
    this.title = $("title").text();
  }

  // need this like to help with transpile
  refs : {}

  changeLevel(gameLevelIndex : number) {
    Game.instance.settings.gameLevelIndex = gameLevelIndex;
    Game.instance.canvasBoard.loadBoardAndDraw();
  }

  doInstructions() {
    alert("Instructions Not Implemented Yet")
  }

  doAbout() {
    alert("Not Implemented Either")
  }

  doPlay() {
    Game.beginPlay();
  }

  render() {
    return <div id="game">
      <span id="game-left">{' '}</span>
          <span id="game-body">

            <img className="welcomeImg" id="welcomeImg" src="img/welcome.png" onClick={this.doPlay}/>
          </span>

      <span id="game-right">{' '}</span>
    </div>;
  }

}
