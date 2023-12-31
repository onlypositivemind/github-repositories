import { IconBook2, IconStar, IconGitFork } from '@tabler/icons-react';
import { LocalModal, Badge, Flex, Text } from '@/components';
import { gql } from '@/gql';

interface RepositoryModalProps {
    params: {
        owner: string;
        repository: string;
    };
}

const RepositoryModal = async ({ params }: RepositoryModalProps) => {
    const { repository } = await gql.GetRepository({
        owner: params.owner,
        name: params.repository,
    });

    if (!repository) {
        return null;
    }

    return (
        <LocalModal title='Repository'>
            <Flex align='center' gap='3px'>
                <Badge size='sm'>{repository.isPrivate ? 'private' : 'public'}</Badge>
                <IconBook2 size='15px' stroke={1.5} />
                <a href={repository.url as string} rel='noreferrer' target='_blank'>
                    <Text fw={500} fz='md'>
                        {repository.name}
                    </Text>
                </a>
            </Flex>
            {repository.description && (
                <Text c='dimmed' fz='sm' mt={5}>
                    {repository.description}
                </Text>
            )}
            {(!!repository.stargazerCount || !!repository.forkCount) && (
                <Flex align='center' fz='xs' gap='sm' mt='sm'>
                    {!!repository.stargazerCount && (
                        <Flex align='center' gap='2px'>
                            <IconStar size='12px' stroke={1.5} />
                            <Text color='gray.3'>{repository.stargazerCount}</Text>
                        </Flex>
                    )}
                    {!!repository.forkCount && (
                        <Flex align='center' gap='2px'>
                            <IconGitFork size='12px' stroke={1.5} />
                            <Text color='gray.3'>{repository.forkCount}</Text>
                        </Flex>
                    )}
                </Flex>
            )}
        </LocalModal>
    );
};

export default RepositoryModal;
