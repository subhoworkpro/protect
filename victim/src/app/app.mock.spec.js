/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */
import { Platform } from 'ionic-angular';
import { TaxiApp } from './app.component';
import { TestBed, async } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PlatformMock } from '../ionic-mock';
describe('TaxiApp', function () {
    var comp;
    var fixture;
    var de;
    var el;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [TaxiApp],
            providers: [
                { provide: Platform, useClass: PlatformMock }
            ]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(TaxiApp);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
        // #trick
        // If you want to trigger ionViewWillEnter automatically de-comment the following line
        // fixture.componentInstance.ionViewWillEnter();
        fixture.detectChanges();
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
    it('should initialize with an app', function () {
        expect(comp['app']).not.toBe(null);
    });
    it('should have a root page', function () {
        expect(comp['rootPage']).not.toBe(null);
    });
    it('should have 2 main pages', function () {
        expect(comp.appPages.length).toEqual(3);
    });
});
//# sourceMappingURL=app.mock.spec.js.map