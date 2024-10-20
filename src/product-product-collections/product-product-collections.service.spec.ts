import { Test, TestingModule } from '@nestjs/testing';
import { ProductProductCollectionsService } from './product-product-collections.service';

describe('ProductProductCollectionsService', () => {
  let service: ProductProductCollectionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductProductCollectionsService],
    }).compile();

    service = module.get<ProductProductCollectionsService>(ProductProductCollectionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
