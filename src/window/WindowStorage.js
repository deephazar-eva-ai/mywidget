const PREFIX = "mywidget.window.";

export default class WindowStorage {

    constructor(id = "default") {

        this.key = PREFIX + id;

    }

    save(state) {

        localStorage.setItem(

            this.key,

            JSON.stringify(state)

        );

    }

    load() {

        const value = localStorage.getItem(

            this.key

        );

        if (!value) {

            return null;

        }

        try {

            return JSON.parse(value);

        }

        catch {

            return null;

        }

    }

    clear() {

        localStorage.removeItem(

            this.key

        );

    }

}