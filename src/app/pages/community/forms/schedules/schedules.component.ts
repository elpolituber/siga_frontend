import { BeneficiaryInstitution } from './../../../../models/community/beneficiary-institution';
import { Component, OnInit } from '@angular/core';
import { CommunityService } from '../../../../services/community/community.service';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/community/project';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-cronogramas',
  templateUrl: './schedules.component.html',
  providers: [MessageService]
})
export class SchedulesComponent implements OnInit {
  //api
  projects:Project;
  status:FormGroup;
  //file
  logo: any[] = [];
  dateBeneficiarie:any[] = [];
  schedules: any[] = []
  rol:any={id:1, 
        name:'coordinador de vincualacion', 
        code:"COMMUNITY_COORDINA"};
  // form
  url:any=this.router.parseUrl(this.router.url).root.children.primary.segments;
  urlcombo = 'combo';
  file:FormGroup;
  items:any=[];
  state:any;
  email:any;
  //Dialoges 
  display: boolean;
  display_logo:boolean=false;
  display_file:boolean=false;
  display_schedules:boolean=false;
  display_status:boolean;
  status_d:boolean=false;
  displey_rol:boolean=false;
  observatio_d:boolean;

  constructor(private formBuilder: FormBuilder,
              private communityService: CommunityService,
              private router:Router,
              private messageService: MessageService) { 
    
  }

  ngOnInit(): void {
    this.buildform();
    this.verificationUpdate();
    this.statusGenerate();
   // this.rolcontrol();
  }
  buildform(){
    this.file=this.formBuilder.group({
      file:[""],
      schedules:[''],
      logo:[''], 
     });
    this.status=this.formBuilder.group({
      status:[''],
      observation:[''],
    })
  }
  statusGenerate(){
      this.items = [
        // {label: 'Pendiente', icon: 'pi pi-refresh', command: () => {
        //     this.update("STATUS_2");
        //   }
        // },
        {label: 'Recticar', command: () => {
          this.dialog("edit");
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
      this.status.patchValue({
        status:code,
      });
      let form=this.status.value;
       this.communityService.put('status/'+this.projects.id,form).subscribe(
        response=>{ 
          delete this.projects;
          this.projects=response;
          this.status.patchValue({
            status:this.projects.status.name,
            observation:this.projects.observations,
          });
          this.state=this.projects.status.name;
        },error=>{
          console.log(error);
        });
       this.vCRUD('status');
    }
    statusR(){
     this.status.patchValue({
        status:'STATUS_3',
      });
      let form=this.status.value;
      console.log(form);
         
       this.communityService.put('status/'+this.projects.id,form).subscribe(
        response=>{ 
          delete this.projects;
          this.projects=response;
          this.state=this.projects.status.name;
          this.status.patchValue({
            status:this.projects.status.name,
            observation:this.projects.observations,
          });
         console.log(this.projects.observations);
          this.display_status=false;
        },error=>{
          console.log(error);
        }); 
       this.vCRUD('status');
    }
    dialog(type:any){
      this.display_status=true;       
      
      if(type=="see"){
        this.status_d=true;
      }
      if(type=="edit"){
        this.status_d=false;
      }
    }
  verificationUpdate(){
    this.communityService.get('project/'+this.url[2].path).subscribe(
      (response:Project) => {
        delete this.projects;
        this.projects=response;
        this.status.patchValue({
            status:this.projects.status.name,
            observation:this.projects.observations,
        });
        if(this.projects.document != null){
          this.file.patchValue({
            file:this.projects.document,
          });
          this.display_file=true;
        }
        if(this.projects.schedules != null
          && this.projects.schedules != undefined){
          this.file.patchValue({
            schedules:this.projects.schedules,
          });
          this.display_file=true;
        }
        if(this.projects.beneficiary_institution != null){
          this.file.patchValue({
            logo:this.projects.beneficiary_institution.logo,
          });
        }
        this.state=this.projects.status.name;
        this.email=this.projects.create_by.email;
        let logo=this.projects.beneficiary_institution.logo !=null?this.display_logo=true:this.display_logo=false
        let file=this.projects.document !=null?this.display_file=true:this.display_file=false
        let schedules=this.projects.schedules !=null?this.display_schedules=true:this.display_schedules=false
        this.file.patchValue({
          beneficiary_id:this.projects.beneficiary_institution,
          project_id:this.projects.id
        });
       // console.log(this.file.value,this.projects.beneficiary_institution);
      },error=>{
        console.log(error);
      }
      );
  }

  onUpload(event) {
    let filelogo=event.files[0];
    console.log(filelogo);
    const formData = new FormData();
    formData.append('document',filelogo);
     console.log(formData);
    this.communityService.post('schedules/'+this.projects.id,formData).subscribe(
      (response:Project) => {
        console.log('llego');
        console.log(response);
      },error=>{
        console.log(error);
      });
    this.vCRUD('update');
    // this.logo.push(filelogo);  
    // console.log(event.currentFiles[0]); 
    // console.log(event,type);

   }

   onUpload2(event){
    console.log("llego");
    let formData = new FormData();
    let filelogo=event.files[0];
      formData.append('logo', filelogo);
     let value=this.projects.beneficiary_institution.id;
     console.log(value);
    this.communityService.post('logo/'+value,formData).subscribe(
      (response) => {
        console.log(response);
      },error=>{
        console.log(error);
      });      
    this.vCRUD('update');
   }
   onUpload3(event){ 
    const formData = new FormData();
    let filelogo=event.files[0];
    formData.append('document', filelogo);
    this.communityService.post('file/'+this.projects.id,formData).subscribe(
      (response) => {
        console.log('llego');
        this.verificationUpdate();
        console.log(response);
        this.file.patchValue({
          document:'',
          type:''
        });
      },error=>{
        console.log(error);
      });
    this.vCRUD('update');
   }
  getUpload(type:string){
    let url;
    if(type=='schedules'){
      url= this.file.value.schedules;
      }  
    if(type=='file'){
      url= this.file.value.file;
      }  
    if(type=='logo'){
      url= this.file.value.logo;
      }  
    return this.communityService.getUpload(url);
  }
  vCRUD(type:string){
        if(type=="update"){
            this.messageService.add({severity:'custom', 
                summary: 'Actualizado', 
                detail: 'Se a actuzalizado su archivo'
            });
        }
        if(type=="status"){
            this.messageService.add({severity:'custom', 
                summary: 'Actualizado', 
                detail: 'Se a actuzalizado el estado del proyecto'
            });
        }
    }
  rolcontrol(){
    if(this.rol.code=="COMMUNITY_COORDINATOR"){
        
        this.displey_rol=true;
    }
  }

}
