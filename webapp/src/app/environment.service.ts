import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class EnvironmentService {

    private appConfig;
    private configUrl;
    constructor(private injector: Injector) { }

    loadAppConfig(host) {
        const http = this.injector.get(HttpClient);


        switch (host) {
            case 'localhost:4200':
                this.configUrl = 'http://localhost:3000/config/local';
                break;
            case 'track.gen4.info':
                this.configUrl = 'https://track.gen4.info/api/config/production';
                break;
            case 'track.dev.gen4.info':
                this.configUrl = 'https://track.dev.gen4.info/api/config/dev';
                break;
            case 'track.beta.gen4.info':
                this.configUrl = 'https://track.beta.gen4.info/api/config/beta';
                break;
        }

        return http.get(this.configUrl)
            .toPromise()
            .then(data => {
                console.log(data);
                this.appConfig = data;
            });
    }

    get config() {
        return this.appConfig;
    }
}
