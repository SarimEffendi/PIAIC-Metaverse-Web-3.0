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
    let rainbowTitle = chalkAnimation.rainbow("Welcome!!! to quiz game  made by Sarim Effendi");
    await sleep();
    rainbowTitle.stop();
}
interface Answers {
    ques1: string;
    ques2: string;
    ques3: string;
    ques4: string;
    ques5: string;
    ques6: string;
    ques7: string;
    ques8: string;
    ques9: string;
    ques10: string;
}

const questions = [
    {
        type: 'list',
        name: 'ques1',
        message: 'What does CPU stand for?',
        choices: ['Central Processing Unit', 'Central Processing Usage', 'Central Processing Users', 'Central Processing Utility'],
    },
    {
        type: 'list',
        name: 'ques2',
        message: 'What does GPU stand for?',
        choices: ['Graphical Processing Unit', 'Graphics Processing Usage', 'Graphics Processing Users', 'Graphics Processing Utility'],
    },
    {
        type: 'list',
        name: 'ques3',
        message: 'What does RAM stand for?',
        choices: ['Random Access Memory', 'Random Access Module', 'Random Access Message', 'Random Access Method'],
    },
    {
        type: 'list',
        name: 'ques4',
        message: `What is the term used to describe the speed of a computer's processing power?`,
        choices: ['Bandwidth', 'Storage', 'Clock speed', 'Latency'],
    },
    {
        type: 'list',
        name: 'ques5',
        message: 'What type of software is used to manage and organize data in a database?',
        choices: ['Spreadsheet software'
            , 'Database management software'
            , 'Image editing software'
            , 'Video editing software'],
    },
    {
        type: 'list',
        name: 'ques6',
        message: 'What is the most popular and widely used operating system in the world?',
        choices: ['Windows'
            , 'iOS'
            , 'macOS'
            , 'Linux'],
    },
    {
        type: 'list',
        name: 'ques7',
        message: 'What type of programming language is used for building web applications?',
        choices: [ 'Java'
            , 'Python'
            , 'C++'
            , 'JavaScript'],
    },
    {
        type: 'list',
        name: 'ques8',
        message: 'What is the term used for a group of interconnected computer systems that share data and resources?',
        choices: [ 'Network'
            , 'Router'
            , 'Hub'
            , 'Switch'],
    },
    {
        type: 'list',
        name: 'ques9',
        message: 'What type of algorithm is used to sort data efficiently in a computer program?',
        choices: ['Linear search algorithm'
            , 'Binary search algorithm'
            , 'Bubble sort algorithm'
            , 'Quick sort algorithm'],
    },
    {
        type: 'list',
        name: 'ques10',
        message: 'What is the most commonly used programming language for artificial intelligence and machine learning?',
        choices: [ 'Python'
            , 'R'
            , 'C++'
            , 'Java'],
    },
];

const startQuiz = async (): Promise<void> => {
    let note = chalkAnimation.rainbow("'NOTE: if your spelling is incorrect then it is considered as wrong answer'");
note.start();
note.stop();
    let score = 0;
    let questionNo = 0;

    const playingAnswers = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'playing',
            message: 'Do you want to play the quiz game?',
            default: true,
        },
    ]);

    if (playingAnswers.playing) {
        const answers = await inquirer.prompt<Answers>(questions);
        questionNo = 10;

        if (answers.ques1 === 'Central Processing Unit') {
            score += 1;
            console.log("correct "+answers.ques1);
            
        }
        if (answers.ques2 === 'Graphical Processing Unit') {
            score += 1;
            console.log("correct "+answers.ques2);
        }
        if (answers.ques3 === 'Random Access Memory') {
            score += 1;
            console.log("correct "+answers.ques3);
        }
        if (answers.ques4 === 'Clock speed') {
            score += 1;
            console.log("correct "+answers.ques4);
        }
        if (answers.ques5 === 'Database management software') {
            score += 1;
            console.log("correct "+answers.ques5);
        }
        if (answers.ques6 === 'Windows') {
            score += 1;
            console.log("correct "+answers.ques6);
        }
        if (answers.ques7 === 'JavaScript') {
            score += 1;
            console.log("correct "+answers.ques7);
        }if (answers.ques8 === 'Network') {
            score += 1;
            console.log("correct "+answers.ques8);
        }
        if (answers.ques9 === 'Quick sort algorithm') {
            score += 1;
            console.log("correct "+answers.ques9);
        }
        if (answers.ques10 === 'Python') {
            score += 1;
            console.log("correct "+answers.ques10);
        }
        console.log(chalk.yellow(`\nNumber of questions: ${questionNo}`));
        console.log(chalk.yellow(`Your score: ${score}`));
        const percentage = (score * 100) / questionNo;
        console.log(chalk.yellow(`${percentage}% questions are correct.`));

        const playAgainAnswers = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'playAgain',
                message: 'Do you want to play again?',
                default: false,
            },
        ]);

        if (playAgainAnswers.playAgain) {
            startQuiz();
        } else {
            console.log(chalk.yellow('Thank you for visiting!'));
        }
    } else {
        console.log(chalk.yellow('Thank you for visiting!'));
    }
};
await welcome();
startQuiz();
