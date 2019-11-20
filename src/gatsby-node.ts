import { GatsbyNode } from 'gatsby';
// @ts-ignore
import TreatPlugin from 'treat/webpack-plugin';

export const onCreateBabelConfig: GatsbyNode['onCreateBabelConfig'] = ({ actions }) => {
  actions.setBabelPlugin({
    name: 'babel-plugin-treat',
    options: {},
  })
}

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({ stage, loaders, actions }) => {
  actions.setWebpackConfig({
    plugins: [new TreatPlugin({
      outputLoaders: [
        loaders.miniCssExtract(),
      ],
      outputCSS: [
        'develop',
        'develop-html',
        'build-javascript',
        /**
         * FIXME: build fails on `gatsby build` with message:
         * ```
         * ERROR #98123  WEBPACK
         * Generating SSR bundle failed
         * this[MODULE_TYPE] is not a function
         * ```
         * See https://github.com/faceyspacey/extract-css-chunks-webpack-plugin/issues/162
         * See https://github.com/webpack-contrib/mini-css-extract-plugin/issues/73
         */
        // 'build-html',
      ].includes(stage),
      /**
       * To be:
       */
      // outputCss: true,
    })],
  })
}
