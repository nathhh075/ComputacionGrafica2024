var myModell=null;

function createUI() {
    var gui = new dat.GUI();

    var param = {
        a: " ",
        b: "#FF00FF",
        c: 1,
        scale: 0.1
    };

    var g = gui.addFolder('Modelos 3D');
    var player = g.add(param, 'a', ["Mujer", "Hombre", "Luigi", "Mario", "Mayor"]).name("Modelos 3D");

    player.onChange(function(myModel) {
        console.log(myModel);
        loadObjMtl(myModel, param.scale);

    });

    var scaleControl = g.add(param, 'scale').min(0.1).max(2).step(0.01).name("Escala");
    
    scaleControl.onChange(function(sc) {
      if (myModell) {
        if ('Mayor'){
            myModell.scale.set(sc*10,sc*10,sc*10)
        }
        else{
         myModell.scale.set(sc, sc, sc);
        }
     }
      });

    var l = gui.addFolder('Luces');
    var colorLight = l.addColor(param, 'b').name("Color de Luz");
    var intensityLight = l.add(param, 'c').min(0).max(1).step(0.1).name("Intensidad");

    colorLight.onChange(function(colorGet) {
        /*console.log(colorGet);
        light.color.setHex(parseInt(colorGet.toString().replace('#','0x')));
*/
    });

    intensityLight.onChange(function(intensityGet) {
       // light.intensity = intensityGet;
       // light.needsUpdate = true;

    });
}

function loadObjMtl(model, scale) {
    // general Path, nameObj, nameMTL
    
    switch (model) {
        case "Mujer":
            generalPath = "../src/models/obj/female02/";
            fileObj = "female02.obj";
            fileMtl = "female02.mtl";
            break;
        case "Hombre":
            generalPath = "../src/models/obj/male02/";
            fileObj = "male02.obj";
            fileMtl = "male02.mtl";
            break;
        case "Luigi":
            generalPath = "../src/models/obj/MarioandLuigi/";
            fileObj = "Luigi_obj.obj";
            fileMtl = "Luigi_obj.mtl";
            break;
        case "Mario":
            generalPath = "../src/models/obj/MarioandLuigi/";
            fileObj = "mario_obj.obj";
            fileMtl = "mario_obj.mtl";
            break;
        
        case "Mayor":
            generalPath = "../src/models/obj/mayordomo/";
            fileObj = "mayordomo1.obj";
            fileMtl = "mayordomo1.mtl";
            break;
        default:
            console.error("no se lee adecuadamente");
            return;
    }

    var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setTexturePath(generalPath);
        mtlLoader.setPath(generalPath);
        mtlLoader.load(fileMtl, function(materials) {
            materials.preload();

            if (myModell) {
                scene.remove(myModell); 
            }

    var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath(generalPath);
        objLoader.load(fileObj, function(object) {
            myModell = object;
            scene.add(myModell); 
            myModell.scale.set(scale,scale,scale);
        });
    });
}