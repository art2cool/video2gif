const Hapi = require('hapi');
const { generateGif } = require('./download-service');
const fs = require('fs');
var path = require('path');
// Create a server with a host and port
const server = Hapi.server({
  port: 8000
});

server.route({
  method: 'GET',
  path: '/ping',
  handler: async (req, h) => {
    return 'pong'
  }
});

server.route({
  method: 'GET',
  path: '/gif',
  handler: async (req, h) => {
    if (!req.query.url) return h.response('NO_URL').code(400);

    const filename = await generateGif(req.query);
    const rs = fs.createReadStream(filename);
    
    rs.on('close', () => {
      fs.unlink(filename, () => console.log(`${filename} file was removed`));
    })

    return h
      .response(rs)
      .header('Connection', 'keep-alive')
      .header('Content-Disposition', `attachment; filename="${filename}"`)
      .header('Cache-Control', 'no-cache')
      .header('Content-length', rs.length)
  }
});

// Start the server
async function start() {

  try {
    await server.start();
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('Server running at:', server.info.uri);
};

start();