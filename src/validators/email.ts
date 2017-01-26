import { FormControl } from '@angular/forms';
 
export class EmailValidator {
 
    static isValid(control: FormControl): any {
 
        let regExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (!regExp.test(control.value)) {
            return {"invalidEmail": true};
        }
        return null;
    }
 
}