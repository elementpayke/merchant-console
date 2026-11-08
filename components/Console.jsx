// @ts-nocheck
/* eslint-disable */
"use client";

import React from "react";
import Logic from "../lib/logic";
import Markup from "./markup";

// The design's data-props defaults (from the .dc.html <script data-props>):
const PROPS = {
  startScreen: "auth",
  defaultView: "overview",
  environment: "sandbox",
  liveApproved: true,
  theme: "light",
  showQuickstart: true,
};

Logic.prototype.render = function () {
  return <Markup v={this.renderVals()} />;
};

export default function Console(props) {
  return <Logic {...PROPS} {...props} />;
}
