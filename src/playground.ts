export class Playground {
    static CreateScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement) {
        // This creates a basic Babylon Scene object (non-mesh)
        var scene = new BABYLON.Scene(engine);

        // This creates and positions a free camera (non-mesh)
        var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 30, -60), scene);

        // This targets the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());

        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;

        // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
        var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);

        // Move the sphere upward 1/2 its height
        sphere.position.x = 15;
        sphere.position.y = 1;
        sphere.position.z = 15;

        var material = new BABYLON.StandardMaterial('BallMat', scene);
        material.alpha = 1;
        material.diffuseColor = new BABYLON.Color3(1.0, 0.2, 0.7);
        var material2 = new BABYLON.StandardMaterial('Mat2', scene);
        material2.alpha = 1;
        material2.diffuseColor = new BABYLON.Color3(0.8, 0.5, 0.1);

        sphere.material = material;

        // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
        var ground = BABYLON.Mesh.CreateGround("ground1", 60, 60, 5, scene);

        var wallNorth = BABYLON.MeshBuilder.CreateBox("wallNorth", { width: 60, height: 5, depth: 0.5 }, scene);
        wallNorth.position.z = 30;// N/S
        wallNorth.position.x = 0;// E/W
        var wallSouth = BABYLON.MeshBuilder.CreateBox("wallSouth", { width: 60, height: 5, depth: 0.5 }, scene);
        wallSouth.position.z = -30;// N/S
        wallSouth.position.x = 0;// E/W
        var wallEast = BABYLON.MeshBuilder.CreateBox("wallEast", { width: 0.5, height: 5, depth: 60 }, scene);
        wallEast.position.z = 0;// N/S
        wallEast.position.x = -30;// E/W
        var wallWest = BABYLON.MeshBuilder.CreateBox("wallWest", { width: 0.5, height: 5, depth: 60 }, scene);
        wallWest.position.z = 0;// N/S
        wallWest.position.x = 30;// E/W

        var boxInTheMiddle = BABYLON.MeshBuilder.CreateBox("boxInTheMiddle", { width: 10, height: 1, depth: 10 }, scene);
        boxInTheMiddle.position.z = 0;// N/S
        boxInTheMiddle.position.x = 0;// E/W
        boxInTheMiddle.position.y = 0;
        boxInTheMiddle.material = material2;


        scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0));

        sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 2, restitution: 0 }, scene);
        ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0 }, scene);

        wallNorth.physicsImpostor = new BABYLON.PhysicsImpostor(wallNorth, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0 }, scene);
        wallSouth.physicsImpostor = new BABYLON.PhysicsImpostor(wallSouth, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0 }, scene);
        wallEast.physicsImpostor = new BABYLON.PhysicsImpostor(wallEast, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0 }, scene);
        wallWest.physicsImpostor = new BABYLON.PhysicsImpostor(wallWest, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0 }, scene);

        boxInTheMiddle.physicsImpostor = new BABYLON.PhysicsImpostor(boxInTheMiddle, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0 }, scene);

        //sphere.physicsImpostor.applyImpulse(new BABYLON.Vector3(0, 10, 0), sphere.getAbsolutePosition());

        // Keyboard events
        var inputMap: any = {};
        scene.actionManager = new BABYLON.ActionManager(scene);
        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
            inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }));
        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
            inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }));

        // KEYBOARD !!
        const ballSpeed = 0.3;
        scene.onBeforeRenderObservable.add(() => {
            if (inputMap["z"] || inputMap["ArrowUp"]) {
                sphere.position.z += ballSpeed;
            }
            if (inputMap["q"] || inputMap["ArrowLeft"]) {
                sphere.position.x -= ballSpeed;
            }
            if (inputMap["s"] || inputMap["ArrowDown"]) {
                sphere.position.z -= ballSpeed;
            }
            if (inputMap["d"] || inputMap["ArrowRight"]) {
                sphere.position.x += ballSpeed;
            }
            if (inputMap[" "] || inputMap["Space"]) {
                if (1 <= sphere.position.y && sphere.position.y <= 1.5) {
                    sphere.physicsImpostor?.applyImpulse(new BABYLON.Vector3(0, 1, 0), sphere.getAbsolutePosition());
                }
            }
        })

        return scene;
    }
}