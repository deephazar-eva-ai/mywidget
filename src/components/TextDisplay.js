export default class TextDisplay {

    constructor(options = {}) {

        this.maxFont = options.maxFont ?? 42;

        this.minFont = options.minFont ?? 18;

        this.root = document.createElement("div");

        this.root.className = "text-display";

        this.line = document.createElement("div");

        this.line.className = "text-line";

        this.root.appendChild(this.line);

    }

    element() {

        return this.root;

    }

    clear() {

        this.line.textContent = "";

    }

    show(text) {

        this.line.classList.remove("fade-in");

        this.line.classList.add("fade-out");

        setTimeout(() => {

            this.line.textContent = text;

            this.fit();

            this.line.classList.remove("fade-out");

            this.line.classList.add("fade-in");

        }, 150);

    }

    fit() {

        let size = this.maxFont;

        this.line.style.fontSize = `${size}px`;

        while (

            this.line.scrollWidth > this.root.clientWidth &&

            size > this.minFont

        ) {

            size--;

            this.line.style.fontSize = `${size}px`;

        }

    }

    setFontSize(size) {

        this.maxFont = size;

        this.fit();

    }

    setColor(color) {

        this.line.style.color = color;

    }

    setAlignment(alignment) {

        this.line.style.textAlign = alignment;

    }

}