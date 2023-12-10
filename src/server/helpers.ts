import crypto from "crypto";
import { Buffer } from "buffer";
import {
  Connection,
  ReceiverEvents,
  isAmqpError,
  parseConnectionString,
} from "rhea-promise";
import type { AmqpError, ConnectionOptions } from "rhea-promise";

function generateSasToken(
  resourceUri: string,
  signingKey: string,
  policyName: string,
  expiresInMins: number,
) {
  resourceUri = encodeURIComponent(resourceUri);

  const expiresInSeconds = Math.ceil(Date.now() / 1000 + expiresInMins * 60);
  const toSign = resourceUri + "\n" + expiresInSeconds;

  // Use the crypto module to create the hmac.
  const hmac = crypto.createHmac("sha256", Buffer.from(signingKey, "base64"));
  hmac.update(toSign);
  const base64UriEncoded = encodeURIComponent(hmac.digest("base64"));

  // Construct authorization string.
  return `SharedAccessSignature sr=${resourceUri}&sig=${base64UriEncoded}&se=${expiresInSeconds}&skn=${policyName}`;
}

export async function convertIotHubToEventHubsConnectionString(
  connectionString: string,
) {
  // eslint-disable-next-line
  // @ts-ignore
  const { HostName, SharedAccessKeyName, SharedAccessKey } =
    parseConnectionString(connectionString);

  // Verify that the required info is in the connection string.
  if (!HostName || !SharedAccessKey || !SharedAccessKeyName) {
    throw new Error(`Invalid IotHub connection string.`);
  }

  //Extract the IotHub name from the hostname.
  const [iotHubName] = (HostName as string).split(".");

  if (!iotHubName) {
    throw new Error(
      `Unable to extract the IotHub name from the connection string.`,
    );
  }

  // Generate a token to authenticate to the service.
  // The code for generateSasToken can be found at https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-devguide-security#security-tokens
  const token = generateSasToken(
    `${HostName}/messages/events`,
    SharedAccessKey as string,
    SharedAccessKeyName as string,
    5, // token expires in 5 minutes
  );
  const connectionOptions = {
    transport: "tls",
    host: HostName as string,
    hostname: HostName as string,
    username: `${SharedAccessKeyName}@sas.root.${iotHubName}`,
    port: 5671,
    reconnect: false,
    password: token,
  };

  const connection = new Connection(connectionOptions as ConnectionOptions);
  await connection.open();

  // Create the receiver that will trigger a redirect error.
  const receiver = await connection.createReceiver({
    source: { address: `amqps://${HostName}/messages/events/$management` },
  });

  return new Promise((resolve, reject) => {
    receiver.on(ReceiverEvents.receiverError, (context) => {
      const error = context.receiver ? context.receiver.error : context.error;
      // eslint-disable-next-line
      // @ts-ignore
      if (
        isAmqpError(error) &&
        (error as AmqpError)?.condition === "amqp:link:redirect"
      ) {
        // eslint-disable-next-line
        const hostname =
          (error as AmqpError).info &&
          ((error as AmqpError).info.hostname as string); // eslint-disable-line
        // eslint-disable-next-line
        const parsedAddress = ((error as AmqpError).info.address as string) // eslint-disable-line
          .match(/5671\/(.*)\/\$management/i) as RegExpMatchArray;

        if (!hostname) {
          reject(error);
        } else if (
          parsedAddress == undefined ||
          (parsedAddress && parsedAddress[1] == undefined)
        ) {
          // eslint-disable-next-line
          const msg =
            `Cannot parse the EventHub name from the given address: ${
              (error as AmqpError).info.address // eslint-disable-line
            } in the error: ` +
            `${(error as Error).stack}\n${JSON.stringify(
              (error as AmqpError).info,
            )}.\nThe parsed result is: ${JSON.stringify(parsedAddress)}.`;
          reject(Error(msg));
        } else {
          const entityPath = parsedAddress[1];
          resolve(
            `Endpoint=sb://${hostname}/;EntityPath=${entityPath};SharedAccessKeyName=${SharedAccessKeyName};SharedAccessKey=${SharedAccessKey}`,
          );
        }
      } else {
        reject(error);
      }
      connection.close().catch(() => {
        /* ignore error */
      });
    });
  });
}
