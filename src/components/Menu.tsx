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
import React, { useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import { mainPages, userPages, accountPages } from '../pages';
import './Menu.css';
import { useGetUser, useSignInGlobal, useSignOutGlobal } from '../hooks/useApi';
import useEffectOnce from '../hooks/useEffectOnce';
import useStorage from '../hooks/useStorage';
import { useState } from 'react';

const Menu: React.FC = () => {
    const location = useLocation();
    const getUser = useGetUser();
    const signOut = useSignOutGlobal();
    const signIn = useSignInGlobal();

    const [toggle, setToggle] = useState(false);
    
    const theme = useStorage('theme');

    useEffect(() => {
        if(!signOut.loading)
            getUser.request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signOut.loading]);

    useEffect(() => {
        if(!signIn.loading)
            getUser.request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signIn.loading]);

    useEffectOnce(() => {
        getUser.request();
        (async () => setToggle(!Boolean(await theme.get())))();
    });

    const changeTheme = async (e: CustomEvent<ToggleChangeEventDetail>) => {
        if (!e.currentTarget)
            return;
        setToggle(e.detail.checked);
        await theme.set(!e.detail.checked);
        document.body.classList.toggle('dark', Boolean(await theme.get()));
    };

    const RenderUser = () => {
        if (!getUser.data) {
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
        } else {
            return (
                <IonList id="user-list">
                    <IonListHeader>You {getUser.data?.username} - {getUser.data?.email}</IonListHeader>
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
                        <IonItem routerLink={'/Home'} routerDirection="none" lines="none" detail={false} onClick={() => { signOut.request(); }}>
                            <IonIcon slot="start" ios={logOutOutline} md={logOutSharp} />
                            <IonLabel>Logout</IonLabel>
                        </IonItem>
                    </IonMenuToggle>
                </IonList>
            );
        }
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
                        <IonToggle slot="start" checked={toggle} onIonChange={changeTheme} />
                        <IonLabel>Light Mode</IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonMenu>
    );
};

export default Menu;
