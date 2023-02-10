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
    let rainbowTitle = chalkAnimation.rainbow("WORDS COUNTER!");
    await sleep();
    rainbowTitle.stop();
}
// async function getText() {
//     const text = await inquirer.prompt([
//         {
//             type: "input",
//             name: "paragraph",
//             message: "Enter a string: ",
//         },
//     ]);
//     if (text.paragraph == "") {
//         console.log(chalk.greenBright(`Number of words = 0`));
//     } else {
//         const statement = text.paragraph.replace(/  +/g, ' ');
//         const words = statement.trim().split(" ");
//         console.log(
//             chalk.greenBright(
//                 `Total number of words= ${words.length}`
//             )
//         );
//         const letters = text.paragraph.replace(/ /g, "");
//         console.log(
//             chalk.greenBright(`Total number of characters = ${letters.length}`)
//         );
//     }
// }
async function getText() {
    const response = await inquirer.prompt([
        {
            type: "input",
            name: "paragraph",
            message: "Enter a string: ",
        },
    ]);
    const statement = response.paragraph.trim().replace(/\s+/g, " ");
    const words = statement.split(" ");
    console.log(chalk.greenBright(`Number of words: ${words.length}`));
    console.log(chalk.greenBright(`Number of characters: ${statement.length}`));
}
async function startAgain() {
    do {
        await getText();
        var again = await inquirer.prompt({
            type: "input",
            name: "restart",
            message: "Do you want to try again? Press Y or N: ",
        });
    } while (again.restart == "y" || again.restart == "Y");
}
await welcome();
startAgain();
