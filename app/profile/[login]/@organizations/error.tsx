'use client';

import { IconAlertCircle } from '@tabler/icons-react';
import { Alert, Button, Flex, Text } from '@/components';
import { useCallback } from 'react';

interface OrganizationsErrorProps {
    error: Error;
    reset: () => void;
}

const OrganizationsError = ({ error, reset }: OrganizationsErrorProps) => {
    const handleReset = useCallback(() => {
        reset();
    }, [reset]);

    return (
        <>
            <Text size='lg'>Organizations</Text>
            <Alert
                color='red'
                icon={<IconAlertCircle size='1rem' />}
                radius='md'
                title='Something went wrong'
                w='100%'
            >
                <Flex direction='column' gap='xs'>
                    <Text>{error.message}</Text>
                    <Button color='red' size='xs' variant='outline' onClick={handleReset}>
                        Try again
                    </Button>
                </Flex>
            </Alert>
        </>
    );
};

export default OrganizationsError;
