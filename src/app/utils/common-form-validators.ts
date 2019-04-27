import { ValidatorFn, Validators } from '@angular/forms';

export function nameValidator(): ValidatorFn[] {
  return [ Validators.minLength(3), Validators.maxLength(30) ];
}

export function emailValidator(): ValidatorFn[] {
  return [ Validators.compose([ Validators.email ]) ];
}
