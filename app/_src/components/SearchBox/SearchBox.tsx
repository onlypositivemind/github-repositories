'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDebouncedValue } from '@mantine/hooks';
import { AutocompleteItem } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useSearchUsersQuery, SearchType } from '@/gql';
import { Autocomplete, Loader } from '@/components/ui';
import { getRouteProfile } from '@/utils/constants';
import { SearchBoxItem } from './SearchBoxItem';

const SearchBoxComponent = () => {
    const router = useRouter();
    const [searchValue, setSearchValue] = useState('');
    const [debouncedValue] = useDebouncedValue(searchValue, 500);

    const searchUsersQuery = useSearchUsersQuery({
        variables: {
            type: SearchType.User,
            query: '',
            first: 10,
        },
        notifyOnNetworkStatusChange: true,
    });

    const users = useMemo(
        () =>
            searchUsersQuery.data?.search.nodes
                ?.filter((node) => node && node.__typename === 'User' && !!node.login)
                .map((node) => {
                    if (node && node.__typename === 'User') {
                        return { ...node, value: node.login };
                    }

                    return node;
                }) ?? [],
        [searchUsersQuery.data?.search],
    );

    const handleChange = useCallback((val: string) => {
        setSearchValue(val);
    }, []);

    const handleNavigateProfile = useCallback((option: AutocompleteItem) => {
        router.push(getRouteProfile(option.value));
    }, []);

    useEffect(() => {
        searchUsersQuery.refetch({
            query: debouncedValue,
        });
    }, [debouncedValue]);

    return (
        <Autocomplete
            // @ts-ignore
            data={users}
            filter={Boolean}
            value={searchValue}
            onChange={handleChange}
            itemComponent={SearchBoxItem}
            onItemSubmit={handleNavigateProfile}
            rightSection={
                searchUsersQuery.loading ? <Loader size={16} /> : <IconSearch size={16} />
            }
            placeholder='Find by username'
            disabled={searchUsersQuery.loading}
        />
    );
};

export const SearchBox = memo(SearchBoxComponent);
