import app from "./app.ts";
import 'dotenv/config'

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});