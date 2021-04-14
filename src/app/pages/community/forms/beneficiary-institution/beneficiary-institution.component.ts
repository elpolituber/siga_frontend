import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CoordinatorTable } from '../../../../models/community/tables/coordinator-table'
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-institucion-beneficiaria',
  templateUrl: './beneficiary-institution.component.html',
})
export class BeneficiaryInstitutionComponent implements OnInit {

  //VARIABLES FORM CONTROL
  form: FormGroup;

  //STEPS
  items: MenuItem[];
  activeIndexitems: Number;

  //TABLAS
  cols_coordinator: any[];
  coordinators: CoordinatorTable[] = [];
  coordinator: CoordinatorTable;

  //DIALOG
  display: boolean;

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.steps();
    this.table_coordinator();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: [''],
      location: [''],
      address: [''], //AÑADIR CAMPO 
      direct_beneficiaries: [''],
      indirect_beneficiaries: [''],
      function: [''],
      coordinator_name: ['', [Validators.required]],
      coordinator_postition: ['', [Validators.required]],
      coordinator_funtion: ['', [Validators.required]],
      stake_holder:[''],
      project_id:[''],
      tabPanel:['second'],

    });
  }

  steps() {
    this.activeIndexitems = 0;
    this.items = [{
      label: 'Archivos adjuntos',
      command: (event: any) => {
        this.activeIndexitems = 0;
      }
    },
    {
      label: 'Informacion general',
      command: (event: any) => {
        this.activeIndexitems = 1;
      }
    },
    {
      label: 'Informacion del coordinador',
      command: (event: any) => {
        this.activeIndexitems = 2;
      }
    },];
  }

  table_coordinator() {
    this.cols_coordinator = [
      { field: 'coordinator_name', header: 'Nombre completo' },
      { field: 'coordinator_postition', header: 'Cargo institución' },
      { field: 'coordinator_funtion', header: 'Funciones comunidad' },
    ]
  }

  addcoordinator(event: Event) {
    event.preventDefault();
    const values = this.form.value;
    this.coordinators.push(this.coordinator = {
      coordinator_name: values.coordinator_name,
      coordinator_postition: values.coordinator_postition,
      coordinator_funtion: values.coordinator_funtion,
    });
    this.form.controls['coordinator_name'].setValue('');
    this.form.controls['coordinator_postition'].setValue('');
    this.form.controls['coordinator_funtion'].setValue('');
  
  }
  create(){
    this.form.patchValue({
      stake_holder:this.coordinators
    });
    console.log(this.form.value);

    // let formulario=this.form.value;
    // this.communityService.post('project',formulario).subscribe(
    //    ( response: any) => {
    //     let value=response;   
    //     console.log(value);
    //     this.form.patchValue({
    //         id_project:value.id
    //     });
    //     console.log(value);
    //     }, error => {
    //         console.log(error.error);
    //     });
  }
}
