import { ForwardedRef, forwardRef } from 'react';
import { Flex, Avatar, Text, SelectItemProps } from '@/components/ui';
import { Box } from '@mantine/core';

interface SearchBoxItemProps extends SelectItemProps {
    login: string;
    avatarUrl: string;
    name?: string;
    status?: {
        emoji?: string;
        message?: string;
    };
}

const SearchBoxItemComponent = (props: SearchBoxItemProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { login, name, avatarUrl, status, ...rest } = props;

    return (
        <Flex ref={ref} gap='sm' {...rest}>
            <Avatar src={avatarUrl} />
            <Box>
                <Text>{login}</Text>
                {name && (
                    <Text color='dimmed' size='xs'>
                        {name} {status && <Box>{status.message}</Box>}
                    </Text>
                )}
            </Box>
        </Flex>
    );
};

export const SearchBoxItem = forwardRef(SearchBoxItemComponent);
