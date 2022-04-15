import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPage } from './user.page';

const routes: Routes = [
  {
    path: '',
    component: UserPage,
    children:[
      { path: '', 
      redirectTo:'game', 
      pathMatch:'full'},
      {
        path: 'game',
        children: [
          {
            path: '',
            loadChildren: () => import('./game/game.module').then( m => m.GamePageModule)
          }
        ]
      },
      {
        path: 'platform',
        children:[
            {
              path: '',
                loadChildren: () => import('./platform/platform.module').then( m => m.PlatformPageModule)
              }
        ]
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPageRoutingModule {}
