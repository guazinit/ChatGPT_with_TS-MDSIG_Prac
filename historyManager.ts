export type Message = { role: 'system' | 'user' | 'assistant'; content: string };

export const createHistoryManager = (maxLength: number) => {
  const conversationHistory: Message[] = [
    { role: 'system', content: '你是一個友善的助手並會幫助用戶解答問題。' },
  ];

  const addMessage = (role: 'user' | 'assistant', content: string) => {
    conversationHistory.push({ role, content });
    trimHistory(); 
  };

  const trimHistory = () => {
    if (conversationHistory.length > maxLength) {
      conversationHistory.splice(1, conversationHistory.length - maxLength);
    }
  };

  const getHistory = (): Message[] => {
    return conversationHistory;
  };

  return {
    addMessage,
    getHistory,
  };
};
