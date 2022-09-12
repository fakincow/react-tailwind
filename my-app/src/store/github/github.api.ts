import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Iuser, ServerResponse } from '../../models/models';

export const githubApi = createApi({
    reducerPath: 'github/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://api.github.com'
    }),
    refetchOnFocus: true,
    endpoints: build => ({
        searchUsers: build.query<Iuser[], string>({
            query: (search: string) => ({
                url: 'search/users',
                params: {
                    q: search,
                    per_page: 10
                }
            }),
            transformResponse: (response: ServerResponse<Iuser>) => response.items
        }),
        getUserRepos: build.query<any, string>({
            query: (username: string) => ({
                url: `users/${username}/repos`,
        }),
    })
    })
})

export const { useSearchUsersQuery, useLazyGetUserReposQuery } = githubApi;