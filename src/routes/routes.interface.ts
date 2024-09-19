export interface Route {
    name: string;
    component: string
    init?: () => void
}