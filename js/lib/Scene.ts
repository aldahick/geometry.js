import * as three from "three";

enum DirectionComponent {
    NORTH, WEST, EAST, SOUTH, NONE
}

interface Direction {
    vertical: DirectionComponent;
    horizontal: DirectionComponent;
    major: DirectionComponent;
}

class Coordinate {
    public x: number;
    public y: number;
    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    public getMovementDirection(other: Coordinate): Direction {
        let direction: Direction = {
            "vertical": DirectionComponent.NONE,
            "horizontal": DirectionComponent.NONE,
            "major": DirectionComponent.NONE
        };
        if (this.x > other.x) {
            direction.horizontal = DirectionComponent.EAST;
        } else if (this.x < other.x) {
            direction.horizontal = DirectionComponent.WEST;
        }
        if (this.y > other.y) {
            direction.vertical = DirectionComponent.SOUTH;
        } else if (this.y < other.y) {
            direction.vertical = DirectionComponent.NORTH;
        }
        let diffX: number = Math.abs(this.x - other.x);
        let diffY: number = Math.abs(this.y - other.y);
        direction.major = diffX > diffY ? direction.horizontal : direction.vertical;
        return direction;
    }
}

export class Scene {
    private scene: three.Scene;
    private camera: three.PerspectiveCamera;
    private renderer: three.WebGLRenderer;
    private mesh: three.Mesh;
    private speed: number;
    private isMouseDown: boolean = false;
    private lastMousePos: Coordinate = null;
    public constructor(shapeName: string = "cube") {
        this.scene = new three.Scene();
        let height: number = window.innerHeight - 50;
        this.camera = new three.PerspectiveCamera(75, window.innerWidth / height, 0.1, 1000);
        this.renderer = new three.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, height);
        $(document.body).append(this.renderer.domElement);
        $(this.renderer.domElement)
            .on("mousemove", (e: any) => { this.onMouseMove(e); })
            .on("mousedown", (e: any) => { this.onMouseDown(e); })
            .on("mouseup", (e: any) => { this.onMouseUp(e); });
        this.camera.position.z = 5;
        this.setShape(shapeName);
        this.render();
    }

    private onMouseMove(event: JQueryMouseEventObject): void {
        if (!this.isMouseDown) {
            return;
        }
        let pos: Coordinate = new Coordinate(event.pageX, event.pageY);
        let direction: Direction = pos.getMovementDirection(this.lastMousePos);
        if (direction.major == direction.vertical) {
            this.mesh.rotation.x += (direction.vertical == DirectionComponent.NORTH ? 1 : -1) * this.speed;
        } else {
            this.mesh.rotation.y += (direction.horizontal == DirectionComponent.EAST ? 1 : -1) * this.speed;
        }
        this.lastMousePos = pos;
    }

    private onMouseDown(event: JQueryMouseEventObject): void {
        this.isMouseDown = true;
        this.lastMousePos = new Coordinate(event.pageX, event.pageY);
    }

    private onMouseUp(event: JQueryMouseEventObject): void {
        this.isMouseDown = false;
        this.lastMousePos = null;
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
        let speed: number = Math.PI * 0.0625 / 2;
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
        // this.mesh.rotation.x += this.speed;
        // this.mesh.rotation.y += this.speed;
        this.renderer.render(this.scene, this.camera);
    }
}
