import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: 'INSERT OPENAI API KEY HERE',
});

async function getOpenAiResponse(prompt: string) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',  // 可以選擇 gpt-3.5-turbo 或 gpt-4 喵
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 100,
    });

    console.log(response.choices[0].message.content);
  } catch (error) {
    console.error('Error:', error);
  }
}

// 測試函數，這裡可以輸入你的問題喵
getOpenAiResponse('告訴我一個笑話喵！');





