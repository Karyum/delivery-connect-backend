import { createClient } from 'redis';
import { promisify } from 'util';
const client = createClient();
// client.keys

client.on('error', function (err) {
  console.log('error event - ' + client.host + ':' + client.port + ' - ' + err);
});

// client.set(1, JSON.stringify({
//   altitude: 72.79999542236328,
//   heading: 0,
//   longitude: 34.9916038,
//   speed: 0,
//   latitude: 32.8166318,
//   accuracy: 13.876999855041504
// }));

exports.getAsync = promisify(client.get).bind(client);
exports.keysAsync = promisify(client.keys).bind(client);
exports.setAsync = promisify(client.set).bind(client);
exports.deleteAsync = promisify(client.del).bind(client);

export default client;
