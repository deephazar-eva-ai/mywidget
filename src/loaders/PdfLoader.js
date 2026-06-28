import BaseLoader from "./BaseLoader.js";

import * as pdfjsLib from "pdfjs-dist";

import worker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

import { cleanText } from "../utils/textCleanup.js";
import { splitIntoLines } from "../utils/sentenceSplitter.js";

pdfjsLib.GlobalWorkerOptions.workerSrc = worker;

export default class PdfLoader extends BaseLoader {

    async load(source) {

        let pdf;

        if (source instanceof File) {

            const buffer = await source.arrayBuffer();

            pdf = await pdfjsLib.getDocument({

                data: buffer

            }).promise;

        } else {

            pdf = await pdfjsLib.getDocument(source).promise;

        }

        const pages = [];

        for (let i = 1; i <= pdf.numPages; i++) {

            const page = await pdf.getPage(i);

            const content = await page.getTextContent();

            const text = content.items
                .map(item => item.str)
                .join(" ");

            pages.push(text);

        }

        const merged = pages.join("\n");

        return splitIntoLines(

            cleanText(merged)

        );

    }

}