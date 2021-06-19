import { Component, OnInit } from '@angular/core';
import { CommunityService } from '../../../services/community/community.service'
import { Project } from '../../../models/community/models.index';
import { User } from '../../../models/auth/user';
import { Role } from '../../../models/auth/role';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
    selector: 'app-projects-list',
    templateUrl: './projects-list.component.html',
    providers: [MessageService,ConfirmationService]
})
export class ProjectsComponent implements OnInit {

    projects: Project;
    user: User;
    role: Role;
    permission: Role;
    loading: boolean = true;
    

    constructor(private communityService: CommunityService,
                private messageService: MessageService, 
                private confirmationService: ConfirmationService,
                private route:Router) {
        // this.user = JSON.parse(localStorage.getItem('user')) as User;
        // this.role = JSON.parse(localStorage.getItem('role')) as Role;
        this.role = {};
    }
    
    ngOnInit() {
      
        this.getproject();
    }
    getproject(){
        delete this.projects;
        this.communityService.get('project').subscribe(
            (response:Project) => {
                //console.log(response[0].beneficiary_institution);
                // this.projects=response
                delete this.projects;
                let project = response;
                let valor=[]; 
                let arrByID = project.filter(function(val){
                    let beneficiario=val.beneficiary_institution == null ? 
                    val.beneficiary_institution={name:'llenar campo'}:'';
                    valor.push(val);
                });
                delete this.projects;
                this.projects=valor; 
                //console.log(valor);
                //console.log(this.projects); 
                this.loading = false;
                
            },
            error => {
                console.log(error);
            });  
    }
    clear(table: any) {
        table.clear();
    }
    convenio(project:any,type:string){
        //console.log(type+project.id);
        return this.communityService.pdf(type+project.id);
    }
    deleteproject(project:any){
        this.communityService.delete("project/"+ project.id).subscribe(response => {
            //this.projects=[];
            this.getproject();
            this.sow();
        });
        
    }
    sow(){
        this.messageService.add({
            severity:'Success', 
            summary: 'Eliminado', 
            detail: 'Su proyecto ya esta eliminado',
            life: 3000
        });
    }
    editar(project:any){
        let x="form/"+project.id;  
        this.route.navigate(['form']);
     
    }
}
