import OpenAI from 'openai';
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import dotenv from 'dotenv';

// 載入 .env 檔案
dotenv.config();

// 從環境變數取得 API 金鑰
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('Error: 未找到 API 金鑰。請在 .env 檔案中設置 OPENAI_API_KEY ！');
  process.exit(1);
}

// 初始化 OpenAI
const openai = new OpenAI({ apiKey });

// 建立 readline 介面
const rl = readline.createInterface({ input, output });

// 發送請求的函數，只返回回應
async function getOpenAiResponse(prompt: string): Promise<string | null> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 100,
    });
    return response.choices[0].message?.content ?? "No response.";
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

// 根據終端寬度動態顯示分隔線
function printSeparator() {
  const width = process.stdout.columns || 80;
  console.log('-'.repeat(width));
}

// 主函數：處理互動
async function main() {
  while (true) {
    const userInput = await rl.question('User: ');
    if (userInput.toLowerCase() === 'exit') {
      console.log('AI: Goodbye!');
      printSeparator();
      break;
    }

    const aiResponse = await getOpenAiResponse(userInput);
    if (aiResponse) {
      console.log(`AI: ${aiResponse}`);
    } else {
      console.log('AI: 發生錯誤，請稍後再試。');
    }

    printSeparator();
  }

  rl.close();
}

// 啟動主程式
main();

