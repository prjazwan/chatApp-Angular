import { CommentsComponent } from './../components/comments/comments.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { StreamsComponent } from '../components/streams/streams.component';
import { AuthGuard } from '../services/auth.guard';

const routes: Routes = [
  { 
    path: 'streams', 
    component: StreamsComponent, 
    canActivate: [AuthGuard] 
  }, 
  {
    path: 'post/:id', 
    component: CommentsComponent, 
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StreamsRoutingModule { }
