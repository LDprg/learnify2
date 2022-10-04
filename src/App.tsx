import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import ErrorPage from './pages/ErrorPage';
import { mainPages, userPages, accountPages } from './pages';

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
import './theme/variables.css';
import Page from './components/Page';

setupIonicReact();

document.body.classList.add('dark');

const App: React.FC = () => {
    return (
        <IonApp>
            <IonReactRouter>
                <IonSplitPane contentId="main">
                    <Menu />
                    <IonRouterOutlet id="main">
                        <Route path="/" exact={true}>
                            <Redirect to="/Home" />
                        </Route>
                        {mainPages.map((mainPage, index) => {
                            return (
                                <Route path={mainPage.url} exact={true}>
                                    <Page title={mainPage.title} component={mainPage.component}></Page>
                                </Route>
                            );
                        })}
                        {userPages.map((userPages, index) => {
                            return (
                                <Route path={userPages.url} exact={true}>
                                    <Page title={userPages.title} component={userPages.component}></Page>
                                </Route>
                            );
                        })}
                        {accountPages.map((accountPages, index) => {
                            return (
                                <Route path={accountPages.url} exact={true}>
                                    <Page title={accountPages.title} component={accountPages.component}></Page>
                                </Route>
                            );
                        })}
                        <Route exact={true} >
                            <ErrorPage />
                        </Route>
                    </IonRouterOutlet>
                </IonSplitPane>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
