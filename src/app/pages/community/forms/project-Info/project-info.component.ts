import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { CommunityService } from '../../../../services/community/community.service';
import { Catalogue } from '../../../../models/ignug/catalogue';
import { debounceTime } from 'rxjs/operators';
import { FormsComponent }from '../form.component';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/community/project';
import {MessageService} from 'primeng/api';
import {Role} from '../../../../models/auth/role';

@Component({
    selector: 'app-proyecto',
    templateUrl: './project-info.component.html',
    providers: [MessageService]
})
export class ProjectInfoComponent implements OnInit {
    //variables de comprobante
    projects: Project;
    url:any=this.router.parseUrl(this.router.url).root.children.primary.segments;
    comprobante=true;
    // VARIABLES FORM CONTROL
    form: FormGroup;
    role:Role;
    rol:any;
    // AUTOCOMPLETE COMBO
    assignedLines: SelectItem[];
    filtered: any[];
    career:any[];
    filtereCareers:SelectItem[];
    modalitys="";
    very_date=false;
    countries: any;

    
    // URLS
    urlcombo = 'combo';
    

    //valores esternos
    value:"hola mundo";
    
    constructor(private communityService: CommunityService,
        private formBuilder: FormBuilder,
        private router:Router,
        private messageService: MessageService,
           ) {
        // this.role=JSON.parse(localStorage.getItem('role')) as Role;
        // this.rol={id:1, name:'persona de vincualacion', code""};
        // this.buildForm();

    //   this.getupdate();

        this.location();
    }

    ngOnInit(): void {
        this.buildForm();
        this.getupdate();
    }
    

    private buildForm() {
        this.form = this.formBuilder.group({
            id_project:[''],
            title: ['',Validators.required],
            code: [' ',Validators.required],
            field: ['',Validators.required],
            career:['',Validators.required],
            cycle:[' ',Validators.required],
            modality:[' '],
            location: [' ',Validators.required], // id parroquia
            lead_time: [' '],
            delivery_date: [' ',Validators.required],
            start_date: [' ',Validators.required],
            end_date: ['',Validators.required],
            tabPanel:['first'],
        });
        this.form.valueChanges
        .pipe(
          debounceTime(500)
        )
        .subscribe(value => {
           if(value.start_date && value.end_date) {
              this.calcularleadTime(value.start_date, value.end_date);
              if(value.lead_time){
                 this.very_date=true;
              }
           }   
           if(this.url.length ==2 && this.comprobante==true){
                this.comprobante=false;
           }   
        });
        
    }
    getupdate(){
        let val=this.url[2];
        if(this.url.length ==3 ){ 
        this.communityService.get('project/'+val).subscribe(
            response => {
                this.projects=response;
                 console.log("carga de project info");
                this.updateForm(this.projects);      
            },
            error => {
                this.router.navigate(['/community/forms']);
                console.log(error);
            });
        }else{
            //console.log("no es para actualizar",this.form.value);
        }
            // console.log(this.projects);

    }
    location(){
        this.communityService.get('location').subscribe(
            response => {
                this.countries=response;
                console.log(this.countries);
            },
            error => {
                console.log(error);
            });  
    }
    updateForm(project:Project):void{
        // console.log(project);
        this.form.patchValue({
            id_project:project.id,
        })
        this.form.patchValue({
            title: project.title,
            code: project.code,
            field: project.field,
            career:project.career,
            cycle:project.cycle,
            lead_time:project.lead_time,
            delivery_date: project.delivery_date,
            start_date: project.start_date,
            end_date: project.end_date,
        //  modality:project.career.modality.name,
        });
        // this.form.patchValue({
        //     // city: [''], // id parroquia
        //     // canton:[''],
        //     // province:[''],
        // });
    }

    filterAssignedLines(event) {
        this.communityService.get(this.urlcombo).subscribe(
            response => {
                this.filtered = [];
                const query = event.query;
                response['assignedLine'].forEach(item => {
                    if (item.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                        this.filtered.push(item);
                    }
                });
                this.assignedLines = this.filtered;
            },
            error => {
                console.log(error);
            });
    }
    careerF(event) {
        this.communityService.get(this.urlcombo).subscribe(
            response => {
                this.career= [];
                const query = event.query;
                response['career'].forEach(item => {
                    if (item.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                        this.career.push(item);
                    }
                    
                });
                console.log(this.form.value);
                 this.filtereCareers = this.career;
                 this.form.patchValue({
                    modality:(this.form.value['career']['modality']['name'])
                });
                this.modalitys=this.form.value['modality'];
            },
            error => {
                console.log(error);
            });
    }
    
    calcularleadTime(startDate, endDate) {
        if (startDate != undefined && startDate.length != 0
          && endDate != undefined && endDate.length != 0) {
          var start = this.transformDate(startDate);
          var end = this.transformDate(endDate);
          var leadTime = end - start;
          var months = (leadTime / (1000 * 60 * 60 * 24)) / 30;
          this.form.controls['lead_time'].setValue(Math.trunc(months));
        }
      }
    transformDate(date: Date) {
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var year = date.getFullYear();
        var stringDate = year + '-' + month + '-' + day;
        var endDate = new Date(stringDate);
        return endDate.getTime();
      }
    coanvertir(date: Date){
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var year = date.getFullYear();
            var stringDate = day + '/' + month + '/' +year ;
            return stringDate;
    }
    create(){
        let formulario=this.form.value;
        this.communityService.post('project',formulario).subscribe(
           ( response: any) => {
            let value=response;   
            console.log(value);
            this.form.patchValue({
                id_project:value.id
            });
            this.messageService.add({severity: 'info',
                    summary: 'Se a guardado', 
                    detail: 'Los documentos para la vincualcion esta elaborando'});
            this.router.navigate(['/community/forms/'+value.id]);
            this.getupdate();
            }, error => {
                console.log(error.error);
            });

    }
    update(){
        let formulario=this.form.value;
        this.communityService.put('project',formulario).subscribe(
           (response:any)=>{
                let value=response;
                //console.log(value);
                this.getupdate();
                       
           },error=>{
                console.log(error.error);
            
           });     

                this.vCRUD('update');
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

