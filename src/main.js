import "./styles/base.css";
import "./styles/floating-window.css";

import FloatingWindow from "./components/FloatingWindow.js";

window.addEventListener("DOMContentLoaded", () => {

    const win = new FloatingWindow({

        title: "Text Streamer"

    });

    const content = document.createElement("div");

    content.textContent = "Empty teleprompter";

    win.setContent(content);

    win.attach();

});