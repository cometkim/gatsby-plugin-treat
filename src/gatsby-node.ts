import { GatsbyNode } from 'gatsby';
// @ts-ignore
import TreatPlugin from 'treat/webpack-plugin';

export const onCreateBabelConfig: GatsbyNode['onCreateBabelConfig'] = ({ actions }) => {
  actions.setBabelPlugin({
    name: 'babel-plugin-treat',
    options: {},
  })
}

// FIXME: Currently not working because of the version of webpack
// @See https://github.com/webpack/webpack/commit/ea172ec5fdebb77647adde4c8406e9d0b2bbd48c
// @See https://github.com/gatsbyjs/gatsby/pull/14792
export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({ stage, loaders, actions }) => {
  actions.setWebpackConfig({
    plugins: [new TreatPlugin({
      outputLoaders: [
        loaders.miniCssExtract(),
        loaders.css()
      ],
      outputCSS: ['build-html', 'build-javascript'].includes(stage),
    })],
  })
}
