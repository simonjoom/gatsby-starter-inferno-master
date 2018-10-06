"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/*  weak */
const openurl = require(`opn`);

const signalExit = require(`signal-exit`);

const compression = require(`compression`);

const express = require(`express`);

const getConfigFile = require(`../bootstrap/get-config-file`);

const preferDefault = require(`../bootstrap/prefer-default`);

const chalk = require(`chalk`);

module.exports =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(function* (program) {
    let prefixPaths = program.prefixPaths,
        port = program.port,
        open = program.open;
    port = typeof port === `string` ? parseInt(port, 10) : port;
    const config = yield preferDefault(getConfigFile(program.directory, `gatsby-config`));
    let pathPrefix = config && config.pathPrefix;
    pathPrefix = prefixPaths && pathPrefix ? pathPrefix : `/`;
    const app = express();
    const router = express.Router();
    router.use(compression());
    router.use(express.static(`public`));
    router.use((req, res, next) => {
      if (req.accepts(`html`)) {
        res.status(404).sendFile(`404.html`, {
          root: `public`
        });
      } else {
        next();
      }
    });
    app.use(pathPrefix, router);
    const server = app.listen(port, () => {
      let openUrlString = `http://localhost:${port}${pathPrefix}`;
      console.log(`${chalk.blue(`info`)} gatsby serve running at: ${chalk.bold(openUrlString)}`);

      if (open) {
        console.log(`${chalk.blue(`info`)} Opening browser...`);
        openurl(openUrlString).catch(err => console.log(`${chalk.yellow(`warn`)} Browser not opened because no browser was found`));
      }
    });
    signalExit((code, signal) => {
      server.close();
    });
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=serve.js.map