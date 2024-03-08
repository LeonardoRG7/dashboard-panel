import { Component, OnInit } from '@angular/core';
import { DevelopersService } from 'src/app/core/services/developers.service';
import { Chart, registerables } from 'node_modules/chart.js';
import { Commit } from 'src/app/core/interfaces/commit';
import { Server } from 'src/app/core/interfaces/server';

Chart.register(...registerables);
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
  commits: Commit[] = [];
  server!: Server;
  timeUse: number = 0;
  projectDeploys: number = 0;

  constructor(private _developersService: DevelopersService) {}

  ngOnInit(): void {
    this.getNotifications();
    this.getReportsCommits();
    this.getServerDetails();
  }

  getNotifications() {
    this._developersService.getTopCharts().subscribe((res) => {
      (this.projects = res.projects),
        (this.projectsInDeploy = res.projects_dev);
      this.totalNcs = res.peding_nc;
      this.totalErrors = res.errors_deploy;
    });
  }

  getReportsCommits() {
    this._developersService.getCommitsReports().subscribe((res) => {
      this.commits = res;
      this.reportCommits();
    });
  }

  getServerDetails() {
    this._developersService.getSeerverDetails().subscribe((res) => {
      this.server = res;
      this.timeUse = res.percentaje_time;
      this.projectDeploys = res.deploys;

      this.renderServerChart();
    });
  }
  renderServerChart() {
    const times = this.server.time.map((res) => res.time);
    const values = this.server.time.map((res) => res.value);

    new Chart('linechart', {
      type: 'line',
      data: {
        labels: times,
        datasets: [
          {
            label: 'Percentage Time',
            data: values,
            fill: false,
            borderColor: '#007bff',
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  reportCommits() {
    const months = this.commits.map((commit) => commit.month);
    const feats = this.commits.map((commit) => commit.feat);
    const fixes = this.commits.map((commit) => commit.fix);

    new Chart('piechart', {
      type: 'bar',
      data: {
        labels: months.map((month) => `Month ${month}`),
        datasets: [
          {
            label: 'Features',
            data: feats,
            backgroundColor: '#19A7CE',
            borderColor: '#19A7CE',
            borderWidth: 1,
          },
          {
            label: 'Fixes',
            data: fixes,
            backgroundColor: '#FF6000',
            borderColor: '#FF6000',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
