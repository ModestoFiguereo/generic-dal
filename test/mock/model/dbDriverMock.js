import Mingo from 'mingo';
import _ from 'underscore';
import mongoid from 'mongoid';

export default function dbDriverMock(dataMocker) {
  let collection = dataMocker();

  return {
    // this method is not part of the real api
    // it's just for unit testing porpuses.
    reset: () => {
      collection = dataMocker();
    },
    count: (query, callback) => {
      const length = Mingo.find(collection, query).count();
      callback(null, length);
    },
    query: (queryStringObject, callback) => {
      let result = Mingo.find(collection, JSON.parse(queryStringObject.q || '{}'), queryStringObject.f);

      switch (queryStringObject.t) {
      case 'find':
        result = result.all().map(element => addToObjectFunction(element));
        break;
      case 'findOne':
        result = addToObjectFunction(result.first());
        break;
      case 'count':
        result = result.count();
        break;
      default:
        result = result = result.all().map(element => addToObjectFunction(element));
      }

      callback(null, result);
    },

    find: (query, fields, options, callback) => {
      const docs = Mingo.find(collection, query, fields).all();

      callback(null, docs.map(element => addToObjectFunction(element)));
    },

    findOne: (query, fields, options, callback) => {
      const doc = Mingo.find(collection, query, fields).first();

      callback(null, addToObjectFunction(doc));
    },

    findOneById: (id, fields, options, callback) => {
      const doc = Mingo.find(collection, { _id: id }, fields).first();

      callback(null, addToObjectFunction(doc));
    },

    create: (params, callback) => {
      const now = new Date();

      params._id = mongoid();
      params.createdAt = now;
      params.updatedAt = now;

      collection.push(params);

      callback(null, addToObjectFunction(params));
    },

    update: (conditions, update, callback) => {
      const match = Mingo.find(collection, conditions).all();

      for (const row of match) {
        for (const prop of Object.keys(update)) {
          row[prop] = update[prop];
        }
      }

      callback(null, {
        ok: match.length > 0,
        nModified: match.length,
      });
    },

    findOneAndUpdate: (conditions, update, options, callback) => {
      const match = Mingo.find(collection, conditions).first();

      if (!match) {
        callback(null, null);
      }

      for (const prop of Object.keys(update)) {
        match[prop] = update[prop];
      }

      callback(null, addToObjectFunction(match));
    },

    findOneAndRemove: (conditions, callback) => {
      const match = _.findWhere(collection, conditions);
      collection = _.without(collection, match);

      callback(null, addToObjectFunction(match));
    },

    remove: (conditions, callback) => {
      const match = _.where(collection, conditions);
      collection = _.difference(collection, match);

      callback(null, {
        result: {
          'ok': match.length,
          'n': match.length,
        },
      });
    },
  };
}

function addToObjectFunction(element) {
  if (element) {
    element.toObject = () => element;
  }
  return element;
}
