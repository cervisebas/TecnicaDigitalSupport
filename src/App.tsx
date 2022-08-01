import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.scss';

import './App.scss';
import Session from './screens/Session';
import ScreenLoading from './screens/ScreenLoading';
import { Component, ReactNode } from 'react';
import { Family, PWA } from './scripts/ApiFamily';
import ShowInstallNow from './screens/ShowInstallNow';

type IProps = {};
type IState = {
  showLoadingScreen: boolean;
  showSession: boolean;
  showInstallNow: boolean;
};

setupIonicReact({ mode: 'ios' });

export default class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      showLoadingScreen: true,
      showSession: false,
      showInstallNow: false
    };
    this.verify = this.verify.bind(this);
    this.goAllEvent = this.goAllEvent.bind(this);
  }
  verify(wait?: boolean) {
    this.setState({ showLoadingScreen: true }, ()=>
      Family.verify()
        .then(()=>setTimeout(()=>this.setState({ showLoadingScreen: false, showSession: false }, this.goAllEvent), (wait)? 2000: 0))
        .catch(()=>this.setState({ showLoadingScreen: false, showSession: true }))
    );
  }
  goAllEvent() {
    document.dispatchEvent(new CustomEvent('LoadNow'));
  }
  componentDidMount() {
    if (!PWA.checkInstall()) {
      //return this.setState({ showInstallNow: true });
    }
    setTimeout(this.verify, 2000);
  }
  render() {
    return(<IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home reVerify={this.verify} />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
      <Session visible={this.state.showSession} goReverify={this.verify} />
      <ScreenLoading visible={this.state.showLoadingScreen} />
      <ShowInstallNow visible={this.state.showInstallNow} />
    </IonApp>);
  }
}
