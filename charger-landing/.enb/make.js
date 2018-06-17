var enbBemTechs = require('enb-bem-techs');

module.exports = function (config) {
    var isProd = process.env.YENV === 'production';

    config.nodes('*.bundles/*', function (nodeConfig) {
        nodeConfig.addTechs([
            // essential
            [require('enb/techs/file-provider'), { target: 'bemdecl.js' }],
            [enbBemTechs.files],
            [enbBemTechs.deps],
            // bemhtml
            [require('enb-bemxjst/techs/bemhtml'), {
                devMode: process.env.BEMHTML_ENV === 'development',
                compact: true
            }]
        ]);

        nodeConfig.addTargets([
            '?.css',
            '?.bemhtml.js'
        ]);
    });
    
    config.nodes('*desktop.bundles/*', function (nodeConfig) {
        nodeConfig.addTechs([
            // essential
            [enbBemTechs.levels, {
                levels: [
                    { path: 'libs/bem-core/common.blocks', check: false },
                    { path: 'libs/bem-core/desktop.blocks', check: false },
                    'common.blocks',
                    'desktop.blocks'
                ]
            }],
            // css
            [require('enb-stylus/techs/stylus'), {
                target: '?.css',
                autoprefixer: {
                    browsers: ['ie >= 10', 'last 2 versions', 'opera 12.1', '> 2%']
                }
            }]
        ]);
    });
};


