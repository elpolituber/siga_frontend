import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ObjetivoEspecifico } from 'src/app/models/community/tables/objentivosEspecifivos';

@Component({
  selector: 'app-contextualizacion',
  templateUrl: './contextualization.component.html',
})
export class ContextualizationComponent implements OnInit {

  //VARIABLES FORM CONTROL
  form: FormGroup;

  //STEPS
  itemsContex: MenuItem[];
  activeIndexContex: Number;

  //TABLA
  tablaObjetivos: any[];
  objetivos: ObjetivoEspecifico[] = [];
  objetivo: ObjetivoEspecifico;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
    this.steps();
    this.tablaObj();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      introduccion: [''],
      fundamentacion: [''],
      diagnostico: [''],
      justificaion: [''],
      ObjetivoGeneral: [''],
      indicador: [''],
      medioVerificacionGene: [''],
      objetivoEspecifico: ['', [Validators.required]],
      medioVerificacionEspe: ['', [Validators.required]],
      resultado: ['', [Validators.required]],
      actividad: ['', [Validators.required]],
      indicadorEspe: ['', [Validators.required]],
      aims:[''],
      type,
      tabPanel:['third'],
    });
  }

  steps() {
    this.activeIndexContex = 0;
    this.itemsContex = [{
      label: 'Contextualizacion genral',
      command: (event: any) => {
        this.activeIndexContex = 0;
      }
    },
    {
      label: 'Objetivos especificos',
      command: (event: any) => {
        this.activeIndexContex = 1;
      }
    },]
  }

  tablaObj() {
    this.tablaObjetivos = [
      { field: 'detalleObjEspe', header: 'Objetivo' },
      { field: 'indicadorObjEspe', header: 'Indicador' },
      { field: 'mediosObjEspe', header: 'Medios' },
      { field: 'resultadosObjEspe', header: 'Resultados' },
      { field: 'actividadesObjEspe', header: 'Actividades' },
    ]
  }

  addObjEspe(event: Event) {
    event.preventDefault();
      const values = this.form.value;
      
      this.objetivos.push(this.objetivo = {
        detalleObjEspe: values.objetivoEspecifico,
        indicadorObjEspe: values.indicadorEspe,
        mediosObjEspe: values.medioVerificacionEspe,
        resultadosObjEspe: values.resultado,
        actividadesObjEspe: values.actividad
      }); 
      this.form.controls['objetivoEspecifico'].setValue('');
      this.form.controls['indicadorEspe'].setValue('');
      this.form.controls['medioVerificacionEspe'].setValue('');
      this.form.controls['resultado'].setValue('');
      this.form.controls['actividad'].setValue('');
  }
  create(){
    this.form.patchValue({
      aims:this.objetivos
    });
    console.log(this.form.value);
  }

}
