import { Component } from '@angular/core';
import { environment as env} from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ambiente = env.ambiente;
}
