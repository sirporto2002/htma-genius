import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface ClientProfile_Key {
  id: UUIDString;
  __typename?: 'ClientProfile_Key';
}

export interface CreateClientProfileData {
  clientProfile_insert: ClientProfile_Key;
}

export interface CreateClientProfileVariables {
  userId: UUIDString;
  name: string;
  createdAt: TimestampString;
  dateOfBirth?: DateString | null;
  gender?: string | null;
}

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

export interface GetHtmaReportVariables {
  id: UUIDString;
}

export interface HTMAReport_Key {
  id: UUIDString;
  __typename?: 'HTMAReport_Key';
}

export interface ListUsersData {
  users: ({
    id: UUIDString;
    displayName: string;
    email: string;
    photoUrl?: string | null;
  } & User_Key)[];
}

export interface MineralRatio_Key {
  id: UUIDString;
  __typename?: 'MineralRatio_Key';
}

export interface MineralReading_Key {
  id: UUIDString;
  __typename?: 'MineralReading_Key';
}

export interface UpdateMineralReadingData {
  mineralReading_update?: MineralReading_Key | null;
}

export interface UpdateMineralReadingVariables {
  id: UUIDString;
  level?: number | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateClientProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateClientProfileVariables): MutationRef<CreateClientProfileData, CreateClientProfileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateClientProfileVariables): MutationRef<CreateClientProfileData, CreateClientProfileVariables>;
  operationName: string;
}
export const createClientProfileRef: CreateClientProfileRef;

export function createClientProfile(vars: CreateClientProfileVariables): MutationPromise<CreateClientProfileData, CreateClientProfileVariables>;
export function createClientProfile(dc: DataConnect, vars: CreateClientProfileVariables): MutationPromise<CreateClientProfileData, CreateClientProfileVariables>;

interface GetHtmaReportRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetHtmaReportVariables): QueryRef<GetHtmaReportData, GetHtmaReportVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetHtmaReportVariables): QueryRef<GetHtmaReportData, GetHtmaReportVariables>;
  operationName: string;
}
export const getHtmaReportRef: GetHtmaReportRef;

export function getHtmaReport(vars: GetHtmaReportVariables): QueryPromise<GetHtmaReportData, GetHtmaReportVariables>;
export function getHtmaReport(dc: DataConnect, vars: GetHtmaReportVariables): QueryPromise<GetHtmaReportData, GetHtmaReportVariables>;

interface UpdateMineralReadingRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMineralReadingVariables): MutationRef<UpdateMineralReadingData, UpdateMineralReadingVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateMineralReadingVariables): MutationRef<UpdateMineralReadingData, UpdateMineralReadingVariables>;
  operationName: string;
}
export const updateMineralReadingRef: UpdateMineralReadingRef;

export function updateMineralReading(vars: UpdateMineralReadingVariables): MutationPromise<UpdateMineralReadingData, UpdateMineralReadingVariables>;
export function updateMineralReading(dc: DataConnect, vars: UpdateMineralReadingVariables): MutationPromise<UpdateMineralReadingData, UpdateMineralReadingVariables>;

interface ListUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
  operationName: string;
}
export const listUsersRef: ListUsersRef;

export function listUsers(): QueryPromise<ListUsersData, undefined>;
export function listUsers(dc: DataConnect): QueryPromise<ListUsersData, undefined>;

