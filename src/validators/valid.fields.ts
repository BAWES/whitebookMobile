import { FormControl,FormGroup } from '@angular/forms';

export class ValidFields {
 
    static isValidEmail(control: FormControl): any {
 
        let regExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (!regExp.test(control.value)) {
            return {"invalidEmail": true};
        }
        return null;
    }

    static isValidMobile(control: FormControl): any {
 
        let regExp = /^[0-9]{10}$/;
        
        if (!regExp.test(control.value)) {
            return {"invalidMobile": true};
        }
        return null;
    }
    
    static passwordMatch(control: FormGroup): any {
        console.log(control.controls['confirmPassword'].value);
        // let regExp = /^[0-9]{10}$/;
        
        // if (!regExp.test(control.value)) {
        //     return {"invalidMobile": true};
        // }
        return null;
    }
 
}