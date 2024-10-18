export type Message = { role: 'system' | 'user' | 'assistant'; content: string };

export const createHistoryManager = (maxLength: number) => {
  const conversationHistory: Message[] = [
    { role: 'system', content: '你是一個友善的助手，請盡量幫助用戶解答問題。' },
  ];

  // 添加訊息到對話歷史中
  const addMessage = (role: 'user' | 'assistant', content: string) => {
    conversationHistory.push({ role, content });
    trimHistory();  // 確保歷史不超過最大長度
  };

  // 修剪對話歷史，保留最近 maxLength 條對話
  const trimHistory = () => {
    if (conversationHistory.length > maxLength) {
      conversationHistory.splice(1, conversationHistory.length - maxLength);
    }
  };

  // 獲取對話歷史
  const getHistory = (): Message[] => {
    return conversationHistory;
  };

  return {
    addMessage,
    getHistory,
  };
};
