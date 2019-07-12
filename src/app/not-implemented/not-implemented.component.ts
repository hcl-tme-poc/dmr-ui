import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-not-implemented',
  templateUrl: './not-implemented.component.html',
  styleUrls: ['./not-implemented.component.css']
})
export class NotImplementedComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

}
