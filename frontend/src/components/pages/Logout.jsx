export function loader() {
  localStorage.removeItem(`userName`);
  localStorage.removeItem(`expiration`);
  localStorage.removeItem(`token`);
  localStorage.removeItem(`address`);

  location.reload();

  return null;
}
