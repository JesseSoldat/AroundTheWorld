import { NgModule } from "@angular/core";

// Modules
import { SharedModule } from "../shared/shared.module";
import { DashboardRoutingModule } from "./dashboard-routing.module";
// Components
import { DashboardComponent } from "./dashboard/dashboard.component";

@NgModule({
  imports: [SharedModule, DashboardRoutingModule],
  declarations: [DashboardComponent],
  exports: []
})
export class DashboardModule {}
