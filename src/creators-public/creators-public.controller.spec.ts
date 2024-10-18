import { Test, TestingModule } from '@nestjs/testing';
import { CreatorsPublicController } from './creators-public.controller';

describe('CreatorsPublicController', () => {
  let controller: CreatorsPublicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreatorsPublicController],
    }).compile();

    controller = module.get<CreatorsPublicController>(CreatorsPublicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
