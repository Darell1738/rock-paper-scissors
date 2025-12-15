import chalk from "chalk";

export function determineWinner(userChoice, computerChoice) {
  const winMap = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };

  if (userChoice === computerChoice) {
    return "tie";
  }

  return winMap[userChoice] === computerChoice ? "win" : "lose";
}

export function updateStats(result, gameState) {
  if (result === "win") {
    gameState.stats.wins += 1;
  } else if (result === "lose") {
    gameState.stats.losses += 1;
  } else {
    gameState.stats.ties += 1;
  }
}

export function showStats(gameState) {
  console.log(chalk.blue("\nGame Statistics:"));
  console.log(chalk.green(`Wins: ${gameState.stats.wins}`));
  console.log(chalk.red( `Losses: ${gameState.state.losses}`));
  console.log(chalk.yellow(`Ties: ${gameState.stats.ties}`));
}

export function resetGame(gameState) {
  gameState.stats = { wins: 0, losses: 0, ties: 0 };
}