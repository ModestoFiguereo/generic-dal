import {setUpTest} from './util';
import repository from '../src/lib/Repository';
import {activeRecordFactory} from '../src/lib/activeRecordFactory';
import modelMock from './mock/ModelMock';
import mongooseModelMock from './mock/MongooseModelMock';
import data from './mock/data/PersonModelData';

setUpTest('Repository#query', function* testRepositoryQuery(assert) {
  // NOTICE: this method just return the entire collection
  // when mocked.
  const rows = yield getRepository().query('?q={}');

  assert.true(rows.length, 'should have several rows');
});

setUpTest('Repository#find test when match records', function* testRepositoryQuery(assert) {
  const rows = yield getRepository().find({ lastName: 'Reeves' });

  assert.true(rows.length === 2, 'should have two rows');
  assert.equal(rows[0].lastName, 'Reeves', 'lastName should be equal to Reeves');
  assert.equal(rows[1].lastName, 'Reeves', 'lastName should be equal to Reeves');
});

setUpTest('Repository#find test when does not match records', function* testRepositoryQuery(assert) {
  const rows = yield getRepository().find({ lastName: 'Figuereo' });

  assert.false(rows.length, 'should have 0 rows');
});

setUpTest('Repository#findOne', function* testRepositoryFind(assert) {
  const record = yield getRepository().findOne({lastName: 'Cherry'});

  assert.true(record !== null, 'should return one');
  assert.equal(record.lastName, 'Cherry', 'lastName should be equal to Cherry');
});

setUpTest('Repository#findOneById', function* testRepositoryQuery(assert) {
  const record = yield getRepository().findOneById('563dfb1268b32ee12c000012');
  assert.true(record !== null, 'should return one');
  assert.equal(record.firstName, 'Addison', 'firstName should be equal to Addison');
});

setUpTest('Repository#insert', function* testRepositoryQuery(assert) {
  const savedRecord = yield getRepository().insert({
    'firstName': 'Modesto',
    'lastName': 'Figuereo',
    'username': 'modestofiguereo',
    'email': 'figuereo.fernandez.modesto@gmail.com',
    'password': '123456',
  });

  assert.true(savedRecord !== null, 'should return the saved record');
  assert.equal(savedRecord.firstName, 'Modesto', 'firstName should be equal to Modesto');
  assert.equal(savedRecord.lastName, 'Figuereo', 'lastName should be equal to Figuereo');
  assert.equal(savedRecord.username, 'modestofiguereo', 'username should be equal to modestofiguereo');
  assert.equal(savedRecord.email, 'figuereo.fernandez.modesto@gmail.com', 'email should be equal to figuereo.fernandez.modesto@gmail.com');
  assert.equal(savedRecord.password, '123456', 'password should be equal to 123456');
});

setUpTest('Repository#update', function* testRepositoryQuery(assert) {
  const result = yield getRepository().update({ lastName: 'Reeves' }, { password: '52654859saf1wf6aew0' });

  assert.true(result.ok, 'ok should be true');
  assert.notEqual(result.nModified, 0, 'one or more should be modified');
});

setUpTest('Repository#findOneAndUpdate', function* testRepositoryQuery(assert) {
  const updatedRecord = yield getRepository().findOneAndUpdate(
    { lastName: 'Reeves' },
    { firstName: 'Juan' },
    { new: true }
  );

  assert.equal(updatedRecord.firstName, 'Juan', 'firstName should be equal to Juan');
});

setUpTest('Repository#findOneAndRemove', function* testRepositoryQuery(assert) {
  const removedRecord = yield getRepository().findOneAndRemove({ lastName: 'Cherry' });

  assert.ok(removedRecord, 'should return the deleted record');
  assert.equal(removedRecord.lastName, 'Cherry', 'lastName should be equal to Cherry');
});

setUpTest('Repository#remove', function* testRepositoryQuery(assert) {
  const result = yield getRepository().remove({ lastName: 'Reeves' });

  assert.true(result.ok, 'operation should be ok');
  assert.true(result.n > 0, 'some records should be deleted');
});

function getRepository() {
  return repository({
    entity: modelMock(mongooseModelMock(data)),
    activeRecordFactory: activeRecordFactory(modelMock(mongooseModelMock(data))),
  });
}
