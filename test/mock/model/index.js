import dbDriverMock from './dbDriverMock';
import modelAdapterMock from './modelAdapterMock';
import personEntityDataMocker from './entities/personEntityDataMocker';

export default {
  person: modelAdapterMock(dbDriverMock(personEntityDataMocker)),
};
