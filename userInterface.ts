import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'node:process';

// 建立 readline 介面
export const createReadlineInterface = () => {
  return readline.createInterface({ input, output });
};

// 取得使用者輸入
export const getUserInput = async (rl: readline.Interface): Promise<string> => {
  return await rl.question('User: ');
};

// 輸出 AI 回應
export const displayAiResponse = (response: string) => {
  console.log(`AI: ${response}`);
};

// 輸出分隔線
export const printSeparator = () => {
  const width = process.stdout.columns || 80;
  console.log('-'.repeat(width));
};

// 結束 readline
export const closeReadline = (rl: readline.Interface) => {
  rl.close();
};
