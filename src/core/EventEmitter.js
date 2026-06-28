export default class EventEmitter {

    constructor() {
        this.events = new Map();
    }

    on(name, callback) {

        if (!this.events.has(name)) {
            this.events.set(name, new Set());
        }

        this.events.get(name).add(callback);
    }

    off(name, callback) {

        this.events.get(name)?.delete(callback);

    }

    emit(name, payload) {

        const listeners = this.events.get(name);

        if (!listeners) return;

        for (const callback of listeners) {
            callback(payload);
        }

    }

    once(name, callback) {

        const wrapper = (payload) => {

            this.off(name, wrapper);

            callback(payload);

        };

        this.on(name, wrapper);

    }

}