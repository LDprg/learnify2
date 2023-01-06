import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'folder/:id',
        loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
    },
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
    },
    {
        path: 'register',
        loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
    },
    {
        path: 'learn',
        loadChildren: () => import('./learn/learn.module').then(m => m.LearnPageModule)
    },
    {
        path: 'sets',
        loadChildren: () => import('./sets/sets.module').then(m => m.SetsPageModule)
    },
    {
        path: 'set/:id',
        loadChildren: () => import('./set/set.module').then(m => m.SetPageModule)
    },
    {
        path: 'learning/:id/:starred',
        loadChildren: () => import('./learning/learning.module').then(m => m.LearningPageModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
