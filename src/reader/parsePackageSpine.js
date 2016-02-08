import JsFile from 'JsFile';
const {formatPropertyName, attributeToBoolean} = JsFile.Engine;

export default function parsePackageSpine (node, dest = {}) {
    dest.items = [];
    dest.indices = {};
    const forEach = [].forEach;

    forEach.call(node && node.childNodes || [], (node) => {
        const {attributes = {}} = node;
        let id = attributes.idref && attributes.idref.value;

        if (id) {
            const item = {
                id
            };

            forEach.call(attributes, ({name, value}) => {
                if (name !== 'idref') {
                    if (name === 'linear') {
                        item.linear = attributeToBoolean(value);
                    } else {
                        item[formatPropertyName(name)] = value;
                    }
                }
            });

            //save index by id
            dest.indices[id] = dest.items.push(item) - 1;
        }
    });

    return dest;
}