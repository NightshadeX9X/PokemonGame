import express from 'express';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = 2208;
const dirname = path.resolve();

app.use(express.json());

app.get('/', (req, res) => res.sendFile(`${dirname}/public/index.html`));

app.get('/items', async (req, res) => {
	const fileNames = await fs.promises.readdir(`${dirname}/js/public/items/definitions`)
	res.json(fileNames);
})

app.use(express.static(`${dirname}/public`));
app.use('/js', express.static(`${dirname}/js/public`));
app.use('/UI', express.static(`${dirname}/UI/js`));

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`))