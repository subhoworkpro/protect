/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */
import { ViewController, AlertController } from 'ionic-angular';
import { TestBed, async } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TaxiApp } from '../../app/app.component';
import { SearchPage } from './search';
import { GeocoderServiceMock } from '../../providers/map/geocoder-mock.service';
import { GeocoderService } from '../../providers/map/geocoder.service';
import { MapService } from '../../providers/map/map.service';
import { MapServiceMock } from '../../providers/map/map-mock.service';
import { NavMock, ViewControllerMock, AlertControllerMock } from '../../ionic-mock';
import { RideService } from '../../providers/ride/ride.service';
import { RideServiceMock } from '../../providers/ride/ride-mock.service';
describe('Page: SearchPage', function () {
    var comp;
    var fixture;
    var de;
    var el;
    var mapService;
    var rideService;
    var geocoderService;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [TaxiApp, SearchPage],
            providers: [
                { provide: NavController, useClass: NavMock },
                { provide: ViewController, useClass: ViewControllerMock },
                { provide: AlertController, useClass: AlertControllerMock },
                { provide: RideService, useClass: RideServiceMock },
                { provide: MapService, useClass: MapServiceMock },
                { provide: GeocoderService, useClass: GeocoderServiceMock }
            ]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(SearchPage);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
        mapService = TestBed.get(MapService);
        rideService = TestBed.get(RideService);
        geocoderService = TestBed.get(GeocoderService);
    });
    afterEach(function () {
        fixture.destroy();
        comp = null;
        de = null;
        el = null;
    });
    it('is created', function () {
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
    });
    it('should render `ion-content`', function () {
        fixture.detectChanges();
        expect(de.nativeElement.querySelectorAll('ion-content').length).toBe(1);
    });
    it('should setup autocomplete and load nearby places', function () {
        spyOn(mapService, 'createAutocomplete').and.callThrough();
        spyOn(mapService, 'loadNearbyPlaces').and.callThrough();
        fixture.componentInstance.ionViewDidLoad();
        fixture.detectChanges();
        expect(mapService.createAutocomplete).toHaveBeenCalled();
        expect(mapService.loadNearbyPlaces).toHaveBeenCalled();
    });
});
//# sourceMappingURL=search.spec.js.map