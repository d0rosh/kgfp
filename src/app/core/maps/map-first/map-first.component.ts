import { Component, ElementRef, NgZone, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { google } from "google-maps";

declare var google: google;


import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-map-first',
  templateUrl: './map-first.component.html',
  styleUrls: ['./map-first.component.scss']
})
export class MapFirstComponent implements OnInit, AfterViewInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public place: google.maps.places.PlaceResult;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit() {

    this.zoom = 10;
    this.latitude = 49.83826;
    this.longitude = 24.02324;

    this.searchControl = new FormControl();

    this.setCurrentPosition();

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {

          this.place = autocomplete.getPlace();

          if (this.place.geometry === undefined || this.place.geometry === null) {
            return;
          }

          // this.latitude = this.place.geometry.location.lat();
          // this.longitude = this.place.geometry.location.lng();
          // this.zoom = 12;
        });
      });
    });
  }

  onClick(){
    this.latitude = this.place.geometry.location.lat();
    this.longitude = this.place.geometry.location.lng();
    this.zoom = 10;
  }

  ngAfterViewInit(): void {
    fromEvent(this.searchElementRef.nativeElement, 'keyup')
       .pipe(filter(({code})=> code == 'Enter'))
       .subscribe(
          (data)=>{

            this.latitude = this.place.geometry.location.lat();
            this.longitude = this.place.geometry.location.lng();
            this.zoom = 10;
          },
          (err)=>console.log(err)
        )
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 10;
      });
    }
  }
}
