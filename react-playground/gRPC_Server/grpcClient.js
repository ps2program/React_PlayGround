// grpcClient.js
import { grpc } from '@improbable-eng/grpc-web';
import { HelloRequest, HelloReply } from './protos/helloworld_pb';
import { Greeter } from './protos/helloworld_grpc_web_pb';

// Define the gRPC client
const client = new Greeter('http://localhost:8080');

export const sayHello = (name) => {
  return new Promise((resolve, reject) => {
    const request = new HelloRequest();
    request.setName(name);

    client.sayHello(request, {}, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response.getMessage());
      }
    });
  });
};

