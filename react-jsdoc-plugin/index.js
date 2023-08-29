const componentTag = require('./lib/component');
const containerTag = require('./lib/container');

exports.defineTags = function(dictionary) {
    dictionary.defineTag(componentTag.name, componentTag.options);
    dictionary.defineTag(containerTag.name, containerTag.options);
};

exports.handlers = {
    newDoclet(e) {
        componentTag.newDocletHandler(e);
        containerTag.newDocletHandler(e);
    }
};
