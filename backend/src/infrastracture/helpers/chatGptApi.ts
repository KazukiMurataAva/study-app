import { OpenAIClient, AzureKeyCredential } from "@azure/openai"
import { ChatRequestMessage } from "@azure/openai"

export const fetchGptResponse = async (input: string) => {
  const endpoint: string = process.env["AZURE_OPENAI_ENDPOINT"] || '' 
  const azureApiKey: string = process.env["AZURE_OPENAI_KEY"] || ''
  
  const messages: ChatRequestMessage[] = [
    { role: "system", content: "私は大学の講義を受けているのであなたはアシスタントをしてください。" },
    { role: "user", content: input },
  ]
  
  console.log("== Chat Completions Sample ==")
  const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
  const deploymentId = "muratagpt-turbo";
  const result = await client.getChatCompletions(deploymentId, messages);

  let resultText: string = ''
  for (const choice of result.choices) {
    resultText = String(choice.message?.content)
  }
  return resultText
}


