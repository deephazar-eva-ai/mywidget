export default class FloatingWindow {
    constructor(options = {}) {
        this.title = options.title ?? "Text Streamer";

        this.root = document.createElement("div");
        this.root.className = "floating-window";

        this.root.innerHTML = `
            <div class="floating-titlebar">
                <div class="floating-title">${this.title}</div>

                <div class="floating-buttons">
                    <button class="window-btn" data-action="minimize">─</button>
                    <button class="window-btn" data-action="close">✕</button>
                </div>
            </div>

            <div class="floating-content">
            </div>
        `;

        this.titlebar =
            this.root.querySelector(".floating-titlebar");

        this.content =
            this.root.querySelector(".floating-content");

        this.attachEvents();
    }

    attach(parent = document.body) {
        parent.appendChild(this.root);
    }

    setContent(element) {
        this.content.replaceChildren(element);
    }

    attachEvents() {

        let dragging = false;
        let offsetX = 0;
        let offsetY = 0;

        this.titlebar.addEventListener("mousedown", (e) => {

            dragging = true;

            offsetX = e.clientX - this.root.offsetLeft;
            offsetY = e.clientY - this.root.offsetTop;

            document.body.style.userSelect = "none";
        });

        document.addEventListener("mousemove", (e) => {

            if (!dragging) return;

            this.root.style.left =
                `${e.clientX - offsetX}px`;

            this.root.style.top =
                `${e.clientY - offsetY}px`;

        });

        document.addEventListener("mouseup", () => {

            dragging = false;

            document.body.style.userSelect = "";

        });

        this.root
            .querySelector('[data-action="close"]')
            .addEventListener("click", () => {

                this.root.style.display = "none";

            });

        this.root
            .querySelector('[data-action="minimize"]')
            .addEventListener("click", () => {

                this.content.hidden =
                    !this.content.hidden;

            });

    }
}