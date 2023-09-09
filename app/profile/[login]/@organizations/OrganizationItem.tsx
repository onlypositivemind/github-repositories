import Link from 'next/link';
import { OrganizationType } from '@/gql';
import { Card, Badge, Text, Avatar, Group } from '@/components';

interface OrganizationItemProps {
    organization: OrganizationType;
}

const OrganizationItem = ({ organization }: OrganizationItemProps) => (
    <Card padding='lg' radius='md' w='100%'>
        <Group position='apart'>
            <Avatar size='md' src={organization.avatarUrl as string} />
            <Badge size='sm'>{organization.location}</Badge>
        </Group>
        <Link href={organization.url as string} prefetch={false} target='_blank'>
            <Text fw={500} fz='md' mt={5}>
                {organization.name}
            </Text>
        </Link>
        {organization.description && (
            <Text c='dimmed' fz='sm' mt={5}>
                {organization.description}
            </Text>
        )}
    </Card>
);

export default OrganizationItem;
