import React, { Component } from "react";
import ace from "brace";
require("brace/mode/javascript");
require("brace/theme/textmate");

const runSketch = (code, title) => {
  const iframeToRemove = document.getElementById("iframe-wrapper-" + title)
    .firstChild;
  if (iframeToRemove) {
    document
      .getElementById("iframe-wrapper-" + title)
      .removeChild(iframeToRemove);
  }
  const iframe = document.createElement("iframe");
  iframe.id = title;
  iframe.width = "500";
  iframe.height = "500";
  iframe.frameBorder = "0";
  iframe.marginHeight = "0";
  iframe.marginWidth = "0";
  iframe.title = title;
  document.getElementById("iframe-wrapper-" + title).appendChild(iframe);

  const p5Script = document
    .getElementById(title)
    .contentWindow.document.createElement("script");
  p5Script.src = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.8.0/p5.js";
  document
    .getElementById(title)
    .contentWindow.document.body.appendChild(p5Script);
  const userScript = document
    .getElementById(title)
    .contentWindow.document.createElement("script");
  userScript.type = "text/javascript";
  userScript.text = code;
  userScript.async = false;
  document
    .getElementById(title)
    .contentWindow.document.body.appendChild(userScript);
};

export class P5Wrapper extends Component {
  componentDidMount() {
    const editor = ace.edit("javascript-editor" + this.props.title);
    editor.getSession().setMode("ace/mode/javascript");
    editor.setTheme("ace/theme/textmate");
    editor.getSession().setTabSize(2);
    runSketch(this.props.jsSource, this.props.title);

    document
      .getElementById("run-" + this.props.title)
      .addEventListener("click", () => {
        const code = editor.getValue();
        runSketch(code, this.props.title);
      });
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <>
        <div id={"iframe-wrapper-" + this.props.title}></div>
        <button id={"run-" + this.props.title}>Run</button>
        <div
          id={"javascript-editor" + this.props.title}
          style={{ height: "300px", width: "100%" }}
          dangerouslySetInnerHTML={{ __html: this.props.jsSource }}
        ></div>
      </>
    );
  }
}
