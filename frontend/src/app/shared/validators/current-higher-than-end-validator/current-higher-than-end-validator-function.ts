import { AbstractControl, ValidationErrors } from '@angular/forms';
import { AbstractValidator, register } from '../abstract-validator';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { dateFormatError } from '../date-format-validator/date-format-validator-function';

export const currentHigherThanEndError: ValidationErrors = {
  currentHigherThanEndError: true
};

@register
export class CurrentHigherThanEndValidator extends AbstractValidator {

  constructor(private i18n: I18n) {
    super(i18n({
      id: 'currentHigherThanEndError',
      description: 'The "Current" value is higher than the "Max" Value',
      value: 'Der "Aktuelle" Wert ist Höher als der Maximalwert.'
    }), currentHigherThanEndError);
  }

  static Validate(control: AbstractControl): ValidationErrors {
    const current: number = control.get('current').value;
    const end: number = control.get('end').value;

    if (current > end) {
      return currentHigherThanEndError;
    }
  }
}
