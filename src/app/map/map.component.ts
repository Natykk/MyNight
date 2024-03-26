import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl'; // Importez mapboxgl depuis le package mapbox-gl
import { mapbox_secret } from './mapbox_secret';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  latitude: number = 0; // Initialisation avec une valeur par défaut
  longitude: number = 0; // Initialisation avec une valeur par défaut
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    mapboxgl.accessToken ='';


    mapboxgl.accessToken = mapbox_secret.mapboxAccessToken;

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40],
      zoom: 12
    });


    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    });

    map.addControl(geocoder);

    // Ajouter un marqueur pour la position de l'utilisateur
    const addUserMarker = (latitude: number, longitude: number) => {
      new mapboxgl.Marker({
        color: 'red' // couleur du marqueur
      })
      .setLngLat([longitude, latitude])
      .addTo(map);
    }

    // Fonction pour calculer la distance entre deux points géographiques en utilisant la formule de Haversine
    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const R = 6371e3; // Rayon de la Terre en mètres
      const φ1 = lat1 * Math.PI / 180; // Conversion en radians
      const φ2 = lat2 * Math.PI / 180;
      const Δφ = (lat2 - lat1) * Math.PI / 180;
      const Δλ = (lon2 - lon1) * Math.PI / 180;

      const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const distance = R * c; // Distance en mètres
      return distance;
    }

    // Mettre à jour la carte avec les lieux à proximité de l'utilisateur
    const updateMap = () => {
      const categories: string[] = [];
      document.querySelectorAll('.category-checkbox:checked').forEach((checkedCheckbox: Element) => {
        categories.push((checkedCheckbox as HTMLInputElement).value);
      });

      const maxDistance = 5000; // Distance maximale en mètres

      // Obtenir les coordonnées de l'utilisateur
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        // Construire la requête vers l'API de géocodage de Mapbox avec les coordonnées de l'utilisateur
        categories.forEach((category) => {
          const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + category + '.json?proximity=' + longitude + ',' + latitude + '&access_token=' + mapboxgl.accessToken;

          // Effectuer la requête
          fetch(url)
            .then(response => response.json())
            .then(data => {
              data.features.forEach((feature: any) => {
                const coordinates = feature.geometry.coordinates;
                const name = feature.text;

                // Calculer la distance entre le lieu et l'utilisateur
                const distance = calculateDistance(latitude, longitude, coordinates[1], coordinates[0]);

                // Si la distance est inférieure ou égale à la distance maximale, afficher le lieu
                if (distance <= maxDistance) {
                  // Ajouter un marqueur pour chaque lieu trouvé
                  new mapboxgl.Marker()
                    .setLngLat(coordinates)
                    .setPopup(new mapboxgl.Popup().setHTML('<h3>' + name + '</h3>'))
                    .addTo(map);
                }
              });
            });
        });

        // Ajouter le marqueur de l'utilisateur
        addUserMarker(latitude, longitude);
      }, (error) => {
        console.error('Erreur lors de la récupération de la position de l\'utilisateur : ', error);
      });
    }

    // Écouter les événements de changement sur les cases à cocher
    document.querySelectorAll('.category-checkbox').forEach((checkbox: Element) => {
      checkbox.addEventListener('change', () => {
        // Effacer les marqueurs existants sur la carte
        document.querySelectorAll('.mapboxgl-marker').forEach((marker) => {
          marker.remove();
        });
        // Mettre à jour les lieux affichés sur la carte lorsque les cases à cocher sont cochées ou décochées
        updateMap();
      });
    });

    // Centrer la carte sur la position de l'utilisateur
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

        // Centrer la carte sur la position de l'utilisateur
        map.setCenter([this.longitude, this.latitude]);
        // Ajouter un marqueur pour la position de l'utilisateur
        addUserMarker(this.latitude, this.longitude);
        // Mettre à jour les lieux affichés sur la carte au chargement de la page
        updateMap();
      });
    } else {
      alert("La géolocalisation n'est pas prise en charge par votre navigateur.");
    }
  }
}
