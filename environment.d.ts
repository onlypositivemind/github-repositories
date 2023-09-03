declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_GITHUB_PERSONAL_TOKEN: string;
        }
    }
}
