import {Engine, defineEngine} from 'JsFile';
import createDocument from './reader/createDocument';

/**
 * @description Supported files by engine
 * @type {{extension: Array, mime: Array}}
 */
const files = {
    extension: ['epub'],
    mime: ['application/epub+zip']
};

class EpubEngine extends Engine {
    constructor () {
        super(...arguments);
        this.createDocument = createDocument;
        this.parser = 'readArchive';
        this.files = files;
    }

    static test (file) {
        return Boolean(file && Engine.validateFile(file, files));
    }
}

EpubEngine.mimeTypes = files.mime.slice(0);

defineEngine(EpubEngine);

export default EpubEngine;