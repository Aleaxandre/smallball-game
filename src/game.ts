import { Playground } from "./playground";
(global as any).CANNON = require('cannon');

export class Game {
    engine!: BABYLON.Engine;
    scene!: BABYLON.Scene;
    sceneToRender!: BABYLON.Scene;
    private canvas!: HTMLCanvasElement;

    constructor(canvasElement: string) {
        // Create canvas and engine.
        this.canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this.engine = this.createEngine(this.canvas);

    }

    createEngine = (canvas: HTMLCanvasElement) => {
        const engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });

        if (!engine) { throw 'engine should not be null.'; }

        return engine;
    }

    createScene = () => {
        this.scene = Playground.CreateScene(this.engine, this.engine.getRenderingCanvas() as HTMLCanvasElement);
        this.sceneToRender = this.scene;
    }

    doRender = () => {
        // The canvas/window resize event handler.
        window.addEventListener('resize', () => {
            this.engine.resize();
        });

        this.engine.runRenderLoop(() => {
            if (this.sceneToRender) {
                this.sceneToRender.render();
            }
        });
    }
}
