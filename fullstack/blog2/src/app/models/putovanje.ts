import { Aranzman } from "./aranzman";
import { User } from "./user";

export interface Putovanje {
    id: number,
    aranzman: Aranzman,
    user: User,
}
