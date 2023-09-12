import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(
    {
    database: "pfsmymko",
    username: "pfsmymko",
    password: "cQM-DoOvc-XkQwvfVGk6fyl87mZUOriQ",
    host: "bubble.db.elephantsql.com",
    dialect: "postgres",
    logging: false
});

export default sequelize;