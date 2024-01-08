const fs = require('fs');

console.log('\x1b[36m%s\x1b[0m', '\n\n\n\n\n\nPOST INSTALL IS RUNNING:');

const NODE_MODULES_DIR = './node_modules';

const qrScanNodeModule =
  NODE_MODULES_DIR + '/react-native-qrcode-scanner/node_modules';

fs.rmdir(qrScanNodeModule, {recursive: true, force: true}, err => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('******* remove qrScanNodeModule *******');
  //file removed
});

const MONTH_PICKER_NODE =
  '/react-native-month-year-picker/src/MonthPicker.ios.js';

fs.readFile(NODE_MODULES_DIR + MONTH_PICKER_NODE, 'utf8', (fileError, data) => {
  if (fileError) {
    return console.error('File error: ', fileError);
  }

  const regex = /bottom: 0,/;
  const newRegex = "bottom: 0, alignSelf: 'center',position:'relative',";

  if (regex.test(data)) {
    const result = data.replace(regex, newRegex);

    fs.writeFile(
      NODE_MODULES_DIR + MONTH_PICKER_NODE,
      result,
      'utf8',
      writeErr => {
        if (writeErr) {
          return console.error('File write error: ', writeErr);
        }

        console.log(
          '\x1b[32m%s\x1b[0m',
          `Fixed with wrong dependency ----> ${
            NODE_MODULES_DIR + MONTH_PICKER_NODE
          }`,
        );
      },
    );
  }
});

const WEB_VIEW =
  NODE_MODULES_DIR + '/react-native-webview/android/gradle.properties';

fs.readFile(WEB_VIEW, 'utf8', (fileError, data) => {
  if (fileError) {
    return console.error('File error: ', fileError);
  }

  const regex = /ReactNativeWebView_kotlinVersion=1.6.0/;
  const newRegex = 'ReactNativeWebView_kotlinVersion=1.7.0';

  if (regex.test(data)) {
    const result = data.replace(regex, newRegex);

    fs.writeFile(WEB_VIEW, result, 'utf8', writeErr => {
      if (writeErr) {
        return console.error('File write error: ', writeErr);
      }

      console.log(
        '\x1b[32m%s\x1b[0m',
        `Fixed with wrong dependency ----> ${WEB_VIEW}`,
      );
    });
  }
});
