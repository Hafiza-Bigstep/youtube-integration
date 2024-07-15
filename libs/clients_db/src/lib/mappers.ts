type Kvm = { [key: string]: any };

export function mapFromPrismaObject(object: Kvm): Kvm {
  const FIELDS_TO_UNDERSCORE: string[] = [
    'id',
    'created',
    'updated',
    'createdBy',
    'updatedBy',
  ];

  const ret = { ...object };

  for (let field in object) {
    const oldFieldName = field;
    field = field.charAt(0).toLowerCase() + field.slice(1);
    if (field !== oldFieldName) {
      ret[field] = Array.isArray(ret[oldFieldName])
        ? ret[oldFieldName].map(mapFromPrismaObject)
        : mapFromPrismaObject(ret[oldFieldName]);
      delete ret[oldFieldName];
    }
    if (FIELDS_TO_UNDERSCORE.includes(field)) {
      ret[`_${field}`] = ret[field];
      delete ret[field];
    }
  }

  return ret;
}

export function mapToPrismaObject(object: Kvm): Kvm {
  const UNDERSCORED_FIELDS: string[] = [
    '_id',
    '_created',
    '_updated',
    '_createdBy',
  ];
  const OMITTED_FIELDS: string[] = ['_updatedBy'];

  const ret = { ...object };

  for (const field in object) {
    if (OMITTED_FIELDS.includes(field)) {
      delete ret[field];
    }
    if (UNDERSCORED_FIELDS.includes(field)) {
      ret[field.slice(1)] = ret[field];
      delete ret[field];
    }
  }

  return ret;
}
