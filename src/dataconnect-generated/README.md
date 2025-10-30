# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetHTMAReport*](#gethtmareport)
  - [*ListUsers*](#listusers)
- [**Mutations**](#mutations)
  - [*CreateClientProfile*](#createclientprofile)
  - [*UpdateMineralReading*](#updatemineralreading)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetHTMAReport
You can execute the `GetHTMAReport` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getHtmaReport(vars: GetHtmaReportVariables): QueryPromise<GetHtmaReportData, GetHtmaReportVariables>;

interface GetHtmaReportRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetHtmaReportVariables): QueryRef<GetHtmaReportData, GetHtmaReportVariables>;
}
export const getHtmaReportRef: GetHtmaReportRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getHtmaReport(dc: DataConnect, vars: GetHtmaReportVariables): QueryPromise<GetHtmaReportData, GetHtmaReportVariables>;

interface GetHtmaReportRef {
  ...
  (dc: DataConnect, vars: GetHtmaReportVariables): QueryRef<GetHtmaReportData, GetHtmaReportVariables>;
}
export const getHtmaReportRef: GetHtmaReportRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getHtmaReportRef:
```typescript
const name = getHtmaReportRef.operationName;
console.log(name);
```

### Variables
The `GetHTMAReport` query requires an argument of type `GetHtmaReportVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetHtmaReportVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetHTMAReport` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetHtmaReportData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetHtmaReportData {
  hTMAReport?: {
    id: UUIDString;
    clientProfile: {
      id: UUIDString;
      name: string;
    } & ClientProfile_Key;
      createdAt: TimestampString;
      notes?: string | null;
      testDate: DateString;
      mineralRatios_on_htmaReport: ({
        id: UUIDString;
        ratioName: string;
        value: number;
      } & MineralRatio_Key)[];
        mineralReadings_on_htmaReport: ({
          id: UUIDString;
          mineralName: string;
          level: number;
          unit?: string | null;
        } & MineralReading_Key)[];
  } & HTMAReport_Key;
}
```
### Using `GetHTMAReport`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getHtmaReport, GetHtmaReportVariables } from '@dataconnect/generated';

// The `GetHTMAReport` query requires an argument of type `GetHtmaReportVariables`:
const getHtmaReportVars: GetHtmaReportVariables = {
  id: ..., 
};

// Call the `getHtmaReport()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getHtmaReport(getHtmaReportVars);
// Variables can be defined inline as well.
const { data } = await getHtmaReport({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getHtmaReport(dataConnect, getHtmaReportVars);

console.log(data.hTMAReport);

// Or, you can use the `Promise` API.
getHtmaReport(getHtmaReportVars).then((response) => {
  const data = response.data;
  console.log(data.hTMAReport);
});
```

### Using `GetHTMAReport`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getHtmaReportRef, GetHtmaReportVariables } from '@dataconnect/generated';

// The `GetHTMAReport` query requires an argument of type `GetHtmaReportVariables`:
const getHtmaReportVars: GetHtmaReportVariables = {
  id: ..., 
};

// Call the `getHtmaReportRef()` function to get a reference to the query.
const ref = getHtmaReportRef(getHtmaReportVars);
// Variables can be defined inline as well.
const ref = getHtmaReportRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getHtmaReportRef(dataConnect, getHtmaReportVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.hTMAReport);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.hTMAReport);
});
```

## ListUsers
You can execute the `ListUsers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUsers(): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUsers(dc: DataConnect): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUsersRef:
```typescript
const name = listUsersRef.operationName;
console.log(name);
```

### Variables
The `ListUsers` query has no variables.
### Return Type
Recall that executing the `ListUsers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUsersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListUsersData {
  users: ({
    id: UUIDString;
    displayName: string;
    email: string;
    photoUrl?: string | null;
  } & User_Key)[];
}
```
### Using `ListUsers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUsers } from '@dataconnect/generated';


// Call the `listUsers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUsers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUsers(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
listUsers().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `ListUsers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUsersRef } from '@dataconnect/generated';


// Call the `listUsersRef()` function to get a reference to the query.
const ref = listUsersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUsersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateClientProfile
You can execute the `CreateClientProfile` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createClientProfile(vars: CreateClientProfileVariables): MutationPromise<CreateClientProfileData, CreateClientProfileVariables>;

interface CreateClientProfileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateClientProfileVariables): MutationRef<CreateClientProfileData, CreateClientProfileVariables>;
}
export const createClientProfileRef: CreateClientProfileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createClientProfile(dc: DataConnect, vars: CreateClientProfileVariables): MutationPromise<CreateClientProfileData, CreateClientProfileVariables>;

interface CreateClientProfileRef {
  ...
  (dc: DataConnect, vars: CreateClientProfileVariables): MutationRef<CreateClientProfileData, CreateClientProfileVariables>;
}
export const createClientProfileRef: CreateClientProfileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createClientProfileRef:
```typescript
const name = createClientProfileRef.operationName;
console.log(name);
```

### Variables
The `CreateClientProfile` mutation requires an argument of type `CreateClientProfileVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateClientProfileVariables {
  userId: UUIDString;
  name: string;
  createdAt: TimestampString;
  dateOfBirth?: DateString | null;
  gender?: string | null;
}
```
### Return Type
Recall that executing the `CreateClientProfile` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateClientProfileData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateClientProfileData {
  clientProfile_insert: ClientProfile_Key;
}
```
### Using `CreateClientProfile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createClientProfile, CreateClientProfileVariables } from '@dataconnect/generated';

// The `CreateClientProfile` mutation requires an argument of type `CreateClientProfileVariables`:
const createClientProfileVars: CreateClientProfileVariables = {
  userId: ..., 
  name: ..., 
  createdAt: ..., 
  dateOfBirth: ..., // optional
  gender: ..., // optional
};

// Call the `createClientProfile()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createClientProfile(createClientProfileVars);
// Variables can be defined inline as well.
const { data } = await createClientProfile({ userId: ..., name: ..., createdAt: ..., dateOfBirth: ..., gender: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createClientProfile(dataConnect, createClientProfileVars);

console.log(data.clientProfile_insert);

// Or, you can use the `Promise` API.
createClientProfile(createClientProfileVars).then((response) => {
  const data = response.data;
  console.log(data.clientProfile_insert);
});
```

### Using `CreateClientProfile`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createClientProfileRef, CreateClientProfileVariables } from '@dataconnect/generated';

// The `CreateClientProfile` mutation requires an argument of type `CreateClientProfileVariables`:
const createClientProfileVars: CreateClientProfileVariables = {
  userId: ..., 
  name: ..., 
  createdAt: ..., 
  dateOfBirth: ..., // optional
  gender: ..., // optional
};

// Call the `createClientProfileRef()` function to get a reference to the mutation.
const ref = createClientProfileRef(createClientProfileVars);
// Variables can be defined inline as well.
const ref = createClientProfileRef({ userId: ..., name: ..., createdAt: ..., dateOfBirth: ..., gender: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createClientProfileRef(dataConnect, createClientProfileVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.clientProfile_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.clientProfile_insert);
});
```

## UpdateMineralReading
You can execute the `UpdateMineralReading` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateMineralReading(vars: UpdateMineralReadingVariables): MutationPromise<UpdateMineralReadingData, UpdateMineralReadingVariables>;

interface UpdateMineralReadingRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMineralReadingVariables): MutationRef<UpdateMineralReadingData, UpdateMineralReadingVariables>;
}
export const updateMineralReadingRef: UpdateMineralReadingRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateMineralReading(dc: DataConnect, vars: UpdateMineralReadingVariables): MutationPromise<UpdateMineralReadingData, UpdateMineralReadingVariables>;

interface UpdateMineralReadingRef {
  ...
  (dc: DataConnect, vars: UpdateMineralReadingVariables): MutationRef<UpdateMineralReadingData, UpdateMineralReadingVariables>;
}
export const updateMineralReadingRef: UpdateMineralReadingRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateMineralReadingRef:
```typescript
const name = updateMineralReadingRef.operationName;
console.log(name);
```

### Variables
The `UpdateMineralReading` mutation requires an argument of type `UpdateMineralReadingVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateMineralReadingVariables {
  id: UUIDString;
  level?: number | null;
}
```
### Return Type
Recall that executing the `UpdateMineralReading` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateMineralReadingData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateMineralReadingData {
  mineralReading_update?: MineralReading_Key | null;
}
```
### Using `UpdateMineralReading`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateMineralReading, UpdateMineralReadingVariables } from '@dataconnect/generated';

// The `UpdateMineralReading` mutation requires an argument of type `UpdateMineralReadingVariables`:
const updateMineralReadingVars: UpdateMineralReadingVariables = {
  id: ..., 
  level: ..., // optional
};

// Call the `updateMineralReading()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateMineralReading(updateMineralReadingVars);
// Variables can be defined inline as well.
const { data } = await updateMineralReading({ id: ..., level: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateMineralReading(dataConnect, updateMineralReadingVars);

console.log(data.mineralReading_update);

// Or, you can use the `Promise` API.
updateMineralReading(updateMineralReadingVars).then((response) => {
  const data = response.data;
  console.log(data.mineralReading_update);
});
```

### Using `UpdateMineralReading`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateMineralReadingRef, UpdateMineralReadingVariables } from '@dataconnect/generated';

// The `UpdateMineralReading` mutation requires an argument of type `UpdateMineralReadingVariables`:
const updateMineralReadingVars: UpdateMineralReadingVariables = {
  id: ..., 
  level: ..., // optional
};

// Call the `updateMineralReadingRef()` function to get a reference to the mutation.
const ref = updateMineralReadingRef(updateMineralReadingVars);
// Variables can be defined inline as well.
const ref = updateMineralReadingRef({ id: ..., level: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateMineralReadingRef(dataConnect, updateMineralReadingVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.mineralReading_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.mineralReading_update);
});
```

