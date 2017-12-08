module.exports = {
    task: {
        app: {
            files: {
                'dist/app.full.js': ['dist/app.full.js']
            },
            options: {
                banner: '/*! <%= pkg.name %> Application build @ <%= pkg.version %> */',
                beautify: true,
                compress: false,
                mangle: false
            }
        },
        vendor: {
            files: {
                'dist/vendor.bundle.js': 'dist/vendor.bundle.js'
            },
            options: {
                banner: '/*! <%= pkg.name %> Vendor build @ <%= pkg.version %> */',
                compress: false,
                beautify: false,
                mangle: false
            }
        }
    }
};