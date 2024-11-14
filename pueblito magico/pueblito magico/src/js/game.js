function createUI(){
    var gui = new dat.GUI();
    var param = {
        a: "OBJ",
        b: "#FF00FF",
        c: 1
    };

    var g = gui.addFolder('Geometry');
    var player = g.add(param, 'a',["Mujer","Hombre", "Luigi", "Mario", "Mummy"]).name("Modelos 3D");
    
    player.onChange(function(myPlayer){
      console.log(myPlayer);
    });
   

    var l = gui.addFolder('Luces');
    var colorLight = l.addColor(param, 'b').name("Color de luz");
     var intensityLight = l.add(param, 'c').min(0).max(1).step(0.1).name("Intensidad");

     colorLight.onChange(function(colorGet){
        myLight.color.setHex(Number(colorGet.toString().replace('#','0x')));
     });

     intensityLight.onChange(function(intensityGet){
        myLight.intensity = intensityGet;
     });
}

/*function loadObjMtl(personaje){
    //general path, nameObj, nameMTL

    var generalPath= "../obj/"+personaje+"/";
    var fileObj = personaje+".obj";
    var fileMtl = personaje+".mtl";

    var mtlLoader = new THREE.MTLLoader();

        mtlLoader.setTexturePath(generalPath);
        mtlLoader.setPath(generalPath);
        mtlLoader.load(fileMtl, function(materials){
            materials.preload();
            
            var objLoader = new THREE.OBJLoader();
                objLoader.setMaterials(materials);
                objLoader.setPath(generalPath);
                objLoader.load(fileObj, function(object){
                    scene.add(object);
                    object.scale.set(2,2,2);
            })
        }
)
}*/