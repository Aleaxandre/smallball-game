import { Playground } from "./playground";
export class Game {
    constructor(canvasElement) {
        this.createEngine = (canvas) => {
            const engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
            if (!this.engine) {
                throw 'engine should not be null.';
            }
            return engine;
        };
        this.createScene = () => {
            this.scene = Playground.CreateScene(this.engine, this.engine.getRenderingCanvas());
            this.sceneToRender = this.scene;
        };
        this.doRender = () => {
            // The canvas/window resize event handler.
            window.addEventListener('resize', () => {
                this.engine.resize();
            });
            this.engine.runRenderLoop(() => {
                if (this.sceneToRender) {
                    this.sceneToRender.render();
                }
            });
        };
        // Create canvas and engine.
        this.canvas = document.getElementById(canvasElement);
        this.engine = this.createEngine(this.canvas);
    }
}
//# sourceMappingURL=game.js.map