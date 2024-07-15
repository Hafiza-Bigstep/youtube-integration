import _ from 'lodash';

const omitEmpty = obj => {
  return _.pickBy(obj, value => {
    return value !== null && value !== undefined && value !== '';
  });
};

export { omitEmpty };
