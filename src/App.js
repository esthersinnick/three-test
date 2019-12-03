import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import bg01 from "./img/bg01B.png";
import bg02 from "./img/bg02.png";
import smoke from "./img/smoke-1.png";

const style = {
  height: "100vh",
  width: "100%"
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
  }

  sceneSetup = () => {
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = -12;
    this.camera.lookAt(this.scene.position);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);

    // ambient color
    this.scene.fog = new THREE.FogExp2(0x741523, 0.001);
    this.renderer.setClearColor(this.scene.fog.color);

    this.el.appendChild(this.renderer.domElement);
  };

  addCustomSceneObjects = () => {
    //nebula
    const nebulaText = new THREE.TextureLoader().load(smoke);
    const nebulaGeo = new THREE.PlaneBufferGeometry(500, 500);
    const nebulaMat = new THREE.MeshLambertMaterial({
      map: nebulaText,
      transparent: true
    });
    const group = new THREE.Group();

    this.nebulaParticles = [];

    for (let i = 0; i < 10; i++) {
      let nebula = new THREE.Mesh(nebulaGeo, nebulaMat);
      nebula.position.set(
        Math.random() * 500 - 250,
        Math.random() * 300 - 100,
        Math.random() * 200 + 300
      );
      nebula.rotation.z = Math.random() * 2 * Math.PI;
      nebula.material.opacity = 0.55;
      nebula.material.side = THREE.DoubleSide;
      this.nebulaParticles.push(nebula);
      group.add(nebula);
    }
    // fisrt sphere
    const texture = new THREE.TextureLoader().load(bg01);
    const spacesphereGeo = new THREE.SphereGeometry(18, 20, 20);
    const spacesphereMat = new THREE.MeshPhongMaterial({
      map: texture,
      transparent: true,
      side: THREE.DoubleSide
    });
    this.spacesphere = new THREE.Mesh(spacesphereGeo, spacesphereMat);
    this.spacesphere.material.map.wrapS = THREE.RepeatWrapping;
    this.spacesphere.material.map.wrapT = THREE.RepeatWrapping;
    this.spacesphere.material.map.repeat.set(5, 4);
    //group.add(this.spacesphere);

    //second sphere
    const texture2 = new THREE.TextureLoader().load(bg02);
    const spacesphereGeo2 = new THREE.SphereGeometry(15, 20, 20); //ajustar tamaño y posición de la camara para que funcione bien
    const spacesphereMat2 = new THREE.MeshPhongMaterial({
      map: texture2,
      transparent: true,
      side: THREE.DoubleSide
    });
    this.spacesphere2 = new THREE.Mesh(spacesphereGeo2, spacesphereMat2);
    this.spacesphere2.material.map.wrapS = THREE.RepeatWrapping;
    this.spacesphere2.material.map.wrapT = THREE.RepeatWrapping;
    this.spacesphere2.material.map.repeat.set(7, 6);
    //group.add(this.spacesphere2);

    //add all elements to scene
    this.scene.add(group);

    const lights = [];

    lights[0] = new THREE.AmbientLight(0x555555);
    lights[0].position.set(60, -10, 20);
    lights[0].intensity = 1;

    lights[1] = new THREE.DirectionalLight(0xb97a84);
    lights[1].position.set(0, 0, 1);

    lights[2] = new THREE.PointLight(0xb97a84, 50, 350, 1.7);
    lights[2].position.set(0, 0, 0);

    lights[3] = new THREE.PointLight(0xb97a84, 100, 250, 3);
    lights[3].position.set(100, 300, 100);

    lights[4] = new THREE.PointLight(0xb97a84, 50, 350, 3);
    lights[4].position.set(300, 100, 200);

    lights.forEach(el => {
      this.scene.add(el);
    });
  };

  startAnimationLoop = () => {
    requestAnimationFrame(this.startAnimationLoop);
    this.nebulaParticles.forEach(el => (el.rotation.z -= 0.001));
    this.spacesphere.rotation.y += 0.0002;
    this.spacesphere2.rotation.y += 0.0003;

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
