'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _connectors = require('./connectors');

var _async = require('async');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// create fake starter data
var USERS = 5;
var ARTICLES_PER_USER = 4;
var MESSAGES_PER_CHAT = 2;
var CHATS_PER_ARTICLE = 2;

_faker2.default.seed(123); // get consistent data every time we reload app

// you don't need to stare at this code too hard
// just trust that it fakes a bunch of groups, users, and messages

var randomUser = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ammount, self) {
    var hoy;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('loop');
            hoy = Math.floor(Math.random() * ammount + 1);
            return _context.abrupt('return', hoy !== self ? hoy : randomUser(ammount, self));

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function randomUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var mockDB = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref3$populating = _ref3.populating,
        populating = _ref3$populating === undefined ? true : _ref3$populating,
        _ref3$force = _ref3.force,
        force = _ref3$force === undefined ? true : _ref3$force;

    var users;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            console.log('creating database....');
            _context5.next = 3;
            return _connectors.db.sync({ force: force });

          case 3:
            if (populating) {
              _context5.next = 5;
              break;
            }

            return _context5.abrupt('return', Promise.resolve(true));

          case 5:

            console.log('Populating users');
            _context5.next = 8;
            return Promise.all(_ramda2.default.times(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
              var user;
              return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      _context4.next = 2;
                      return _connectors.db.models.user.create({
                        username: _faker2.default.internet.userName(),
                        email: _faker2.default.internet.email(),
                        password: _faker2.default.internet.password()
                      });

                    case 2:
                      user = _context4.sent;

                      _ramda2.default.times(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                        var article;
                        return regeneratorRuntime.wrap(function _callee3$(_context3) {
                          while (1) {
                            switch (_context3.prev = _context3.next) {
                              case 0:
                                _context3.next = 2;
                                return _connectors.db.models.article.create({
                                  name: 'Producto',
                                  price: Math.floor(Math.random() * 201),
                                  image: _faker2.default.image.avatar(),
                                  description: _faker2.default.lorem.sentences(4),

                                  userId: user.id
                                });

                              case 2:
                                article = _context3.sent;

                                _ramda2.default.times(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                                  var buyer, chat;
                                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                    while (1) {
                                      switch (_context2.prev = _context2.next) {
                                        case 0:
                                          _context2.next = 2;
                                          return randomUser(USERS + 1, user.id);

                                        case 2:
                                          buyer = _context2.sent;
                                          _context2.next = 5;
                                          return _connectors.db.models.chat.create({
                                            articleId: article.id,
                                            ownerId: user.id,
                                            buyerId: buyer
                                          });

                                        case 5:
                                          chat = _context2.sent;

                                          _ramda2.default.times(function () {
                                            return _connectors.db.models.message.create({
                                              chatId: chat.id,
                                              userId: user.id,

                                              text: _faker2.default.hacker.phrase()
                                            });
                                          }, MESSAGES_PER_CHAT);
                                          _ramda2.default.times(function () {
                                            return _connectors.db.models.message.create({
                                              chatId: chat.id,
                                              userId: buyer,

                                              text: _faker2.default.hacker.phrase()
                                            });
                                          }, MESSAGES_PER_CHAT);

                                        case 8:
                                        case 'end':
                                          return _context2.stop();
                                      }
                                    }
                                  }, _callee2, undefined);
                                })), CHATS_PER_ARTICLE);

                              case 4:
                              case 'end':
                                return _context3.stop();
                            }
                          }
                        }, _callee3, undefined);
                      })), ARTICLES_PER_USER);
                      return _context4.abrupt('return', user);

                    case 5:
                    case 'end':
                      return _context4.stop();
                  }
                }
              }, _callee4, undefined);
            })), USERS));

          case 8:
            users = _context5.sent;


            console.log('limpito');
            console.log('¡DATABASE CREATED!');

          case 11:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function mockDB() {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = mockDB;