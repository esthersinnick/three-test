import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import bg01 from "./img/bg01B.png";
import bg04 from "./img/bg01.jpg";
import bg02 from "./img/bg02.png";
import bg03 from "./img/bg03.png";
import bgPlane from "./img/bg-plane.jpg";

const style = {
  height: "100vh",
  width: "100%"
  // we can control scene size by setting container dimensions
};

class App extends Component {
  componentDidMount() {
    this.sceneSetup();
    this.addCustomSceneObjects();
    this.startAnimationLoop();
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
    // this.controls.dispose();
  }

  sceneSetup = () => {
    // get container dimensions and use them for scene sizing
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45, // fov = field of view
      width / height, // aspect ratio
      0.1, // near plane
      1000 // far plane
    );
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.el.appendChild(this.renderer.domElement); // mount using React ref
  };

  addCustomSceneObjects = () => {
    //background plane
    // const texture0 = new THREE.TextureLoader().load(bg04);
    // const planeGeo = new THREE.PlaneGeometry(50, 25);
    // const planeMat = new THREE.MeshPhongMaterial({ map: texture0 });
    // this.plane = new THREE.Mesh(planeGeo, planeMat);
    // this.plane.position.set(0, 0, 22);

    // fisrt sphere
    const texture = new THREE.TextureLoader().load(bg01);
    const spacesphereGeo = new THREE.SphereGeometry(18, 20, 20);
    const spacesphereMat = new THREE.MeshPhongMaterial({
      map: texture,
      alphaTest: 0, //Antes estaba a 0.5
      transparent: true,
      side: THREE.DoubleSide
    });
    this.spacesphere = new THREE.Mesh(spacesphereGeo, spacesphereMat);

    //second sphere
    const texture2 = new THREE.TextureLoader().load(bg02);
    const spacesphereGeo2 = new THREE.SphereGeometry(15, 20, 20); //ajustar tamaño y posición de la camara para que funcione bien
    const spacesphereMat2 = new THREE.MeshPhongMaterial({
      map: texture2,
      alphaTest: 0, //Antes estaba a 0.5
      transparent: true,
      side: THREE.DoubleSide
    });
    this.spacesphere2 = new THREE.Mesh(spacesphereGeo2, spacesphereMat2);

    //third sphere
    const texture3 = new THREE.TextureLoader().load(bg03);
    const spacesphereGeo3 = new THREE.SphereGeometry(14, 20, 20); //ajustar tamaño y posición de la camara para que funcione bien
    const spacesphereMat3 = new THREE.MeshPhongMaterial({
      map: texture3,
      alphaTest: 0, //Antes estaba a 0.5
      transparent: true,
      side: THREE.DoubleSide
    });
    this.spacesphere3 = new THREE.Mesh(spacesphereGeo3, spacesphereMat3);

    //spacesphere needs to be double sided as the camera is within the spacesphere
    // this.plane.material.side = THREE.DoubleSide;
    this.spacesphere.material.side = THREE.DoubleSide;
    this.spacesphere2.material.side = THREE.DoubleSide;
    this.spacesphere3.material.side = THREE.DoubleSide;

    this.spacesphere.material.map.wrapS = THREE.RepeatWrapping;
    this.spacesphere.material.map.wrapT = THREE.RepeatWrapping;
    this.spacesphere.material.map.repeat.set(5, 4);

    this.spacesphere2.material.map.wrapS = THREE.RepeatWrapping;
    this.spacesphere2.material.map.wrapT = THREE.RepeatWrapping;
    this.spacesphere2.material.map.repeat.set(7, 6);

    this.spacesphere3.material.map.wrapS = THREE.RepeatWrapping;
    this.spacesphere3.material.map.wrapT = THREE.RepeatWrapping;
    this.spacesphere3.material.map.repeat.set(10, 8);

    var group = new THREE.Group();
    //group.add(this.plane);
    group.add(this.spacesphere);
    group.add(this.spacesphere2);
    //group.add(this.spacesphere3);

    this.scene.add(group);

    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = -12;
    this.camera.lookAt(this.scene.position);

    const lights = [];

    lights[0] = new THREE.SpotLight(0xff704d);
    lights[0].position.set(-40, 60, -10);
    lights[0].intensity = 1.2;

    lights[1] = new THREE.SpotLight(0x9e3364);
    lights[1].position.set(60, -10, 20);
    lights[1].intensity = 1.3;

    lights[2] = new THREE.AmbientLight(0xffffff);
    lights[2].position.set(60, -10, 20);
    lights[2].intensity = 1;

    this.scene.add(lights[0]);
    this.scene.add(lights[1]);
    this.scene.add(lights[2]);
  };

  startAnimationLoop = () => {
    requestAnimationFrame(this.startAnimationLoop);
    this.spacesphere.rotation.y += 0.0002;
    this.spacesphere2.rotation.y += 0.0003;
    this.spacesphere3.rotation.y += 0.00045;

    this.renderer.render(this.scene, this.camera);
  };

  handleWindowResize = () => {
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;

    this.camera.updateProjectionMatrix();
  };

  render() {
    return <div style={style} ref={ref => (this.el = ref)} />;
  }
}

class Container extends React.Component {
  state = { isMounted: true };

  render() {
    const { isMounted = true } = this.state;
    return (
      <>
        <button
          onClick={() =>
            this.setState(state => ({ isMounted: !state.isMounted }))
          }
        >
          {isMounted ? "Unmount" : "Mount"}
        </button>
        {isMounted && <App />}
        {isMounted && <div>Scroll to zoom, drag to rotate</div>}
      </>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Container />, rootElement);

export default App;
