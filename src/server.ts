import { connectDB } from "./config/mongodb";

import {app} from './index.ts';
const PORT:number = Number(process.env.LOCAL_PORT || 5001);

app.listen(PORT, () => {
	connectDB();
	console.log(`✅ Server listening on ${PORT}`);
});