import { FormBuilder } from '@angular/forms';
import { TokenService } from './../../services/token.service';
import { PostService } from 'src/app/services/post.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { io } from 'socket.io-client';
import _ from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  socket: any;
  user: any;
  posts: any = [];

  constructor(
    private postService: PostService,
    private tokenService: TokenService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit(): void {
    this.user = this.tokenService.GetPayload().data;
    // console.log(this.user);
    this.AllPosts();

    this.socket.on('refreshPage', (data: any) => {
      this.AllPosts();
    });
  }

  AllPosts() {
    this.postService.getAllPosts().subscribe((data) => {
      this.posts = data.posts;
      console.log(this.posts);
    }, err => {
      if (err.error.token === null) {
        this.tokenService.DeleteToken();
        this.router.navigate(['']);
      }
    });
  }

  LikePost(id) {
    this.postService.addLike(id).subscribe(
      (data) => {
        this.socket.emit('refresh', {});
      },
      (err) => console.log(err)
    );
  }

  CheckInLikesArray(arr, username) {
    return _.some(arr, { username: username });
  }

  TimeFromNow(time: any) {
    return moment(time).fromNow();
  }

  OpenCommentBox(post) {
    // console.log(post);
    this.router.navigate(['post', post._id]);
  }
}
