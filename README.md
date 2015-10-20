# jsFile-epub [![Build Status](https://secure.travis-ci.org/jsFile/jsFile-epub.png?branch=master)](https://travis-ci.org/jsFile/jsFile-epub)
Engine for jsFile library for working with documents in [EPUB](https://en.wikipedia.org/wiki/EPUB) format



## Installation
### via NPM

You can install a <code>jsFile-epub</code> package very easily using NPM. After
installing NPM on your machine, simply run:
````
$ npm install jsfile-epub
````

### with Git

You can clone the whole repository with Git:
````
$ git clone git://github.com/jsFile/jsFile-epub.git
````

### from latest version

Also you can download [the latest release](https://github.com/jsFile/jsFile-epub/tree/master/dist) of `EPUB` engine and include built files to your project.


##Usage
````js
import JsFile from 'JsFile';
import JsFileEpub from 'jsfile-epub';

const jf = new JsFile(file, options);
````
`file` - a file of [EPUB](https://en.wikipedia.org/wiki/EPUB) type. You may find information about options and `jsFile` in [documentation](https://github.com/jsFile/jsFile#installation)
