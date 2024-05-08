import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ChartService } from '../services/chart.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-performance-analytics',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './performance-analytics.component.html',
  styleUrl: './performance-analytics.component.css'
})
export class PerformanceAnalyticsComponent {
  title = 'general-analytics'
  chart: any = []
  data: any;
  class: any;
  meanGrade: any;
  meanMark: any;
  meanPoints: any;
  students: any;


  constructor(private chartService: ChartService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.chartService.fetchFormsData().subscribe((data) => {
      this.data = data
      console.log(this.data)
      this.class = this.data.map((item: any) => item.class)
      this.meanGrade = this.data.map((item: any) => item.mean_grade)
      this.meanMark = this.data.map((item: any) => item.mean_mark)
      this.meanPoints = this.data.map((item: any) => item.mean_points)
      this.students = this.data.map((item: any) => item.total_students)

      //map the fetched data on the chart 
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.class,
          datasets: [
            {
              label: 'Annual MeanMark Per Class',
              data: this.meanMark,
              fill: false,
              borderColor: 'rgb(151, 248, 6)',
              tension: 0.1
            },
            {
              label: 'Annual MeanPoints Per Class',
              data: this.meanPoints,
              fill: false,
              borderColor: 'rgb(8, 18, 109)',
              tension: 0.1
            }
          ],
        }
      });
    },
    (error) => {
      console.log('Error fetching data:', error)
    }
    ) 
  }

}
