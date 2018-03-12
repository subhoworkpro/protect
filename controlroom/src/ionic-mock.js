/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */
var NavMock = (function () {
    function NavMock() {
    }
    NavMock.prototype.pop = function () {
        return new Promise(function (resolve) {
            resolve();
        });
    };
    NavMock.prototype.push = function () {
        return new Promise(function (resolve) {
            resolve();
        });
    };
    NavMock.prototype.getActive = function () {
        return {
            'instance': {
                'model': 'something',
            },
        };
    };
    NavMock.prototype.setRoot = function () {
        return true;
    };
    return NavMock;
}());
export { NavMock };
var PlatformMock = (function () {
    function PlatformMock() {
    }
    PlatformMock.prototype.ready = function () {
        return new Promise(function (resolve) {
            resolve();
        });
    };
    return PlatformMock;
}());
export { PlatformMock };
var MenuMock = (function () {
    function MenuMock() {
    }
    MenuMock.prototype.close = function () {
        return new Promise(function (resolve) {
            resolve();
        });
    };
    return MenuMock;
}());
export { MenuMock };
var LoadingControllerMock = (function () {
    function LoadingControllerMock() {
    }
    LoadingControllerMock.prototype.create = function (opts) {
        return {
            present: function () {
            },
            dismiss: function () {
            }
        };
    };
    ;
    return LoadingControllerMock;
}());
export { LoadingControllerMock };
var ViewControllerMock = (function () {
    function ViewControllerMock() {
    }
    ViewControllerMock.prototype.dismiss = function (data, role) {
        return new Promise(function (resolve) {
            resolve();
        });
    };
    return ViewControllerMock;
}());
export { ViewControllerMock };
var AlertControllerMock = (function () {
    function AlertControllerMock() {
    }
    AlertControllerMock.prototype.create = function () {
        return {};
    };
    return AlertControllerMock;
}());
export { AlertControllerMock };
//# sourceMappingURL=ionic-mock.js.map