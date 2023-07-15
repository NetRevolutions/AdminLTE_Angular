import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    // Por ahora es fijo, luego vendra de BD de manera dinamica
    menu: any[] = [
        {
            name: 'Dashboard',
            iconClasses: 'nav-iconClasses fas fa-tachometer-alt',
            children: [
                {
                    name: 'Home',
                    iconClasses: 'far fa-circle nav-iconClasses',
                    path: ['/']
                }
            ]
        },
        {
            name: 'Operaciones',
            iconClasses: 'nav-iconClasses fas fa-solid fa-wrench',
            children: [
                {
                    name: 'Calculo de Tarifas Lima y Callao',
                    iconClasses: 'far fa-circle nav-iconClasses',
                    path: ['/operaciones/calculo-tarifas/lima-callao']
                },
                {
                    name: 'Calculo de Tarifas Provincia',
                    iconClasses: 'far fa-circle nav-iconClasses',
                    path: ['/operaciones/calculo-tarifas/provincia']
                },
                {
                    name: 'Solicitud de Serv. - Evaluacion',
                    iconClasses: 'far fa-circle nav-iconClasses',
                    path: ['/operaciones/solicitud-servicio-evaluacion']
                }
            ]
        },
        {
            name: 'Ordenes de Trabajo',
            iconClasses: 'nav-iconClasses fas fa-solid fa-book',
            children: [
                {
                    name: 'Creacion de Ordenes de Trabajo',
                    iconClasses: 'far fa-circle nav-iconClasses',
                    path: ['/ordenes-de-trabajo/creacion']
                },
                {
                    name: 'Control de Documentos',
                    iconClasses: 'far fa-circle nav-iconClasses',
                    path: ['/ordenes-de-trabajo/control-documentos']
                },
                {
                    name: 'Estado Ordenes de Trabajo',
                    iconClasses: 'far fa-circle nav-iconClasses',
                    path: ['/ordenes-de-trabajo/estado']
                }
            ]
        },
        {
            name: 'Administracion',
            iconClasses: 'nav-iconClasses fas fa-solid fa-user-secret',
            children: [
                {
                    name: 'Cuentas de Usuario',
                    iconClasses: 'far fa-circle nav-iconClasses',
                    path: ['/administracion/cuentas-de-usuario']
                },
                {
                    name: 'Roles',
                    iconClasses: 'far fa-circle nav-iconClasses',
                    path: ['/administracion/roles']
                },
                {
                    name: 'Lookup Code Group',
                    iconClasses: 'far fa-circle nav-iconClasses',
                    path: ['/administracion/lookup/lookup-code-group']
                },
                {
                    name: 'Lookup Code',
                    iconClasses: 'far fa-circle nav-iconClasses',
                    path: ['/administracion/lookup/lookup-code']
                },
                {
                    name: 'Menu',
                    iconClasses: 'far fa-circle nav-iconClasses',
                    path: ['/administracion/menu']
                }
            ]
        },
        {
            name: 'Mantenimientos',
            iconClasses: 'nav-iconClasses fas fa-solid fa-cubes',
            children: [
                {
                    name: 'Choferes',
                    iconClasses: 'far fa-circle nav-iconClasses',
                    path: ['/mantenimientos/choferes']
                },
                {
                    name: 'Vehiculos',
                    iconClasses: 'far fa-circle nav-iconClasses',
                    path: ['/mantenimientos/vehiculos']
                },
                {
                    name: 'Complementos',
                    iconClasses: 'far fa-circle nav-iconClasses',
                    path: ['/mantenimientos/complementos']
                },
                {
                    name: 'Transportistas',
                    iconClasses: 'far fa-circle nav-iconClasses',
                    path: ['/mantenimientos/transportistas']
                },
                {
                    name: 'Almacenes',
                    iconClasses: 'far fa-circle nav-iconClasses',
                    path: ['/mantenimientos/almacenes']
                },
                {
                    name: 'Zonas',
                    iconClasses: 'far fa-circle nav-iconClasses',
                    path: ['/mantenimientos/zonas']
                },
                {
                    name: 'Lugares',
                    iconClasses: 'far fa-circle nav-iconClasses',
                    path: ['/mantenimientos/lugares']
                },
                {
                    name: 'Agencias y/o Clientes',
                    iconClasses: 'far fa-circle nav-iconClasses',
                    path: ['/mantenimientos/clientes']
                },
                {
                    name: 'Tarifas x Lugar x Zona',
                    iconClasses: 'far fa-circle nav-iconClasses',
                    path: ['/mantenimientos/tarifas']
                },
                {
                    name: 'Tarifas x Agencia',
                    iconClasses: 'far fa-circle nav-iconClasses',
                    path: ['/mantenimientos/tarifas-por-agencia']
                },
                {
                    name: 'Peajes',
                    iconClasses: 'far fa-circle nav-iconClasses',
                    path: ['/mantenimientos/peajes']
                }
            ]
        }
    ];

    constructor() {}
}
