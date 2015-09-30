export default (node, dest = {}) => {
    [].forEach.call(node && node.childNodes || [], (node) => {
        const {localName, textContent = ''} = node;

        if (localName === 'date') {
            const date = textContent.split('-');
            date[1] = (date[1] || 1) - 1;//month
            dest[localName] = new Date(...date);
        } else if (localName === 'identifier') {
            dest.id = textContent;
        } else if (localName) {
            dest[localName] = textContent;
        }
    });

    return dest;
};