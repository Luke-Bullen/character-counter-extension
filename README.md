# Character Counter extension

## Summary

A browser extension which allows a user to evaluate the number of characters and bytes in a string.

A user may save strings of interest to their browser's localstorage, and easily copy these strings for quick use.

The extension can be used as a popup or a sidebar.

The extension is built using React, Typescript, Material UI and Vite.

## Editing

This project comes with build configs for both Chrome and Firefox. Running
`dev` or `build` commands without specifying the browser target will build
for Chrome by default.

1. Run `yarn` or `npm i` (check your node version >= 16)
2. Run `yarn dev[:chrome|:firefox]`, or `npm run dev[:chrome|:firefox]`, eg: `npm run dev:firefox`

Running a `dev` command will build your extension and watch for changes in the 
source files. Changing the source files will refresh the corresponding 
`dist_<chrome|firefox>` folder.

To create an optimized production build, run `yarn build[:chrome|:firefox]`, or
`npm run build[:chrome|:firefox]`.

## Loading the extension

For Chrome
1. Open - Chrome browser
2. Access - [chrome://extensions](chrome://extensions)
3. Tick - Developer mode
4. Find - Load unpacked extension
5. Select - `dist_chrome` folder in this project (after dev or build)

For Firefox
1. Open - Firefox browser
2. Access - [about:debugging#/runtime/this-firefox](about:debugging#/runtime/this-firefox)
3. Click - Load temporary Add-on
4. Select - any file in `dist_firefox` folder (i.e. `manifest.json`) in this project (after dev or build)


## Credit

Credit for the boilerplate template to <a href="https://github.com/JohnBra">JohnBra</a>, see this <a href="https://github.com/JohnBra/vite-web-extension">repo</a> for additional info on the project's template
