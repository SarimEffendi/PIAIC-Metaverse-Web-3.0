#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
const sleep = () => {
    return new Promise((res) => {
        setTimeout(res, 2000);
    });
};
async function welcome() {
    let rainbowTitle = chalkAnimation.rainbow("Welcome!!! to Countdown timer made by Sarim Effendi");
    await sleep();
    rainbowTitle.stop();
}
const startCountdown = async () => {
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "duration",
            message: "Enter the timer duration in seconds:",
            validate: (input) => {
                const parsed = parseInt(input);
                if (!isNaN(parsed) && parsed > 0) {
                    return true;
                }
                return "Please enter a valid number greater than 0.";
            }
        }
    ]);
    const countDownDate = new Date().getTime() + parseInt(answers.duration) * 1000;
    const x = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        const seconds = Math.floor(distance / 1000);
        console.log(chalk.yellow(`${seconds} seconds left`));
        if (distance < 0) {
            clearInterval(x);
            console.log(chalk.red("EXPIRED"));
            inquirer
                .prompt([
                {
                    type: "confirm",
                    name: "startAgain",
                    message: "Do you want to start the countdown timer again?",
                    default: false
                }
            ])
                .then(answers => {
                if (answers.startAgain) {
                    startCountdown();
                }
                else {
                    console.log(chalk.red("Goodbye!"));
                    process.exit();
                }
            });
        }
    }, 1000);
};
await welcome();
startCountdown();
