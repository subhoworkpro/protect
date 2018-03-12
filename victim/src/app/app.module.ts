import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { TaxiApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { FinderPage } from '../pages/finder/finder';
import { SummaryPage } from '../pages/summary/summary';
import { ProfilePage } from '../pages/profile/profile';
import { EmailPage } from '../pages/email/email';
import { ImagePage } from '../pages/image/image';
import { SendingPage } from '../pages/sending/sending';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { RideListPage } from '../pages/ride-list/ride-list';
import { ConfirmationPage } from '../pages/confirmation/confirmation';
import { TabsPage } from '../pages/tabs/tabs';

import { MapComponent } from '../components/map/map';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';
import { SearchPage } from '../pages/search/search';

import { RideService } from '../providers/ride/ride.service';
import { GeocoderService } from '../providers/map/geocoder.service';
import { MapService } from '../providers/map/map.service';
import { CameraPreview } from '@ionic-native/camera-preview';
import { MediaCapture } from '@ionic-native/media-capture';
import { Vibration } from '@ionic-native/vibration';
import { Shake } from '@ionic-native/shake';
import { PhotoViewer } from '@ionic-native/photo-viewer';
// import { BackgroundMode } from '@ionic-native/background-mode';
import { NativeAudio } from '@ionic-native/native-audio';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';

import {ChartsModule} from 'ng2-charts/charts/charts';
import '../../node_modules/chart.js/dist/Chart.bundle.min.js';

 var config = {
    apiKey: "AIzaSyB7xxhc0uZ3-NdPkT3G1kqwtqQrAVpLEVo",
    authDomain: "protect-ee184.firebaseapp.com",
    databaseURL: "https://protect-ee184.firebaseio.com",
    storageBucket: "protect-ee184.appspot.com",
    messagingSenderId: "637167652598"
  };

@NgModule({
  declarations: [
    TaxiApp,
    AboutPage,
    HomePage,
    FinderPage,
    SummaryPage,
    ProfilePage,
    RideListPage,
    MapComponent,
    ProgressBarComponent,
    SearchPage,
    ConfirmationPage,
    TabsPage,
    EmailPage,
    ImagePage,
    DashboardPage,
    SendingPage
  ],
  imports: [
    IonicModule.forRoot(TaxiApp, {tabsPlacement: 'bottom'}),
	  AngularFireModule.initializeApp(config),
    ChartsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    TaxiApp,
    AboutPage,
    HomePage,
    FinderPage,
    SummaryPage,
    ProfilePage,
    RideListPage,
    SearchPage,
    ConfirmationPage,
    TabsPage,
    EmailPage,
    ImagePage,
    DashboardPage,
    SendingPage
  ],
  providers: [RideService, GeocoderService, MapService, CameraPreview, MediaCapture, AngularFireDatabase, Vibration, Shake, 
              // BackgroundMode, 
              NativeAudio, LocalNotifications, PhotoViewer ],
})
export class AppModule {
}
