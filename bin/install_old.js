#!/usr/bin/env node
/*
import Enquirer from 'enquirer'
const enquirer = new Enquirer()
const prompt = Enquirer.prompt
console.log('Installing Tauque bundler...')

console.log(Enquirer)

const questions = [{
  type: 'select',
  name: 'platform',
  message: 'Which platforms are you targeting?',
  choices: ['Node', 'Browser', 'Both']
}]

const questions2 = [{

}]

runPrompts()

async function runPrompts () {
  //const result = await prompt(questions)
  //console.log(result)

  const response = await enquirer.prompt({
    type: 'input',
    name: 'username',
    message: 'What is your username?\n',
    initial: 'package'
  });
  console.log(response);
}

const Select = Enquirer.Select

const prompt2 = new Select({
  name: 'color',
  message: 'Pick a flavor',
  choices: ['apple', 'grape', 'watermelon', 'cherry', 'orange']
});

//prompt2.run()
//  .then(answer => console.log('Answer:', answer))
//  .catch(console.error);


/*
;(async () => {
  const question = [
    {
      type: 'input',
      name: 'username',
      message: 'What is your username?',
      initial: 'helllo tehrerer'
    },
    {
      type: 'password',
      name: 'password',
      message: 'What is your password?'
    }
  ];
let answers = await prompt(question);
console.log(answers);
})()
*/
