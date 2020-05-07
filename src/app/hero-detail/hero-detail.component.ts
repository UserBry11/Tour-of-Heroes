import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.sass']
})
export class HeroDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, // Contains instance of DetailComponent. So the parameters like {{id}}
    private heroService: HeroService,  // gets hero data from remote server
    private location: Location, // interacts with browser
  ) { }

// Input decorator allows data to flow into sub-component. Think API for parent component
  @Input() hero: Hero;
  ngOnInit(): void {
    this.getHero();
  }
  
  getHero(): void {
    // snapshot is static image of route
    // paramMap is a dictionary of route paramter values extracted from URL.
    const id = +this.route.snapshot.paramMap.get('id');
    // + operator converts the route STRING paramter to a number
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }
  
  save(): void {
    this.heroService.updateHero(this.hero)
        .subscribe( () => this.goBack() );
  }

}
