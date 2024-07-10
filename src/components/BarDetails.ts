export type BarDetails = {
    name: string,
    position: { lat: number, lng: number },
    url: string,
    comments?: string,
    town?: string,
    address?: string,
    placeId?: string,
    photoRef?: string,
    image?: string,
};

export type BarDetailRecords = Record<string, BarDetails>;

export type BarTown = {
    name: string,
    bars: string[],
}