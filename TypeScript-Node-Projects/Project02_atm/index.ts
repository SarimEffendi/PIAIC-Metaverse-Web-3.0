#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

let balance:number;
const accounts = [
    {
        accountNum: "1",
        name: "sarim",
        currentBalance: 150000,
        pin: "4321"
    },
    {
        accountNum: "2",
        name: "bilal",
        currentBalance: 10000,
        pin: "4444"
    },
    {
        accountNum: "3",
        name: "hammad",
        currentBalance: 20000,
        pin: "123"
    },
    {
        accountNum: "4",
        name: "moosa",
        currentBalance: 17000,
        pin: "321"
    },
    {
        accountNum: "5",
        name: "najeeb",
        currentBalance: 40000,
        pin: "432"
    },

];
const accnum1 = accounts[0].accountNum;
const accnum2 = accounts[1].accountNum;
const accnum3 = accounts[2].accountNum;
const accnum4 = accounts[3].accountNum;
const accnum5 = accounts[4].accountNum;
let logout = false;

const sleep = () => {
    return new Promise((res) => {
        setTimeout(res, 2000);
    });
};

async function welcome() {
    console.clear();
    let rainbowTitle = chalkAnimation.rainbow("Welcome!! to ATM made by Sarim");
    await sleep();
    rainbowTitle.stop();
}
async function login() {
    console.clear();
    let tries = 3;
    let failed = false;
    while (tries > 0) {
        const credential = await inquirer.prompt([
            {
                type: "input",
                name: "accNum",
                message: "Enter your account number: ",
            },
            {
                type: "input",
                name: "accPin",
                message: "Enter your account pin: ",
            },
        ]);


        if (accounts.find(a => a.accountNum === credential.accNum) && accounts.find(a => a.pin === credential.accPin)) {
            if (credential.accNum == accnum1) {
                balance = accounts[0].currentBalance;
            } else if (credential.accNum == accnum2) {
                balance = accounts[1].currentBalance;
            } else if (credential.accNum == accnum3) {
                balance = accounts[2].currentBalance;
            } else if (credential.accNum == accnum4) {
                balance = accounts[3].currentBalance;
            } else if (credential.accNum == accnum5) {
                balance = accounts[4].currentBalance;
            }
            failed = false;
            start();
            break;
        } else {
            if (tries > 1) {
                console.log(
                    chalk.redBright("Invalid account number or pin! Try again..")
                );
            }
            failed = true;
        }
        tries--;
    }

    if (failed) {
        console.log(
            chalk.redBright(
                "You failed to enter correct account number and pin for 3 times.\nSystem closing. Bye!"
            )
        );
    }
}
async function withdraw(balance: number) {
    console.clear();
    const amount = await inquirer.prompt([
        {
            type: "number",
            name: "money",
            message: "Enter how much amount you want to withdraw: ",
        },
    ]);
    if (amount.money <= balance) {
        balance = balance - amount.money;
        console.log(
            chalk.greenBright(
                `Withdrawing ${amount.money} from account. Your new balance is ${balance}.`
            )
        );
    } else {
        console.log(
            chalk.redBright(
                `Insufficient balance in account to withdraw. Your current balance is ${balance}.`
            )
        );
    }
}

function checkAccount(accountNum: string) {
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].accountNum == accountNum) {
            return i;
        }
    }
    return -1;
}

async function transfer(balance: number) {
    console.clear();
    const person = await inquirer.prompt([
        {
            type: "input",
            name: "accountName",
            message: "Enter account number in which you want to transfer money: ",
        },
    ]);
    let id = checkAccount(person.accountName);
    if (id != -1) {
        const amount = await inquirer.prompt([
            {
                type: "number",
                name: "money",
                message: `Enter amount you want to transfer money to ${accounts[id].name}:`,
            },
        ]);
        if (amount.money <= balance) {
            balance = balance - amount.money;
            console.log(
                chalk.greenBright(
                    `Tranferring ${amount.money} from your account to to ${accounts[id].name}. Your new balance is ${balance}.`
                ));
        } else {
            console.log(
                chalk.redBright(
                    `Insufficient balance in account to transfer. Your current balance is ${balance}.`
                )
            );
        }
    } else {
        console.log(chalk.redBright("This account doesn't exits."));
    }
}

async function mainMenu(balance: number) {
    const answer = await inquirer.prompt([
        {
            type: "list",
            name: "option",
            message: "Select any option: ",

            choices: ["View Balance", "Withdraw Money", "Transfer Money", "Logout"],
        },
    ]);

    if (answer.option == "View Balance") {
        console.log(chalk.greenBright(`Your account balance is ${balance}.`));
    } else if (answer.option == "Withdraw Money") {
        await withdraw(balance);
    } else if (answer.option == "Transfer Money") {
        await transfer(balance);
    } else if (answer.option == "Logout") {
        logout = true;
        balance=0;
        return;
    }
}

async function start() {
    console.clear();
    do {
        await mainMenu(balance);
    } while (!logout);
    main();
}



async function main() {
    console.clear();
    await welcome();
    const selection = await inquirer.prompt([
        {
            type: "list",
            name: "option",
            message: "Select option: ",
            choices: ["Login", "Exit"],
        },
    ]);

    if (selection.option == "Login") {
        login();
    } else if (selection.option == "Exit") {
        console.log(chalk.redBright("System closing. Bye!"));
    }
}

main();