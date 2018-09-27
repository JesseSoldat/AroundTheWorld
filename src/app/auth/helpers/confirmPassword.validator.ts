import { AbstractControl } from "@angular/forms";

export const confirmPasswordValidator = (
  control: AbstractControl
): { [key: string]: boolean } => {
  const password = control.get("password").value;
  const confirmPassword = control.get("confirmPassword").value;

  if (!password || !confirmPassword) return null;

  if (password !== confirmPassword) return { nomatch: true };

  return null;
};
