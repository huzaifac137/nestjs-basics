import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { TaskStatus } from '../taskStatus.enum';

export class TaskStatusValidation implements PipeTransform {
  private TaskSTatuses =[
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN,
  ];

  transform(val: any, metadata: ArgumentMetadata) {
    const value = val.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is not valid value`);
    }

    return value;
  }

  private isStatusValid(Status: any) {
    const idx = this.TaskSTatuses.indexOf(Status);
    return idx !== -1;
  }
}
