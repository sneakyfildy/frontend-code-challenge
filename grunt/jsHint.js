 var jsHint = {
    files: ['src/**/*.js'],
    options: {
        curly: true, // if (true) {return;}
        eqeqeq: true, // ===
        latedef: 'nofunc',
        newcap: true,
        noarg: true,
        nonew: false, // suppress "Do not use 'new' for side effects"
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        quotmark: false,
        // lax
        laxbreak: true, // suppress 'bad line breaking'
        camelcase: false, // cannot set true, cause of working with snake case server answer
        debug: true,
        loopfunc: true, // allows to create functions within a loop, is required for Core.js
        // environment
        //browser: true,
        devel: true,
        jquery: true,
        // behavior
        force: true,
        esversion: 6,
        globals: {

        }
    }
};

 var warningSupress = [
    '-W030' // allows to do: callback && $.isFunction(callback) && callback(data, textStatus, xhr);
        // suppresses: Expected an assignment or function call and instead saw an expression.
];
var projectGlobals = [
    'jsep', 'angular'
];

for (var i = 0; i < projectGlobals.length; i++) {
    jsHint.options.globals[ projectGlobals[i] ] = true;
}
for (i = 0; i < warningSupress.length; i++) {
    jsHint.options[ warningSupress[i] ] = true;
}

module.exports = jsHint;