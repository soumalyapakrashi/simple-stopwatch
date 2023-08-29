exports.name = 'component';

exports.options = {
    canHaveType: false,
    canHaveName: false,
    isNamespace: true,
    mustHaveValue: true,
    mustNotHaveDescription: false,
    mustNotHaveValue: false,
    onTagged: function(doclet, tag) {
        doclet.component = tag.value;
        doclet.kind = 'component';
        doclet.name = tag.value;
        doclet.longname = 'component:' + tag.value;
    }
};

exports.newDocletHandler = function(e) {
    if(e.doclet.component) {
        e.doclet.longname = 'component:' + e.doclet.component;
        delete e.doclet.scope;
    }
}
