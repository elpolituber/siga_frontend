import {Catalogue, Career, SchoolPeriodo} from '../ignug/models.index';
import {Participant, Objective, BeneficiaryInstitution, StakeHolder, Activity} from '../community/models.index';
import { User } from '../auth/user';
export interface Project {
    //forEach(arg0: (val: any) => void);
    id?: number;
    title?: string;
    // nuevo campo 
    state?: Catalogue;
    status?:Catalogue;
    school_period?: SchoolPeriodo;
    code?: string;
    // REVISRA NUEVO FORMATO YA NO TIENE assigned_line?: Catalogue; // linea de investigacion
    field?: Catalogue;
    career?: Career;
    // REVISRA NUEVO FORMATO YA NO TIENE aim?: string; // objeto
    cycle?: string; 
    location?: Catalogue; 
    lead_time?: number; // plazo de ejecucion
    delivery_date?: Date;
    start_date?: Date;
    end_date?: Date;
    introduction?: string;
    situational_analysis?: string;
    foundamentation?: string;
    justification?: string;
    frequency_activities?: Catalogue; 
    activities?: Activity[]; // VERIFICAR SI ESTA BIEN ESTO POR EL ID DE PROYECTO QUE TIENE EL MODELO
    description?: string; 
    participant?: Participant[];
    objetive?: Objective;
    beneficiary_institution?: BeneficiaryInstitution;
    observations?: string; // REVISION (EN ESPERA)
    direct_beneficiaries?: string;
    indirect_beneficiaries?: string;
    stake_holder?: StakeHolder;
    document?: string;
    document_name?: string;
    schedules?: string;
    schedules_name?: string;
    create_by?:User;
}
