import { Component, OnInit } from '@angular/core';
import { MenuItem, SelectItem } from 'primeng/api';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ObjetivoEspecifico } from 'src/app/models/community/tables/objentivosEspecifivos';
import { combo } from 'src/app/models/community/tables/combo';
import { CommunityService } from '../../../../services/community/community.service';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/community/project';
import {MessageService} from 'primeng/api';


@Component({
  selector: 'app-contextualizacion',
  templateUrl: './contextualization.component.html',
  providers: [MessageService]
})
export class ContextualizationComponent implements OnInit {
  //
  filtered: SelectItem[];
  //VARIABLES FORM CONTROL
  form: FormGroup; 
  object:FormGroup;

  //STEPS 
  itemsContex: MenuItem[];
  activeIndexContex: Number;

  //TABLA
  tablaObjetivos: any[];
  objetivos: ObjetivoEspecifico[] = [];
  objetivo: ObjetivoEspecifico;

  //url
  url:any=this.router.parseUrl(this.router.url).root.children.primary.segments;
  urlcombo = 'combo';
  //api 
  projects: Project;
  objetives:any;
  objetive: combo;
  objetiveSelect:combo;

  //boolean
  botton_display:boolean;
  display_objetive: boolean;
  display_cu:boolean;
  display_btnD:boolean;

  constructor(private formBuilder: FormBuilder,
              private communityService: CommunityService,
              private router:Router,
              private messageService: MessageService){ 
     this.filterObjetives();
  }

  ngOnInit(): void {
    this.buildForm();
    this.steps();
    this.verificationUpload();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      introduccion: ['',Validators.required],
      fundamentacion: ['',Validators.required],
      justificaion: ['',Validators.required],
      situational_analysis:['',Validators.required],
      project_id:[''],
      tabPanel:['third'],
    });
    this.object = this.formBuilder.group({
      type:['',[Validators.required]],
      indicator: ['', [Validators.required]],
      means_verification:['', [Validators.required]],
      description:['',[Validators.required]],
      project_id:[''],
      id_objetive:[''],
      tabPanel:['aims'],
    });
  }

  steps() {
    this.activeIndexContex = 0;
    this.itemsContex = [{
      label: 'Contextualizacion general',
      command: (event: any) => {
        this.activeIndexContex = 0;
      }
    },
    {
      label: 'Objetivos',
      command: (event: any) => {
        this.activeIndexContex = 1;
      }
    },]
  }

 
  filterObjetives() {
    this.communityService.get(this.urlcombo).subscribe(
        response => {
          let res=response['objective'];
          this.objetive = res;
        //  console.log(this.objetive);            
            
        },
        error => {
            console.log(error);
        });
  }
 
  verificationUpload(){
    this.communityService.get('project/'+this.url[2].path).subscribe(
      (response:Project) => {
        delete this.objetives;
        delete this.projects; 
        this.projects= response;
        this.objetives=this.projects.objetive;
          if(this.projects.introduction != null 
            && this.projects.foundamentation != null
            && this.projects.justification != null
            && this.projects.situational_analysis != null){
              this.botton_display=true;
              this.form.patchValue({
                  introduccion: this.projects.introduction,
                  fundamentacion: this.projects.foundamentation,
                  justificaion: this.projects.justification,
                  situational_analysis:this.projects.situational_analysis,
                  actividad:this.projects.id
              });
             
              // console.log(this.botton_display); 
          }
          this.object.patchValue({
            project_id:this.projects.id
          });
          this.form.patchValue({
            project_id:this.projects.id
          }); 
      }
    )
  }
  create(){
    this.form.patchValue({
      aims:this.objetivos,
    });
   let formulario=this.form.value;
    this.communityService.post('project',formulario).subscribe(
      ( response: any) => {
       let value=response;   

      this.verificationUpload();
       }, error => {
           console.log(error.error);
       });
    this.vCRUD('create');
   }
   update(){
    let form=this.form.value;
    this.communityService.put('project',form).subscribe(
      (response:any) => {
       this.verificationUpload(); 
      },error=>{
        console.log(error);
      });

    this.vCRUD('update');
   }
   updateobjetives(objetives:any){
    this.reset();
    if(objetives == "create"){
    
    this.display_btnD=true;
  }else{
    this.object.patchValue({
      type:objetives.type,
      indicator:objetives.indicator,
      means_verification:objetives.means_verification,
      description:objetives.description,
      project_id:objetives.project_id,
      id_objetive:objetives.id,
    });
    this.display_btnD=false;
  }
    this.display_cu=true;

   }
   createObjetives(){
    let formulario=this.object.value;
    this.communityService.post('project',formulario).subscribe(
      (response:any) => {
      //this.projects=[];
      // console.log(response);
      this.verificationUpload();
      this.reset();
     }, error => {
      console.log(error.error);
      });
    this.vCRUD('create');
   }
   updatepObjetives(){
    let formulario=this.object.value;
    this.communityService.put('project',formulario).subscribe(
      (response:any) => {
      //this.projects=[];
;
      this.verificationUpload();
     }, error => {
      console.log(error.error);
      });
    this.vCRUD('update');
   }
   deleteObjetive(objetive:any){
    console.log(objetive);
    this.communityService.delete('objetive/'+objetive.id).subscribe(
      (response:any) => {
        //this.projects=[];
        //console.log(response);
        this.verificationUpload();
      }, error => {
        console.log(error.error);
        });
    this.vCRUD('delete');
   }
   reset(){
    this.object.patchValue({
      type:[''],
      indicator: [''],
      means_verification:[''],
      description:[''],
      id_objetive:['']
    });
  }
  vCRUD(type:string){
    if(type=="update"){
        this.messageService.add({severity:'success', 
            summary: 'Actualizado', 
            detail: 'Se a actuzalizado su contenido'
        });
    }
    if(type=="create"){
      this.messageService.add({severity:'info', 
        summary: 'Guardado', 
        detail: 'Se a guardado su contenido'    
      });
    }
    if(type=="delete"){
      this.messageService.add({severity:'info', 
        summary: 'Eliminado', 
        detail: 'Se a eliminado su contenido'    
      });
    }
  }
  
}
