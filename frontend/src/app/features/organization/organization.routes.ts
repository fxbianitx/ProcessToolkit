import { Routes } from "@angular/router";
import { OrgSelectComponent } from "./pages/org-select/org-select.component";
import { OrgCreateComponent } from "./pages/org-create/org-create.component";
import { OrgDashboardComponent } from "./pages/org-dashboard/org-dashboard.component";
import { OrgSettingsComponent } from "./pages/org-settings/org-settings.component";

export const ORGANIZATION_ROUTES: Routes = [
  { path: "orgs", component: OrgSelectComponent },
  { path: "orgs/new", component: OrgCreateComponent },
  { path: "org/:orgId/dashboard", component: OrgDashboardComponent },
  { path: "org/:orgId/settings", component: OrgSettingsComponent },
];
