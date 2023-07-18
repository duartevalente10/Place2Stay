import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rent-page',
  templateUrl: './rent-page.page.html',
  styleUrls: ['./rent-page.page.scss'],
})
export class RentPagePage implements OnInit {

  description: string = '<p>The guest room is a chamber roughly the length and width of a single bed, with sufficient height for a hotel guest to crawl in and sit up on the bed.</p> <p>The chamber walls may be made of wood, metal or any rigid material, but are often fibreglass or plastic.</p> <p>Amenities within the room generally include a small television, air conditioning, an electronic console, and power sockets.</p> <p>The capsules are stacked side-by-side, two units high, with steps or ladders providing access to the second level rooms, similar to bunk beds.</p> <p>The open end of the capsule can be closed with a curtain or a solid door for privacy, but can be locked from the inside only.</p>';
  showDescription: boolean = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  toggleDescription() {
    this.showDescription = !this.showDescription;
  }

  goToHomePage(){
    this.router.navigateByUrl('/home',{replaceUrl: true});
  }
}
