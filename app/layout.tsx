import { ReactNode } from 'react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Box, Container, Flex } from '@/components';
import { Header } from './Header';
import { Provider } from './provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Github Repositories',
    description: 'Github Repositories',
};

interface RootLayoutProps {
    children: ReactNode;
    modal: ReactNode;
}

const RootLayout = ({ children, modal }: RootLayoutProps) => (
    <html lang='en'>
        <body className={inter.className}>
            <Provider>
                <Container size='sm' mt='lg'>
                    <Flex direction='column' gap='lg'>
                        <Header />
                        <Box color='gray.8'>{children}</Box>
                    </Flex>
                </Container>
                {modal}
            </Provider>
        </body>
    </html>
);

export default RootLayout;
