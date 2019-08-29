const
    io = require("socket.io"),
    server = io.listen(8401);

let
    sequenceNumberByClient = new Map();

// event fired every time a new client connects:
server.on("connection", (socket) => {
    console.info(`Client connected [id=${socket.id}]`);
    // initialize this client's sequence number
    socket.on('message',(message)=>{
      sequenceNumberByClient.set(socket, message);
        })


    // when socket disconnects, remove it from the list:
    socket.on("disconnect", () => {
        sequenceNumberByClient.delete(socket);
        console.info(`Client gone [id=${socket.id}]`);
    });

});
var kafka = require('kafka-node');

let Consumer = kafka.Consumer,
    client = new kafka.KafkaClient({kafkaHost:'kafka-1:19092'}),
    consumer = new Consumer(client,
      [
        {topic: 'vehiclelocation', partition: 0}
      ],
      {
        autoCommit: false
      }
  );



consumer.on('message', (message) => {
  console.log(message.value);
  callSockets(io, message.value);
});

function callSockets(io, message){
  io.sockets.emit('update', message);
}
// sends each client its current sequence number
setInterval(() => {
    for (const [client, name] of sequenceNumberByClient.entries()) {
        client.emit("seq-num", name);
        console.log(name);
    }
}, 1000);