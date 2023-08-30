import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';

// Services
import {FileUploadService} from '@services/file-upload.service';
import {ModalImageService} from '@services/modal-image.service';

@Component({
    selector: 'app-modal-imagen',
    templateUrl: './modal-imagen.component.html',
    styles: []
})
export class ModalImagenComponent implements OnInit {
    public imgLoad: File;
    public imgTemp: any = null;

    constructor(
        public modalImagenService: ModalImageService,
        public fileUploadService: FileUploadService
    ) {}

    ngOnInit(): void {}

    closeModal() {
        this.imgTemp = null;
        this.modalImagenService.closeModal();
    }

    changeImage(file: File) {
        this.imgLoad = file;

        if (!file) {
            return (this.imgTemp = null);
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            this.imgTemp = reader.result;
        };
    }

    uploadImage() {
        const id = this.modalImagenService.id;
        const type = this.modalImagenService.type;

        this.fileUploadService
            .updatePhoto(this.imgLoad, type, id)
            .then((img) => {
                Swal.fire(
                    'Guardado',
                    'Imagen de usuario actualizada',
                    'success'
                );

                this.modalImagenService.newImage.emit(img);

                this.closeModal();
            })
            .catch((err) => {
                console.log(err);
                Swal.fire('Error', 'No se pudo subir la imagen', 'error');
            });
    }
}
