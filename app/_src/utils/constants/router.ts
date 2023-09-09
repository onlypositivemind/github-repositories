export const getRouteProfile = (login: string) => `/profile/${login}`;
export const getRouteRepository = (owner: string, repository: string) =>
    `/repositories/${owner}/${repository}`;
