import OpenAI from 'openai';
import dotenv from 'dotenv';
import readline from 'readline';

dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function getOpenAiResponse(prompt: string) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 100,
    });

    console.log(response.choices[0].message.content);
  } catch (error) {
    console.error('Error:', error);
  }
}

rl.question('請輸入您的問題：', (prompt) => {
  getOpenAiResponse(prompt);
  rl.close();
});





