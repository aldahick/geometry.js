// import * as randomColor from "randomcolor";
import * as three from "three";

export class Scene {
    public scene: three.Scene;
    public camera: three.PerspectiveCamera;
    public renderer: three.WebGLRenderer;
    public mesh: three.Mesh;
    public speed: number;
    public constructor(shapeName: string = "cube") {
        this.scene = new three.Scene();
        let height: number = window.innerHeight - 50;
        this.camera = new three.PerspectiveCamera(75, window.innerWidth / height, 0.1, 1000);
        this.renderer = new three.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, height);
        $(document.body).append(this.renderer.domElement);
        this.camera.position.z = 5;
        this.setShape(shapeName);
        this.render();
    }

    public setShape(shapeName: string): void {
        if (this.scene.children.length > 0) {
            this.scene.remove(this.mesh);
        }
        this.mesh = this.getMesh(shapeName);
        this.scene.add(this.mesh);
    }

    private getMesh(shapeName: string): three.Mesh {
        let geometry: three.Geometry;
        let material: three.MeshBasicMaterial = new three.MeshBasicMaterial({
            "color": 0xffffff
        });
        let speed: number = 0.01;
        let colorIncrement: number = 1;
        switch (shapeName) {
            case "cube":
                geometry = new three.BoxGeometry(2, 2, 2);
                colorIncrement = 2;
                break;
            case "tetrahedron":
                geometry = new three.TetrahedronGeometry(2, 0);
                break;
            default:
                return this.getMesh("cube");
        }
        for (let i: number = 0; i < geometry.faces.length; i += colorIncrement) {
            let color: number = Number("0x" + randomColor().substring(1));
            for (let k: number = 0; k < colorIncrement; k++) {
                geometry.faces[i + k].color.setHex(color);
            }
        }
        material.vertexColors = three.FaceColors;
        this.speed = speed;
        return new three.Mesh(geometry, material);
    }

    public render(): void {
        requestAnimationFrame(() => {
            this.render();
        });
        this.mesh.rotation.x += this.speed;
        this.mesh.rotation.y += this.speed;
        this.renderer.render(this.scene, this.camera);
    }
}
