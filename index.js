import 'dotenv/config';

import OpenAI from 'openai';

const openAI = new OpenAI();

const results = await openAI.chat.completions.create({
  model: 'gpt-3.5-turbo',
  messages: [
    {
      role: 'system', // system means context of the conversation
      content: 'car mechanic',
    },
    {
      role: 'user', // user means user question. based on this question, the AI will generate the answer
      content: 'What are the best drawing tools?',
    },
  ],
});

console.log(results.choices[0].message.content);
