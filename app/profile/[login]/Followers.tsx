'use client';

import { useGetUserFollowersQuery } from '@/gql';
import { Avatar, Skeleton, Tooltip } from '@/components';
import { getRouteProfile } from '@/utils/constants';

const MAX_FOLLOWERS = 99;

interface FollowersProps {
    login: string;
}

export const Followers = ({ login }: FollowersProps) => {
    const followersQuery = useGetUserFollowersQuery({
        variables: {
            login,
            last: 5,
        },
    });

    if (
        !followersQuery.data?.user?.followers ||
        !followersQuery.data?.user?.followers.nodes ||
        followersQuery.loading
    ) {
        return (
            <Avatar.Group spacing='sm'>
                {Array.from({ length: 5 }).map((_el, index) => (
                    <Avatar key={index} component={Skeleton} radius='xl' size='sm' />
                ))}
            </Avatar.Group>
        );
    }

    const { totalCount, nodes } = followersQuery.data.user.followers;
    const followersCount = totalCount - nodes.length;

    return (
        <Avatar.Group spacing='sm'>
            {nodes.map((follower) => (
                <Tooltip key={follower.id} label={follower.login}>
                    <Avatar
                        key={follower.id}
                        alt={follower.login}
                        component='a'
                        href={getRouteProfile(follower.login)}
                        radius='xl'
                        size='sm'
                        src={follower.avatarUrl as string}
                    />
                </Tooltip>
            ))}
            {!!followersCount && (
                <Avatar radius='xl' size='sm'>
                    +{followersCount > MAX_FOLLOWERS ? MAX_FOLLOWERS : followersCount}
                </Avatar>
            )}
        </Avatar.Group>
    );
};
