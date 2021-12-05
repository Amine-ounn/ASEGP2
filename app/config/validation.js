/* Does entered text conform to a valid email address? */
const emailReg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

/* Password must contain upper, lower, digit, special characters */
const passwordReg =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export function validate(text, type) {
  if (type === 'email') {
    emailReg.test(text);
  } else if (type === 'password') {
    passwordReg.test(text);
  }
  return false;
}
