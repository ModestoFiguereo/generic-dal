import {setUpTest} from './util';
import respositoryFactory from '../src';
import modelMock from './mock/model';

const repositories = respositoryFactory(modelMock);

setUpTest('respositoryFactory#personRepository', function* testRepositoryQuery(assert) {
  const personRepository = repositories.personRepository;

  assert.ok(personRepository, 'carRepository should be defined.');
  assert.equal(typeof personRepository.count, 'function', 'personRepository.count should be defined and be a function.');
  assert.equal(typeof personRepository.query, 'function', 'personRepository.query should be defined and be a function.');
  assert.equal(typeof personRepository.find, 'function', 'personRepository.find should be defined and be a function.');
  assert.equal(typeof personRepository.findOne, 'function', 'personRepository.findOne should be defined and be a function.');
  assert.equal(typeof personRepository.findOneById, 'function', 'personRepository.findOneById should be defined and be a function.');
  assert.equal(typeof personRepository.insert, 'function', 'personRepository.insert should be defined and be a function.');
  assert.equal(typeof personRepository.update, 'function', 'personRepository.update should be defined and be a function.');
  assert.equal(typeof personRepository.findOneAndUpdate, 'function', 'personRepository.findOneAndUpdate should be defined and be a function.');
  assert.equal(typeof personRepository.findOneAndRemove, 'function', 'personRepository.findOneAndRemove should be defined and be a function.');
  assert.equal(typeof personRepository.remove, 'function', 'personRepository.remove should be defined and be a function.');
});
