import React from "react";
import FOG from "../helpers/vanta.fog.min.js";
import * as THREE from "three";

class Space extends React.Component {
  constructor() {
    super();
    this.vantaRef = React.createRef();
  }
  componentDidMount() {
    this.vantaEffect = FOG({
      el: this.vantaRef.current,
      THREE: THREE,
      highlightColor: 0x6e1414,
      midtoneColor: 0x430901,
      lowlightColor: 0x3c2323,
      baseColor: 0x50101,
      blurFactor: 0.57,
      speed: 0.8
    });
  }
  componentWillUnmount() {
    if (this.vantaEffect) this.vantaEffect.destroy();
  }

  render() {
    return <div ref={this.myRef}>Foreground content goes here</div>;
  }
}

export default Space;
