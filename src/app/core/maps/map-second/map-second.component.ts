import { Component, ElementRef,  OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MapsService } from '../maps.service';
import { google } from "google-maps";
import { MatSnackBar } from '@angular/material';

declare var google: google;

@Component({
  selector: 'app-map-second',
  templateUrl: './map-second.component.html',
  styleUrls: ['./map-second.component.scss']
})
export class MapSecondComponent implements OnInit {

  codes: string[] = [];
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public place: google.maps.places.PlaceResult;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private maps: MapsService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.searchControl = new FormControl();
    this.zoom = 10;
    this.latitude = 49.83826;
    this.longitude = 24.02324;

    this.searchControl
      .valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(search => {
          this.codes = [];
          return this.maps.getPostCodesAutocomplete(search)
        })
      ).subscribe(
        res => {
          if (typeof res == 'string') {
            this.codes.push(res)
          } else if (res.latitude && res.longitude) {
            this.latitude = res.latitude;
            this.longitude = res.longitude;
          }else {
            this.snackBar.open('Code not found!', 'Close', {
              duration: 2000,
              panelClass: 'red-snackbar'
            })
          }
        },
        err => console.log(err)
      )

    
  }
}
