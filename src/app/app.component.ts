import { Component, ViewChild } from '@angular/core';
import { Events, MenuController, Nav, Platform, AlertController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { CategoryPostPage } from '../pages/category-post/category-post';
import { Service } from '../providers/service';
import { UserData } from '../providers/user-data';
import { EmailComposer } from '@ionic-native/email-composer';
import { VideoPage } from '../pages/playlist-page/playlist-page';
import { PrimiPiattiPage } from '../pages/primi-piatti/primi-piatti';


import { StatusBar } from '@ionic-native/status-bar';
import { SideMenuSettings } from '../shared/side-menu-content/side-menu-content.component';
import { MenuOptionModel, SideMenuContentComponent } from '../shared/side-menu-content/side-menu-content.component';


export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;

}

@Component({
  templateUrl: 'app.template.html'
})
export class ConferenceApp {
  @ViewChild(Nav) nav: Nav;

  // Get the instance to call the public methods
  @ViewChild(SideMenuContentComponent) sideMenu: SideMenuContentComponent;

  loggedInPages: PageInterface[] = [
    { title: 'Account', name: 'TabsPage', component: TabsPage, tabComponent: AccountPage, index: 1, icon: 'md-contact' },
    { title: 'Logout', name: 'TabsPage', component: TabsPage, icon: 'md-log-out', logsOut: true }
  ];
  loggedOutPages: PageInterface[] = [
    { title: 'Login', name: 'LoginPage', component: LoginPage, icon: 'md-log-in' },
    { title: 'Signup', name: 'SignupPage', component: SignupPage, icon: 'md-person-add' }
  ];
  rootPage: any;
  categories: any;


  // Options to show in the SideMenuComponent
  public options: Array<MenuOptionModel>;

  // Settings for the SideMenuComponent
  public sideMenuSettings: SideMenuSettings = {
    accordionMode: true,
    showSelectedOption: true,
    selectedOptionClass: 'my-selected-option',
    subOptionIndentation: {
      md: '56px',
      ios: '64px',
      wp: '56px'
    }
  };



  constructor(
    public events: Events,
    public userData: UserData,
    public menu: MenuController,
    public platform: Platform,
    public service: Service,
    public storage: Storage,
    public splashScreen: SplashScreen,
    private emailComposer: EmailComposer,
    private statusBar: StatusBar,
    private alertCtrl: AlertController,
        private menuCtrl: MenuController) {

    this.initializeApp();
    
    this.storage.get('hasSeenTutorial')
      .then((hasSeenTutorial) => {
        if (hasSeenTutorial) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = TutorialPage;
        }
        this.platformReady()
    });

    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === true);
    });
    this.enableMenu(true);

    this.listenToLoginEvents();
  }

initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();

      // Initialize some options
      this.initializeOptions();
    });
  }


private initializeOptions(): void {
    this.options = new Array<MenuOptionModel>();

    // Load simple menu options
    // ------------------------------------------
    /*this.options.push({
      iconName: 'home',
      displayName: 'Home',
      component: TabsPage,
      selected: true// This option is already selected
    });*/

    this.options.push({
      displayName: 'Angolo Vegano',
      component: PrimiPiattiPage
    });

    this.options.push({
      displayName: 'Angolo Crudista',
      component: PrimiPiattiPage
    });

    this.options.push({
      displayName: 'Briciole',
      component: PrimiPiattiPage
    });

    

    
    // Load options with nested items 
    // -----------------------------------------------
    this.options.push({
      displayName: 'Ricette',
      subItems: [
        {
          displayName: 'Antipasti',
          component: PrimiPiattiPage
        },
        {
          displayName: 'Zuppe e Minestre',
          component: PrimiPiattiPage
        },
        {
          displayName: 'Primi',
          component: PrimiPiattiPage
        },
        {
          displayName: 'Secondi',
          component: PrimiPiattiPage
        },
        {
          displayName: 'Contorni',
          component: PrimiPiattiPage
        },
        {
          displayName: 'Dolci',
          component: PrimiPiattiPage
        }
      ]
    });

    // Load options with nested items 
    // -----------------------------------------------
    this.options.push({
      displayName: 'Rimedi Fai Da Te',
      subItems: [
        {
          displayName: 'Infusi',
          component: PrimiPiattiPage
        },
        {
          displayName: 'Decotti',
          component: PrimiPiattiPage
        },
        {
          displayName: 'Macerati',
          component: PrimiPiattiPage
        },
        {
          displayName: 'Tisane',
          component: PrimiPiattiPage
        }
      ]
    });





    // Load special options
    // -----------------------------------------------
    /*this.options.push({
      displayName: 'Special options',
      subItems: [
        {
          iconName: 'log-in',
          displayName: 'Login',
          custom: {
            isLogin: true
          }
        },
        {
          iconName: 'log-out',
          displayName: 'Logout',
          custom: {
            isLogout: true
          }
        },
        {
          iconName: 'globe',
          displayName: 'Open Google',
          custom: {
            isExternalLink: true,
            externalUrl: 'http://www.google.com'
          }
        }
      ]
    });*/



  }

  public selectOption(option: MenuOptionModel): void {
    this.menuCtrl.close().then(() => {

      if (option.custom && option.custom.isLogin) {
        this.presentAlert('You\'ve clicked the login option!');
      } else if (option.custom && option.custom.isLogout) {
        this.presentAlert('You\'ve clicked the logout option!');
      } else if(option.custom && option.custom.isExternalLink) {
        let url = option.custom.externalUrl;
        window.open(url, '_blank');
      } else {
        // Redirect to the selected page
        this.nav.setRoot(option.component || PrimiPiattiPage, { 'title': option.displayName });
      }
    });
  }

  public collapseMenuOptions(): void {
    // Collapse all the options
    this.sideMenu.collapseAllOptions();
  }

  public presentAlert(message: string): void {
    let alert = this.alertCtrl.create({
      title: 'Information',
      message: message,
      buttons: ['Ok']
    });
    alert.present();
  }






  getCategory(item){
    this.nav.setRoot(CategoryPostPage, item);
  }

  goHome(){
    this.nav.setRoot(TabsPage);
  }

  support(){
    let email = {
      to: 'dodesigndone@gmail.com',
      subject: '',
      body: '<br>Hi There - StarVegApp<br>',
      isHtml: true
    };


    this.emailComposer.open(email);
  }

  youtube(){
    this.nav.push(VideoPage);
  }
  
  goPrimiPiatti(){
    this.nav.push(PrimiPiattiPage);
  }


  openPage(page: PageInterface) {
    let params = {};
    if (page.index) {
      params = { tabIndex: page.index };
    }

    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
  } else {
      this.nav.setRoot(page.name, params).catch((err: any) => {
        //console.log(`Didn't set nav root: ${err}`);
      });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      this.service.loggedInn = false;
      this.userData.logout();
    }
  }

  openTutorial() {
    this.nav.setRoot(TutorialPage);
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      this.service.getCategories()
       .then((results: any) => this.categories = results);
    });
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0];

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }

  


}
