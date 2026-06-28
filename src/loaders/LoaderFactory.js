import TextLoader from "./TextLoader.js";
import PdfLoader from "./PdfLoader.js";

export default class LoaderFactory {

    static create(source) {

        if (source instanceof File) {

            if (source.name.endsWith(".txt")) {

                return new TextLoader();

            }

            throw new Error(
                `Unsupported file type: ${source.name}`
            );

        }

        if (typeof source === "string") {

            if (
                source.endsWith(".txt") ||
                source.startsWith("/") ||
                source.startsWith("http")
            ) {

                return new TextLoader();

            }

            // Raw text
            return new TextLoader();

        }

        if (typeof source === "string") {

            if (source.toLowerCase().endsWith(".pdf")) {

                return new PdfLoader();

            }

            if (source.toLowerCase().endsWith(".txt")) {

                return new TextLoader();

            }

        }

 


        throw new Error(
            "Unable to determine loader."
        );

    }

}