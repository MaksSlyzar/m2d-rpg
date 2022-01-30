module.exports = {
  name: "helloworld", // Event name
  execute (socket, data, io) {
    console.log("hello world", data);
  } 
}