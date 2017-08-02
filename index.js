const projectId = 'my-project';
const keyFile = 'keyfile.json';

const datastore = require("@google-cloud/datastore")({
    projectId,
    keyFile
});

printThingKeyType();

async function printThingKeyType() {
    const thingId = await saveThing(123, 'My Thing');
    const thingKey = await findThingKey(thingId);
    console.log(`thingKey.id = ${thingKey.id}, type = ${typeof thingKey.id}`);
}

async function saveThing(id, name) {
    return new Promise((resolve, reject) => {
        datastore.save({
            key: datastore.key(['Thing', id]),
            data: [
                { name: 'name', value: name }
            ]
        }, (err, mutationResult) => {
            if (err) {
                reject(err);
            }
            resolve(id);
        });
    });
}

async function findThingKey(id) {
    const key = datastore.key(['Thing', id]);
    return new Promise((resolve, reject) => {
        datastore
            .createQuery('Thing')
            .filter('__key__', key)
            .select('__key__')
            .run((err, entities) => {
                if (err) {
                    return reject(err);
                }

                if (entities.length == 0) {
                    return reject(new Error(`No thing exists with id ${id}`));
                }

                const key = entities[0][datastore.KEY];
                resolve(key);
        });
    });
}
