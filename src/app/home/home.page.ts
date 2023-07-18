import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { AvatarService } from '../services/avatar.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  //public style = 'mapbox://styles/mapbox/streets-v11';
  public style = 'mapbox://styles/duartevalente/clk0bg37g001301pg0u2yao30';
  public map: any;
  profile: { imageUrl?: string } | undefined;


  public geojson = {
    'type': 'FeatureCollection',
    'features': [
      {
        'type': 'Feature',
        'properties': {
          'message': 'Foo',
          'iconSize': [70, 70]
        },
        'geometry': {
          'type': 'Point',
          'lng': [-9.109396],
          'lat': [38.755971]
        }
      },
      {
        'type': 'Feature',
        'properties': {
          'message': 'Bar',
          'iconSize': [70, 70]
        },
        'geometry': {
          'type': 'Point',
          'lng': [-9.124684],
          'lat': [38.751419]
        }
      },
      {
        'type': 'Feature',
        'properties': {
          'message': 'Baz',
          'iconSize': [70, 70]
        },
        'geometry': {
          'type': 'Point',
          'lng': [-9.113862],
          'lat': [38.746332]
        }
      }
    ]
  };

  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private avatarService: AvatarService,
  ) {
    (mapboxgl as typeof mapboxgl).accessToken = environment.MAPPBOX_KEY;
    this.avatarService.getUserProfile().subscribe((data) => {
      this.profile = data;
    })
  }

  ngOnInit() {
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map-box',
      style: this.style,
      zoom: 13,
      center: [
        -9.115683,
        38.750060
      ]
    });
    this.addMarker();
    this.addGeoLoc();
  }

  addMarker() {
    // Add markers to the map.
    for (const marker of this.geojson.features) {
      // Create a DOM element for each marker.
      const el = document.createElement('div');
      const width = marker.properties.iconSize[0];
      const height = marker.properties.iconSize[1];
      el.className = 'marker';
      el.style.backgroundImage = `url(https://media.discordapp.net/attachments/1036449115149697044/1129084320515112960/637be1f03aefc2bec247b667_map-marker.png?width=${width}&height=${height})`;
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      el.style.backgroundSize = '100%';

      el.addEventListener('click', () => {
        this.router.navigateByUrl('/rent-page', { replaceUrl: true });
      });

      // Add markers to the map.
      new mapboxgl.Marker(el)
        .setLngLat([marker.geometry.lng[0], marker.geometry.lat[0]],)
        .addTo(this.map);
    }
  }

  addGeoLoc() {
    // Add geolocate control to the map.
    var geoButton = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true
    })
    this.map.addControl(geoButton, 'bottom-right');
  }

  ionViewWillEnter() {
    if (!this.map) {
      this.buildMap();
    }
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  async changeImage(){
    const image = await Camera.getPhoto({
      quality:90,
      allowEditing: false,
      resultType:CameraResultType.Base64,
      source: CameraSource.Photos,
    });
    console.log(image);
  
    if(image){
      const loading = await this.loadingController.create();
      await loading.present();
  
      const result = await this.avatarService.uploadImage(image);
      loading.dismiss();
  
      if(!result){
        const alert = await this.alertController.create({
          header: 'Upload failed',
          message: 'There was a problem uploading your avatar.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }
  
}
