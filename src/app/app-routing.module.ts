import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch:'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'administration',
    loadChildren: () => import('./administration/administration.module').then( m => m.AdministrationPageModule)
  },
  {
    path: 'user',
     loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'basket',
    loadChildren: () => import('./user/basket/basket.module').then( m => m.BasketPageModule)
  },
  {
    path: 'analytics',
    loadChildren: () => import('./administration/analytics/analytics.module').then( m => m.AnalyticsPageModule)
  }
  // {
  //   path: 'game',
  //   loadChildren: () => import('./user/game/game.module').then( m => m.GamePageModule)
  // },
  // {
  //   path: 'platform',
  //   loadChildren: () => import('./user/platform/platform.module').then( m => m.PlatformPageModule)
  // },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
