import EventEmitter from "./EventEmitter.js";

export default class StreamEngine extends EventEmitter {

    constructor(options = {}) {

        super();

        this.lines = [];

        this.index = 0;

        this.timer = null;

        this.playing = false;

        this.speed = options.speed ?? 1200;

        this.loop = options.loop ?? true;

    }

    /*
    ==================================================
    Loading
    ==================================================
    */

    async load(url) {

        const response = await fetch(url);

        if (!response.ok) {

            throw new Error(`Unable to load ${url}`);

        }

        const text = await response.text();

        this.loadText(text);

    }

    async loadFile(file) {

        const text = await file.text();

        this.loadText(text);

    }

    loadText(text) {

        this.stop();

        this.lines = text
            .split(/\r?\n/)
            .map(line => line.trim())
            .filter(line => line.length > 0);

        this.index = 0;

        this.emitCurrent();

    }

    /*
    ==================================================
    Playback
    ==================================================
    */

    play() {

        if (this.playing || this.lines.length === 0)
            return;

        this.playing = true;

        this.emit("play");

        this.timer = setInterval(() => {

            this.next();

        }, this.speed);

    }

    pause() {

        if (!this.playing)
            return;

        clearInterval(this.timer);

        this.timer = null;

        this.playing = false;

        this.emit("pause");

    }

    stop() {

        clearInterval(this.timer);

        this.timer = null;

        this.playing = false;

        this.emit("stop");

    }

    restart() {

        this.index = 0;

        this.emitCurrent();

        this.emit("restart");

    }

    /*
    ==================================================
    Navigation
    ==================================================
    */

    next() {

        if (this.lines.length === 0)
            return;

        this.index++;

        if (this.index >= this.lines.length) {

            if (this.loop) {

                this.index = 0;

            } else {

                this.index = this.lines.length - 1;

                this.pause();

                this.emit("finished");

            }

        }

        this.emitCurrent();

    }

    previous() {

        if (this.lines.length === 0)
            return;

        this.index--;

        if (this.index < 0) {

            this.index = this.loop
                ? this.lines.length - 1
                : 0;

        }

        this.emitCurrent();

    }

    /*
    ==================================================
    Settings
    ==================================================
    */

    setSpeed(speed) {

        this.speed = Number(speed);

        if (this.playing) {

            this.pause();

            this.play();

        }

        this.emit("speed", this.speed);

    }

    setLoop(loop) {

        this.loop = Boolean(loop);

        this.emit("loop", this.loop);

    }
    get isPlaying() {
        return this.playing;
    }
    /*
    ==================================================
    Helpers
    ==================================================
    */

    current() {

        return this.lines[this.index] ?? "";

    }

    emitCurrent() {

        this.emit("linechange", {

            line: this.current(),

            index: this.index,

            total: this.lines.length

        });

    }

}