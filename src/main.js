import "./styles/base.css";

import TextStreamer from "./TextStreamer.js";

window.addEventListener("DOMContentLoaded", () => {

    const widget =
        document.createElement("text-streamer");

    widget.setAttribute(
        "src",
        "/data/hanuman_chalisa.txt"
    );

    widget.setAttribute(
        "title",
        "Hanuman Chalisa"
    );

    widget.setAttribute(
        "speed",
        "1200"
    );

    widget.setAttribute(
        "loop",
        ""
    );

    widget.setAttribute(
        "autoplay",
        ""
    );

    document.body.append(widget);

});