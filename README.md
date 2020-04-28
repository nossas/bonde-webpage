# Bonde Webpages

Using [tsdx](https://github.com/palmerhq/tsdx) to build package.

## Commands

TSDX scaffolds your new library inside `/src` and [NextJS](https://github.com/zeit/next.js/) sets up a playground for it inside `/example`.

The recommended workflow in development is with use `yarn link` to easily debug on version not yet released.

### Build

Run build in terminal:

```
yarn
```

For run development enrivonment, create a link to `bonde-webpages` and `react` for use on `example/` app. (More about yarn link)[https://dev.to/mfco/unsolving-the-mysteries-of-yarn-npm-link-for-libraries-development-1bo0]

```
yarn link # create link to bonde-webpages
cd node_modules/react && yarn link # create link to react
```

### Example

Then run the example inside another:

```
cd example
yarn
yarn link bonde-webpages react
yarn build # or `yarn run dev` to start dev server
```

### Storybook

Run inside another terminal:

```
yarn storybook
```

This loads the stories from `./stories`.

## Configuration

Code quality is [set up for you](https://github.com/palmerhq/tsdx/pull/45/files) with `prettier`, `husky`, and `lint-staged`. Adjust the respective fields in `package.json` accordingly.

### Jest

Jest tests are set up to run with `npm test` or `yarn test`. This runs the test watcher (Jest) in an interactive mode. By default, runs tests related to files changed since the last commit.

### Rollup

TSDX uses [Rollup v1.x](https://rollupjs.org) as a bundler and generates multiple rollup configs for various module formats and build settings. See [Optimizations](#optimizations) for details.

### TypeScript

`tsconfig.json` is set up to interpret `dom` and `esnext` types, as well as `react` for `jsx`. Adjust according to your needs.

## Continuous Integration

### Travis

_to be completed_

### Circle

_to be completed_

## Optimizations

Please see the main `tsdx` [optimizations docs](https://github.com/palmerhq/tsdx#optimizations). In particular, know that you can take advantage of development-only optimizations:

```js
// ./types/index.d.ts
declare var __DEV__: boolean;

// inside your code...
if (__DEV__) {
  console.log('foo');
}
```

You can also choose to install and use [invariant](https://github.com/palmerhq/tsdx#invariant) and [warning](https://github.com/palmerhq/tsdx#warning) functions.

## Module Formats

CJS, ESModules, and UMD module formats are supported.

The appropriate paths are configured in `package.json` and `dist/index.js` accordingly. Please report if any issues are found.

## Deploying the Playground (bonde-public)

Run build to deploy on production:

```bash
cd example # if not already in the example folder
yarn build # builds to dist
yarn start # deploy the dist folder
```

<!-- ## Named Exports

Per Palmer Group guidelines, [always use named exports.](https://github.com/palmerhq/typescript#exports) Code split inside your React app instead of your React library. -->

<!-- ## Including Styles

There are many ways to ship styles, including with CSS-in-JS. TSDX has no opinion on this, configure how you like.

For vanilla CSS, you can include it at the root directory and add it to the `files` section in your `package.json`, so that it can be imported separately by your users and run through their bundler's loader. -->

<!-- ## Publishing to NPM

We recommend using https://github.com/sindresorhus/np. -->
