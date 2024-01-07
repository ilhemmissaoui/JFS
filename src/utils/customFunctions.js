export const extractAndUppercase = (email) => {
  // Split the email address at "@" symbol to extract the first part
  if (email) {
    let parts = email.split('@');

    // Check if there's a valid first part (before the "@" symbol)
    if (parts.length > 0) {
      // Uppercase the first character of the first part
      const firstPart = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);

      return firstPart;
    }
  }

  // Return an empty string if the email format is invalid
  return '';
};
