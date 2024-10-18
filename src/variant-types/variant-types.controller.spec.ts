import { Test, TestingModule } from '@nestjs/testing';
import { VariantTypesController } from './variant-types.controller';

describe('VariantTypesController', () => {
  let controller: VariantTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VariantTypesController],
    }).compile();

    controller = module.get<VariantTypesController>(VariantTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
