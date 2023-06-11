import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class RegisterPageForm {

    private formBuilder: FormBuilder; 

    constructor(formBuilder: FormBuilder){
        this.formBuilder = formBuilder;
    }

    passwordMatchValidator(control: FormGroup) {
        const passwordControl = control.get('password');
        const confirmPasswordControl = control.get('confirmPassword');
      
        if (passwordControl && confirmPasswordControl) {
          const password = passwordControl.value;
          const confirmPassword = confirmPasswordControl.value;
      
          if (password == confirmPassword) {
            return null; // Passwords match, return null
          } else {
            return confirmPasswordControl.setErrors({ mismatch: true }); // Set error on confirmPassword control
          }
        } else {
            return null; // Return null if the controls are not found
        }
      }

    createForm() : FormGroup{
        return this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            name: ['', [Validators.required]],
            confirmPassword: ['', Validators.required]
        }, { validator: this.passwordMatchValidator 
        }); 
    }
}