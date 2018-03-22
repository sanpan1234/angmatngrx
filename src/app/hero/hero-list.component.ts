import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';
import { Hero } from '../models/hero-data-model';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {
  heroes: Observable<Hero[]>;
  isLoading = false;
  selectedHero: Hero;

  constructor(private heroSvc: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes() {
    this.isLoading = true;
    this.heroes = this.heroSvc.getHeroes()
      .finally(() => this.isLoading = false);
    this.selectedHero = undefined;
  }

  select(hero: Hero) {
    this.selectedHero = hero;
  }
}
