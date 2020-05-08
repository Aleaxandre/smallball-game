///<reference path="babylon.d.ts" />
import { Game } from "./game";
// window.CANNON = require('cannon');

window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

    let game: Game = new Game("renderCanvas");

    // Create the scene.
    game.createScene();

    // Start render loop.
    game.doRender();

});