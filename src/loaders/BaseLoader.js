export default class BaseLoader {

    /**
     * Load data from a source.
     * Must return an array of strings.
     */
    async load(source) {

        throw new Error(
            `${this.constructor.name}: load() not implemented`
        );

    }

}