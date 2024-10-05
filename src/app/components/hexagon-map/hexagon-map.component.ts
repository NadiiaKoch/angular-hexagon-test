import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import proj4 from 'proj4';
import { geoToH3, h3ToGeoBoundary } from 'h3-js';
import { GeoJsonService } from '../../services/geojson.service';

@Component({
  selector: 'app-hexagon-map',
  standalone: true,
  templateUrl: './hexagon-map.component.html',
  styleUrls: ['./hexagon-map.component.scss'],
})
export class HexagonMapComponent implements OnInit {
  private map!: L.Map;
  private zoomLevel: number = 2;

  constructor(private geoJsonService: GeoJsonService) {}

  ngOnInit(): void {
    this.initMap();
    this.geoJsonService.getData().subscribe((data) => {
      this.createHexagonsFromData(data);
      this.setMapBounds(data);
    });

    this.map.on('zoomend', () => {
      this.zoomLevel = this.map.getZoom();
      this.redrawHexagons();
    });
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [50, 30],
      zoom: this.zoomLevel,
      minZoom: 3,
      maxZoom: 18,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }

  private convertToLatLng(coord: number[]): [number, number] {
    const EPSG3857 = 'EPSG:3857';
    const EPSG4326 = 'EPSG:4326';
    const [lng, lat] = proj4(EPSG3857, EPSG4326, coord);
    return [lat, lng];
  }

  private createHexagonsFromData(features: any): void {
    const bounds = this.map.getBounds();

    features.features.forEach((feature: any) => {
      const polygons = feature.geometry.coordinates;
      polygons.forEach((polygon: any) => {
        polygon.forEach((coordSet: any) => {
          const coord = this.convertToLatLng(coordSet[0]);

          if (bounds.contains([coord[0], coord[1]])) {
            const h3Index = geoToH3(coord[0], coord[1], this.getH3Resolution());
            const boundaries = h3ToGeoBoundary(h3Index);

            const hexPolygon = L.polygon(
              boundaries.map((boundary) => [boundary[0], boundary[1]]),
              {
                color: `#${feature.properties.COLOR_HEX}`,
                fillOpacity: 0.1,
                opacity: 0.5,
                weight: 1,
              }
            );

            hexPolygon.addTo(this.map);
          }
        });
      });
    });
  }

  private getH3Resolution(): number {
    if (this.zoomLevel <= 5) {
      return 4;
    } else if (this.zoomLevel <= 10) {
      return 5;
    } else {
      return 6;
    }
  }

  private redrawHexagons(): void {
    this.map.eachLayer((layer) => {
      if (layer instanceof L.Polygon) {
        this.map.removeLayer(layer);
      }
    });

    this.geoJsonService.getData().subscribe((data) => {
      this.createHexagonsFromData(data);
    });
  }

  private setMapBounds(features: any): void {
    const bounds = L.latLngBounds([]);

    features.features.forEach((feature: any) => {
      const polygons = feature.geometry.coordinates;
      polygons.forEach((polygon: any) => {
        polygon.forEach((coordSet: any) => {
          const coord = this.convertToLatLng(coordSet[0]);
          bounds.extend(coord);
        });
      });
    });

    this.map.fitBounds(bounds);
  }
}
