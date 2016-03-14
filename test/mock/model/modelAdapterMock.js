export default function modelAdapterMock(schema) {
  schema.reset();

  return {
    // this method is not part of the real api
    // it's just for unit testing porpuses.
    reset: () => {
      schema.reset();
    },
    count: (query = {}) => {
      return promise((resolve, reject) => {
        schema.count(query, (err, length) => {
          if (err) {
            reject(err);
          }

          resolve(length);
        });
      });
    },
    query: (queryStringObject = {}) => {
      return promise((resolve, reject) => {
        schema.query(queryStringObject, (err, data) => {
          if (err) {
            return reject(err);
          }

          if (Array.isArray(data)) {
            resolve(data.map(doc => {
              if (doc) {
                if (doc.toObject) {
                  return doc.toObject();
                }

                return doc;
              }

              return null;
            }));
          } else {
            if (data) {
              if (data.toObject) {
                resolve(data.toObject());
              }

              resolve(data);
            }

            resolve(null);
          }
        });
      });
    },

    find: (query, fields, options) => {
      return promise((resolve, reject) => {
        schema.find(query, fields, options, (err, docs) => {
          if (err) {
            return reject(err);
          }

          resolve(docs.map(doc => {
            return doc ? doc.toObject() : null;
          }));
        });
      });
    },

    findOne: (query, fields, options) => {
      return promise((resolve, reject) => {
        schema.findOne(query, fields, options, (err, doc) => {
          if (err) {
            return reject(err);
          }

          resolve(doc ? doc.toObject() : null);
        });
      });
    },

    findOneById: (id, fields, options) => {
      return promise((resolve, reject) => {
        schema.findOne({ _id: id }, fields, options, (err, doc) => {
          if (err) {
            return reject(err);
          }

          resolve(doc ? doc.toObject() : null);
        });
      });
    },

    insert: (params) => {
      return promise((resolve, reject) => {
        schema.create(params, (err, doc) => {
          if (err) {
            return reject(err);
          }

          resolve(doc ? doc.toObject() : null);
        });
      });
    },

    update: (conditions, update) => {
      return promise((resolve, reject) => {
        schema.update(conditions, update, (err, result) => {
          if (err) {
            return reject(err);
          }

          resolve(result);
        });
      });
    },

    findOneAndUpdate: (conditions, update) => {
      return promise((resolve, reject) => {
        schema.findOneAndUpdate(conditions, update, { new: true }, (err, doc) => {
          if (err) {
            return reject(err);
          }

          resolve(doc ? doc.toObject() : null);
        });
      });
    },

    findOneAndRemove: (conditions) => {
      return promise((resolve, reject) => {
        schema.findOneAndRemove(conditions, (err, doc) => {
          if (err) {
            return reject(err);
          }

          resolve(doc ? doc.toObject() : null);
        });
      });
    },

    remove: (conditions) => {
      return promise((resolve, reject) => {
        schema.remove(conditions, (err, result) => {
          if (err) {
            return reject(err);
          }

          resolve(result.result);
        });
      });
    },
  };
}

function promise(callback) {
  return new Promise(callback);
}
