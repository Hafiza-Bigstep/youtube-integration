import { Request } from 'express';
import { inject, injectable } from 'inversify';
import { CreateDto, TYPES, UpdateDto } from '../types';
import { $$repository_class_name$$ } from '../repositories/$$repository_file_name$$.repository';

@injectable()
export class $$policy_class_name$$ {
  private $$repository_var_name$$: $$repository_class_name$$;
  constructor(
    @inject(TYPES.$$repository_class_name$$)
    $$repository_var_name$$: $$repository_class_name$$
  ) {
    this.$$repository_var_name$$ = $$repository_var_name$$;
  }

  createDto(req: Request): CreateDto {
    const dto = {};

    return dto;
  }

  updateDto(req: Request): UpdateDto {
    return this.createDto(req);
  }
}
