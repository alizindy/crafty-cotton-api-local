import { Test, TestingModule } from '@nestjs/testing';
import { CreatorsPublicService } from './creators-public.service';

describe('CreatorsPublicService', () => {
  let service: CreatorsPublicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreatorsPublicService],
    }).compile();

    service = module.get<CreatorsPublicService>(CreatorsPublicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
