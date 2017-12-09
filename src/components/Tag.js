import React from "react";
import styles from "./Tag.scss";
import logo from "./logo.png";

const Tag = () => (
  <div className={styles.tag}>
    <a href="http://wichniow.ski">
      <img src={logo} alt="logo" />
    </a>
    <p style={{ fontWeight: 100 }}>
      Telemark is brought to you by Wichniowski. <br />For updates on Telemark
      and other projects and products visit{" "}
      <a href="http://wichniow.ski"> wichniow.ski</a> or follow me on twitter{" "}
      <a href="http://twitter.com/wichniowski" target="_blank">
        @wichniowski
      </a>
    </p>
  </div>
);

export default Tag;
