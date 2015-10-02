import {Document} from 'JsFile';
const page = Document.elementPrototype;
const tagName = page.properties.tagName;
const pageClassName = 'jf-page';

export default (pages, documentData) => {
    const result = document.createDocumentFragment();
    const {spine, manifest, media, styles} = documentData;
    const forEach = [].forEach;
    let styleData = '';

    spine.items.forEach(({id}) => {
        const item = manifest[id];
        const page = item && pages[item.href];
        if (page) {
            const el = document.createElement(tagName);
            const body = page.querySelector('body');
            el.setAttribute('class', pageClassName);

            if (body) {
                forEach.call(page.querySelectorAll('head > link'), ({attributes}) => {
                    const [path] = attributes.href && /[\.\/]*css\/[^"]+/.exec(attributes.href.value) || [];
                    let style = path && styles[path];

                    if (style) {
                        styleData += style.replace(/[\.\/]*(images|fonts)\/[^"]+/g, (path) => {
                            path = path.replace(/^[\.\/]+/, '');
                            const obj = media[path];
                            return obj && obj.data || '';
                        });
                    }
                });

                el.innerHTML += body.innerHTML;
                el.innerHTML = el.innerHTML.replace(/[\.\/]*(images|fonts)\/[^"]+/g, (path) => {
                    const obj = media[path];
                    return obj && obj.data || '';
                });
            }

            result.appendChild(el);
        }
    });

    if (styleData) {
        const tag = document.createElement('style');
        tag.appendChild(document.createTextNode(styleData));
        result.appendChild(tag);
    }

    return result;
};