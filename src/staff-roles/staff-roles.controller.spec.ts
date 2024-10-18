import { Test, TestingModule } from '@nestjs/testing';
import { StaffRolesController } from './staff-roles.controller';
import { StaffRolesService } from './staff-roles.service';

describe('StaffRolesController', () => {
  let controller: StaffRolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaffRolesController],
      providers: [StaffRolesService],
    }).compile();

    controller = module.get<StaffRolesController>(StaffRolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
