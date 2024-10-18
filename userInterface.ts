import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'node:process';

export const createReadlineInterface = () => {
  return readline.createInterface({ input, output });
};

export const getUserInput = async (rl: readline.Interface): Promise<string> => {
  return await rl.question('User: ');
};

export const displayAiResponse = (response: string) => {
  console.log(`AI: ${response}`);
};

export const printSeparator = () => {
  const width = process.stdout.columns || 80;
  console.log('-'.repeat(width));
};

export const closeReadline = (rl: readline.Interface) => {
  rl.close();
};
