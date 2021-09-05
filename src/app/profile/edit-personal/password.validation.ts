import {AbstractControl} from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
       const password = AC.get('password').value; // to get value in input tag
       const confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
       const oldPassword = AC.get('oldPassword').value;

       if (!password && !confirmPassword && !oldPassword) {
            AC.get('oldPassword').setErrors(null);
            AC.get('confirmPassword').setErrors(null);
            return null;
       }
       if (password != confirmPassword) {
            AC.get('confirmPassword').setErrors( {MatchPassword: true} );
        } else {
            if (password || confirmPassword ) {
                if (!AC.get('oldPassword').value) {
                    AC.get('oldPassword').setErrors( {MatchPassword: true} );
                }
            } else {
                return null;
            }
        }
    }
}
