import {setUpTest} from './util';
import {RepositoryFactory as respositoryFactory} from '../src';

const modelMock = {
  Car: {},
  CarGroup: {},
  Form: {},
  CarWhiteList: {},
  FormGroup: {},
  Option: {},
  Permission: {},
  Question: {},
  Repairment: {},
  RepairmentCost: {},
  Role: {},
  User: {},
  Config: {},
};

const repositories = respositoryFactory(modelMock);

setUpTest('RepositoryFactory#carRepository', function* testRepositoryQuery(assert) {
  const carRepository = repositories.carRepository;

  assert.ok(carRepository, 'carRepository should be defined.');
});

setUpTest('RepositoryFactory#carGroupRepository', function* testRepositoryQuery(assert) {
  const carGroupRepository = repositories.carGroupRepository;

  assert.ok(carGroupRepository, 'carGroupRepository should be defined');
});

setUpTest('RepositoryFactory#carWhiteListRepository', function* testRepositoryQuery(assert) {
  const carWhiteListRepository = repositories.carWhiteListRepository;

  assert.ok(carWhiteListRepository, 'carWhiteListRepository should be defined');
});

setUpTest('RepositoryFactory#formRepository', function* testRepositoryQuery(assert) {
  const formRepository = repositories.formRepository;

  assert.ok(formRepository, 'formRepository should be defined');
});

setUpTest('RepositoryFactory#formGroupRepository', function* testRepositoryQuery(assert) {
  const formGroupRepository = repositories.formGroupRepository;

  assert.ok(formGroupRepository, 'formGroupRepository should be defined');
});

setUpTest('RepositoryFactory#optionRepository', function* testRepositoryQuery(assert) {
  const optionRepository = repositories.optionRepository;

  assert.ok(optionRepository, 'optionRepository should be defined');
});

setUpTest('RepositoryFactory#permissionRepository', function* testRepositoryQuery(assert) {
  const permissionRepository = repositories.permissionRepository;

  assert.ok(permissionRepository, 'permissionRepository should be defined');
});

setUpTest('RepositoryFactory#questionRepository', function* testRepositoryQuery(assert) {
  const questionRepository = repositories.questionRepository;

  assert.ok(questionRepository, 'questionRepository should be defined');
});

setUpTest('RepositoryFactory#repairmentRepository', function* testRepositoryQuery(assert) {
  const repairmentRepository = repositories.repairmentRepository;

  assert.ok(repairmentRepository, 'repairmentRepository should be defined');
});

setUpTest('RepositoryFactory#repairmentCostRepository', function* testRepositoryQuery(assert) {
  const repairmentCostRepository = repositories.repairmentCostRepository;

  assert.ok(repairmentCostRepository, 'repairmentCostRepository should be defined');
});

setUpTest('RepositoryFactory#rolRepository', function* testRepositoryQuery(assert) {
  const roleRepository = repositories.roleRepository;

  assert.ok(roleRepository, 'rolRepository should be defined');
});

setUpTest('RepositoryFactory#userRepository', function* testRepositoryQuery(assert) {
  const userRepository = repositories.userRepository;

  assert.ok(userRepository, 'userRepository should be defined');
});
