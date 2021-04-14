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
        this.communityService.get('project').subscribe(
            (response:Project) => {
                //console.log(response[0].beneficiary_institution);
                let project = response;
                let valor=[];
                let arrByID = project.filter(function(val){
                    let beneficiario=val.beneficiary_institution == null ? 
                    val.beneficiary_institution={name:'llenar campo'}:'';
                    let state=val.status==null ?val.status={name:'llenar campo'}:'';
                    valor.push(val);
                });
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
        // this.confirmationService.confirm({
        //     message: 'Desea eliminar'+project.title,
        //     header: 'Confirm',
        //     icon: 'pi pi-exclamation-triangle',
        //     accept: () => {
        //         this.communityService.delete("project/"+ project.id).subscribe(response => {
        //             this.getproject();
        //             this.messageService.add({
        //                 severity:'success', 
        //                 summary: 'Nota', 
        //                 detail: 'Su proyecto ya esta eliminado',
        //                 life: 3000
        //             })
        //         }, error => {
        //             console.log(error);
        //             })
        //     }})
        this.communityService.delete("project/"+ project.id).subscribe(response => {
            this.getproject();
            console.log("entro");
        });
        
    }
    editar(project:any){
        let x="form/"+project.id;  
        this.route.navigate(['form']);
     
    }
}
