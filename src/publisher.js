const amqp = require('amqplib');

let message = {
  message: JSON.parse(process.argv[2])
}

connect()
async function connect() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createConfirmChannel();
    const result = await channel.assertQueue('jobs');
    channel.sendToQueue("jobs", Buffer.from(JSON.stringify(message)));
    console.log('Job Sent')
  } catch (err){
    console.error(err);
  }
}

