import { menuItem } from '../models/menuItem'

export class Addon {
    menu_id: number;
    menu_name: string;
    menu_name_ar:number;
    menu_type: string;
    min_quantity: number;
    max_quantity: number;
    quantity_type: string;
    sort_order: number;
    vendorItemMenuItems: menuItem[];
}
