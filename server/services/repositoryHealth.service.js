exports.calculateHealth = ({

  readme,

  license,

  gitignore,

  dependencies,

}) => {

  let score = 0;

  if (readme.exists)
    score += 25;

  if (license !== "Not Found")
    score += 25;

  if (gitignore)
    score += 20;

  if (dependencies.total > 0)
    score += 15;

  score += 15;

  let grade = "Poor";

  if (score >= 90)
    grade = "Excellent";
  else if (score >= 70)
    grade = "Good";
  else if (score >= 50)
    grade = "Average";

  return {
    score,
    grade,
  };

};