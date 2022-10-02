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
import React from 'react';

import { useLocation } from 'react-router-dom';
import { mainPages, userPages, accountPages } from '../pages';
import './Menu.css';

const Menu: React.FC = () => {
    const location = useLocation();

    const changeTheme = async (e: CustomEvent<ToggleChangeEventDetail>) => {
        const ionToggle = e.currentTarget;
        if (!ionToggle) {
            return;
        }
        console.log(`Dark: ${e.detail.checked}`);
        document.body.classList.toggle('dark', e.detail.checked);
        // document.body.classList.toggle("dark");
    };

    // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    // prefersDark.matches()

    return (
        <IonMenu contentId="main" type="overlay">
            <IonContent>
                <IonList id="main-list">
                    <IonListHeader>Learnify</IonListHeader>
                    <IonNote>A nice Learning App</IonNote>
                    {mainPages.map((mainPage, index) => {
                        return (
                            <IonMenuToggle key={index} autoHide={false}>
                                <IonItem className={location.pathname === mainPage.url ? 'selected' : ''} routerLink={mainPage.url} routerDirection="none" lines="none" detail={false}>
                                    <IonIcon slot="start" ios={mainPage.iosIcon} md={mainPage.mdIcon} />
                                    <IonLabel>{mainPage.title}</IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                        );
                    })}
                </IonList>

                <IonList id="user-list">
                    <IonListHeader>Your</IonListHeader>
                    {userPages.map((userPages, index) => {
                        return (
                            <IonMenuToggle key={index} autoHide={false}>
                                <IonItem className={location.pathname === userPages.url ? 'selected' : ''} routerLink={userPages.url} routerDirection="none" lines="none" detail={false}>
                                    <IonIcon slot="start" ios={userPages.iosIcon} md={userPages.mdIcon} />
                                    <IonLabel>{userPages.title}</IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                        );
                    })}
                </IonList>

                <IonList id="account-list">
                    {accountPages.map((accountPages, index) => {
                        return (
                            <IonMenuToggle key={index} autoHide={false}>
                                <IonItem className={location.pathname === accountPages.url ? 'selected' : ''} routerLink={accountPages.url} routerDirection="none" lines="none" detail={false}>
                                    <IonIcon slot="start" ios={accountPages.iosIcon} md={accountPages.mdIcon} />
                                    <IonLabel>{accountPages.title}</IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                        );
                    })}
                </IonList>

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
