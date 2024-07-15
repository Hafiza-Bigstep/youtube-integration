export const TYPES = {
  $$controller_class_name$$: Symbol.for('$$controller_class_name$$'),
  $$service_class_name$$: Symbol.for('$$service_class_name$$'),
  $$policy_class_name$$: Symbol.for('$$policy_class_name$$'),
  $$repository_class_name$$: Symbol.for('$$repository_class_name$$'),
};

export interface CreateDto {}

export type UpdateDto = Partial<CreateDto>;
