'use client';

import { useCallback, useRef, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Modal } from '../index';

interface LocalModalProps {
    children: ReactNode;
    title?: ReactNode;
}

export const LocalModal = ({ children, title }: LocalModalProps) => {
    const overlayRef = useRef(null);
    const wrapperRef = useRef(null);
    const router = useRouter();

    const handleCloseModal = useCallback(() => {
        router.back();
    }, [router]);

    const handleKeyDown = useCallback(
        (ev: KeyboardEvent) => {
            if (ev.key === 'Escape') {
                handleCloseModal();
            }
        },
        [handleCloseModal],
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <Modal
            // @ts-ignore
            ref={overlayRef}
            centered
            opened
            className='fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60'
            onClose={handleCloseModal}
            closeOnEscape={false}
            title={title}
        >
            <div
                ref={wrapperRef}
                className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:w-10/12 md:w-8/12 lg:w-1/2 p-6'
            >
                {children}
            </div>
        </Modal>
    );
};
