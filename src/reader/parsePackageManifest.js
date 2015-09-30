import JsFile from 'JsFile';
const {formatPropertyName} = JsFile.Engine;

export default (node, dest = {}) => {
    const forEach = [].forEach;

    forEach.call(node && node.childNodes || [], (node) => {
        const {attributes = {}} = node;
        let id = attributes.id && attributes.id.value;

        if (id) {
            dest[id] = {};

            forEach.call(attributes, ({name, value}) => {
                if (name !== 'id') {
                    dest[id][formatPropertyName(name)] = value;
                }
            });
        }
    });

    return dest;
};