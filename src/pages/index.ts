import { homeOutline, homeSharp, idCardOutline, idCardSharp, listOutline, listSharp, logInOutline, logInSharp, personCircleOutline, personCircleSharp, schoolOutline, schoolSharp } from 'ionicons/icons';
import React from 'react';
import LoginPage from './account/LoginPage';
import RegisterPage from './account/RegisterPage';
import HomePage from './main/HomePage';
import LearnPage from './main/LearnPage';
import ProfilePage from './user/ProfilePage';
import SetsPage from './user/SetsPage';

interface AppPage {
    title: string;
    url: string;
    component: React.FC;
    func: any;
    iosIcon: string;
    mdIcon: string;
}

export const mainPages: AppPage[] = [
    {
        title: 'Home',
        url: '/Home',
        component: HomePage,
        func: null,
        iosIcon: homeOutline,
        mdIcon: homeSharp
    },
    {
        title: 'Learn',
        url: '/Learn',
        component: LearnPage,
        func: null,
        iosIcon: schoolOutline,
        mdIcon: schoolSharp
    },
];

export const userPages: AppPage[] = [
    {
        title: 'Profile',
        url: '/Profile',
        component: ProfilePage,
        func: null,
        iosIcon: personCircleOutline,
        mdIcon: personCircleSharp
    },
    {
        title: 'Sets',
        url: '/Sets',
        component: SetsPage,
        func: null,
        iosIcon: listOutline,
        mdIcon: listSharp
    }
];

export const accountPages: AppPage[] = [
    {
        title: 'Login',
        url: '/Login',
        component: LoginPage,
        func: null,
        iosIcon: logInOutline,
        mdIcon: logInSharp
    },
    {
        title: 'Register',
        url: '/Register',
        component: RegisterPage,
        func: null,
        iosIcon: idCardOutline,
        mdIcon: idCardSharp
    }
];