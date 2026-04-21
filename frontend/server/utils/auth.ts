export const isValidSchoolEmail = (email: string) => {
  const allowedDomain = '@university.edu'; // Replace with the actual school domain
  return email.endsWith(allowedDomain);
};
