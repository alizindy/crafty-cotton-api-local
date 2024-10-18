import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreatorsService } from '../creators/creators.service';
import { Creator } from '../creators/entities/creator.entity';
import { Public } from '@/decorators/public.decorator';

@ApiTags('Creator Public')
@ApiBearerAuth('JWT')
@Controller('creators-public')
export class CreatorsPublicController {
  constructor(private readonly creatorsService: CreatorsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Retrieve all creators' })
  @ApiResponse({ status: 200, description: 'Retrieves all creators' })
  async findAll(): Promise<Creator[]> {
    return this.creatorsService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a creator by ID' })
  @ApiResponse({
    status: 200,
    description: 'Retrieves a specific creator by ID',
  })
  @ApiResponse({ status: 404, description: 'Creator not found' })
  async findOne(@Param('id') id: number): Promise<Creator> {
    return await this.creatorsService.findOne(+id).catch((err) => {
      throw new HttpException(
        { message: err.message || 'Creator not found' },
        HttpStatus.BAD_REQUEST,
      );
    });
  }
}
