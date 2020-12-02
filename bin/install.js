#!/usr/bin/env node
import prompts from 'prompts'

/*
Need to get name and main file from package.json
global name can be same as package name?
*/

console.log('Prompts running...')

;(async () => {
  const response = await prompts([{
    type: 'number',
    name: 'value',
    message: 'How old are you?',
    validate: value => value < 18 ? `Nightclub is 18+ only` : true
  }, {
    type: 'select',
    name: 'value',
    message: 'Pick a color',
    choices: [
      { title: 'Red', description: 'This option has a description', value: '#ff0000' },
      { title: 'Green', value: '#00ff00', disabled: false },
      { title: 'Blue', value: '#0000ff' }
    ],
    initial: 1
  }]);

  console.log(response); // => { value: 24 }
})();