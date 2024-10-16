/**
 * Compiler configuration
 *
 * @see {@link https://roots.io/sage/docs sage documentation}
 * @see {@link https://bud.js.org/learn/config bud.js configuration guide}
 *
 * @type {import('@roots/bud').Config}
 */
export default async (app) => {
  /**
   * Application assets & entrypoints
   *
   * @see {@link https://bud.js.org/reference/bud.entry}
   * @see {@link https://bud.js.org/reference/bud.assets}
   */
  app
    .entry('main', ['@styles/main.scss','@scripts/main.js'])
    // .entry('home-page', ['@scripts/main.js'])
    // .entry('history-page', ['@scripts/history-page.js'])
    // .entry('contacts', ['@styles/contacts.scss'])
    // .entry('article', ['@styles/article.css'])
    // .entry('404', ['@styles/404.css'])
    // .entry('blog', ['@styles/blog.css'])
    .assets([
      'images',
      'fonts',
    ]);

  /**
   * Set public path
   *
   * @see {@link https://bud.js.org/reference/bud.setPublicPath}
   */
  app.setPublicPath('/wp-content/themes/sage-theme/public/');

  /**
   * Development server settings
   *
   * @see {@link https://bud.js.org/reference/bud.setUrl}
   * @see {@link https://bud.js.org/reference/bud.setProxyUrl}
   * @see {@link https://bud.js.org/reference/bud.watch}
   */
  app
    .setUrl('http://localhost:3000')
    .setProxyUrl('http://localhost:8080')
    .watch(['resources/views', 'main']);
};
