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
        loaders.css()
      ],
      outputCSS: ['build-html', 'build-javascript'].includes(stage),
    })],
  })
}
