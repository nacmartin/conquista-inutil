import React from "react";
import { P5Wrapper } from "../components/p5Wrapper";
import noise01 from "raw-loader!./sketches/noise01.p5";
import mouse from "raw-loader!./sketches/mouse.p5";
import terrain from "raw-loader!./sketches/terrain.p5";

export default class Noise extends React.Component {
  render() {
    return (
      <div style={{ width: "500px", margin: "0 auto" }}>
        <P5Wrapper jsSource={mouse} title="mouse" />
        <P5Wrapper jsSource={noise01} title="noise01" />
        <P5Wrapper jsSource={terrain} title="terrain" />
      </div>
    );
  }
}
