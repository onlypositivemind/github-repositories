import { gql } from '@/gql';
import { Flex, Title } from '@/components';
import RepositoryItem from './RepositoryItem';

interface RepositoriesProps {
    params: {
        login: string;
    };
}

const Repositories = async ({ params }: RepositoriesProps) => {
    const repositories = await gql.GetUserRepositories({
        login: params.login,
    });

    if (!repositories.user?.repositories.nodes?.length) {
        return null;
    }

    return (
        <Flex direction='column' gap='xs' w='100%'>
            <Title order={3} size='h4'>
                Repositories
            </Title>
            <Flex direction='column' gap='sm' w='100%'>
                {repositories.user.repositories.nodes.map((node) => {
                    if (!node) return null;
                    return <RepositoryItem key={node.id} login={params.login} repository={node} />;
                })}
            </Flex>
        </Flex>
    );
};

export default Repositories;
