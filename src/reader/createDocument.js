import JsFile from 'JsFile';
import parsePackageInfo from './parsePackageInfo';
import buildHtml from './buildHtml';
import Document from './Document';
const {normalizeDataUri} = JsFile.Engine;
const contentFilePattern = /\.x?html$/i;
const filePathExcludePattern = /\/?[^\/]+\//;

export default function (entries) {
    return new Promise(function (resolve, reject) {
        const queue = [];
        const {fileName} = this;
        const documentData = {
            styles: {},//TODO: remove and use parseStyles method
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
                const path = filename.replace(filePathExcludePattern, '');

                if (isMediaResource) {
                    documentData.media[path] = {
                        data: normalizeDataUri(result, filename)
                    };
                } else if (filename.indexOf('.opf') >= 0) {
                    parsePackageInfo(documentData, domParser.parseFromString(result, 'application/xml'));
                } else if (contentFilePattern.test(filename)) {
                    pages[path] = domParser.parseFromString(result, 'application/xml');
                } else if (filename.indexOf('css/') >= 0) {
                    documentData.styles[path] = result;
                }
            }));
        }, this);

        /**
         * TODO: parse pages to JsFile structure and remove Epub HTML
         */
        Promise.all(queue).then(() => {
            const doc = new Document({
                meta: {
                    name: fileName
                },
                content: [],
                styles: []
            });
            doc._rawHtml = buildHtml(pages, documentData);
            resolve(doc);
        }, reject);
    }.bind(this));
}