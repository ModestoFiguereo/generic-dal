export default function repository({entity, activeRecordFactory}) {
  return {

    /**
     * @description Count record on db that matches the filter.
     * @param {Object} filter - filter the data before the count.
     */
    count: (filter) => {
      return entity.count(filter);
    },

    /**
     * @description Converts query string into a query to the db.
     * @param {Object} queryStringObject - json representation of the filter string.
     */
    query: (queryStringObject) => {
      return new Promise((resolve, reject) => {
        entity.query(queryStringObject)
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    /**
     * @description Finds all records that matches the filter.
     * @param {Object} filter - filter the data.
     * @param {String} fields - the names of the fiels/columns to be projected.
     */
    find: (filter, fields) => {
      return new Promise((resolve, reject) => {
        entity.find(filter, fields)
          .then((docs) => {
            resolve(docs.map(x => activeRecordFactory(x)));
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    /**
     * @description Find one record that matches the filter.
     * @param {Object} filter - filter the data.
     * @param {String} fields - the names of the fiels/columns to be projected.
     */
    findOne: (filter, fields) => {
      return new Promise((resolve, reject) => {
        entity.findOne(filter, fields)
          .then((doc) => {
            resolve(activeRecordFactory(doc));
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    /**
     * @description Find one record with the given id.
     * @param {String} id - record id.
     * @param {String} fields - the names of the fiels/columns to be projected.
     */
    findOneById: (id, fields) => {
      return new Promise((resolve, reject) => {
        entity.findOneById(id, fields)
          .then((doc) => {
            resolve(activeRecordFactory(doc));
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    /**
     * @description Inserts one record into the db.
     * @param {Object} params - fields/columns for the new records.
     */
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

    /**
     * @description Update all records that match the filter.
     * @param {Object} filter - filter the data.
     * @param {Object} params - fields/columns to be modified.
     */
    update: (filter, params) => {
      return entity.update(filter, params);
    },

    /**
     * @description Update one record that match the filter.
     * @param {Object} filter - filter the data.
     * @param {Object} params - fields/columns to be modified.
     */
    findOneAndUpdate: (filter, params) => {
      return new Promise((resolve, reject) => {
        entity.findOneAndUpdate(filter, params)
          .then((doc) => {
            resolve(activeRecordFactory(doc));
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    /**
     * @description Remove all records that match the filter.
     * @param {Object} filter - filter the data.
     */
    remove: (filter) => {
      return entity.remove(filter);
    },

    /**
     * @description Remove one record that match the filter.
     * @param {Object} filter - filter the data.
     */
    findOneAndRemove: (filter) => {
      return entity.findOneAndRemove(filter);
    },
  };
}
