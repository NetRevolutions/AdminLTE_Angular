import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  // Por ahora es fijo, luego vendra de BD de manera dinamica
  menu: any[] = [
    {
      name: 'Dashboard',
      iconClassesClasses: 'nav-iconClasses fas fa-tachometer-alt',
      children: [
        { name: 'Home', iconClasses: 'far fa-circle nav-iconClasses', path: ['/']}
      ]
    },
    {
      name: 'Operaciones',
      iconClasses: 'nav-iconClasses fas fa-solid fa-wrench',
      children: [
        { name: 'Calculo de Tarifas Lima y Callao', iconClasses: 'far fa-circle nav-iconClasses', path: ['/operaciones/calculo-tarifas/lima-callao']},
        { name: 'Calculo de Tarifas Provincia', iconClasses: 'far fa-circle nav-iconClasses', path: ['/operaciones/calculo-tarifas/provincia']},
        { name: 'Solicitud de Serv. - Evaluacion', iconClasses: 'far fa-circle nav-iconClasses', path: ['/operaciones/solicitud-servicio-evaluacion']}
      ]
    },
    {
      name: 'Ordenes de Trabajo',
      iconClasses: 'nav-iconClasses fas fa-regular fa-note',
      children: [
        { name: 'Creacion de Ordenes de Trabajo', iconClasses: 'far fa-circle nav-iconClasses', path: ['/dashboard']},
        { name: 'Control de Documentos', iconClasses: 'far fa-circle nav-iconClasses', path: ['/dashboard']},
        { name: 'Estado Ordenes de Trabajo', iconClasses: 'far fa-circle nav-iconClasses', path: ['/dashboard']}
      ]
    },
    {
      name: 'Administracion',
      iconClasses: 'nav-iconClasses fas fa-solid fa-screwdriver-wrench',
      children: [
        {name: 'Cuentas de Usuario', iconClasses: 'far fa-circle nav-iconClasses', path: ['/dashboard']},
        {name: 'Roles', iconClasses: 'far fa-circle nav-iconClasses', path: ['/dashboard']},
        {name: 'Lookup', iconClasses: 'far fa-circle nav-iconClasses', path: ['/dashboard']},
        {name: 'Menu', iconClasses: 'far fa-circle nav-iconClasses', path: ['/dashboard']},
      ]
    },
    {
      name: 'Mantenimientos',
      iconClasses: 'nav-iconClasses fas fa-duotone fa-gear',
      children: [
        {name: 'Choferes', iconClasses: 'far fa-circle nav-iconClasses', path: ['/dashboard']},
        {name: 'Camiones', iconClasses: 'far fa-circle nav-iconClasses', path: ['/dashboard']},
        {name: 'Complementos', iconClasses: 'far fa-circle nav-iconClasses', path: ['/dashboard']},
        {name: 'Transportistas', iconClasses: 'far fa-circle nav-iconClasses', path: ['/dashboard']},
        {name: 'Almacenes', iconClasses: 'far fa-circle nav-iconClasses', path: ['/dashboard']},
        {name: 'Zonas', iconClasses: 'far fa-circle nav-iconClasses', path: ['/dashboard']},
        {name: 'Agencias y/o Clientes', iconClasses: 'far fa-circle nav-iconClasses', path: ['/dashboard']},
        {name: 'Tarifas x Distrito x Zona', iconClasses: 'far fa-circle nav-iconClasses', path: ['/dashboard']},
        {name: 'Tarifas x Agencia', iconClasses: 'far fa-circle nav-iconClasses', path: ['/dashboard']},
        {name: 'Peajes', iconClasses: 'far fa-circle nav-iconClasses', path: ['/dashboard']}
      ]
    }
  ]
  
  constructor() { }
}
