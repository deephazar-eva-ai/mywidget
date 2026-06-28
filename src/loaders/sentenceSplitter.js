export function splitIntoLines(text) {

    return text

        .split(/\n+/)

        .flatMap(line =>

            line.split(/(?<=[.!?।])/)

        )

        .map(line => line.trim())

        .filter(Boolean);   

}