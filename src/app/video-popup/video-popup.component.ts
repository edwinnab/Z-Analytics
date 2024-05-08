import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-video-popup',
  standalone: true,
  imports: [ MatDialogModule ],
  templateUrl: './video-popup.component.html',
  styleUrl: './video-popup.component.css'
})
export class VideoPopupComponent {

}
