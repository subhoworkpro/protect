/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */
var RideServiceMock = (function () {
    function RideServiceMock() {
        this.fakeResponse = null;
    }
    RideServiceMock.prototype.getRides = function () {
        return [];
    };
    RideServiceMock.prototype.addRide = function () {
    };
    return RideServiceMock;
}());
export { RideServiceMock };
//# sourceMappingURL=ride-mock.service.js.map