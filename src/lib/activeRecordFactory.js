import _ from 'underscore';

export const activeRecordFactory = (entity) => {
  return (doc) => {
    if (!doc) return null;

    const isNotAFunction = property => typeof doc[property] !== 'function';

    return _.extend(doc, {
      save: function() {
        return new Promise((resolve, reject) => {
          entity.findOneAndUpdate({ _id: this._id }, this)
            .then(onUpdate)
            .catch(onError);

          function onUpdate(updatedDoc) {
            if (updatedDoc) {
              resolve(activeRecordFactory(entity)(updatedDoc));
            } else {
              entity.insert(this)
                .then(onInserted)
                .catch(onError);
            }
          }

          function onInserted(insertedDoc) {
            resolve(activeRecordFactory(entity)(insertedDoc));
          }

          function onError(err) {
            reject(err);
          }
        });
      },
      remove: function() {
        return entity.findOneAndRemove({ _id: this._id });
      },
      toObject: function() {
        return Object.keys(this)
          .filter(isNotAFunction)
          .reduce((plainObject, property) => {
            plainObject[property] = this[property];
            return plainObject;
          }, {});
      },
      toJSON: function() {
        this.toObject();
      },
    });
  };
};
