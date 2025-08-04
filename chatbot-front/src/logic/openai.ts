export async function fetchOpenAIResponse(input: string): Promise<string> {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: input
            },
          ],
        })
      });
  
      const data = await response.json()
      return data.choices[0].message.content
    } catch (error) {
      console.error('Error:', error)
      throw new Error('Failed to fetch OpenAI response')
    }
  }