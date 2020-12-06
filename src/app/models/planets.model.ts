export interface Planets {
    hasMore: boolean;
    pageLoaded: number;
    results: Planet[];
}

export interface Planet {
    name: string;
    climate: string;
    population: number;
    rotationPeriod: string;
    diameter: string;
    gravity: string;
    terrain: string;
    residents?: any[];
}
