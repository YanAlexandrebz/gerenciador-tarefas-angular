import { AbstractControl } from "@angular/forms";

//AbstractControl -> usado para pode ser visto pelo component
export function cssValidacaoForm(control: AbstractControl){
    if (control.touched){
        return control.errors ? 'is-invalid' : 'is-valid';
    }
    return '';
}