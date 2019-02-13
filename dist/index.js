'use strict';

var _apolloServer = require('apollo-server');

var _resolvers = require('./data/resolvers');

var _schema = require('./data/schema');

var _mocks = require('./data/mocks');

var _mocks2 = _interopRequireDefault(_mocks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var PORT = 8080;

var startServer = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var server, _ref2, url;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            server = new _apolloServer.ApolloServer({ typeDefs: _schema.typeDefs, resolvers: _resolvers.resolvers });
            _context.next = 3;
            return server.listen({ port: PORT });

          case 3:
            _ref2 = _context.sent;
            url = _ref2.url;

            console.log('\uD83D\uDE80 Server ready at ' + url);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function startServer() {
    return _ref.apply(this, arguments);
  };
}();
var init = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _mocks2.default)();

          case 2:
            startServer();

          case 3:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function init() {
    return _ref3.apply(this, arguments);
  };
}();
init();