import EpubEngine from './../../src/index';

describe('jsFile-epub', () => {
    describe('Library imports', () => {
        it('should import JS module', () => {
            assert.isFunction(EpubEngine);
        });

        it('should exist in global scope', () => {
            assert.isFunction(window.JsFileEpub.default);
        });
    });
});