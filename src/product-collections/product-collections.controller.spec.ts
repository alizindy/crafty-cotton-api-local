import { Test, TestingModule } from '@nestjs/testing';
import { ProductCollectionsController } from './product-collections.controller';

describe('ProductCollectionsController', () => {
  let controller: ProductCollectionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductCollectionsController],
    }).compile();

    controller = module.get<ProductCollectionsController>(ProductCollectionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
