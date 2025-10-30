import { CreateClientProfileData, CreateClientProfileVariables, GetHtmaReportData, GetHtmaReportVariables, UpdateMineralReadingData, UpdateMineralReadingVariables, ListUsersData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateClientProfile(options?: useDataConnectMutationOptions<CreateClientProfileData, FirebaseError, CreateClientProfileVariables>): UseDataConnectMutationResult<CreateClientProfileData, CreateClientProfileVariables>;
export function useCreateClientProfile(dc: DataConnect, options?: useDataConnectMutationOptions<CreateClientProfileData, FirebaseError, CreateClientProfileVariables>): UseDataConnectMutationResult<CreateClientProfileData, CreateClientProfileVariables>;

export function useGetHtmaReport(vars: GetHtmaReportVariables, options?: useDataConnectQueryOptions<GetHtmaReportData>): UseDataConnectQueryResult<GetHtmaReportData, GetHtmaReportVariables>;
export function useGetHtmaReport(dc: DataConnect, vars: GetHtmaReportVariables, options?: useDataConnectQueryOptions<GetHtmaReportData>): UseDataConnectQueryResult<GetHtmaReportData, GetHtmaReportVariables>;

export function useUpdateMineralReading(options?: useDataConnectMutationOptions<UpdateMineralReadingData, FirebaseError, UpdateMineralReadingVariables>): UseDataConnectMutationResult<UpdateMineralReadingData, UpdateMineralReadingVariables>;
export function useUpdateMineralReading(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateMineralReadingData, FirebaseError, UpdateMineralReadingVariables>): UseDataConnectMutationResult<UpdateMineralReadingData, UpdateMineralReadingVariables>;

export function useListUsers(options?: useDataConnectQueryOptions<ListUsersData>): UseDataConnectQueryResult<ListUsersData, undefined>;
export function useListUsers(dc: DataConnect, options?: useDataConnectQueryOptions<ListUsersData>): UseDataConnectQueryResult<ListUsersData, undefined>;
