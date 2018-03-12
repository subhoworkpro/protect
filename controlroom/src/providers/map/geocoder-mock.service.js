/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */
import { Observable } from 'rxjs/Observable';
var GeocoderServiceMock = (function () {
    function GeocoderServiceMock() {
        this.fakeResponse = null;
    }
    GeocoderServiceMock.prototype.addressForlatLng = function () {
        return Observable.of(this.fakeResponse);
    };
    GeocoderServiceMock.prototype.setResponse = function (data) {
        this.fakeResponse = data;
    };
    return GeocoderServiceMock;
}());
export { GeocoderServiceMock };
//# sourceMappingURL=geocoder-mock.service.js.map