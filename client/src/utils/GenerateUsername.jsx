const generateUsername = () => {
  const adjectives = ["Happy", "Silly", "Funny", "Clever", "Lucky"];
  const animals = ["Dog", "Cat", "Bear", "Fox", "Lion"];
  const randomNumber = Math.floor(Math.random() * 1000);

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomAnimal = animals[Math.floor(Math.random() * animals.length)];

  return `${randomAdjective}${randomAnimal}${randomNumber}`;
};

export default generateUsername;
