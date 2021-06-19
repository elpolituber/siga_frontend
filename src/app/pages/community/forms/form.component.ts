import { ThisReceiver } from '@angular/compiler';
import {Component, OnInit} from '@angular/core';
import {ProjectInfoComponent} from './project-Info/project-info.component';
import { CommunityService } from '../../../services/community/community.service';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/community/project';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
    selector: 'app-vinculacion-forms',
    templateUrl: './form.component.html',
})
export class FormsComponent implements OnInit {
    //url
    projects: Project;
    text: string = 'text';
    url:any=this.router.parseUrl(this.router.url).root.children.primary.segments;
    
    constructor(private router:Router,
      
      private communityService: CommunityService
      ) {
        
    }
    
    ngOnInit() {
      this.check();
    }
    
    // get(){
    //   let val=this.url[2];
    //     if(this.url.length ==3){ 
    //     this.communityService.get('project/'+val).subscribe(
    //         response => {
    //             delete this.projects;
    //             this.projects=response;
    //             this.title=this.projects.title;
    //             this.status=this.projects.status.code;
    //             this.start_date=this.projects.start_date;
    //             this.end_date=this.projects.end_date;
    //             this.delivery_date=this.projects.delivery_date
    //         },
    //         error => {
    //             console.log(error);
    //         });
    //     }else{
    //         //console.log("no es para actualizar",this.form.value);
    //     }
    //         // console.log(this.projects);

    // }
    check(){
      if(this.url.length ==3 ){
        // this.get();
        return true;
      }else{
        return false;
      }
    }
}
