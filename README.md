## What?
Sample app to demonstrate reading data from DB and sending it back to API client as stream

at least 10 times reduction in time taken for a thousand (1000) records

```shell
[2018-04-18T06:43:35.949Z] ::1 GET /records 200 280771 291.791 ms
Mongoose: products.find({}, { sort: { addedOn: -1 }, skip: 0, limit: 10000, fields: {} })
[2018-04-18T06:43:39.221Z] ::1 GET /stream/records 200 - 27.614 ms
Mongoose: products.find({}, { sort: { addedOn: -1 }, skip: 0, limit: 10000, fields: {} })
[2018-04-18T06:43:45.181Z] ::1 GET /records 200 280771 324.001 ms
Mongoose: products.find({}, { sort: { addedOn: -1 }, skip: 0, limit: 10000, fields: {} })
[2018-04-18T06:43:47.144Z] ::1 GET /stream/records 200 - 25.776 m
```

### To run the app

#### Install
```shell
yarn
```

#### Run
```shell
yarn start
```

#### Test API regular end point
```sheell
curl http://localhost:3000/records
```

#### Test API with stream end point
```sheell
curl http://localhost:3000/stream/records
```

#### Import data
```shell
gunzip products.json.gz
```

Above should have extracted a zipped file products.json, use it import now

```shell
mongoimport -d products -c products --file ./products.json
```