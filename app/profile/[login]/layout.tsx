import { ReactNode } from 'react';
import { Flex } from '@/components';

interface ProfileLayoutProps {
    children: ReactNode;
    repositories: ReactNode;
    organizations: ReactNode;
}

const ProfileLayout = ({ children, repositories, organizations }: ProfileLayoutProps) => {
    return (
        <>
            {children}
            <Flex direction='column' gap='lg' mt='lg' w='100%'>
                {organizations}
                {repositories}
            </Flex>
        </>
    );
};

export default ProfileLayout;
