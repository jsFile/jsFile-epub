import JsFile from 'JsFile';
import parsePackageInfo from './parsePackageInfo';
import parseStyles from './parseStyles';
const {Document} = JsFile;
const {normalizeDataUri} = JsFile.Engine;

export default function (entries) {
    return new Promise(function (resolve, reject) {
        const queue = [];
        const {fileName} = this;
        const documentData = {
            media: {}
        };
        const pages = {};
        const domParser = new DOMParser();

        entries.forEach(function (fileEntry) {
            if (!fileEntry.file) {
                return;
            }

            let method;
            const filename = fileEntry.entry.filename;
            const isImage = Boolean(filename && (filename.indexOf('/images/') >= 0));
            const isFont = Boolean(!isImage && filename && (filename.indexOf('/fonts/') >= 0));
            const isMediaResource = isFont || isImage;
            if (isMediaResource) {
                method = 'readAsDataURL';
            }

            queue.push(this.readFileEntry({
                file: fileEntry.file,
                method
            }).then((result) => {
                const path = filename.replace(/\/?[^\/]+\//, '');

                if (isMediaResource) {
                    documentData.media[path] = {
                        data: normalizeDataUri(result, filename)
                    };
                } else if (filename.indexOf('package.opf') >= 0) {
                    parsePackageInfo(documentData, domParser.parseFromString(result, 'application/xml'));
                } else if (filename.indexOf('.xhtml') >= 0) {
                    pages[path] = domParser.parseFromString(result, 'application/xml');
                } else if (filename.indexOf('css/') >= 0) {
                    documentData.styles = parseStyles(result);
                }
            }));
        }, this);

        Promise.all(queue).then(() => {
            resolve(new Document({
                name: fileName,
                content: [],
                styles: documentData.styles || []
            }));
        }, reject);
    }.bind(this));
};