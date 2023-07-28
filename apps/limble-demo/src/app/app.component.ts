import { Component } from '@angular/core';
import { CommentsListComponent } from '@limble-demo/limble-demo/feature/comments';

@Component({
  standalone: true,
  imports: [CommentsListComponent],
  selector: 'limble-demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
