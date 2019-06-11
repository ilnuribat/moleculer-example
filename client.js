const { ServiceBroker } = require('moleculer');

const broker = new ServiceBroker({
  nodeID: 'client',
  transporter: 'redis://localhost:6379',
});

broker.createService({
  name: 'client',
  actions: {
    ping() {
      return 'pong';
    },
  },
});

broker.start()
  .then(() => console.log('client service started'));
