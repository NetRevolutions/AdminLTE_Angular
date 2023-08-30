import {EventEmitter, Injectable} from '@angular/core';
import {environment} from 'environments/environment';

// Enums
import {enumTypeImage} from '@/utils/type-image.enum';

const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})
export class ModalImageService {
    private _hiddeModal: boolean = true;
    public type: enumTypeImage; //'users'|'drivers'|'complements'|'vehicles';
    public id: string;
    public img: string;

    public newImage: EventEmitter<string> = new EventEmitter<string>();

    get hiddeModal() {
        return this._hiddeModal;
    }

    openModal(
        type: enumTypeImage, //'users'|'drivers'|'complements'|'vehicles',
        id: string,
        img: string = 'no-img'
    ) {
        this._hiddeModal = false;
        this.type = type;
        this.id = id;
        // localhost:3000/api/upload/users/no-img
        if (img.includes('https')) {
            this.img = img;
        } else {
            this.img = `${base_url}/upload/${type}/${img}`;
        }
    }

    closeModal() {
        this._hiddeModal = true;
    }

    constructor() {}
}
