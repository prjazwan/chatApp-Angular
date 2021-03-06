import { TokenService } from './../../services/token.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.css']
})
export class StreamsComponent implements OnInit {
  token: string;

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    this.token = this.tokenService.GetToken();
    // console.log(this.token)
  }


}
