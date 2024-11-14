var scene = null,
    camera = null,
    renderer = null,
    controls = null;
    figuresGeo = null;
 
const size = 20,
    division = 20;
 
function startScene() {
    // Scene, Camera, Renderer
    scene  = new THREE.Scene();
    scene.background = new THREE.Color(0xFFFFFF);
    camera = new THREE.PerspectiveCamera( 75,  // Angulo de Vision (Abajo o Arriba)
                                        window.innerWidth / window.innerHeight, // Relación Aspecto (16:9)
                                        0.1, // Mas Cerca (no renderiza)
                                        1000); // Mas lejos
    renderer = new THREE.WebGLRenderer({canvas: document.getElementById("app")});
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
 
    //orbit controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 5, 10);
    controls.update();

    //orbit helper
    const gridHelper = new THREE.GridHelper( size, division );
    scene.add( gridHelper );
 
    camera.position.z = 5;
    animate();

    // Luz - Light
    // Ambient Light
    const light = new THREE.AmbientLight( 0xffffff ); // soft white light
    scene.add( light );

    // Point Light
    const pointlight = new THREE.PointLight( 0xffffff, 1, 100 );
    pointlight.position.set( 0, 3, 3 );
    scene.add( pointlight );

    const sphereSize = 1;
    const pointLightHelper = new THREE.PointLightHelper( pointlight, sphereSize );
    scene.add( pointLightHelper );
}
 
function animate() {
    requestAnimationFrame(animate);
    controls.update
    renderer.render( scene, camera );
}

// Resize by Screen Size
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}
 





function validateData(datas, conditionValidation){

if(datas){
  if(datas != conditionValidation){
    return true;
  }

  else{
    return false;
  }
}

else{
  return false;
}

}

function clearParamsUI(params, flag){

  value = params.split(flag);
  for(var i = 0; i < value.length; i++){

    console.log(i+'length'+value.length);
    if(i!=value.length-1){
      value[i] = parseFloat(value[i]);
}
    
  }

  return value;

}

function drawObjects(geometry) {

  var count = console.count();

  var randomColor = +('0x' + Math.floor(Math.random()*16777215).toString(16));
  const material = new THREE.MeshStandardMaterial( { color: randomColor,
                                                  transparent: false,
                                                  opacity: 0.5,
                                                  wireframe: false,
                                                  roughness: 0.5,
                                                  metalness: 1
   } );

  var objectToAdd = new THREE.Mesh(geometry, material);
  objectToAdd.name = "figura"+count;
  objectToAdd.id = "figura"+count;

  figuresGeo.push(objectToAdd);
  scene.add(objectToAdd);

  showAllObjectUI(figuresGeo[figuresGeo.length-1]);

}


function mostrarInputs(figura) {
  // Check if a figure option has been selected
  if (figura) {
    // Display input fields for the selected figure
    const inputFields = getInputFields(figura);
    document.getElementById("input-container").innerHTML = inputFields;
    return true;
  } else {
    // Hide input fields if no figure option is selected
    document.getElementById("input-container").innerHTML = "";
    return false;
  }
}

// Helper function to generate input fields for each figure type
function getInputFields(figura) {
  switch (figura) {
    case "Box":
      var width = parseFloat(document.getElementById("bw").value);
      var height = parseFloat(document.getElementById("bh").value);
      var depth = parseFloat(document.getElementById("bd").value);

      if (isNaN(width) || isNaN(height) || isNaN(depth)) {
        return {};
      }

      return {
        width: width,
        height: height,
        depth: depth
      };

    case "Torus":
      var radio = parseFloat(document.getElementById("tr").value);
      var tubo = parseFloat(document.getElementById("tt").value);
      var segmentoRadial = parseFloat(document.getElementById("rs").value);
      var segmentoTubular = parseFloat(document.getElementById("ts").value);

      if (isNaN(radio) || isNaN(tubo) || isNaN(segmentoRadial) || isNaN(segmentoTubular)) {
        return {};
      }

      return {
        radio: radio,
        tubo: tubo,
        segmentoRadial: segmentoRadial,
        segmentoTubular: segmentoTubular
      };

    case "Cone":
      var radio = parseFloat(document.getElementById("cr").value);
      var altura = parseFloat(document.getElementById("ch").value);
      var segmentosRadiales = parseFloat(document.getElementById("cs").value);

      if (isNaN(radio) || isNaN(altura) || isNaN(segmentosRadiales)) {
        return {};
      }

      return {
        radio: radio,
        altura: altura,
        segmentosRadiales: segmentosRadiales
      };

    default:
      return {};
  }
}

function createGeometry(figure) {
  mostrarInputs(figure);
  var params = getInputFields(figure);
  if (params) {
    var validateParams = true;
    var col = +('0x' + Math.floor(Math.random()*16777215).toString(16));

    switch(figure) {
      case 'Box':
        if (params.width && params.height && params.depth) {
          var geometry = new THREE.BoxGeometry(params.width, params.height, params.depth);
          drawObjects(geometry, col);
        } else {
          validateParams = false;
          document.getElementById('warningMssgI').style.display = 'block';
        }
        break;

      case 'Torus':
        if (params.radio && params.tubo && params.segmentoRadial && params.segmentoTubular) {
          var geometry = new THREE.TorusGeometry(params.radio, params.tubo, params.segmentoRadial, params.segmentoTubular);
          drawObjects(geometry, col);
        } else {
          validateParams = false;
          document.getElementById('warningMssgI').style.display = 'block';
        }
        break;

      case 'Cone':
        if (params.radio && params.altura && params.segmentosRadiales) {
          var geometry = new THREE.ConeGeometry(params.radio, params.altura, params.segmentosRadiales);
          drawObjects(geometry, col);
        } else {
          validateParams = false;
          document.getElementById('warningMssgI').style.display = 'block';
        }
        break;

      default:
        validateParams = false;
        document.getElementById('warningMssgI').style.display = 'block';
        break;
    }

    return validateParams;
  } else {
    document.getElementById('warningMssgI').style.display = 'block';
    return false;
  }
}