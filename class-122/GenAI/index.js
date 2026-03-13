import "dotenv/config";
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, AIMessage } from "@langchain/core/messages";

const rl = readline.createInterface({ input, output });

const model = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY
});

const messages = [];

while (true) {

  const userInput = await rl.question("You: ");

  if (userInput.toLowerCase() === "exit") break;

  // user message add
  messages.push(new HumanMessage(userInput));

  // model response
  const response = await model.invoke(messages);

  console.log("MistralAI:", response.content);

  // AI message store
  messages.push(new AIMessage(response.content));

}

rl.close();