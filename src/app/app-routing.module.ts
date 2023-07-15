import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from '@modules/main/main.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {LoginComponent} from '@modules/login/login.component';
import {ProfileComponent} from '@pages/profile/profile.component';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {AuthGuard} from '@guards/auth.guard';
import {NonAuthGuard} from '@guards/non-auth.guard';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {SubMenuComponent} from '@pages/main-menu/sub-menu/sub-menu.component';
import {LimaCallaoComponent} from '@pages/operations/rate-calculation/lima-callao/lima-callao.component';
import {ProvinceComponent} from '@pages/operations/rate-calculation/province/province.component';
import {RequestServiceEvaluationComponent} from '@pages/operations/request-service-evaluation/request-service-evaluation.component';
import {WorkOrderCreationComponent} from '@pages/work-order/work-order-creation/work-order-creation.component';
import {ControlDocumentsComponent} from '@pages/work-order/control-documents/control-documents.component';
import {WorkOrderStateComponent} from '@pages/work-order/work-order-state/work-order-state.component';
import {UsersComponent} from '@pages/maintenances/users/users.component';
import {RolesComponent} from '@pages/maintenances/roles/roles.component';
import {LookupCodeGroupComponent} from '@pages/maintenances/lookup/lookup-code-group/lookup-code-group.component';
import {LookupCodeComponent} from '@pages/maintenances/lookup/lookup-code/lookup-code.component';
import {MenusComponent} from '@pages/maintenances/menus/menus.component';
import {DriversComponent} from '@pages/maintenances/drivers/drivers.component';
import {VehicleComponent} from '@pages/maintenances/vehicle/vehicle.component';
import {ComplementComponent} from '@pages/maintenances/complement/complement.component';
import {TransportPartnersComponent} from '@pages/maintenances/transport-partners/transport-partners.component';
import {WarehousesComponent} from '@pages/maintenances/warehouses/warehouses.component';
import {ZonesComponent} from '@pages/maintenances/zones/zones.component';
import {CompaniesComponent} from '@pages/maintenances/companies/companies.component';
import {PlacesComponent} from '@pages/maintenances/places/places.component';
import {FeesComponent} from '@pages/maintenances/fees/fees.component';
import {FeesCompanyComponent} from '@pages/maintenances/fees-company/fees-company.component';
import {TollsComponent} from '@pages/maintenances/tolls/tolls.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'profile',
                component: ProfileComponent,
                data: {title: 'Perfil de Usuario'}
            },
            {
                path: 'blank',
                component: BlankComponent,
                data: {title: ''}
            },
            {
                path: 'sub-menu-1',
                component: SubMenuComponent,
                data: {title: 'Sub-menu 1'}
            },
            {
                path: 'sub-menu-2',
                component: BlankComponent,
                data: {title: 'Sub-menu 2'}
            },
            {
                path: 'operaciones',
                children: [
                    {
                        path: 'calculo-tarifas',
                        children: [
                            {
                                path: 'lima-callao',
                                component: LimaCallaoComponent,
                                data: {
                                    title: 'Calculo de Tarifas - Lima y Callao'
                                }
                            },
                            {
                                path: 'provincia',
                                component: ProvinceComponent,
                                data: {title: 'Calculo de Tarifas - Provincia'}
                            }
                        ]
                    },
                    {
                        path: 'solicitud-servicio-evaluacion',
                        component: RequestServiceEvaluationComponent,
                        data: {title: 'Solicitud de Servicio - Evaluacion'}
                    }
                ]
            },
            {
                path: 'ordenes-de-trabajo',
                children: [
                    {
                        path: 'creacion',
                        component: WorkOrderCreationComponent,
                        data: {title: 'Creacion'}
                    },
                    {
                        path: 'control-documentos',
                        component: ControlDocumentsComponent,
                        data: {title: 'Control de Documentos'}
                    },
                    {
                        path: 'estado',
                        component: WorkOrderStateComponent,
                        data: {title: 'Estado de Documentos'}
                    }
                ]
            },
            {
                path: 'administracion',
                children: [
                    {
                        path: 'cuentas-de-usuario',
                        component: UsersComponent,
                        data: {title: 'Administracion - Cuentas de Usuario'}
                    },
                    {
                        path: 'roles',
                        component: RolesComponent,
                        data: {title: 'Administracion - Roles'}
                    },
                    {
                        path: 'lookup',
                        children: [
                            {
                                path: 'lookup-code-group',
                                component: LookupCodeGroupComponent,
                                data: {
                                    title: 'Administracion - Lookup - Lookup Code Group'
                                }
                            },
                            {
                                path: 'lookup-code',
                                component: LookupCodeComponent,
                                data: {
                                    title: 'Administracion - Lookup - Lookup Code'
                                }
                            }
                        ]
                    },
                    {
                        path: 'menu',
                        component: MenusComponent,
                        data: {title: 'Administracion - Menu'}
                    }
                ]
            },
            {
                path: 'mantenimientos',
                children: [
                    {
                        path: 'choferes',
                        component: DriversComponent,
                        data: {title: 'Mantenimientos - Choferes'}
                    },
                    {
                        path: 'vehiculos',
                        component: VehicleComponent,
                        data: {title: 'Mantenimientos - Vehiculos'}
                    },
                    {
                        path: 'complementos',
                        component: ComplementComponent,
                        data: {title: 'Mantenimientos - Complementos'}
                    },
                    {
                        path: 'transportistas',
                        component: TransportPartnersComponent,
                        data: {title: 'Mantenimientos - Transportistas'}
                    },
                    {
                        path: 'almacenes',
                        component: WarehousesComponent,
                        data: {title: 'Mantenimientos - Almacenes'}
                    },
                    {
                        path: 'zonas',
                        component: ZonesComponent,
                        data: {title: 'Mantenimientos - Zonas'}
                    },
                    {
                        path: 'clientes',
                        component: CompaniesComponent,
                        data: {title: 'Mantenimiento - Clientes'}
                    },
                    {
                        path: 'lugares',
                        component: PlacesComponent,
                        data: {title: 'Mantenimientos - Lugares'}
                    },
                    {
                        path: 'tarifas',
                        component: FeesComponent,
                        data: {title: 'Mantenimientos - Tarifas'}
                    },
                    {
                        path: 'tarifas-por-agencia',
                        component: FeesCompanyComponent,
                        data: {title: 'Mantenimientos - Tarifas por Agencia'}
                    },
                    {
                        path: 'peajes',
                        component: TollsComponent,
                        data: {title: 'Mantenimientos - Peajes'}
                    }
                ]
            },
            {
                path: '',
                component: DashboardComponent,
                data: {title: 'Dashboard'}
            }
        ]
    },
    {
        path: 'external',
        component: MainComponent, // Crear un componente external (como MainComponent) que no requiera autenticacion
        canActivate: [NonAuthGuard],
        canActivateChild: [NonAuthGuard],
        children: [
            {
                path: 'calculo-tarifas',
                children: [
                    {
                        path: 'lima-callao',
                        component: LimaCallaoComponent,
                        data: {title: 'Calculo de Tarifas - Lima y Callao'}
                    },
                    {
                        path: 'provincia',
                        component: ProvinceComponent,
                        data: {title: 'Calculo de Tarifas - Provincia'}
                    }
                ]
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'recover-password',
        component: RecoverPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
