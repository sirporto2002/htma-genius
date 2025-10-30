import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddMovieToListData {
  listMovie_insert: ListMovie_Key;
}

export interface AddMovieToListVariables {
  listId: UUIDString;
  movieId: UUIDString;
  note?: string | null;
  position: number;
}

export interface CreateNewUserData {
  user_insert: User_Key;
}

export interface CreateNewUserVariables {
  displayName: string;
  email?: string | null;
  photoUrl?: string | null;
}

export interface GetMoviesFromListData {
  list?: {
    name: string;
    movies_via_ListMovie: ({
      id: UUIDString;
      title: string;
      year: number;
      summary?: string | null;
    } & Movie_Key)[];
  };
}

export interface GetMoviesFromListVariables {
  listId: UUIDString;
}

export interface GetPublicListsData {
  lists: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    user: {
      id: UUIDString;
      displayName: string;
    } & User_Key;
  } & List_Key)[];
}

export interface ListMovie_Key {
  listId: UUIDString;
  movieId: UUIDString;
  __typename?: 'ListMovie_Key';
}

export interface List_Key {
  id: UUIDString;
  __typename?: 'List_Key';
}

export interface Movie_Key {
  id: UUIDString;
  __typename?: 'Movie_Key';
}

export interface Review_Key {
  id: UUIDString;
  __typename?: 'Review_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

export interface Watch_Key {
  id: UUIDString;
  __typename?: 'Watch_Key';
}

interface CreateNewUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNewUserVariables): MutationRef<CreateNewUserData, CreateNewUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateNewUserVariables): MutationRef<CreateNewUserData, CreateNewUserVariables>;
  operationName: string;
}
export const createNewUserRef: CreateNewUserRef;

export function createNewUser(vars: CreateNewUserVariables): MutationPromise<CreateNewUserData, CreateNewUserVariables>;
export function createNewUser(dc: DataConnect, vars: CreateNewUserVariables): MutationPromise<CreateNewUserData, CreateNewUserVariables>;

interface GetPublicListsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetPublicListsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetPublicListsData, undefined>;
  operationName: string;
}
export const getPublicListsRef: GetPublicListsRef;

export function getPublicLists(): QueryPromise<GetPublicListsData, undefined>;
export function getPublicLists(dc: DataConnect): QueryPromise<GetPublicListsData, undefined>;

interface AddMovieToListRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddMovieToListVariables): MutationRef<AddMovieToListData, AddMovieToListVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddMovieToListVariables): MutationRef<AddMovieToListData, AddMovieToListVariables>;
  operationName: string;
}
export const addMovieToListRef: AddMovieToListRef;

export function addMovieToList(vars: AddMovieToListVariables): MutationPromise<AddMovieToListData, AddMovieToListVariables>;
export function addMovieToList(dc: DataConnect, vars: AddMovieToListVariables): MutationPromise<AddMovieToListData, AddMovieToListVariables>;

interface GetMoviesFromListRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMoviesFromListVariables): QueryRef<GetMoviesFromListData, GetMoviesFromListVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetMoviesFromListVariables): QueryRef<GetMoviesFromListData, GetMoviesFromListVariables>;
  operationName: string;
}
export const getMoviesFromListRef: GetMoviesFromListRef;

export function getMoviesFromList(vars: GetMoviesFromListVariables): QueryPromise<GetMoviesFromListData, GetMoviesFromListVariables>;
export function getMoviesFromList(dc: DataConnect, vars: GetMoviesFromListVariables): QueryPromise<GetMoviesFromListData, GetMoviesFromListVariables>;

