const Koa = require('koa');
const { ServiceBroker } = require('moleculer');

const broker = new ServiceBroker({
  nodeID: 'gateway',
  transporter: 'redis://localhost:6379',
});

const HTTP_PORT = 3000;
const app = new Koa();

broker.createService({
  name: 'ping',
  actions: {
    ping() {
      return 'pong';
    },
  },
});


app.use(async (ctx) => {
  ctx.body = 'Hello world';
});

app.listen(3000, () => {
  console.log(`server started at port ${HTTP_PORT}`);
  broker
    .start()
    .then(() => broker.call('client.ping'))
    .then(res => console.log('res', res))
    .catch(err => console.error(err));
});
