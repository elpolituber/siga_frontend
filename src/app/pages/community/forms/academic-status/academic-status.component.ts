import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { CommunityService } from '../../../../services/community/community.service'

@Component({
  selector: 'app-estado-academico',
  templateUrl: './academic-status.component.html',
})
export class AcademicStatusComponent implements OnInit {

  //VARIABLES FORM CONTROL
  form: FormGroup;

  //COMBOS
  careers: SelectItem[];

  //URLS 
  urlcombo = "combo";

  constructor(private vinculacionService: CommunityService,
    private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
     
      location: [''], // id parroquia
      lead_time: [''],
      delivery_date: [''],
      start_date: [''],
      end_date: [''],
    });
    
  }


  // CAMBIAR FUNCION CUANDO YA VENGAN BIEN LOS DATOS 
  setModalidad(carrer) {
    this.vinculacionService.get(this.urlcombo).subscribe(
      response => {
        const careers = response['career'];
        careers.forEach(element => {
          if (carrer == element.name)
            this.form.controls['modality'].setValue(element.modality);
        });
      },
      error => {
        console.log(error);
      });

  }

  filterAssignedLines(event) {
    this.vinculacionService.get(this.urlcombo).subscribe(
      response => {
        this.careers = [];
        const careers = response['career'];
        for (const item of careers) {
          const brand = item.name;
          if (brand.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
            this.careers.push(brand);
          }
        }
      },
      error => {
        console.log(error);
      });
  }

  
}

