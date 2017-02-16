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


export class Instructions extends React.Component<Props, {}> {
  title : string;
  constructor(props) {
    super(props);
    this.title = $("title").text();
  }

  // need this like to help with transpile
  refs : {}

  changeLevel(gameLevelIndex : number) {
    Game.instance.settings.gameLevelIndex = gameLevelIndex;
    Game.instance.canvasBoard.loadBoardAndDraw();
  }

  render() {
    return <span className="content">
      <span className="title">{this.title}</span>
      <br/><br/>
      <span className="description">The goal of this game is
      to give every cat on each tile exactly <span style={{"fontWeight":"bold"}}>2</span> yarn balls.
      Clicking on a tile will drop a yarn on that tile in addition to
      its orthogonally adjacent  (up,right,down,left) tiles where applicable.
      If a tile already contains 2 yarn balls, the cat on that tile will make a mess of
      the yarn and henceforth be left with no yarn balls.
      <span style={{"fontWeight":"bold"}}> Good luck!</span>
      <LevelSelector changeLevel={this.changeLevel} levelIndex={Game.instance.settings.gameLevelIndex}/>
      </span>
    </span>;
  }

}
