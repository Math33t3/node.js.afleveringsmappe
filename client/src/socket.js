
const {io} = require("socket.io-client")

const socket = new io("http://localhost:8080", {
    autoConnect: false,
    withCredentials: true
});

module.exports = { socket };