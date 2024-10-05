import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HexagonMapComponent } from './components/hexagon-map/hexagon-map.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HexagonMapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-hexagon-test';
}
