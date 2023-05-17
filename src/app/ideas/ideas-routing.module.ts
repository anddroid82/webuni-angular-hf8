import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListIdeasComponent } from './list-ideas/list-ideas.component';
import { NewIdeaComponent } from './new-idea/new-idea.component';
import { ideaResolver, ideaViewResolver } from './ideas.service';
import { IdeaComponent } from './idea/idea.component';

const routes: Routes = [
  {
    path:'',
    component: ListIdeasComponent
  },
  {
    path: 'new',
    resolve:{
      idea: ideaResolver
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    component: NewIdeaComponent
  },
  {
    path:':id',
    resolve: {
      idea: ideaViewResolver
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    component: IdeaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdeasRoutingModule { }
