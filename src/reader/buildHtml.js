import JsFile from 'JsFile';

const page = JsFile.Document.elementPrototype;
const tagName = page.properties.tagName;
const pageClassName = 'jf-page';

export default (pages, documentData) => {
    const result = document.createDocumentFragment();
    const {spine, manifest, media, styles} = documentData;
    const forEach = [].forEach;
    const styleData = {};

    if (!spine || !spine.items) {
        return result;
    }

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
                        if (!styleData[path]) {
                            styleData[path] = {
                                selectors: [`.${pageClassName}`],
                                src: style.replace(/[\.\/]*(images|fonts)\/[^"]+/g, (path) => {
                                    path = path.replace(/^[\.\/]+/, '');
                                    const obj = media[path];
                                    return obj && obj.data || '';
                                })
                            };
                        }
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

    let style = '';
    let elMaxWidth = 0;

    for (let p in styleData) {
        if (styleData.hasOwnProperty(p)) {
            const widthPattern = /width\s*\:\s*([0-9]+)px/g;
            const obj = styleData[p];
            let src = obj.src;
            let widthData = widthPattern.exec(src);

            while (widthData) {
                if (widthData[1] > elMaxWidth) {
                    elMaxWidth = Number(widthData[1]);
                }

                widthData = widthPattern.exec(src);
            }

            src = src.replace(/\s*[^\{}\/]+\{/g, (input) => {
                input = input.trim();

                //@keyframes, @font-face, etc.
                if (input[0] === '@') {
                    return input;
                }

                return input.split(/\s*,\s*/).map((selector) => {
                    return obj.selectors.map((parent) => ` ${parent} ${selector}`).join(',');
                }).join(',');
            });

            style += `${src}\n`;
        }
    }

    if (style) {
        style += `\n.${pageClassName} {`;
        if (elMaxWidth) {
            style += `width:${elMaxWidth}px;`;
        }

        style += 'position:relative;}';
        const el = document.createElement('style');
        el.appendChild(document.createTextNode(style));
        result.appendChild(el);
    }

    return result;
};