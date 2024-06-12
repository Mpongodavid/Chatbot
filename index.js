const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.get('/typli', async (req, res) => {
	const prompt = req.query.prompt;

	if (!prompt) {
		return res.status(400).json({ error: 'Prompt is required' });
	}

	const url = "https://typli.ai/api/generators/completion";
	const headers = {
		"Content-Type": "application/json",
		"Authorization": "Bearer undefined"
	};
	const data = {
		"prompt": prompt,
		"temperature": 1.2
	};

	try {
		const response = await axios.post(url, data, { headers });

		if (response.status === 200) {
			return res.json({ answer: response.data });
		} else {
			return res.status(500).json({ error: 'Failed to generate text. Please try again later.' });
		}
	} catch (error) {
		return res.status(500).json({ error: 'Failed to generate text. Please try again later.' });
	}
});

app.listen(port, () => {
  console.log(`Server is is keep Alive:${port}`);
});