import { ThisReceiver } from '@angular/compiler';
import {Component, OnInit} from '@angular/core';
import {ProjectInfoComponent} from './project-Info/project-info.component';
import { CommunityService } from '../../../services/community/community.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-vinculacion-forms',
    templateUrl: './form.component.html',
})
export class FormsComponent implements OnInit {
    
    text: string = 'text';
    url:any=this.router.parseUrl(this.router.url).root.children.primary.segments;
    evalue:boolean=false;
    // tiene que venir con informacion de observaciones
    
    
    constructor(private router:Router) {
    }
    
    ngOnInit() {
      //  console.log(document.location.href);
    }

    generate(){
        console.log("generate");
        this.evalue=true;
        console.log(this.evalue);

    }
    check(){

    }
}
