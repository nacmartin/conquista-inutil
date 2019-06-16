import React from "react";
import { P5Wrapper } from "../components/p5Wrapper";
import noise01 from "raw-loader!./sketches/noise01.p5";
import mouse from "raw-loader!./sketches/mouse.p5";

export default class Noise extends React.Component {
  constructor(props) {
    super(props);
    this.ctx = { x: 10 };
  }

  componentDidMount() {
    setInterval(() => {
      this.ctx.x = this.ctx.x + 10;
    }, 100);
  }

  render() {
    return (
      <div style={{ width: "500px", margin: "0 auto" }}>
        <P5Wrapper jsSource={noise01} title="noise01" />
        <P5Wrapper jsSource={mouse} title="mouse" />
      </div>
    );
  }
}
