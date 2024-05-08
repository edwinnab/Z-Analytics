import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { VideoPopupComponent } from '../video-popup/video-popup.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  constructor(private dialog: MatDialog) {}

  openVideoPopup() {
    this.dialog.open(VideoPopupComponent, {
      width: 'auto', 
      height: 'auto'
    });
  }
}
