import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Data services
import { UserService } from './shared/services/rest/user.Service';
import { ProjectService } from './shared/services/rest/project.Service';
import { TaskService } from './shared/services/rest/task.Service';
// @Ngrx
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// reduces and Actions
import { UserEffects } from './effects/users.effects';
import { ProjectEffects } from './effects/project.effects';
import { TaskEffects } from './effects/task.effects';
import { UserReducer } from './reducers/users.reducers';
import { ProjectReducer } from './reducers/project.reducers';
import { TaskReducer } from './reducers/task.reducers';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    // for development
    // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-4/master/dist/assets/i18n/', '.json');
    return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
    // return new TranslateHttpLoader(http);
}
@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
        AppRoutingModule,
        NgbModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        }),
        StoreModule.forRoot({
            user: UserReducer,
            project: ProjectReducer,
            task: TaskReducer
        }),
        StoreDevtoolsModule.instrument({
            maxAge: 10
        }),
        EffectsModule.forRoot([UserEffects, ProjectEffects, TaskEffects])
    ],
    providers: [AuthGuard, UserService, ProjectService, TaskService],
    bootstrap: [AppComponent]
})
export class AppModule {}
