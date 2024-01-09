// Import the necessary modules from the OpenAI package
const { Configuration, OpenAIApi } = require("openai");

// Set up the configuration with your API key
// It's best practice to store sensitive data like API keys in environment variables
const configuration = new Configuration({
  apiKey: "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",
});

// Create an instance of the OpenAI API
const openai = new OpenAIApi(configuration);

// Function to send a message to OpenAI and get a response
async function sendMsgToOpenAi(message) {
  try {
    // Making the API call
    const response = await openai.createCompletion({
      model: "text-davinci-003", // Specify the model
      prompt: message, // The input text prompt
      temperature: 0.7, // Controls randomness
      max_tokens: 256, // Limit the length of the generated text
      top_p: 1,
      frequency_penalty: 0,
    });

    // Returning the text response
    return response.data.choices[0].text;
  } catch (error) {
    // Error handling
    console.error("Error in sending message to OpenAI:", error);
    throw error; // Rethrow the error for further handling if necessary
  }
}

// Export the function for use in other parts of your application
module.exports = { sendMsgToOpenAi };
