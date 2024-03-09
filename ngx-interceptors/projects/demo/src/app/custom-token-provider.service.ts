import { Injectable } from "@angular/core";
import { AuthTokenProvider } from "../../../ngx-interceptors/src/public-api";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CustomTokenProviderService implements AuthTokenProvider {
    getToken(): Observable<string> {
        // your logic for providing the auth token
        return of('yourToken');
    }
}