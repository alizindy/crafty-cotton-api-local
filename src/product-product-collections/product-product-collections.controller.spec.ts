import { Test, TestingModule } from '@nestjs/testing';
import { ProductProductCollectionsController } from './product-product-collections.controller';

describe('ProductProductCollectionsController', () => {
  let controller: ProductProductCollectionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductProductCollectionsController],
    }).compile();

    controller = module.get<ProductProductCollectionsController>(ProductProductCollectionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
