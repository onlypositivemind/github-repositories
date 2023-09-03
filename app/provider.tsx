'use client';

import { ReactNode, useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { MantineProvider } from '@mantine/core';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql',
});

const authLink = setContext((_, { headers }) => ({
    headers: {
        ...headers,
        'User-Agent': 'onlypositivemind',
        authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_PERSONAL_TOKEN ?? ''}`,
    },
}));

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export const useGluedEmotionCache = (key = 'emotion') => {
    const [cache] = useState(() => {
        const cache = createCache({ key });
        cache.compat = true;
        return cache;
    });

    useServerInsertedHTML(() => {
        const entries = Object.entries(cache.inserted);
        if (entries.length === 0) {
            return null;
        }

        const names = entries
            .map(([n]) => n)
            .filter((n) => typeof n === 'string')
            .join(' ');
        const styles = entries.map(([, s]) => s).join('\n');
        const emotionKey = `${key} ${names}`;

        return <style data-emotion={emotionKey} dangerouslySetInnerHTML={{ __html: styles }} />;
    });

    return cache;
};

export const Provider = ({ children }: { children: ReactNode }) => {
    const cache = useGluedEmotionCache();

    return (
        <ApolloProvider client={client}>
            <CacheProvider value={cache}>
                <MantineProvider
                    withGlobalStyles
                    withNormalizeCSS
                    theme={{ colorScheme: 'dark' }}
                    emotionCache={cache}
                >
                    {children}
                </MantineProvider>
            </CacheProvider>
        </ApolloProvider>
    );
};
