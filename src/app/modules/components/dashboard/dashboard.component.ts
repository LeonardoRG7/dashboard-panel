import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { Project } from 'src/app/core/interfaces/project';
import { DevelopersService } from 'src/app/core/services/developers.service';
import { ProjectsService } from 'src/app/core/services/projects.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  projects: number = 0;
  projectsInDeploy: number = 0;
  totalNcs: number = 0;
  totalErrors: number = 0;

  constructor(private _developersService: DevelopersService) {}

  ngOnInit(): void {
    this._developersService.getTopCharts().subscribe((res) => {
      (this.projects = res.projects),
        (this.projectsInDeploy = res.projects_dev);
      this.totalNcs = res.peding_nc;
      this.totalErrors = res.errors_deploy;
    });
  }
}
