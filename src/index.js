import repository from './lib/repository';
import activeRecordFactory from './lib/activeRecordFactory';
import {uncapitalize} from './lib/util';

export default function repositoryFactory(model) {
  const createRepositoryFromEntity = (repositories, entityName) => {
    const entity = model[entityName];
    const repositoryName = `${uncapitalize(entityName)}Repository`;

    repositories[repositoryName] = repository({
      entity,
      activeRecordFactory: activeRecordFactory(entity),
    });

    return repositories;
  };

  return Object
    .keys(model)
    .reduce(createRepositoryFromEntity, {});
}
