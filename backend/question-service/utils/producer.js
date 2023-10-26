const {Kafka} = require('kafkajs')

const kafka = new Kafka({
    clientId: 'question-service',
    brokers: ['kafka:9092']
})

const producer = kafka.producer()

const produce = async() => {
    await producer.send({
        topic: 'questions',
        messages: [
            {
                value: 'hello consumer'
            },
        ],
    })
    console.log("message sent successfully")
}

const run = async () => {
    await producer.connect();  
    produce();
}

module.exports = {
    run
}