import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

// Models
import {User} from '@/models/user.model';

// Services
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
        private searchesService: SearchesService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.loadUsers();
    }

    loadUsers() {
        this.userService.getUsers(this.from).subscribe({
            next: (usersData: any) => {
                if (usersData.ok) {
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
                this.users = results;
            },
            error: (err) => {
                this.toastr.error('Se produjo un error al buscar datos');
                console.error(err);
            }
        });
    }
}
