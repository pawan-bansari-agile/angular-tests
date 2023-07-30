import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userDetails: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get the user details from query parameters
    this.route.queryParams.subscribe((params) => {
      this.userDetails = params;
    });
  }
}
