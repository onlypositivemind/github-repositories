import { GraphQLClient } from 'graphql-request';
import { GetUserOrganizationsQuery, GetUserRepositoriesQuery } from './hooks/__generated__';
import { getSdk } from './requests/__generated__';

const client = new GraphQLClient(`https://api.github.com/graphql`, {
    headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_PERSONAL_TOKEN || ''}`,
    },
});

export const gql = getSdk(client);

export { useGetUserFollowersQuery, useSearchUsersQuery, SearchType } from './hooks/__generated__';

export type RepositoryType = NonNullable<
    NonNullable<NonNullable<GetUserRepositoriesQuery['user']>['repositories']>['nodes']
>[0];

export type OrganizationType = NonNullable<
    NonNullable<NonNullable<GetUserOrganizationsQuery['user']>['organizations']>['nodes']
>[0];
