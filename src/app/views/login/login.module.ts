import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { loginRouting } from './login.routing';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        LoginComponent,
    ],
    imports: [
        loginRouting,
        TranslateModule,
    ],
    providers: [

    ]
})
export class LoginModule {
}
