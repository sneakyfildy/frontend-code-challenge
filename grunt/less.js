module.exports = {
    task: {
        dev: {
            options: {
                strictMath: true,
                strictUnits: true,
                banner: '/*! <%= pkg.name %> CSS dev build @ <%= pkg.version %> */\n'
            },
            files: [{
                src: ['src/less/!build.less'],
                dest: 'dist/styles.bundle.css'
            }]
        },
        prod: {
            options: {
                cleancss: true,
                compress: true,
                strictMath: true,
                strictUnits: true,
                banner: '/*! <%= pkg.name %> CSS prod build @ <%= pkg.version %> \n*/'
            },
            files: {
                'dist/styles.bundle.min.css': 'src/less/!build.less'
            }
        }
    },
    files: ['src/less/**/*.less']
};