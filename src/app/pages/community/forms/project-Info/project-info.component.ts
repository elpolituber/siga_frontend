import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { CommunityService } from '../../../../services/community/community.service';
import { Catalogue } from '../../../../models/ignug/catalogue';
import { debounceTime } from 'rxjs/operators';
import { FormsComponent }from '../form.component';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/community/project';


@Component({
    selector: 'app-proyecto',
    templateUrl: './project-info.component.html',
})
export class ProjectInfoComponent implements OnInit {
    //variables de comprobante
    projects: Project;
    url:any=this.router.parseUrl(this.router.url).root.children.primary.segments;
    comprobante=true;
    // VARIABLES FORM CONTROL
    form: FormGroup;

    // AUTOCOMPLETE COMBO
    assignedLines: SelectItem[];
    filtered: any[];
    career:any[];
    filtereCareers:SelectItem[];
    modalitys="";
    very_date=false;
    
    // URLS
    urlcombo = 'combo';
   

    //valores esternos
    value:"hola mundo";
    
    constructor(private communityService: CommunityService,
        private formBuilder: FormBuilder,
        private router:Router) {
        this.buildForm();
    //   this.getupdate();
    }

    ngOnInit(): void {
        this.buildForm();
        this.getupdate();
    }
    

    private buildForm() {
        this.form = this.formBuilder.group({
            id_project:[''],
            title: [''],
            code: [' '],
            field: [''],
            career:[''],
            cycle:[' '],
            modality:[' '],
            city: [' '], // id parroquia
            canton:[' '],
            province:[' '],
            lead_time: [' '],
            delivery_date: [' '],
            start_date: [' '],
            end_date: [''],
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
        //   this.url = this.router.parseUrl(this.router.url).root.children.primary.segments;
        //   console.log(this.comprobante);
        //    if(this.url.length ==3 && this.comprobante==true){
        //         this.comprobante=false;
        //         this.getupdate();
        //         console.log("actualizado");
        //     }
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
                 console.log(this.projects);

            this.updateForm(this.projects);      
              
            },
            error => {
                console.log(error);
            });
        }else{
            console.log("no es para actualizar",this.form.value);
        }
            console.log(this.projects);
           
       
        console.log("termina actualizacion",this.form.value);

    }
    updateForm(project:Project):void{
        console.log(project);
        this.form.patchValue({
            id_project:project.id,
        })
        this.form.patchValue({
            title: project.title,
            code: project.code,
            field: project.field,
           // career:project.career.name,
            // modality:project.career.modality.name,
        });
        // this.form.patchValue({
            // esto una vez que el validador estese en su 100%
        //     id_project:project.id,
        //     title: project.title,
            
        //     field: project.field,
        //     career:project.career.name,
        //     cycle:project.cycle,
        //     modality:project.career.modality.name,
        //     // city: [''], // id parroquia
        //     // canton:[''],
        //     // province:[''],
        //     lead_time:project.lead_time,
        //     delivery_date: project.delivery_date,
        //     start_date: project.start_date,
        //     end_date: project.end_date,
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
    autocomplete(){
        this.form.patchValue({
            title: 'Probando',
            // code: 'yavirac.123',
             field: 'prueba',
            // career:{id:'1'},
             cycle:'primero',
            // modality:(this.form.value['career']['modality']['name']),
            // location: '1', // id parroquia
            // lead_time: {id:'1'},
        });
      
    //    console.log(this.form.value);
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
            console.log(value);
            }, error => {
                console.log(error.error);
            });
    }
    update(){
        let formulario=this.form.value;
        this.communityService.put('prueba',formulario).subscribe(
           (response:any)=>{
                let value=response;
                       
           },error=>{
                console.log(error.error);
            
           });
        
    }
}

