import { Controller } from '@nestjs/common';
import {
  EventPattern,
  Payload,
  Ctx,
  KafkaContext,
} from '@nestjs/microservices';

@Controller()
export class KafkaConsumerController {
  @EventPattern('balances')
  async handleTopicMessage(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const originalMessage = context.getMessage();
    console.log(`Mensagem recebida: ${JSON.stringify(message)}`);
    console.log(`Partição: ${context.getPartition()}`);
    console.log(`Offset: ${originalMessage.offset}`);
  }
}
