export default class DropZone {

    constructor(target, engine) {

        this.target = target;
        this.engine = engine;

        this.register();

    }

    register() {

        this.target.addEventListener("dragenter", this.onDragEnter);
        this.target.addEventListener("dragover", this.onDragOver);
        this.target.addEventListener("dragleave", this.onDragLeave);
        this.target.addEventListener("drop", this.onDrop);

    }

    onDragEnter = (e) => {

        e.preventDefault();

        this.target.classList.add("drop-active");

    };

    onDragOver = (e) => {

        e.preventDefault();

    };

    onDragLeave = (e) => {

        e.preventDefault();

        if (e.target === this.target) {

            this.target.classList.remove("drop-active");

        }

    };

    onDrop = async (e) => {

        e.preventDefault();

        this.target.classList.remove("drop-active");

        const files = e.dataTransfer.files;

        if (!files.length)
            return;

        const file = files[0];

        try {

            await this.engine.load(file);

            this.engine.restart();

            this.engine.play();

        }

        catch (err) {

            alert(err.message);

        }

    };

}