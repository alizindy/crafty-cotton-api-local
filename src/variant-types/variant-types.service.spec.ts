import { Test, TestingModule } from '@nestjs/testing';
import { VariantTypesService } from './variant-types.service';

describe('VariantTypesService', () => {
  let service: VariantTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VariantTypesService],
    }).compile();

    service = module.get<VariantTypesService>(VariantTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
