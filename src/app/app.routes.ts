import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EssentialsComponent } from './components/essentials/essentials.component';
import { OffersComponent } from './components/offers/offers.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { GamesComponent } from './components/games/games.component';
import { AnotherComponent } from './components/another/another.component';
import { AventureComponent } from './components/aventure/aventure.component';
import { CooperativeComponent } from './components/cooperative/cooperative.component';
import { FamiliarComponent } from './components/familiar/familiar.component';
import { SolitaireComponent } from './components/solitaire/solitaire.component';
import { StrategyComponent } from './components/strategy/strategy.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RecoverComponent } from './components/recover/recover.component';
import { ProfileComponent } from './components/profile/profile.component';

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
  },
  {
    path: 'otros',
    component: AnotherComponent
  },
  {
    path: 'aventura',
    component: AventureComponent
  },
  {
    path: 'cooperativo',
    component: CooperativeComponent
  },
  {
    path: 'familiar',
    component: FamiliarComponent
  },
  {
    path: 'solitario',
    component: SolitaireComponent
  },
  {
    path: 'estrategia',
    component: StrategyComponent
  },
  {
    path: 'carrito',
    component: CartComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: RegisterComponent
  },
  {
    path: 'recuperar',
    component: RecoverComponent
  },
  {
    path: 'perfil',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
