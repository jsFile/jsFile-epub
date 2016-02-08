import JsFile from 'JsFile';

class EpubDocument extends JsFile.Document {
    html () {
        return this._rawHtml;
    }
}

export default EpubDocument;