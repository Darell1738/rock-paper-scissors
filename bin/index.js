#!/usr/bin/env node

import chalk from "chalk";
import { select } from "@inquirer/prompts";
import gameState from "../src/lib/state.js";
import {
  determineWinner,
  updateStats,
  showStats,
  resetGame,
} from "../src/lib/gameLogic.js";

const choices = ["rock", "paper", "scissors"];

async function playGame() {
  const userChoice = await select({
    message: "Choose your move:",
    choices: choices.map((choice) => ({
      name: choice,
      value: choice,
    })),
  });

  const computerChoice =
    choices[Math.floor(Math.random() * choices.length)];

  console.log(chalk.blue(`/nComputer chose: ${computerChoice}`));

  const result = determineWinner(userChoice, computerChoice);
  updateStats(result, gameState);

  if (result === "win") {
    console.log(chalk.green("You win!"));
  } else if (result === "lose") {
    console.log(chalk.red("You lose"));
  } else {
    console.log(chalk.yellow("It's a tie"));
  }
}

async function showMainMenu() {
  while (!gameState.over) {
    const action = await select({
      message: "What would you like to do?",
      choices: [
        { name: "Play game", value: "play" },
        { name: "View stats", value: "stats" },
        { name: "Reset stats", value: "reset" },
        { name: "Exit", value: "exit" },
      ],
    });

    if (action === "play") {
      await playGame();
    } else if (action === "stats") {
      showStats(gameState);
    } else if (action === "reset") {
      resetGame(gameState);
      console.log(chalk.green("Stats reset successfully."));
    } else if (action === "exit") {
      gameState.over = true;
      console.log(chalk.blue("Goodbye 👋"));
      process.exit(0);
    }
  }
}

showMainMenu();