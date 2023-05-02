module.exports.start = () => {
    const app = require("./express")();

    app.listen(app.get("port"), (err, res) => {
        console.log(`Server listening on port ${app.get("port")}...`);
    });
};
