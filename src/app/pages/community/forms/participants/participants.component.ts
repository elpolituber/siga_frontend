import { Component, OnInit } from '@angular/core';
import { Authorities } from 'src/app/models/community/tables/authorities';
import { Teacher } from 'src/app/models/ignug/teacher';
import { Student } from 'src/app/models/ignug/student';
import { Participant } from '../../../../models/community/participant';
import { Project } from '../../../../models/community/project'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {combo} from '../../../../models/community/tables/combo';
import { Router } from '@angular/router';
import { CommunityService } from '../../../../services/community/community.service';
import { User } from 'src/app/models/auth/user';
import {MessageService} from 'primeng/api';
import {Role} from '../../../../models/auth/role';


@Component({
  selector: 'app-participantes', 
  templateUrl: './participants.component.html',
  providers: [MessageService]
})
export class ParticipantsComponent implements OnInit {
  // Api
  projects:Project;
  authority:Authorities;

  //VARIABLES FORM CONTROL
  participant: FormGroup;
  authorities: FormGroup;
  users:User; 
  userlist:User[];
  // Variable de autobusqueda
  results: string[]; 
  type:combo[];
  type1:combo[];
  role:any;
  //TABLA
  participating_teacher: Participant[];
  participating_student: Participant[];

  //url
  url:any=this.router.parseUrl(this.router.url).root.children.primary.segments;
  

  //Display
  display:boolean;
  display_cu:boolean;
  display_di:boolean;
  display_A:boolean;
  display_aCu:boolean;
  display_rol:boolean=false;
  rol:any={id:1, 
        name:'coordinador de vincualacion', 
        code:"COMMUNITY_COORDINA"};

  constructor(private formBuilder: FormBuilder,
    private communityService: CommunityService,
              private router:Router,
              private messageService: MessageService) {
    
    // this.rol={id:1, name:'coordinador de vincualacion', code""};
    // this.rol={id:1, name:'coordinador de vincualacion', code""};
  
  }

  ngOnInit(): void {
    this.filter(); 
    this.searchUser();
    this.getParticipants();
    this.getAuthorities();
    this.buildForm();
  }

  private buildForm() {
    this.participant = this.formBuilder.group({
      user: ['', [Validators.required]],
      position: ['Posicion de estudiante', [Validators.required]],//para el estudiante
      working_hours: ['160',[Validators.required]],//para el profesor 
      function: [''], //tutor /coordinador funtion_vinculacion FUNTION_1/2//para el profesor 
      type:[true], //true = profesores /false= estudiantes cargo_vincualcion CARGO_6/7
      participats:[''],
      project_id:[''],
      tabPanel:['fifth'],
      id_participant:['']
    });
    this.authorities=this.formBuilder.group({
      user:['',Validators.required],
      type:['',Validators.required],
      id:['']
    });
  }
  getParticipants(){
    this.communityService.get('project/'+this.url[2].path).subscribe(
      (response:Project) => {
          this.projects=response;
          let student=[];
          let teacher=[];

          for(let con=0;con<=this.projects.participant.length-1; con++){
            if(this.projects.participant[con].type.code=='CARGO_6'){
              student.push(this.projects.participant[con]);
            }
            if(this.projects.participant[con].type.code=='CARGO_7'){
              teacher.push(this.projects.participant[con]);
            }
          }
          this.participant.patchValue({
            project_id:this.projects.id
          });
          delete this.participating_teacher;
          delete this.participating_student;
          this.participating_teacher=teacher;
          this.participating_student=student;    
      });

  }
  getAuthorities(){
    this.communityService.get('authority').subscribe(
      (response) => {
        this.authority=response;
    });

  }
searchUser(){
   this.communityService.get("user").subscribe(
    response => {
      console.log("llego al usuario")
      this.users = response; 
     console.log(this.users);            
        
    },
    error => {
        console.log(error);
    });
}
filter(){
  this.communityService.get("combo").subscribe(
    response => {
      let res=response['teacher_funtion'];
      let resp=response;
      this.type = res;
      this.participant.patchValue({
        function:this.type[0], 
      });
      let re=[
        resp['cargo'][0],
        resp['cargo'][1],
        resp['cargo'][2],
        resp['cargo'][3],
        ];
      this.type1=re
      console.log(response);            
    },
    error => {
        console.log(error);
    });

}
  search(event){
    
    // console.log('values',event.query);
    let userslist=this.searchFilter(event.query); 
    this.userlist=userslist;
    console.log(this.userlist);
  }

  searchFilter(keyword:string){
    return this.users.filter(item =>{
      //console.log(item.email.toLowerCase().includes(keyword.toLowerCase()));
      return item.email.toLowerCase().includes(keyword.toLowerCase());
    });
  }
  reset(){
    this.participant.patchValue({
      user: '',
      position:"Posicion de estudiante",
      working_hours: 160,
      function: '',
      type:true, 
      participats:'',
      id_participant:''
    });

  }
  
  updateParticipants(participants,result){
    this.display_di=result;
    this.reset();
    this.participant.patchValue({
        type:result, 
      });
    if(participants!='create'){
      this.display_cu=true;
      this.participant.patchValue({
        id_participant:participants.id,
        user: participants.user.email,
        position: participants.position,
        working_hours: participants.working_hours, 
        function: participants.function ,  
      });
    }else{
      this.display_cu=false;
    }
    this.display=true;
  }
  updateAuthorities(authorities){
    this.display_A=true;
    if(authorities!='create'){
      this.display_aCu=true;
      this.authorities.patchValue({
          user:authorities.user.email,
          type:authorities.type,
          id:authorities.id
      });
    }else{
      this.display_aCu=false;
    }
  }
  createParticipant(){
   let formulario=this.participant.value;
    // console.log(formulario); 
    let url=formulario.type==true? "teacher": "student";
    this.communityService.post(url,formulario).subscribe(
     ( response: any) => {
        this.getParticipants();
    }, error => {
            console.log(error);
        });
    this.vCRUD('create');
  }
  updateParticipant(){ 
    let formulario=this.participant.value;
    let url=formulario.type==true? "teacher": "student";
   // const url=urlT;
    this.communityService.put(url,formulario).subscribe(
     ( response: any) => {
        this.getParticipants();
    }, error => {
            console.log(error);
        });
    this.vCRUD('update');
  }
  deleteParticipants(participants){
    this.communityService.delete('participant/'+participants.id).subscribe(
      (response) => {
        this.getParticipants();
    }, error => {
            console.log(error.error);
        });
    this.vCRUD('delete');
  }
  create(){
    let formulario=this.authorities.value;
    console.log(formulario);
    this.communityService.post('authority',formulario).subscribe(
      (response) => {
       console.log(response);
        
        delete this.authority;
        this.authority=response;
    }, error => {
        console.log(error.error);
      });
    this.vCRUD('create');
  }
  update(){
    let formulario=this.authorities.value;
    this.communityService.put('authority',formulario).subscribe(
      (response) => {
        delete this.authority;
        this.authority=response;
    }, error => {
        console.log(error.error);
      });
    this.vCRUD('update');
  }
  delete(authorities){
    console.log(authorities);
    this.communityService.delete('authority/'+authorities.id).subscribe(
      (response) => {
        delete this.authority;
        this.authority=response;
    }, error => {
        console.log(error.error);
      });
    this.vCRUD('delete');
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
        this.messageService.add({severity:'success', 
            summary: 'Eliminado', 
        detail: 'Se a eliminado su contenido'    
        });
    }
     
  }
  rolcontrol(){
    if(this.rol.code=="COMMUNITY_COORDINATOR"){
     this.display_rol 
    }
  }
}
