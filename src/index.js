import JsFile from 'JsFile';
import createDocument from './reader/createDocument';

const {Engine} = JsFile;

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

export default EpubEngine;