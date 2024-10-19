import { Test, TestingModule } from '@nestjs/testing';
import { VariantOptionsController } from './variant-options.controller';

describe('VariantOptionsController', () => {
  let controller: VariantOptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VariantOptionsController],
    }).compile();

    controller = module.get<VariantOptionsController>(VariantOptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
