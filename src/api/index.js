export const getRandomUser = async () => {
  const response = await fetch("https://randomuser.me/api/?results=12");
  const data = await response.json();
  return data.results
}