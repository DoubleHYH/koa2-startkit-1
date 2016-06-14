'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(function () {
    var SignBox = function () {
        function SignBox() {
            var _this = this;

            (0, _classCallCheck3.default)(this, SignBox);

            this._handleMove = function (e) {
                _this.$header.mousedown(function (e) {
                    e.preventDefault();
                    if ($(e.target).is('.fa')) return;
                    _this.moveInfo.active = true;
                    _this.moveInfo.startX = e.pageX;
                    _this.moveInfo.startY = e.pageY;
                });

                _this.$header.mousemove(function (e) {
                    e.preventDefault();
                    if (!_this.moveInfo.active) return;
                    _this.moveInfo.diffX = e.pageX - _this.moveInfo.startX;
                    _this.moveInfo.diffY = e.pageY - _this.moveInfo.startY;

                    _this.$panel.css({
                        transform: ['translate(', _this.moveInfo.diffX - _this.moveInfo.translateX, 'px,', _this.moveInfo.diffY - _this.moveInfo.translateY, 'px)'].join('')
                    });
                });

                _this.$header.on('mouseup mouseleave', function () {
                    _this.moveInfo.active = false;
                    _this.moveInfo.translateX -= _this.moveInfo.diffX;
                    _this.moveInfo.translateY -= _this.moveInfo.diffY;
                    _this.moveInfo.diffX = _this.moveInfo.diffY = 0;
                });
            };

            this.setAction = function (url) {
                _this.$form.attr('action', url);
            };

            this.show = function () {
                _this.$html.addClass('active');
            };

            this.hide = function () {
                _this.$html.removeClass('active');
                _this.$formGroups.removeClass('has-error');
                setTimeout(function () {
                    _this.$panel.css('transform', 'translate(0)');
                }, 500);

                _this.moveInfo = {
                    active: false,
                    startX: 0,
                    startY: 0,
                    translateX: 0,
                    translateY: 0,
                    diffX: 0,
                    diffY: 0
                };
            };

            this._initHTML();

            this.$form = this.$html.find('form');
            this.$panel = this.$html.find('.panel');
            this.$inputs = this.$html.find('.form-control');
            this.$header = this.$html.find('.panel-heading');
            this.$username = this.$html.find('#sigin-username');
            this.$password = this.$html.find('#sigin-password');
            this.$submitBtn = this.$html.find('.btn');
            this.$formGroups = this.$form.find('.form-group');
            this.$mask = this.$html.find('.mask');
            this.$close = this.$html.find('.fa-times');

            this.moveInfo = {
                active: false,
                startX: 0,
                startY: 0,
                translateX: 0,
                translateY: 0,
                diffX: 0,
                diffY: 0
            };

            this._bindEvent();
            this._handleMove();
        }

        (0, _createClass3.default)(SignBox, [{
            key: '_initHTML',
            value: function _initHTML() {
                this.$html = $('\n                <div id="sign-pop-box">\n                    <div class="mask"></div>\n                    <div class="panel">\n                        <div class="panel-heading text-center">\n                            <i class="fa fa-times"></i>\n                            <span>登&emsp;录</span>\n                        </div>\n                        <form class="panel-body" action="/sign/signin" method="POST">\n                            <div class="form-group">\n                                <label for="sigin-username">账号</label>\n                                <input id="sigin-username" type="text" name="username" class="form-control" h-placeholder="邮箱/手机号/用户名">\n                            </div>\n                            <div class="form-group">\n                                <label for="sigin-password">密码</label>\n                                <input id="sigin-password" type="password" name="password" class="form-control" h-placeholder="请输入密码">\n                            </div>\n                            <div class="text-right">\n                                <a href="/sign/signup">还没有账号?</a>\n                                <span>|</span>\n                                <a href="#">忘记密码?</a>\n                            </div>\n                            <button type="submit" class="btn btn-block btn-primary">登&emsp;&emsp;录</button>\n                        </form>\n                    </div>\n                </div>\n            ');
                $('body').append(this.$html);
            }
        }, {
            key: '_bindEvent',
            value: function _bindEvent() {
                var _this2 = this;

                this.$mask.on('click', this.hide);
                this.$close.on('click', this.hide);

                this.$inputs.on('focus', function (e) {
                    var $target = $(e.target);
                    $target.closest('.form-group').addClass('active');
                    setTimeout(function () {
                        $target.attr('placeholder', $target.attr('h-placeholder'));
                    }, 200);
                });

                this.$inputs.on('blur', function (e) {
                    var $target = $(e.target);
                    if ($target.val().trim()) return;
                    $target.attr('placeholder', '').closest('.form-group').removeClass('active');
                });

                this.$inputs.on('input', function (e) {
                    var $target = $(e.target);

                    if (!$target.val()) $target.closest('.form-group').addClass('has-error');else $target.closest('.form-group').removeClass('has-error');

                    if (_this2.$username.val() && _this2.$password.val()) _this2.$submitBtn.attr('disabled', false);else _this2.$submitBtn.attr('disabled', true);
                });
            }
        }]);
        return SignBox;
    }();

    window.signBox = new SignBox();
});