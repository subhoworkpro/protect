/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */
var RideModel = (function () {
    function RideModel(_id, departure, destination, rideDate) {
        if (rideDate === void 0) { rideDate = new Date(); }
        this._id = _id;
        this.departure = departure;
        this.destination = destination;
        this.rideDate = rideDate;
    }
    return RideModel;
}());
export { RideModel };
//# sourceMappingURL=ride.model.js.map