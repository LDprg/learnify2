import { homeOutline, homeSharp, idCardOutline, idCardSharp, listOutline, listSharp, logInOutline, logInSharp, logOutOutline, logOutSharp, personCircleOutline, personCircleSharp, schoolOutline, schoolSharp } from 'ionicons/icons';
import React from 'react';
import LoginPage from './account/LoginPage';
import LogoutPage from './account/LogoutPage';
import RegisterPage from './account/RegisterPage';
import HomePage from './main/HomePage';
import LearnPage from './main/LearnPage';
import ProfilePage from './user/ProfilePage';
import SetsPage from './user/SetsPage';

interface AppPage {
    title: string;
    url: string;
    component: React.FC;
    iosIcon: string;
    mdIcon: string;
}

export const mainPages: AppPage[] = [
    {
        title: 'Home',
        url: '/Home',
        component: HomePage,
        iosIcon: homeOutline,
        mdIcon: homeSharp
    },
    {
        title: 'Learn',
        url: '/Learn',
        component: LearnPage,
        iosIcon: schoolOutline,
        mdIcon: schoolSharp
    },
];

export const userPages: AppPage[] = [
    {
        title: 'Profile',
        url: '/Profile',
        component:  ProfilePage,
        iosIcon: personCircleOutline,
        mdIcon: personCircleSharp
    },
    {
        title: 'Sets',
        url: '/Sets',
        component: SetsPage,
        iosIcon: listOutline,
        mdIcon: listSharp
    }
];

export const accountPages: AppPage[] = [
    {
        title: 'Login',
        url: '/Login',
        component: LoginPage,
        iosIcon: logInOutline,
        mdIcon: logInSharp
    },
    {
        title: 'Logout',
        url: '/Logout',
        component: LogoutPage,
        iosIcon: logOutOutline,
        mdIcon: logOutSharp
    },
    {
        title: 'Register',
        url: '/Register',
        component: RegisterPage,
        iosIcon: idCardOutline,
        mdIcon: idCardSharp
    }
];