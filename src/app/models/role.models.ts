export class Role {
    constructor(
        public roleName: String,
        public createdBy: String,
        public createdUtc: Date,
        public lastModifiedBy: String,
        public lastModifiedUtc: Date,
        public _id: string
    ) {}
}
