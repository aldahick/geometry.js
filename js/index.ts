import * as $ from "jquery";
import {Scene} from "lib/Scene";

export module index {
    let scene: Scene;
    $(document).ready(function() {
        scene = new Scene();
        $("#input-shape").on("change", function(this: HTMLSelectElement) {
            scene.setShape(this.value);
        });
    });
}
