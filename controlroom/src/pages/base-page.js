/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */
var BasePage = (function () {
    function BasePage(alertCtrl) {
        this.alertCtrl = alertCtrl;
    }
    BasePage.prototype.displayErrorAlert = function () {
        var prompt = this.alertCtrl.create({
            title: 'Ionic Taxi',
            message: 'Unknown error, please try again later',
            buttons: ['OK']
        });
        prompt.present();
    };
    return BasePage;
}());
export { BasePage };
//# sourceMappingURL=base-page.js.map