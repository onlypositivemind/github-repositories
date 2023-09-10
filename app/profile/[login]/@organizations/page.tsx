import { gql } from '@/gql';
import { Flex, Title } from '@/components';
import OrganizationItem from './OrganizationItem';

interface OrganizationsProps {
    params: {
        login: string;
    };
}

const Organizations = async ({ params }: OrganizationsProps) => {
    const organizations = await gql.GetUserOrganizations({
        login: params.login,
    });

    // eslint-disable-next-line no-promise-executor-return
    await (() => new Promise((res) => setTimeout(res, 2000)))();

    if (params.login === 'onlypositivemind') {
        throw new Error(`Failed to download data from github for user ${params.login}`);
    }

    if (!organizations.user?.organizations.nodes?.length) {
        return null;
    }

    return (
        <Flex direction='column' gap='xs' w='100%'>
            <Title order={3} size='h4'>
                Organizations
            </Title>
            <Flex direction='column' gap='sm' w='100%'>
                {organizations.user?.organizations.nodes?.map((organization) => (
                    <OrganizationItem key={organization.id} organization={organization} />
                ))}
            </Flex>
        </Flex>
    );
};

export default Organizations;
