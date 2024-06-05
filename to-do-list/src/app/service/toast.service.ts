import { ApplicationRef, ComponentRef, EmbeddedViewRef, Injectable, createComponent } from "@angular/core";
import { ToastComponent } from "./toast/toast.component";

export interface Toast {
    id: number;
    message: string;
}

@Injectable()
export class ToastService {
    private componentRef: ComponentRef<ToastComponent> | null = null;
    private toasts: Array<Toast> = [];
    private readonly TOAST_TIMEOUT = 5000;

    constructor(
        private applicationRef: ApplicationRef) { }

    get getToastMessages() {
        return this.toasts.map(toast => toast.message);
    }

    showToast(message: Toast["message"]): void {
        const toast = {
            id: Math.max(...this.toasts.map(item => item.id), -1) + 1,
            message: message,
        }
        this.toasts.push(toast);
        this.createToastComponent();
        setTimeout(() => {
            this.deleteToast(toast);
            if (this.toasts.length === 0)
                this.destroyToastComponent();
        }, this.TOAST_TIMEOUT);
    }

    private createToastComponent(): void {
        if (this.componentRef === null) {
            this.componentRef = createComponent(
                ToastComponent, {
                environmentInjector: this.applicationRef.injector,
            });
            this.applicationRef.attachView(this.componentRef.hostView)
            const domElement = (this.componentRef.hostView as EmbeddedViewRef<HTMLElement>).rootNodes[0] as HTMLElement;
            document.body.appendChild(domElement);
        }
    }

    private destroyToastComponent(): void {
        if (this.componentRef !== null) {
            this.applicationRef.detachView(this.componentRef.hostView);
            this.componentRef.destroy();
            this.componentRef = null
        }
    }

    private deleteToast(toast: Toast): void {
        const toastIndex = this.toasts.findIndex(item => item.id === toast.id);
        if (toastIndex > -1)
            this.toasts.splice(toastIndex, 1);
    }
}