<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Geometry.JS</title>
    <link rel="stylesheet" href="css/index.css" />
</head>
<body>
    Shape:&nbsp;
    <select id="input-shape">
        <option value="cube" selected="selected">Cube</option>
        <option value="tetrahedron">Pyramid (Tetrahedron)</option>
    </select>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/randomcolor/0.4.4/randomColor.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.2/require.min.js"></script>
    <script src="js/common.js"></script>
    <script>
    require(["es6-shim"], function() {
        require(["js/index.js"]);
    });
    </script>
</body>
</html>
