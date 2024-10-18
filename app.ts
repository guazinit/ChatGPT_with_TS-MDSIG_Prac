import dotenv from 'dotenv';
import { createOpenAiClient, getOpenAiResponse } from './openaiClient';
import { createHistoryManager } from './historyManager';
import { createReadlineInterface, getUserInput, displayAiResponse, printSeparator, closeReadline } from './userInterface';

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('Error: 未找到 API 金鑰。請在 .env 檔案中設置 OPENAI_API_KEY！');
  process.exit(1);
}

const openai = createOpenAiClient(apiKey);
const rl = createReadlineInterface();
const historyManager = createHistoryManager(10);

async function main() {
  while (true) {
    const userInput = await getUserInput(rl);
    if (userInput.toLowerCase() === 'exit') {
      console.log('AI: Goodbye!');
      printSeparator();
      break;
    }

    historyManager.addMessage('user', userInput);

    const aiResponse = await getOpenAiResponse(openai, historyManager.getHistory());
    if (aiResponse) {
      displayAiResponse(aiResponse);
      historyManager.addMessage('assistant', aiResponse);
    } else {
      console.log('AI: 發生錯誤，請稍後再試。');
    }

    printSeparator();
  }

  closeReadline(rl);
}

main();
