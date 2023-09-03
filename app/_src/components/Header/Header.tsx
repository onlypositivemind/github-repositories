import { Flex, Title, Paper } from '@/components/ui';
import { SearchBox } from '../SearchBox/SearchBox';

export const Header = () => (
    <header>
        <Paper withBorder p='xl' radius='md'>
            <Flex align='center' gap='lg' justify='space-between'>
                <Title order={1} size='h4'>
                    &#127756; Github Repositories
                </Title>
                <SearchBox />
            </Flex>
        </Paper>
    </header>
);
