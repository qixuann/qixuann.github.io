module.exports = {
    // https://cli.vuejs.org/zh/config/#lintonsave
    lintOnSave: 'error', // [true, false, 'error', 'warning', 'default']
    publicPath: process.env.NODE_ENV === 'production'
      ? '/lucky-draw-portal/'
      : '/',
    configureWebpack: config => {
        // 线上允许debugger
        if (config.mode === 'production') {
            config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = false;
        }
    },
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].title = 'Greenworld Logistics Anniversary Dinner';
            return args;
        });
    },
    devServer: {
        port: 8080,
        host: '',
        disableHostCheck: true
    }
};
