exports.name = 'container';

exports.options = {
    canHaveType: false,
    canHaveName: false,
    isNamespace: true,
    mustHaveValue: true,
    mustNotHaveDescription: false,
    mustNotHaveValue: false,
    onTagged: function(doclet, tag) {
        doclet.container = tag.value;
        doclet.kind = 'container';
        doclet.name = tag.value;
        doclet.longname = 'container:' + tag.value;
    }
};

exports.newDocletHandler = function(e) {
    if(e.doclet.container) {
        e.doclet.longname = 'container:' + e.doclet.container;
        delete e.doclet.scope;
    }
}
