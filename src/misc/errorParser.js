const errorParser = (error) => {
  let errorMessage = "";
  error.message ? (errorMessage = error.message) : (errorMessage = error);

  switch (errorMessage) {
    case "EMAIL_EXISTS":
      return "Email address exists.";
    case "WEAK_PASSWORD : Password should be at least 6 characters":
      return "Weak password: password should be at least 6 characters";
    case "EMAIL_NOT_FOUND":
      return "Email not found.";
    case "EMAIL_NOT_VERIFIED":
      return "Email not verified.";
    case "INVALID_PASSWORD":
      return "Invalid password.";
    case "INVALID_EMAIL":
      return "Invalid email.";
    case "Could not parse auth token.":
    case "Auth token is expired":
    case "Permission denied":
      return "Permission denied. Please login!";
    case "INVALID_OOB_CODE":
      return "Invalid code.";
    case "TOO_MANY_ATTEMPTS_TRY_LATER":
      return "Please try again later.";
    case "404 Not Found":
      return "Connection error. Please try again later.";
    default:
      return;
  }
};

export default errorParser;
