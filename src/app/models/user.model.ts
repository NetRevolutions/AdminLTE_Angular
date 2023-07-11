import { environment } from "environments/environment";

const base_url = environment.base_url;

export class User {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public userName: string,
        public mobile: string,
        public password?: string,
        public imagePath?: string,        
        public roles?: [],
        public uid?: string,
        public createdUtc?: Date
    ) { }

    get imageUrl() {
        if ( this.imagePath ) {            
            return `${ base_url }/upload/users/${ this.imagePath }`;
        }
        else {
            return `${ base_url }/upload/users/no-image`;
        }   
    }

    get fullName() {
        return this.firstName + ' ' + this.lastName;
    }

}
