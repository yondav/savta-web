const password = {
  hasUpper: {
    pattern: /^(?=.*[A-Z]).*$/,
    message: 'Password must include at least one uppercase letter',
  },
  hasLower: {
    pattern: /^(?=.*[a-z]).*$/,
    message: 'Password must include at least one lowercase letter',
  },
  hasNumber: {
    pattern: /^(?=.*[0-9]).*$/,
    message: 'Password must include at least one number',
  },
  hasSpecial: {
    pattern: /^(?=.*[@!#$%^&*()\-_+=[\]'"{}|]).*$/,
    message: 'Password must include at least one special character',
  },
};

const email = {
  pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  message: 'The email address you entered is invalid',
};

export { password, email };
