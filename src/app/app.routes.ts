import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EssentialsComponent } from './components/essentials/essentials.component';
import { OffersComponent } from './components/offers/offers.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { GamesComponent } from './components/games/games.component';

export const routes: Routes = [
  {
    path: '',
    component: EssentialsComponent
  },
  {
    path: 'ofertas',
    component: OffersComponent
  },
  {
    path: 'categorias',
    component: CategoriesComponent
  },
  {
    path: 'juegos',
    component: GamesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
