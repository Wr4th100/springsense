/*
 * Microsoft Sample Code - Copyright (c) 2020 - Licensed MIT
 */

// const { EventHubProducerClient, EventHubConsumerClient } = require('@azure/event-hubs');
import {
  EventHubConsumerClient,
  EventHubProducerClient, // eslint-disable-line
} from "@azure/event-hubs";
import { convertIotHubToEventHubsConnectionString } from "@/server/helpers";

class EventHubReader {
  iotHubConnectionString: string;
  consumerGroup: string;

  receiveHandlers: any[] = []; // eslint-disable-line
  // eslint-disable-next-line
  // @ts-ignore
  consumerClient: EventHubConsumerClient; // eslint-disable-line

  constructor(iotHubConnectionString: string, consumerGroup: string) {
    this.iotHubConnectionString = iotHubConnectionString;
    this.consumerGroup = consumerGroup;
  }

  async startReadMessage(
    startReadMessageCallback: (
      message: string,
      date: Date,
      deviceId: string,
    ) => void,
  ) {
    try {
      const eventHubConnectionString =
        (await convertIotHubToEventHubsConnectionString(
          this.iotHubConnectionString,
        )) as string;
      const consumerClient = new EventHubConsumerClient(
        this.consumerGroup,
        eventHubConnectionString,
      );
      console.log(
        "Successfully created the EventHubConsumerClient from IoT Hub event hub-compatible connection string.",
      );

      const partitionIds = await consumerClient.getPartitionIds();
      console.log("The partition ids are: ", partitionIds);

      consumerClient.subscribe({
        // eslint-disable-next-line
        processEvents: async (events, context) => {
          // eslint-disable-next-line
          for (let i = 0; i < events.length; ++i) {
            startReadMessageCallback(
              events[i]?.body, // eslint-disable-line
              events[i]?.enqueuedTimeUtc ?? new Date(), // eslint-disable-line
              events[i]?.systemProperties?.["iothub-connection-device-id"], // eslint-disable-line
            );
          }
        },
        // eslint-disable-next-line
        processError: async (err, context) => {
          console.error(err.message || err);
        },
      });
    } catch (ex) {
      console.error((ex as Error).message || ex);
    }
  }

  // Close connection to Event Hub.
  async stopReadMessage() {
    // eslint-disable-next-line
    // @ts-ignore
    const disposeHandlers = [];
    this.receiveHandlers.forEach((receiveHandler) => {
      // eslint-disable-next-line
      disposeHandlers.push(receiveHandler.stop());
    });
    // eslint-disable-next-line
    // @ts-ignore
    await Promise.all(disposeHandlers);
    // eslint-disable-next-line
    this.consumerClient.close();
  }
}

module.exports = EventHubReader;
