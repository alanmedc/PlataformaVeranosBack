import app from "./app";
import { PORT } from "./configs/configs";

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});