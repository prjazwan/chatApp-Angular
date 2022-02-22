import { TokenService } from './../services/token.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StreamsRoutingModule } from './streams-routing.module';
import { StreamsComponent } from '../components/streams/streams.component';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { SideComponent } from '../components/side/side.component';
import { PostFormComponent } from '../components/post-form/post-form.component';
import { PostComponent } from '../components/post/post.component';
import { TopStreamsComponent } from '../components/top-streams/top-streams.component';
import { PostService } from '../services/post.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentsComponent } from '../components/comments/comments.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    StreamsComponent,
    ToolbarComponent,
    SideComponent,
    PostFormComponent,
    PostComponent,
    TopStreamsComponent,
    CommentsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    StreamsRoutingModule,
  ],
  exports: [StreamsComponent, ToolbarComponent],
  providers: [TokenService, PostService],
})
export class StreamsModule {}
