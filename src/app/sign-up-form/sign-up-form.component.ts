import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { User } from '../../user.model';
import { ChartService } from '../services/chart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up-form',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, NavbarComponent, FormsModule],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.css'
})
export class SignUpFormComponent {
  users: User[] = []
  user = new User('', '', '')

  constructor(private service:ChartService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
  addUser() {
    this.service.handleSubmit(this.user).subscribe(data => {
      console.log(data)
    },
    (error) => {
      console.log('Error fetching students:', error);
    }
  )}
}
