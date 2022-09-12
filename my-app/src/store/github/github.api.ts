import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { Iuser, ServerResponse } from '../../models/models';

export const githubApi = createApi({
 reducerPath: 'github/api',
 baseQuery: fetchBaseQuery({
    baseUrl: 'http://api.github.com'
 }),
 endpoints: build => ({
searchUsers: build.query<Iuser[], string>({
    query: (search: string) => ({
        url:'search/users',
        params: {
            q: search,
            per_page: 10
        }
    }),
    transformResponse:(response:ServerResponse<Iuser>) => response.items
})

 })
});

export const {useSearchUsersQuery} = githubApi;