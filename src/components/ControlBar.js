export default class ControlBar {

    constructor(engine) {

        this.engine = engine;

        this.root = document.createElement("div");
        this.root.className = "control-bar";

        this.build();

        this.bind();

    }

    element() {
        return this.root;
    }

    build() {

        this.root.innerHTML = `

<button class="btn-prev">⏮</button>

<button class="btn-play">▶</button>

<button class="btn-next">⏭</button>

<button class="btn-restart">↺</button>

<span class="progress">0 / 0</span>

<label>
Speed
<input
class="speed"
type="range"
min="300"
max="5000"
step="100"
value="${this.engine.speed}">
</label>

<label>

<input
class="loop"
type="checkbox"
${this.engine.loop ? "checked" : ""}>

Loop

</label>

`;

        this.prev =
            this.root.querySelector(".btn-prev");

        this.play =
            this.root.querySelector(".btn-play");

        this.next =
            this.root.querySelector(".btn-next");

        this.restart =
            this.root.querySelector(".btn-restart");

        this.progress =
            this.root.querySelector(".progress");

        this.speed =
            this.root.querySelector(".speed");

        this.loop =
            this.root.querySelector(".loop");

    }

    bind() {

        this.play.onclick = () => {

            if (this.engine.playing)
                this.engine.pause();
            else
                this.engine.play();

        };

        this.prev.onclick = () =>
            this.engine.previous();

        this.next.onclick = () =>
            this.engine.next();

        this.restart.onclick = () =>
            this.engine.restart();

        this.speed.oninput = () =>
            this.engine.setSpeed(
                this.speed.value
            );

        this.loop.onchange = () =>
            this.engine.setLoop(
                this.loop.checked
            );

        this.engine.on("play", () => {

            this.play.textContent = "⏸";

        });

        this.engine.on("pause", () => {

            this.play.textContent = "▶";

        });

        this.engine.on("linechange", e => {

            this.progress.textContent =
                `${e.index + 1} / ${e.total}`;

        });

    }

}