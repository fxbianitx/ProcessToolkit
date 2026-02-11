import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
    selector: "app-org-shell",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./org-shell.component.html",
})
export class OrgShellComponent {
    //! Definir título principal de la página
    @Input() title = "";

    //! Definir texto de apoyo debajo del título
    @Input() subtitle?: string;

    //! Mostrar o no el header de auth (si deseas consistencia total)
    @Input() showAuthHeader = true;

    //! Mostrar o no el footer de auth
    @Input() showAuthFooter = true;
}
