import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Alert, AlertType } from "./alert";
import { Router, NavigationStart } from "@angular/router";
import { ThrowStmt } from "@angular/compiler";

@Injectable({providedIn: 'root'})
export class AlertService {

    alertSubject: Subject<Alert> = new Subject<Alert>();
    keepAfterLoadChange = false;

    constructor(router: Router) {
        router.events.subscribe(event => {
            if(event instanceof NavigationStart) {
                if(this.keepAfterLoadChange) {
                    this.keepAfterLoadChange = false;
                } else {
                    this.clear();
                }
            }
        });
    }

    success(message: string, keepAfterLoadChange: boolean = false) {
        this.alert(AlertType.SUCCESS, message, keepAfterLoadChange);
    }

    warning(message: string, keepAfterLoadChange: boolean = false) {
        this.alert(AlertType.WARNING, message, keepAfterLoadChange);
    }

    danger(message: string, keepAfterLoadChange: boolean = false) {
        this.alert(AlertType.DANGER, message, keepAfterLoadChange);
    }

    info(message: string, keepAfterLoadChange: boolean = false) {
        this.alert(AlertType.INFO, message, keepAfterLoadChange);
    }

    private alert(alertType: AlertType, message: string, keepAfterLoadChange: boolean) {
        this.keepAfterLoadChange = keepAfterLoadChange;
        this.alertSubject.next(new Alert(alertType, message));
    }

    getAlert(){
        return this.alertSubject.asObservable();
    }

    clear() {
        this.alertSubject.next(null);
    }
}