import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

// Models
import {Role} from '@/models/role.models';
import {User} from '@/models/user.model';

// Services
import {RoleService} from '@services/role.service';
import {UserService} from '@services/user.service';
import {SearchesService} from '@services/searches.service';
import {enumModel} from '@/utils/models.enum';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    public totalUsers: number = 0;
    public users: User[] = [];
    public usersTemp: User[] = [];
    public from: number = 0;
    public loading: boolean = true;

    constructor(
        private userService: UserService,
        private roleService: RoleService,
        private searchesService: SearchesService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.loadUsers();
    }

    loadUsers() {
        // TODO: Destructurarlo en metodos asincronos para poder reutilizar las funciones
        this.loading = true;
        this.roleService.getRoles().subscribe({
            next: (rolesData: any) => {
                this.userService.getUsers(this.from).subscribe({
                    next: (usersData: any) => {
                        if (usersData.ok) {
                            // Transformamos los userRoles - Begin
                            usersData.users.forEach((item) => {
                                let rolesTemp = [];
                                let itemRoles: [Role] = item.roles;
                                itemRoles.forEach((itemRole) => {
                                    let roleId = itemRole;
                                    let roleName = rolesData.roles.find(
                                        (r) => r._id == itemRole
                                    ).roleName;
                                    rolesTemp.push({roleId, roleName});
                                });
                                item.roles = rolesTemp;
                            });
                            // Transformamos los userRoles - End
                            this.totalUsers = usersData.total;
                            this.users = usersData.users;
                            this.usersTemp = usersData.users;

                            this.loading = false;
                            //console.log(this.users);
                        }
                    },
                    error: (err) => {
                        this.loading = false;
                        this.toastr.error(
                            'Se produjo un error al traer los Datos de los usuarios'
                        );
                        console.error(err.error.msg);
                    }
                });
            },
            error: (err) => {
                this.loading = false;
                this.toastr.error('Se produjo un error al traer los roles');
                console.error(err.error.msg);
            }
        });
    }

    changePage(val: number) {
        this.from += val;

        if (this.from < 0) {
            this.from = 0;
        } else if (this.from > this.totalUsers) {
            this.from -= val;
        }

        this.loadUsers();
    }

    search(term: string) {
        if (term.length === 0) {
            return (this.users = this.usersTemp);
        }

        this.searchesService.search(enumModel.USER, term).subscribe({
            next: (results) => {
                this.users = results; // TODO: Mejorar la parte para traer los roles.
            },
            error: (err) => {
                this.toastr.error('Se produjo un error al buscar datos');
                console.error(err);
            }
        });
    }
}
