import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { CommunityService } from '../../../../services/community/community.service';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/community/project';
import {Role} from '../../../../models/auth/role';


@Component({
  selector: 'app-observaciones',
  templateUrl: './observations.component.html',
})
export class ObservationsComponent implements OnInit {

  projects: Project;
  text: string = 'text';
  url:any=this.router.parseUrl(this.router.url).root.children.primary.segments;
  //VARIABLES FORM CONTROL
  form: FormGroup;

  rol = 'coordinador';
  //rol = 'docente';
  items:any=[];
  //display
  observacionEditable: boolean;
  //display private formBuilder: FormBuilder,
    display_status:boolean=false;

  constructor(private formBuilder: FormBuilder,
    private router:Router
      ) {
    this.buildForm();
    this.get();
   }

  ngOnInit(): void {
     this.statusGenerate();

  }

  private buildForm() {
    this.form = this.formBuilder.group({
      observaciones: ['',Validators.required],
      id:[''],
      status:['']
    });
  }

  statusGenerate(){
      this.items = [
        // {label: 'Pendiente', icon: 'pi pi-refresh', command: () => {
        //     this.update("STATUS_2");
        //   }
        // },
        {label: 'Recticar', command: () => {
          this.dialog();
          }
        },
        {label: 'Aprobado', command: () => {
          this.statusA("STATUS_5");
          }
        },
        {label: 'Corregido', command: () => {
          this.statusA("STATUS_4");
          }
        },
        {label: 'Culminado', command: () => {
          this.statusA("STATUS_6");
          }
        },        
      ];
    }
    statusA(code:any){
      
    }
    statusR(code:any){
      // console.log(this.observation); 
     
    }
    dialog(){
      this.display_status=true;
    }
    get(){
      let val=this.url[2];
        // if(this.url.length ==3 ){ 
        // this.communityService.get('project/'+val).subscribe(
        //     response => {
        //         delete this.projects;
        //         this.projects=response;
        //     },
        //     error => {
        //         console.log(error);
        //     });
        // }else{
        //     //console.log("no es para actualizar",this.form.value);
        // }
            // console.log(this.projects);

    }
}
