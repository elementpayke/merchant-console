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

/* Subclass rather than patching Logic.prototype.render: on a hot update Turbopack
   can re-evaluate lib/logic.js (yielding a fresh class) without re-running this
   module, leaving the new class with no render — which React reports as
   "No `render` method found on the Component instance". */
class ConsoleView extends Logic {
  render() {
    return <Markup v={this.renderVals()} />;
  }
}

export default function Console(props) {
  return <ConsoleView {...PROPS} {...props} />;
}
