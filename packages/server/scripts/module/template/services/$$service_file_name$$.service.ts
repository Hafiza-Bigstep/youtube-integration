import { inject, injectable } from 'inversify';
import { $$repository_class_name$$ } from '../repositories/$$repository_file_name$$.repository';
import { CreateDto, TYPES, UpdateDto } from '../types';

@injectable()
export class $$service_class_name$$ {
  private $$repository_var_name$$: $$repository_class_name$$;
  constructor(
    @inject(TYPES.$$repository_class_name$$)
    $$repository_var_name$$: $$repository_class_name$$
  ) {
    this.$$repository_var_name$$ = $$repository_var_name$$;
  }

  async create(dto: CreateDto) {
    return await this.$$repository_var_name$$.create(dto);
  }

  async findById(id: string) {
    return await this.$$repository_var_name$$.findById(id);
  }

  async update(id: string, dto: UpdateDto) {
    return await this.$$repository_var_name$$.update(id, dto);
  }

  async delete(id: string) {
    return await this.$$repository_var_name$$.delete(id);
  }
}
