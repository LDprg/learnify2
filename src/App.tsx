import { IonApp, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonRouterOutlet, IonSplitPane, IonTitle, IonToolbar, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/ErrorPage';
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

setupIonicReact();

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
                                    <IonPage>
                                        <IonHeader>
                                            <IonToolbar>
                                                <IonButtons slot="start">
                                                    <IonMenuButton />
                                                </IonButtons>
                                                <IonTitle>{mainPage.title}</IonTitle>
                                            </IonToolbar>
                                        </IonHeader>

                                        <IonContent fullscreen>
                                            <IonHeader collapse="condense">
                                                <IonToolbar>
                                                    <IonTitle size="large">{mainPage.title}</IonTitle>
                                                </IonToolbar>
                                            </IonHeader>
                                            <mainPage.component />
                                        </IonContent>
                                    </IonPage>
                                </Route>
                            );
                        })}
                        {userPages.map((userPages, index) => {
                            return (
                                <Route path={userPages.url} exact={true}>
                                    <IonPage>
                                        <IonHeader>
                                            <IonToolbar>
                                                <IonButtons slot="start">
                                                    <IonMenuButton />
                                                </IonButtons>
                                                <IonTitle>{userPages.title}</IonTitle>
                                            </IonToolbar>
                                        </IonHeader>

                                        <IonContent fullscreen>
                                            <IonHeader collapse="condense">
                                                <IonToolbar>
                                                    <IonTitle size="large">{userPages.title}</IonTitle>
                                                </IonToolbar>
                                            </IonHeader>
                                            <userPages.component />
                                        </IonContent>
                                    </IonPage>
                                </Route>
                            );
                        })}
                        {accountPages.map((accountPages, index) => {
                            return (
                                <Route path={accountPages.url} exact={true}>
                                    <IonPage>
                                        <IonHeader>
                                            <IonToolbar>
                                                <IonButtons slot="start">
                                                    <IonMenuButton />
                                                </IonButtons>
                                                <IonTitle>{accountPages.title}</IonTitle>
                                            </IonToolbar>
                                        </IonHeader>

                                        <IonContent fullscreen>
                                            <IonHeader collapse="condense">
                                                <IonToolbar>
                                                    <IonTitle size="large">{accountPages.title}</IonTitle>
                                                </IonToolbar>
                                            </IonHeader>
                                            <accountPages.component />
                                        </IonContent>
                                    </IonPage>
                                </Route>
                            );
                        })}
                        <Route exact={true} >
                            <Page />
                        </Route>
                    </IonRouterOutlet>
                </IonSplitPane>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
