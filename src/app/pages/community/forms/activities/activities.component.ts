import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { CommunityService } from '../../../../services/community/community.service';
import { FormGroup, FormBuilder, FormControl, FormArray,Validators  } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/community/project';
import {combo} from 'src/app/models/community/tables/combo';
import {MessageService} from 'primeng/api';


@Component({
  selector: 'app-actividades',
  templateUrl: './activities.component.html',
  providers: [MessageService]
})
export class ActivitiesComponent implements OnInit {
  //api
  projects: Project;

  //VARIABLES FORM CONTROL
  form: FormGroup;
  FromActividadesvincu:FormGroup;
  selecActivities: [string];
  fraquencyOfActivities: combo[];
  fraquency: combo;
  bondingActivities: SelectItem[];
  bondingActivitiesListbox: SelectItem[];
  linkageAxes: SelectItem[];
  linkageAxesListbox: SelectItem[];
  researchAreas: SelectItem[];
  researchAreasListbox: SelectItem[];
  //url
  url:any=this.router.parseUrl(this.router.url).root.children.primary.segments;
  urlcombo = "combo";

  //Boolean
  botton_display:boolean=false;

  constructor(private vinculacionService: CommunityService,
    private formBuilder: FormBuilder,
    private router:Router,
    private messageService: MessageService) {
    this.buildForm();
    
    this.verificationUpload();
  }

  ngOnInit(): void {
    this.listbox();
    this.filter();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      frecuenciaActiv: ['',Validators.required],
      actividadesVincu: [''],
      ejesEstrategicos: [''],
      areasAplicacion: [''],
      descripGeneral: [''],
      tabPanel:['sixth'],
      project_id:['']
    });
  }

  filter() {
    this.vinculacionService.get(this.urlcombo).subscribe(
      response => {
        let res=response['fraquency'];
       
        this.fraquencyOfActivities= res;
        console.log(this.fraquencyOfActivities);
  
      },
      error => {
        console.log(error);
      });
  }

  listbox() {
    this.vinculacionService.get(this.urlcombo).subscribe(
      response => {
        this.bondingActivities = [{ label: 'Seleccione', value: '' }];
        this.linkageAxes = [{ label: 'Seleccione', value: '' }];
        this.researchAreas = [{ label: 'Seleccione', value: '' }];
        const bondingActivities = response['bondingActivities'];
        const linkageAxes = response['linkageAxes'];
        const researchAreas = response['research_areas'];
        bondingActivities.forEach(bondingActivity => {
          this.bondingActivities.push({ 'label': bondingActivity.name, 'value': bondingActivity.id });
        });
        linkageAxes.forEach(linkageAxe => {
          this.linkageAxes.push({ 'label': linkageAxe.name, 'value': linkageAxe.id });
        });
        researchAreas.forEach(research_area => {
          this.researchAreas.push({ 'label': research_area.name, 'value': research_area.id });
        });
        this.bondingActivitiesListbox = this.bondingActivities.slice(1);
        this.linkageAxesListbox = this.linkageAxes.slice(1);
        this.researchAreasListbox = this.researchAreas.slice(1);
        this.form.patchValue({ 
        //   actividadesVincu:[74,75],
          project_id:this.projects.id,
        })
      },
      error => {
        console.log(error);
      });
  }

  verificationUpload(){
    this.vinculacionService.get('project/'+this.url[2].path).subscribe(
      (response:Project) => {
          delete this.projects;
          
       // console.log(this.projects);
          this.projects = response;
     //     console.log(this.projects);
          if(this.projects.activities.length != 0 || this.projects.frequency_activities !=null){
            this.botton_display=true;
            let bondingActivities=[];
            let linkageAxes=[];
            let researchAreas=[];
            for(let con=0;con<=this.projects.activities.length-1; con++){
              if(this.projects.activities[con].type.type=='bonding_activities_vinculacion'){
                bondingActivities.push(this.projects.activities[con].type.id);    
              } 
              if(this.projects.activities[con].type.type=='linkage_axes_vinculacion'){
                linkageAxes.push(this.projects.activities[con].type.id);    
              }
              if(this.projects.activities[con].type.type=='research_areas_vinculacion'){
                researchAreas.push(this.projects.activities[con].type.id);    
              }
            }
             console.log(bondingActivities);
             console.log(researchAreas);
             console.log(linkageAxes);
            this.form.patchValue({ 
              project_id:this.projects.id,
              frecuenciaActiv:this.projects.frequency_activities,
              descripGeneral: this.projects.description,
              actividadesVincu:bondingActivities, 
              ejesEstrategicos: linkageAxes,
              areasAplicacion: researchAreas, 
            });
          }
          
      }
    )
  }
  create(){
    let val=this.url[2].path;
    this.form.patchValue({
      project_id:val
    });
   let formulario=this.form.value;
    this.vinculacionService.post('project',formulario).subscribe(
      ( response: any) => {
       let value=response;   
       console.log(value);
      //  this.form.patchValue({
      //      project_id:value.id
      //  });
      this.verificationUpload();
       }, error => {
           console.log(error.error);
       });
    this.vCRUD('create');
  }
  update(){
    let val=this.url[2].path;
    this.form.patchValue({
      project_id:val
    });
   let formulario=this.form.value;
    this.vinculacionService.put('project',formulario).subscribe(
      ( response: any) => {
       let value=response;   
       console.log(value);
      //  this.form.patchValue({
      //      project_id:value.id
      //  });
      this.verificationUpload();
       }, error => {
           console.log(error.error.data);
       });
    this.vCRUD('update');
  }
  actividades(){
    console.log(this.form.value.actividadesVincu);
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
    }
}
