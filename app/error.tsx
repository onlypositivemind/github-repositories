'use client';

import { Title } from '@/components';

const ErrorPage = ({ error }: { error: Error }) => (
    <Title order={2} size='h3'>
        Oops... {error.message}
    </Title>
);

export default ErrorPage;
