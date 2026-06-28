import "./styles/control-bar.css";

import StreamEngine from "./core/StreamEngine.js";
import TextDisplay from "./components/TextDisplay.js";
import FloatingWindow from "./components/FloatingWindow.js";
import ControlBar from "./components/ControlBar.js";

const engine = new StreamEngine({

    speed:1200,

    loop:true

});

const display = new TextDisplay();

const controls =
    new ControlBar(engine);

const panel =
    document.createElement("div");

panel.style.display="flex";
panel.style.flexDirection="column";
panel.style.height="100%";

display.element().style.flex="1";

panel.appendChild(
    display.element()
);

panel.appendChild(
    controls.element()
);

const windowWidget =
    new FloatingWindow({

        title:"Hanuman Chalisa"

    });

windowWidget.setContent(panel);

windowWidget.attach();

engine.on(
    "linechange",
    e=>display.show(e.line)
);

await engine.load(
    "/data/hanuman_chalisa.txt"
);

document.addEventListener("keydown", e => {

    switch (e.code) {

        case "Space":

            e.preventDefault();

            engine.playing
                ? engine.pause()
                : engine.play();

            break;

        case "ArrowRight":

            engine.next();

            break;

        case "ArrowLeft":

            engine.previous();

            break;

        case "Home":

            engine.restart();

            break;

    }

});

engine.play();