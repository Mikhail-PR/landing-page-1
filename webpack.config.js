const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtructPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const fs = require('fs');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const PATHS = {
    src: path.join(__dirname, './src'),
    dist: path.join(__dirname, './dist'),
    assets: 'assets/'
};

const PAGES_DIR = `${PATHS.src}`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    };

    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config;
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const cssLoaders = extra => {
    const loaders = [
        {
            loader: MiniCssExtructPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: true
            }
        },
        'css-loader'
    ]
    if (extra) {
        loaders.push(extra);
    }
    return loaders;
}

const appendImport = function (dir, out, ext, isMixin) {
    const impPath = fs.lstatSync(dir);

    if (impPath.isFile()) {
        if (ext === '.scss') {
            if (dir.endsWith('.scss')) {
                if (isMixin) {
                    let logRows = fs.readFileSync(out).toString().split('\n');

                    logRows.unshift(`@import "${dir.replace('/src', '')}";\n`);
                    fs.writeFileSync(out, logRows.join('\n'));
                } else {
                    fs.appendFileSync(out, `@import "${dir.replace('/src', '')}";\n`);
                }
            }
        }

        if (ext === '.pug' && isMixin) {
            if (dir.endsWith('.pug')) {
                fs.appendFileSync(out, `include ${dir.replace('/src', '')}\n`);
            }
        }
    }

    else if (impPath.isDirectory()) {
        fs.readdirSync(dir).forEach(file => {
            appendImport(`${dir}/${file}`, out, ext, isMixin = dir.endsWith('mixins'));
        });
    }
}

const addImprots = function (importPaths, outputPath) {
    const ext = path.extname(outputPath);
    fs.truncateSync(outputPath);

    importPaths.forEach(directory => appendImport(directory, outputPath, ext));
}

addImprots([
    './src/scss/fonts',
    './src/scss/_variables.scss',
    './src/scss/_base.scss',
    './src/blocks'
],
    './src/styles.scss'
);

addImprots([
    './src/blocks'
],
    './src/_includes.pug'
);


module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './index.js']
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    optimization: optimization(),
    devServer: {
        port: 4200,
        hot: isDev,
        watchContentBase: true
    },
    devtool: isDev ? 'source-map' : '',
    plugins: [
        ...PAGES.map(page => new HTMLWebpackPlugin({
            template: `${PAGES_DIR}/${page}`,
            filename: `./${page.replace(/\.pug/, '.html')}`,

            favicon: './favicon.ico'
        })),
        new CleanWebpackPlugin(),
        new MiniCssExtructPlugin({
            filename: filename('css')
        })
    ],
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            },
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: `static/[path]${filename('[ext]')}`
                }
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                loader: 'file-loader',
                options: {
                    name: `fonts/${filename('[ext]')}`
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }
                }
            }
        ]
    }
};