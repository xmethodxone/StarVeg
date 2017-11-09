import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { ConferenceApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { PostPage } from '../pages/post/post';
import { CustomDetailPage } from '../pages/custom-detail/custom-detail';
import { CategoryPostPage } from '../pages/category-post/category-post';
import { ContorniSfiziosiPage } from '../pages/contorni-sfiziosi/contorni-sfiziosi';
import { DolciVeganPage } from '../pages/dolci-vegan/dolci-vegan';
import { PrimiPiattiPage } from '../pages/primi-piatti/primi-piatti';
import { SecondiPiattiPage } from '../pages/secondi-piatti/secondi-piatti';
import { AngoloCrudistaPage } from '../pages/angolo-crudista/angolo-crudista';
import { BricioleNewsPage } from '../pages/briciole-news/briciole-news';
import { AngoloVeganoPage } from '../pages/angolo-vegano/angolo-vegano';
import { ZuppeMinestrePage } from '../pages/zuppe-minestre/zuppe-minestre';
import { AntipastiSfiziosiPage } from '../pages/antipasti-sfiziosi/antipasti-sfiziosi';
import { RimediDecottiPage } from '../pages/rimedi-decotti/rimedi-decotti';
import { RimediInfusiPage } from '../pages/rimedi-infusi/rimedi-infusi';
import { RimediMaceratiPage } from '../pages/rimedi-macerati/rimedi-macerati';
import { RimediTisanePage } from '../pages/rimedi-tisane/rimedi-tisane';
import { CustomPostPage } from '../pages/custom-post/custom-post';
import { PopoverPage } from '../pages/about-popover/about-popover';
import { AccountPage } from '../pages/account/account';
import { PostsPage } from '../pages/posts/posts';
import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SearchPage } from '../pages/search/search';
import { VideoPage } from '../pages/playlist-page/playlist-page';
import { PlaylistVideoPage } from '../pages/playlist-videos/playlist-videos';


import { Service } from '../providers/service';
import { Functions } from '../providers/functions';
import { UserData } from '../providers/user-data';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { EmailComposer } from '@ionic-native/email-composer';
import { OneSignal } from '@ionic-native/onesignal';
import { SocialSharing } from '@ionic-native/social-sharing';
import { KeysPipe } from '../providers/pipe';
import { AppRate } from '@ionic-native/app-rate';
import { YoutubePipe } from '../providers/youtube/youtube';
import { StatusBar } from '@ionic-native/status-bar';
// Custom components
import { SideMenuContentComponent } from '../shared/side-menu-content/side-menu-content.component';


@NgModule({
  declarations: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PostPage,
    PopoverPage,
    PostsPage,
    ScheduleFilterPage,
    SignupPage,
    TabsPage,
    TutorialPage,
    CategoryPostPage,
    KeysPipe,
    SearchPage,
    VideoPage,
    YoutubePipe,
    PlaylistVideoPage,
    PrimiPiattiPage,
    SecondiPiattiPage,
    AngoloCrudistaPage,
    AngoloVeganoPage,
    ZuppeMinestrePage,
    AntipastiSfiziosiPage,
    BricioleNewsPage,
    ContorniSfiziosiPage,
    DolciVeganPage,
    RimediDecottiPage,
    RimediInfusiPage,
    RimediMaceratiPage,
    RimediTisanePage,
    CustomPostPage,
    CustomDetailPage,
    SideMenuContentComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(ConferenceApp, {}, {
      links: [
        { component: TabsPage, name: 'TabsPage', segment: 'tabs-page' },
        { component: PostsPage, name: 'Schedule', segment: 'schedule' },
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: ScheduleFilterPage, name: 'ScheduleFilter', segment: 'scheduleFilter' }, 
        { component: MapPage, name: 'Map', segment: 'map' },   
        { component: AboutPage, name: 'About', segment: 'about' },
        { component: TutorialPage, name: 'Tutorial', segment: 'tutorial' },
        { component: AccountPage, name: 'AccountPage', segment: 'account' },
        { component: SignupPage, name: 'SignupPage', segment: 'signup' },
        { component: PrimiPiattiPage, name: 'PrimiPiattiPage', segment: 'primi-piatti' }
      ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    AboutPage,
    LoginPage,
    AccountPage,
    PostPage,
    PopoverPage,
    MapPage,
    PostsPage,
    ScheduleFilterPage,
    SignupPage,
    TabsPage,
    TutorialPage,
    CategoryPostPage,
    SearchPage,
    VideoPage,
    PlaylistVideoPage,
    PrimiPiattiPage,
    SecondiPiattiPage,
    AngoloCrudistaPage,
    AngoloVeganoPage,
    AntipastiSfiziosiPage,
    ZuppeMinestrePage,
    ContorniSfiziosiPage,
    DolciVeganPage,
    RimediDecottiPage,
    RimediInfusiPage,
    RimediMaceratiPage,
    RimediTisanePage,
    CustomPostPage,
    CustomDetailPage,
    BricioleNewsPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Service,
    UserData,
    InAppBrowser,
    SplashScreen,
    Functions,
    EmailComposer,
    Facebook,
    GooglePlus,
    OneSignal,
    SocialSharing,
    AppRate,
    StatusBar

  ]
})
export class AppModule { }
