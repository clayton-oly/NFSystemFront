import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotaFiscalListComponent } from "./notas/nota-fiscal-list/nota-fiscal-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NotaFiscalListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'nf-system-frontend';
}
