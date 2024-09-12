import { readFileSync } from "fs";
import { OpenAI } from 'openai';

const rawData = readFileSync("./key.json").toString();

const APIKEY = JSON.parse(rawData).key


const openai = new OpenAI({
  apiKey: APIKEY,
});

const callOpenAI = async (prompt: string) => {
  try {
    const response = await openai.completions.create({
      model: 'gpt-3.5-turbo', 
      prompt: prompt,
      max_tokens: 100,
    });
    return response.choices[0].text;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
};

(async () => {
  try {
    const result = await callOpenAI('Hello, world!');
    console.log('OpenAI response:', result);
  } catch (error) {
    console.error('Error:', error);
  }
})();




