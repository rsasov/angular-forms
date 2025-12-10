import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordMatchValidator = (passwordControlName: string, confirmPasswordControlName: string): ValidatorFn => {
    return (group: AbstractControl): ValidationErrors | null => {
        const password = group.get(passwordControlName);
        const confirm = group.get(confirmPasswordControlName);
        if (!password || !confirm) return null;

        // If another validator already set an error on confirm, don't overwrite it
        if (confirm.errors && !confirm.errors['passwordMismatch']) {
            return null;
        }

        const mismatch = password.value !== confirm.value;
        if (mismatch) {
            confirm.setErrors({ ...(confirm.errors || {}), passwordMismatch: true });
            return { passwordMismatch: true };
        } else {
            // remove only our mismatch error, keep others if present
            if (confirm.errors) {
                const { passwordMismatch, ...rest } = confirm.errors;
                confirm.setErrors(Object.keys(rest).length ? rest : null);
            }
            return null;
        }
    }
};
