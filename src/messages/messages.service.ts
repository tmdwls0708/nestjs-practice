import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';

@Injectable() // 서비스를 DI 컨테이너에 등록
export class MessagesService {
  constructor(private messagesRepo: MessagesRepository) {}

  findOne(id: string) {
    return this.messagesRepo.findOne(id);
  }

  findAll() {
    return this.messagesRepo.findAll();
  }

  create(content: string) {
    return this.messagesRepo.create(content);
  }
}
