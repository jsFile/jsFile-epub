import {Document} from 'JsFile';

class EpubDocument extends Document {
    html () {
        return this._rawHtml;
    }
}

export default EpubDocument;