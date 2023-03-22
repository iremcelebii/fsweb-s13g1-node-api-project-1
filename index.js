const server = require("./api/server");
const port = 9001;

// START YOUR SERVER HERE

server.listen(port, () => console.log("API running on port " + port));
