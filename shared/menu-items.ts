import { Injectable } from "@angular/core";

export interface Menu {
    state: string;
    name: string;
    icon: string;
    role: string;
}

const MENUITEMS = [
    { state: 'dashboard', name: 'Dashboard', icon: 'dashboard', role: '' },
    { state: 'category', name: 'Manage Categorys', icon: 'category', role: 'admin' },
    { state: 'stage', name: 'Manage Internships', icon: 'inventory_2', role: 'admin' },
    { state: 'infostage', name: 'Registration', icon: 'list_alt', role: '' },
    { state: 'Affectedinternships', name: 'Affected Internships', icon: 'import_contacts', role: '' },
    { state: 'user', name: 'View user', icon: 'people', role: 'admin' }

];

@Injectable()
export class MenuItems {
    getMenuitem(): Menu[] {
        return MENUITEMS;
    }
}