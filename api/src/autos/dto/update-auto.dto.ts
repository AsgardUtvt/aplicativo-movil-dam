import { PartialType } from '@nestjs/mapped-types';
import { CreateAutoDto } from './create-auto.dto.js';

export class UpdateAutoDto extends PartialType(CreateAutoDto) {}
