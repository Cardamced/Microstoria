import { Test, TestingModule } from '@nestjs/testing';
import { AncestorsController } from './ancestors.controller';

describe('AncestorsController', () => {
  let controller: AncestorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AncestorsController],
    }).compile();

    controller = module.get<AncestorsController>(AncestorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
