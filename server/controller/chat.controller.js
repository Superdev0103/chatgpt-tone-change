const { Configuration, OpenAIApi } = require('openai');
const dotenv = require('dotenv');
const Filter = require('bad-words');

const filter = new Filter();
dotenv.config();

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const clearChat = async (req, res) => {
    await openai.createCompletion({
        model: 'gpt-3.5-turbo',
        prompt: 'Forget all our chat content.',
        temperature: 0.7,
        max_tokens: 256,
    });
};

const responseChat = async (req, res) => {    
    try {
        // Call OpenAI API
        const prompt = req.body;
    
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: prompt,
            temperature: 0,
            max_tokens: 1024,
        });
    
        const botAnswer = response.data.choices[0].message.content;
        res.status(200).send({
            bot: botAnswer,
        });
    } catch (error) {
        // Log error and return a generic error message
        console.error(error);
        res.status(500).send({
            error: 'Something went wrong',
        });
    }
};

module.exports = { clearChat, responseChat };