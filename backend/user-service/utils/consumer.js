const {Kafka} = require('kafkajs');

const kafka = new Kafka({
    clientId: 'user-service',
    brokers: ['kafka:9092']
})

const consumer = kafka.consumer({groupId: 'user-group'})

const run = async () => {
    await consumer.connect();
    await consumer.subscribe({topic: 'questions', fromBeginning: true})
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log("****************** Arrived in Consumer ******************")
            const obj = message.value.toString()
            console.log({
                partition,
                offset: message.offset,
                value: obj
            })
        },
    })
}

module.exports = {
    run
}