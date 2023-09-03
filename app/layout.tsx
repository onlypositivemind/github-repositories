import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Provider } from '@/app/provider';
import { Header } from '@/components';
import { Container, Flex } from '@/components/ui';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Github Repositories',
    description: 'Github Repositories',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang='en'>
            <Provider>
                <body className={inter.className}>
                    <Container mt='lg' size='md'>
                        <Flex direction='column' gap='lg'>
                            <Header />
                            <main>{children}</main>
                        </Flex>
                    </Container>
                </body>
            </Provider>
        </html>
    );
}
