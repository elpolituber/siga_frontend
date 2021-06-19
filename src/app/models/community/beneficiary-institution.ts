import {Location} from '../ignug/location'
import {State} from '../ignug/state';

export interface BeneficiaryInstitution {
    id?:number;
    logo?: string;
    ruc?:number;
    files?:File[];
    name?: string;
    address?:string;
    location?: Location;
    parroquia?:string; // con calles
    function?: string;
    state?: State; // todos llevan state
    // VERIFICAR COMO Y DE DONDE VIENE LA INOFORMACION 
    // nombre representante legal
    // ruc o ccedula representante legal
}
