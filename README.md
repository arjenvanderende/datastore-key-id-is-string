# Repro case for @google-cloud/datastore bug where entity ID is of type string instead of number

See: https://github.com/GoogleCloudPlatform/google-cloud-node/tree/master/packages/datastore

To run it, execute the following commands:

```
nvm install
npm install
npm start
```

Expected output:

```
thingKey.id = 123, type = number
```

Actual output:

```
thingKey.id = 123, type = string
```