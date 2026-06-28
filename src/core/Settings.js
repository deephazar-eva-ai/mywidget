import EventEmitter from "./EventEmitter.js";

const DEFAULTS = {

    speed: 1200,

    loop: true,

    theme: "dark",

    fontSize: 42,

    fontFamily: "Noto Sans Devanagari",

    textColor: "#00ff88",

    backgroundOpacity: 0.85,

    window: {

        left: 40,

        top: 40,

        width: 900,

        height: 180

    }

};

export default class Settings extends EventEmitter {

    constructor(storageKey = "mywidget.settings") {

        super();

        this.storageKey = storageKey;

        this.values = structuredClone(DEFAULTS);

        this.load();

    }

    get(name) {

        return this.values[name];

    }

    getAll() {

        return structuredClone(this.values);

    }

    set(name, value) {

        this.values[name] = value;

        this.save();

        this.emit("change", {

            key: name,

            value

        });

    }

    update(object) {

        Object.assign(this.values, object);

        this.save();

        this.emit("reload", this.getAll());

    }

    reset() {

        this.values = structuredClone(DEFAULTS);

        this.save();

        this.emit("reload", this.getAll());

    }

    save() {

        localStorage.setItem(

            this.storageKey,

            JSON.stringify(this.values)

        );

    }

    load() {

        const saved = localStorage.getItem(

            this.storageKey

        );

        if (!saved)

            return;

        try {

            Object.assign(

                this.values,

                JSON.parse(saved)

            );

        }

        catch {

            console.warn("Settings ignored.");

        }

    }

}