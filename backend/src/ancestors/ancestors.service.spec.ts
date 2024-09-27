import { Test, TestingModule } from '@nestjs/testing';
import { AncestorsService } from './ancestors.service';

describe('AncestorsService', () => {
  let service: AncestorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AncestorsService],
    }).compile();

    service = module.get<AncestorsService>(AncestorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
