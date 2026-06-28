import BaseLoader from "./BaseLoader.js";

export default class TextLoader extends BaseLoader {

    async load(source) {

        let text;

        if (typeof source === "string") {

            // URL
            if (
                source.startsWith("http://") ||
                source.startsWith("https://") ||
                source.startsWith("/")
            ) {

                const response = await fetch(source);

                if (!response.ok) {

                    throw new Error(
                        `Unable to load ${source}`
                    );

                }

                text = await response.text();

            } else {

                // Treat as raw text
                text = source;

            }

        } else if (source instanceof File) {

            text = await source.text();

        } else {

            throw new Error(
                "Unsupported text source."
            );

        }

        return text
            .split(/\r?\n/)
            .map(line => line.trim())
            .filter(Boolean);

    }

}