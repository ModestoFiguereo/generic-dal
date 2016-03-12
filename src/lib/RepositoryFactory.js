import repository from './Repository';
import {activeRecordFactory} from './activeRecordFactory';
import {uncapitalize} from './util';

export default function RepositoryFactory(model) {
  return Object
    .keys(model)
    .reduce(createRepositoryFromEntity(model), {});
}

function createRepositoryFromEntity(model) {
  return (repositories, entityName) => {
    const entity = model[entityName];
    const name = buildRepositoryName(entityName);

    repositories[name] = repository({
      entity: entity,
      activeRecordFactory: activeRecordFactory(entity),
    });

    return repositories;
  };
}

const buildRepositoryName = (entityName) => {
  return `${uncapitalize(entityName)}Repository`;
};
