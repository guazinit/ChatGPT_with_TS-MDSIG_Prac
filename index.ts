import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: 'INSERT OPENAI API KEY HERE',
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

getOpenAiResponse('INSERT YOUR QUESTION HERE');





