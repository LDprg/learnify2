import {
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonNote,
    IonToggle,
    ToggleChangeEventDetail,
} from '@ionic/react';
import { logOutOutline, logOutSharp } from 'ionicons/icons';
import React from 'react';

import { useLocation } from 'react-router-dom';
import { mainPages, userPages, accountPages } from '../pages';
import User from '../services/User';
import './Menu.css';

const Menu: React.FC = () => {
    const location = useLocation();

    const changeTheme = async (e: CustomEvent<ToggleChangeEventDetail>) => {
        if (!e.currentTarget)
            return;
        document.body.classList.toggle('dark', !e.detail.checked);
    };

    const RenderUser = () => {
        if (!User.isLoggedIn())
            return (
                <IonList id="account-list">
                    {accountPages.map((accountPages, index) => {
                        return (
                            <IonMenuToggle key={index} autoHide={false}>
                                <IonItem className={location.pathname === accountPages.url ? 'selected' : ''} routerLink={accountPages.url} routerDirection="none" lines="none" detail={false} onClick={accountPages.func}>
                                    <IonIcon slot="start" ios={accountPages.iosIcon} md={accountPages.mdIcon} />
                                    <IonLabel>{accountPages.title}</IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                        );
                    })}
                </IonList>
            );
        else
            return (
                <IonList id="user-list">
                    <IonListHeader>You {User.username} - {User.email}</IonListHeader>
                    {userPages.map((userPages, index) => {
                        return (
                            <IonMenuToggle key={index} autoHide={false}>
                                <IonItem className={location.pathname === userPages.url ? 'selected' : ''} routerLink={userPages.url} routerDirection="none" lines="none" detail={false} onClick={userPages.func}>
                                    <IonIcon slot="start" ios={userPages.iosIcon} md={userPages.mdIcon} />
                                    <IonLabel>{userPages.title}</IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                        );
                    })}
                    <IonMenuToggle key={accountPages.length} autoHide={false}>
                        <IonItem routerLink={'/Home'} routerDirection="none" lines="none" detail={false} onClick={User.signOut}>
                            <IonIcon slot="start" ios={logOutOutline} md={logOutSharp} />
                            <IonLabel>Logout</IonLabel>
                        </IonItem>
                    </IonMenuToggle>
                </IonList>
            );
    }

    return (
        <IonMenu contentId="main" type="overlay">
            <IonContent>
                <IonList id="main-list">
                    <IonListHeader>Learnify</IonListHeader>
                    <IonNote>A nice Learning App</IonNote>
                    {mainPages.map((mainPage, index) => {
                        return (
                            <IonMenuToggle key={index} autoHide={false}>
                                <IonItem className={location.pathname === mainPage.url ? 'selected' : ''} routerLink={mainPage.url} routerDirection="none" lines="none" detail={false} onClick={mainPage.func}>
                                    <IonIcon slot="start" ios={mainPage.iosIcon} md={mainPage.mdIcon} />
                                    <IonLabel>{mainPage.title}</IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                        );
                    })}
                </IonList>

                {RenderUser()}

                <IonList id='setting-list'>
                    <IonListHeader>Settings</IonListHeader>
                    <IonItem lines="none" detail={false}>
                        <IonToggle slot="start" onIonChange={changeTheme} />
                        <IonLabel>Light Mode</IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonMenu>
    );
};

export default Menu;
