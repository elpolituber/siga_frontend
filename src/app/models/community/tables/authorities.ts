import { User } from '../../auth/user';
import {Catalogue, State} from '../../ignug/models.index';
export interface Authorities {
    id?:number;
    user?: User;
    type?: Catalogue;
    
}
