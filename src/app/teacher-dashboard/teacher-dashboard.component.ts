import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ChartService } from '../services/chart.service';
import { NgFor } from '@angular/common';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [NavbarComponent, RouterLink, RouterOutlet, RouterLinkActive, NgFor],
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.css'
})


export class TeacherDashboardComponent {
  chart: any = []
  students: any;
  subject: any;
  name: any
  marks: any

  
  getRandomColor() {
  // Generate a random color code
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
  }

  constructor(private service: ChartService) {}

  ngOnInit(): void {
    this.service.fetchStudentList().subscribe(
      (res) => {
        this.students = res;
        this.calculateMeanMetrics()
        //Dataset interface
        interface Dataset {
          label: string;
          data: (number | null)[];
          fill: boolean;
          borderColor: string;
          tension: number;
        }
        //unique subjects from all students
        const subjectsSet = new Set<string>();
        this.students.forEach((student: any) => {
          student.subjects.forEach((subject: any) => {
            subjectsSet.add(subject.name);
          });
        });
        const subjects = Array.from(subjectsSet);
        //datasets for each student
        const datasets: Dataset[] = [];

        this.students.forEach((student: any) => {
          const data = subjects.map((subject) => {
            const subjectData = student.subjects.find((s: any) => s.name === subject);
            return subjectData ? subjectData.marks : null;
          });

          console.log(data)

          datasets.push({
            label: student.name,
            data: data,
            fill: false,
            borderColor: this.getRandomColor(),
            tension: 0.1,
          });
        });

        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: subjects,
            datasets: datasets,
          },
        });
      },
      (error) => {
        console.log('Error fetching students:', error);
      }
    );
  }

  calculateMeanMetrics(): void {
    if (this.students && this.students.length > 0) {
      this.students.forEach((student: any) => {
        const subjects = student.subjects;
        const totalSubjects = subjects.length;
        let totalMarks = 0;
        let totalPoints = 0;

        subjects.forEach((subject: any) => {
          totalMarks += subject.marks;
          switch (subject.grade) {
            case 'A':
              totalPoints += 12;
              break;
            case 'A-':
              totalPoints += 11;
              break;
            case 'B+':
              totalPoints += 10;
              break;
            case 'B':
              totalPoints += 9;
              break;
          }
        });

        
        const meanPoints = Math.round(totalPoints / totalSubjects);
        const grade = this.getGradeFromPoints(meanPoints);

        student.meanPoints = meanPoints;
        student.grade = grade;
      });
    }
  }

  getGradeFromPoints(meanPoints: number): string {
    if (meanPoints >= 12) {
      return 'A';
    } else if (meanPoints >= 11) {
      return 'A-';
    } else if (meanPoints >= 10) {
      return 'B+';
    } else {
      return 'B';
    }
  }
}

