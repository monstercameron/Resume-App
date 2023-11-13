const amqp = require('amqplib');

async function sendMessage(queue, message) {
    // Connect to RabbitMQ server
    const connection = await amqp.connect('amqp://localhost');

    // Create a channel
    const channel = await connection.createChannel();

    // Ensure the queue exists (RabbitMQ will create it if not)
    await channel.assertQueue(queue, {
        durable: false  // set to true if you need the messages and queue to be persistent
    });

    // Send a message to the queue
    channel.sendToQueue(queue, Buffer.from(message));
    console.log(" [x] Sent '%s'", message);

    // Close the channel and connection
    await channel.close();
    await connection.close();
}

// Usage
sendMessage('education_history', JSON.stringify({"education_history": [
      {
        "institution": "University of British Columbia",
        "location": "Vancouver, BC",
        "degree": "BS Candidate/Statistics Major",
        "graduation_date": "December 2015",
        "GPA": "87.6/100"
      },
      {
        "institution": "Suffolk University",
        "location": "Boston, MA",
        "degree": "BS Candidate/Physics and Computer Science Majors (transferred out)",
        "GPA": "3.964",
        "honors_program": "Undergraduate Honors Program"
      }
    ]
  })
  ).catch(console.error);
