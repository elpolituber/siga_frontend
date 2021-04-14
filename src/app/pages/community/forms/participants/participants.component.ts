import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/models/ignug/teacher';
import { Student } from 'src/app/models/ignug/student';
import { Participant } from '../../../../models/community/participant';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-participantes',
  templateUrl: './participants.component.html',
})
export class ParticipantsComponent implements OnInit {

  //VARIABLES FORM CONTROL
  formDocente: FormGroup;
  formEstud: FormGroup;

  //TABLA
  cols_teacher: any[];
  participating_teachers: Participant[] = [];
  participating_teacher: Participant;

  cols_student: any[];
  participating_students: Participant[] = [];
  participating_student: Participant;

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.table_teacher();
    this.table_student();
  }

  private buildForm() {
    this.formDocente = this.formBuilder.group({
      teacher: ['', [Validators.required]],
      position: ['', [Validators.required]],
      working_hours: ['', [Validators.required]],
      function: ['', [Validators.required]],
      participats:[''],
      project_id:[''],
      tabPanel:['fifth'],
    });

    this.formEstud = this.formBuilder.group({
      student: ['', [Validators.required]],
      id: [''],
      function: ['', [Validators.required]],
      participats:[''],
      project_id:[''],
      tabPanel:['fifth'],
    });
  }

  table_teacher() {
    this.cols_teacher = [
      { field: 'id', header: 'Docente' },
      { field: 'position', header: 'Cargo' },
      { field: 'working_hours', header: 'Horas de trabajo' },
      { field: 'function', header: 'Funcion' },
    ]
  }

  table_student() {
    this.cols_student = [
      { field: 'id', header: 'Nombre estudiante' },
      { field: 'function', header: 'Funciones estudiante' },
    ]
  }

  addTeacher(event: Event) {
    event.preventDefault();
    const values = this.formDocente.value;
    this.participating_teachers.push(this.participating_teacher = {
      id: values.teacher,
      function: values.function,
      working_hours: values.working_hours,
      position: values.position,
    });
    this.formDocente.controls['teacher'].setValue('');
    this.formDocente.controls['position'].setValue('');
    this.formDocente.controls['working_hours'].setValue('');
    this.formDocente.controls['function'].setValue('');
  }

  addStudent(event: Event) {
    event.preventDefault();
    const values = this.formEstud.value;
    this.participating_students.push(this.participating_student = {
      id: values.student,
      function: values.function,
    });
    this.formEstud.controls['student'].setValue('');
    this.formEstud.controls['id'].setValue('');
    this.formEstud.controls['function'].setValue('');
  }
  create(){
    this.formDocente.patchValue({
      participants:this.participating_teachers
    });
    this.formEstud.patchValue({
      participants:this.participating_students
    });
  }
}
