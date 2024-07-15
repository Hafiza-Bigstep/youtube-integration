export const TYPES = {
  RoleController: Symbol.for('RoleController'),
  PermissionController: Symbol.for('PermissionController'),
  RoleService: Symbol.for('RoleService'),
  PermissionService: Symbol.for('PermissionService'),
  RolePolicy: Symbol.for('RolePolicy'),
  PermissionPolicy: Symbol.for('PermissionPolicy'),
  RoleRepository: Symbol.for('RoleRepository'),
  PermissionRepository: Symbol.for('PermissionRepository'),
};

export interface CreateDto {
  name: string;
  description: string;
}

export interface UpdateDto {
  description: string;
}

export interface PermissionCreateDto {
  name: string;
  description: string;
}

export interface PermissionUpdateDto {
  description: string;
}
