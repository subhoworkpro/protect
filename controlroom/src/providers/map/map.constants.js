/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */
var MapConst = (function () {
    function MapConst() {
    }
    Object.defineProperty(MapConst, "DEFAULT_LAT", {
        get: function () {
            return 42;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapConst, "DEFAULT_LNG", {
        get: function () {
            return 12.8;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapConst, "DEFAULT_ZOOM", {
        get: function () {
            return 5;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapConst, "MAX_ZOOM", {
        get: function () {
            return 18;
        },
        enumerable: true,
        configurable: true
    });
    return MapConst;
}());
export { MapConst };
//# sourceMappingURL=map.constants.js.map