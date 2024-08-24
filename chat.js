import openAI from './openai.js';
import readline from 'node:readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const newMessage = async (history, message) => {
  const results = await openAI.chat.completions.create({
    model: 'gpt-3.5-turbo',
    temperature: 1,
    messages: [...history, message],
  });
  return results.choices[0].message;
};

const formatMessage = userInput => ({
  role: 'user',
  content: userInput,
});

const chat = () => {
  const history = [
    {
      role: 'system',
      content: 'You are an AI assistant. Answer the user questions or else',
    },
  ];
  const start = () => {
    rl.question('You:', async userInput => {
      if (userInput.toLocaleLowerCase() == 'exit') {
        rl.close();
        return;
      }

      const message = formatMessage(userInput);
      const response = await newMessage(history, message);

      history.push(message, response);
      console.log('\n\nAI:', response.content);

      start();
    });
  };
  start();
};

console.log('Welcome to the AI chatbot. You can exit anytime by typing "exit"');
chat();
