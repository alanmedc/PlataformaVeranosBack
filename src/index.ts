import app from "./app";
import sequelize from "./database/database";
import { PORT } from "./configs/configs";

async function main() {
    try {
        await sequelize.authenticate()
        console.log("Connection has been established succesfully.");
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        })
    } catch (error) {
        console.error('Unable to connect to database:', error);
    }
};

main();