///<reference path="babylon.d.ts" />
import { Game } from "./game";
window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById("renderCanvas");
    let game = new Game("renderCanvas");
    // Create the scene.
    game.createScene();
    // Start render loop.
    game.doRender();
});
//# sourceMappingURL=main.js.map