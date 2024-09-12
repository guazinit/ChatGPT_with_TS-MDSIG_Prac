import OpenAI from 'openai';

const client = new OpenAI
({
  apiKey: process.env['OPENAI_API_KEY'], 
});
    
async function main() 
{
  const chatCompletion = await client.chat.completions.create({
    messages: [{ role: 'user', content: 'Say this is a test' }],
    model: 'gpt-3.5-turbo',
  });
}

main();