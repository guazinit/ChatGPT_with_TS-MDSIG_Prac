import dotenv from 'dotenv';
import { createOpenAiClient, getOpenAiResponse } from './openaiClient';
import { createHistoryManager } from './historyManager';
import { createReadlineInterface, getUserInput, displayAiResponse, printSeparator, closeReadline } from './userInterface';

// 載入 .env 檔案
dotenv.config();

// 從環境變數取得 API 金鑰
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('Error: 未找到 API 金鑰。請在 .env 檔案中設置 OPENAI_API_KEY！');
  process.exit(1);
}

// 初始化 OpenAI 和 readline 及對話歷史管理器
const openai = createOpenAiClient(apiKey);
const rl = createReadlineInterface();
const historyManager = createHistoryManager(10);  // 設置最大歷史長度

// 主邏輯：與使用者互動並調用 OpenAI API
async function main() {
  while (true) {
    const userInput = await getUserInput(rl);
    if (userInput.toLowerCase() === 'exit') {
      console.log('AI: Goodbye!');
      printSeparator();
      break;
    }

    // 將用戶輸入加入歷史
    historyManager.addMessage('user', userInput);

    // 獲取 AI 回應
    const aiResponse = await getOpenAiResponse(openai, historyManager.getHistory());
    if (aiResponse) {
      displayAiResponse(aiResponse);
      // 將 AI 的回應加入歷史
      historyManager.addMessage('assistant', aiResponse);
    } else {
      console.log('AI: 發生錯誤，請稍後再試。');
    }

    printSeparator();
  }

  closeReadline(rl);
}

// 啟動主程式
main();
