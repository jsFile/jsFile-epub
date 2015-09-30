import parsePackageMetaData from './parsePackageMetaData';
import parsePackageManifest from './parsePackageManifest';
import parsePackageSpine from './parsePackageSpine';

export default (documentData, xml) => {
    [].forEach.call(xml && xml.childNodes && xml.childNodes[0] && xml.childNodes[0].childNodes || [], (node) => {
        switch (node.localName) {
            case 'metadata':
                documentData.documentInfo = parsePackageMetaData(node);
                break;
            case 'manifest':
                documentData.manifest = parsePackageManifest(node);
                break;
            case 'spine':
                documentData.spine = parsePackageSpine(node);
                break;
        }
    });

    return documentData;
};