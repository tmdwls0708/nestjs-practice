import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

// @Injectable() // 컨트롤러는 DI 컨테이너에 등록하지 않음.
@Controller('messages')
export class MessagesController {
  constructor(
    private messagesService: MessagesService,
    private messagesService2: MessagesService,
    private messagesService3: MessagesService,
  ) {
    // DI 컨테이터에는 인스턴스는 1개만 생성되고, 그 인스턴스를 공유한다.
    // (매번 인스턴스 생성하는 방법 있음)
    console.log(messagesService === messagesService2);
    console.log(messagesService === messagesService3);
  }

  @Get()
  listMessages() {
    return this.messagesService.findAll();
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    console.log('body: ', body);
    return this.messagesService.create(body.content);
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    console.log('id: ', id);
    const message = await this.messagesService.findOne(id);
    if (!message) {
      throw new NotFoundException('message not found');
    }
    return message;
  }
}
