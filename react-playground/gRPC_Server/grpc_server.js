// server.js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Load the protobuf file
const PROTO_PATH = path.join(__dirname, 'protos/helloworld.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

// Implement the service
const sayHello = (call, callback) => {
  callback(null, { message: `Hello, ${call.request.name}` });
};

// Create and start the gRPC server
const server = new grpc.Server();
server.addService(proto.Greeter.service, { sayHello });
const port = '127.0.0.1:50051';
server.bindAsync(port, grpc.ServerCredentials.createInsecure(), () => {
  console.log(`Server running at http://${port}`);
  server.start();
});
