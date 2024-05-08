import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { ChartService } from '../services/chart.service';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive, RouterOutlet, NavbarComponent, NgFor],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  data: any;
  

  constructor(private chartService: ChartService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.chartService.fetchFormsData().subscribe((data) => {
      this.data = data
    },

    (error) => {
      console.log('Error fetching data:', error)
    }
    ) 
  }

}
