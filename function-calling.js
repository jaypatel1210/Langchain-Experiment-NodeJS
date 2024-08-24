import openAI from './openai.js';
import math from 'advanced-calculator';

const QUESTION = process.argv[2] || 'hi';

const messages = [
  {
    role: 'user',
    content: QUESTION,
  },
];

const functions = {
  calculate({ expression }) {
    console.log('expression', expression);
    return math.evaluate(expression);
  },
  async generateImage({ prompt }) {
    const result = await openAI.images.generate({ prompt });
    console.log('Image', result);
    return (
      result.data[0].url ??
      result.data[0].b64_json ??
      result.data[0].revised_prompt
    );
  },
};

const getCompletion = messages => {
  return openAI.chat.completions.create({
    messages,
    model: 'gpt-3.5-turbo',
    temperature: 0,
    functions: [
      {
        name: 'calculate',
        description: 'Run a math expression',
        parameters: {
          type: 'object',
          properties: {
            expression: {
              type: 'string',
              description:
                'Then math expression to evaluate like "2 * 3 + (21 / 2) ^ 2"',
            },
          },
          required: ['expression'],
        },
      },
      {
        name: 'generateImage',
        description: 'Create or generate image',
        parameters: {
          type: 'object',
          properties: {
            prompt: {
              type: 'string',
              description: 'The description of the image to generate',
            },
          },
          required: ['prompt'],
        },
      },
    ],
  });
};

let response;
while (true) {
  response = await getCompletion(messages);
  console.log('Response Reason', response.choices[0].finish_reason);
  if (response.choices[0].finish_reason == 'stop') {
    console.log('Finish Reason', response.choices[0].message.content);
    break;
  } else if (response.choices[0].finish_reason == 'function_call') {
    const fnName = response.choices[0].message.function_call.name;
    const args = response.choices[0].message.function_call.arguments;

    console.log('FnName', fnName);
    console.log('args', args);

    const funcToCall = functions[fnName];
    const params = JSON.parse(args);

    const result = await funcToCall(params);

    messages.push({
      role: 'assistant',
      content: null,
      function_call: {
        name: fnName,
        arguments: args,
      },
    });

    messages.push({
      role: 'function',
      name: fnName,
      content: JSON.stringify({ result }),
    });
  }
}
