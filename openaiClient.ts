import OpenAI from 'openai';

export const createOpenAiClient = (apiKey: string) => {
  return new OpenAI({ apiKey });
};

export const getOpenAiResponse = async (
  openai: OpenAI,
  conversationHistory: { role: 'system' | 'user' | 'assistant'; content: string }[]
): Promise<string | null> => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: conversationHistory,
      max_tokens: 150, 
    });
    return response.choices[0].message?.content ?? 'No response.';
  } catch (error) {
    console.error('Error while communicating with OpenAI:', error);
    return null;
  }
};
