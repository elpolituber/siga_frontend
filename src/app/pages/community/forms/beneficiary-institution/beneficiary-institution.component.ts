import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CoordinatorTable } from '../../../../models/community/tables/coordinator-table'
import { debounceTime } from 'rxjs/operators';
import { combo } from 'src/app/models/community/tables/combo';
import { CommunityService } from '../../../../services/community/community.service';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/community/project';
import {MessageService} from 'primeng/api';
import { flatten } from '@angular/compiler';


@Component({
  selector: 'app-institucion-beneficiaria',
  templateUrl: './beneficiary-institution.component.html',
  providers: [MessageService]
})
export class BeneficiaryInstitutionComponent implements OnInit {
  
  //api
  projects: Project;
  stakeHolders:any;
  
  //url
  url:any=this.router.parseUrl(this.router.url).root.children.primary.segments;
  urlcombo = 'combo';

  //VARIABLES FORM CONTROL
  form: FormGroup;
  holder:FormGroup;
  
  //STEPS
  items: MenuItem[];
  activeIndexitems: Number;
  funtion:combo[];
  funtionSelect:combo;
  countries: any;

  //TABLAS
  cols_coordinator: any[];
  coordinators: CoordinatorTable[] = [];
  coordinator: CoordinatorTable;

  //DIALOG
  display_holder: boolean;
  display_cu:boolean;
  botton_display:boolean=false;
  display_b:boolean;
  display_ruc:boolean=false;
  

  constructor(private formBuilder: FormBuilder,
              private communityService: CommunityService,
              private router:Router,
              private messageService: MessageService) {
    this.buildForm();
    this.filterfuntion();
   this.location();
  //  this.verificationUpload();
  }

  ngOnInit() {
    this.verificationUpload();
    this.steps();
    // this.table_coordinator();
    // console.log(this.url[2].path);
  }
  

  private buildForm() {
    this.form = this.formBuilder.group({
      nameInstitute: ['',Validators.required],
      ruc:['',Validators.required],
      location: ['',Validators.required],
      parroquia:['',Validators.required],
      address: ['',Validators.required], 
      direct_beneficiaries: ['',Validators.required],
      indirect_beneficiaries: ['',Validators.required],
      project_id:[''],
      beneficiary_id:['',],
      tabPanel:['second'],
    });
    this.holder=this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      position: ['', Validators.required],
      identification:['',Validators.required],
      type:['',Validators.required],
      tabPanel:['holders'],
      function: [''],
      id_holder:[''],
      project_id:[''],
    });
    
  }

  steps() {
    this.activeIndexitems = 0;
    this.items = [{
      label: 'Informacion general',
      command: (event: any) => {
        this.activeIndexitems = 0;
      }
    },
    {
      label: 'Informacion del coordinador',
      command: (event: any) => {
        this.activeIndexitems = 1;
      }
    },];
  }

  filterfuntion() {
    this.communityService.get(this.urlcombo).subscribe(
        response => {
          let res=response; 
          this.funtion=[res['cargo'][4],res['cargo'][7]];
          //console.log(res);               
        },
        error => {
            console.log(error);
        });
  }
  verificationUpload(){
    this.communityService.get('project/'+this.url[2].path).subscribe(
      (response:Project) => {
          delete this.stakeHolders;
          delete this.projects; 
          this.projects= response;
          this.stakeHolders=this.projects.stake_holder;
          let beneficiary=this.projects.beneficiary_institution;
          console.log(this.projects);
          this.holder.patchValue({
            project_id:this.projects.id
          });
          if(beneficiary != null || 
              beneficiary != undefined || 
              this.form.value.beneficiary_id!=''){
            this.botton_display=true;
            this.form.patchValue({
              project_id:this.projects.id,
              beneficiary_id:beneficiary.id,
              nameInstitute: beneficiary.name,
              ruc:beneficiary.ruc,
              location: beneficiary.location,
              parroquia:beneficiary.parroquia, 
              address:beneficiary.address,
              direct_beneficiaries:this.projects.direct_beneficiaries,
              indirect_beneficiaries:this.projects.indirect_beneficiaries,
            });
           // console.log(this.botton_display);

          this.display_ruc=true;
          } 
          
      }
    )
  }
  location(){
    this.communityService.get('location').subscribe(
      response => {
          this.countries=response;
   //       console.log(response.data);
      },
      error => {
          console.log(error);
    });  
  }
  create(){
    let val=this.url[2].path;
    this.form.patchValue({
      stake_holder:this.coordinators,
      project_id:val
    });
    //console.log(this.form.value);
    let formulario=this.form.value;
    this.communityService.post('project',formulario).subscribe(
       ( response: any) => {
        let value=response;   
     //  console.log(value);
        this.projects=value;
        this.form.patchValue({
            id_project:value.id
        });
        this.verificationUpload();
    //    console.log(value);
        }, error => {
            console.log(error.error);
        });
    this.vCRUD('create');
  }
  createHolder(){
    let formulario=this.holder.value;
    this.communityService.post('project',formulario).subscribe(
      (response:any) => {
      //this.projects=[];
      this.verificationUpload();
     }, error => {
      console.log(error.error);
    });
    this.vCRUD('create');
  }

  deleteHolder(holder:any){
    this.communityService.delete("holder/"+holder.id).subscribe(
      (response:any) => {
      //this.projects=[];
      this.verificationUpload();
  });
    this.vCRUD('delete');
  }
  updateHolder(holder:any){
    this.reset();
    if(holder == "create"){
    
    this.display_b=false;
  }else{
    this.holder.patchValue({
      name: holder.name,
      lastname: holder.lastname,
      position: holder.position,
      identification:holder.identification,
      type:holder.type.name,
      function:holder.type,
      id_holder:holder.id,
    });
    this.funtionSelect=holder.type.name;
    this.display_b=true;
  }
    this.display_cu=true;
    console.log(holder,this.display_b);
  }
  updateHolders(){
    let formulario=this.holder.value;
    this.communityService.put('project',formulario).subscribe(
      (response:any) => {
      //this.projects=[];
      console.log(response);
      this.verificationUpload();
     }, error => {
      console.log(error.error);
      });
    this.vCRUD('update');
  }
  reset(){
    this.holder.patchValue({
      name: [''],
      lastname: [''],
      position: [''],
      identification:[''],
      type:[''],
      id_holder:[''],
    });
  }
  update(){
    
    //console.log(this.form.value);
    let formulario=this.form.value;
    this.communityService.put('project',formulario).subscribe(
       ( response: any) => {
        let value=response;   
        console.log(value);
        this.projects=value;
        this.form.patchValue({
            id_project:value.id
        });
        this.verificationUpload();
    //    console.log(value);
         }, error => {
            console.log(error.error);
        });
    this.vCRUD('update');

  }
  verificRuc(){
    let form=this.form.value;
    this.communityService.post('search',form).subscribe(
      (response:any) => {
        let beneficiary=response;
        console.log(beneficiary);
        if(beneficiary!=null){
          this.form.patchValue({
            beneficiary_id:beneficiary.id,
            nameInstitute: beneficiary.name,
            ruc:beneficiary.ruc,
            //location: [''],
            address:beneficiary.address, 
            direct_beneficiaries:beneficiary.direct_beneficiaries,
            indirect_beneficiaries:beneficiary.indirect_beneficiaries,
          });
        }
        this.display_ruc=true;


      }, error => {
            console.log(error.error);
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
            this.messageService.add({severity:'success', 
                summary: 'Eliminado', 
            detail: 'Se a eliminado su contenido'    
            });
        }
    }
  
}
