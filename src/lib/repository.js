export default function Repository({entity, activeRecordFactory}) {
  return {
    count: (query) => {
      return entity.count(query);
    },
    query: (queryString) => {
      return new Promise((resolve, reject) => {
        entity.query(queryString)
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    find: (query, fields, options) => {
      return new Promise((resolve, reject) => {
        entity.find(query, fields, options)
          .then((docs) => {
            resolve(docs.map(x => activeRecordFactory(x)));
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    findOne: (query, fields, options) => {
      return new Promise((resolve, reject) => {
        entity.findOne(query, fields, options)
          .then((doc) => {
            resolve(activeRecordFactory(doc));
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    findOneById: (id, fields, options) => {
      return new Promise((resolve, reject) => {
        entity.findOneById(id, fields, options)
          .then((doc) => {
            resolve(activeRecordFactory(doc));
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    insert: (params = {}) => {
      return new Promise((resolve, reject) => {
        entity.insert(params)
          .then((doc) => {
            resolve(activeRecordFactory(doc));
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    update: (conditions, update) => {
      return entity.update(conditions, update);
    },
    findOneAndUpdate: (conditions, update) => {
      return new Promise((resolve, reject) => {
        entity.findOneAndUpdate(conditions, update)
          .then((doc) => {
            resolve(activeRecordFactory(doc));
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    findOneAndRemove: (conditions) => {
      return entity.findOneAndRemove(conditions);
    },
    remove: (conditions) => {
      return entity.remove(conditions);
    },
  };
}
