import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule,FormsModule} from "@angular/forms";
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { StatModule } from '../../shared';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        StatModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule
    ],
    declarations: [DashboardComponent]
})
export class DashboardModule { }
