import _ from 'underscore';

export default function activeRecordFactory(entity) {
  return (doc) => {
    if (!doc) {
      return null;
    }

    const activeRecord = {
      save: function() {
        return new Promise((resolve, reject) => {
          entity.findOneAndUpdate({ _id: this._id }, this)
            .then(onUpdate)
            .catch(onError);

          const onUpdate = (updatedDoc) => {
            if (updatedDoc) {
              resolve(activeRecordFactory(entity)(updatedDoc));
            } else {
              entity.insert(this)
                .then(onInsert)
                .catch(onError);
            }
          };

          const onInsert = (insertedDoc) => {
            resolve(activeRecordFactory(entity)(insertedDoc));
          };

          const onError = (err) => {
            reject(err);
          };
        });
      },
      remove: function() {
        return entity.findOneAndRemove({ _id: this._id });
      },
      toObject: function() {
        const isNotAFunction = property => typeof doc[property] !== 'function';

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
    };

    return _.extend(doc, activeRecord);
  };
}
