/**
 * Site configuration
 */
const config = {
    buildDir: 'dist',
    /**
     * Entry points as in src folder
     */
    entries: [
        { name: 'home', template: './index.html', module: './js/svgjs-anim.ts', style: './scss/app.scss', path: '/' }
    ],
    /**
     *  Files or directories to copy from src to the build directory
     */
    assets: [
        'images',
        'fonts',
        'robots.txt'
    ],
    /**
     * Production base href
     */
    baseHref: 'https://bell-creek.techjones.tk',
    /**
     * For sitemap URLs
     */
    hostname: 'https://bell-creek.techjones.tk'
};


module.exports = config;
