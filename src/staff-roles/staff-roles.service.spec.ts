import { Test, TestingModule } from '@nestjs/testing';
import { StaffRolesService } from './staff-roles.service';

describe('StaffRolesService', () => {
  let service: StaffRolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StaffRolesService],
    }).compile();

    service = module.get<StaffRolesService>(StaffRolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
