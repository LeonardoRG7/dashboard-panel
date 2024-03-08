import { Component, OnInit } from '@angular/core';
import { DevelopersService } from 'src/app/core/services/developers.service';
import { Chart, registerables } from 'node_modules/chart.js';
import { Commit } from 'src/app/core/interfaces/commit';
import { Server } from 'src/app/core/interfaces/server';
import { DeliveryReport } from 'src/app/core/interfaces/delivery-reports';
import { UsersService } from 'src/app/core/services/users.service';
import { Notification } from 'src/app/core/interfaces/notification';

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

  // Delivery data:
  deliveryReport!: DeliveryReport;
  deliveryPercentage: string = '';
  deliveryCycleDate: string = '';

  // Notifications data:
  notifications: Notification[] = [];

  constructor(private _developersService: DevelopersService) {}

  ngOnInit(): void {
    this.getTopCharts();
    this.getReportsCommits();
    this.getServerDetails();
    this.getDeliveryReports();
    this.getNotifications();
  }

  getNotifications() {
    this._developersService.getNotificaction().subscribe((res) => {
      this.notifications = res;
    });
  }

  getTopCharts() {
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
      this.renderReportCommits();
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

  getDeliveryReports() {
    this._developersService.getDeliveryReports().subscribe((res) => {
      this.deliveryReport = res;
      this.deliveryPercentage = res.porcentaje;
      this.deliveryCycleDate = res.cicle;
      this.renderDeliveryChart();
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

  renderReportCommits() {
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

  renderDeliveryChart() {
    const topProjectsLabels = this.deliveryReport.top_projects.map(
      (project) => project.name
    );
    const topProjectsValues = this.deliveryReport.top_projects.map((project) =>
      parseInt(project.porcentaje)
    );

    const data = {
      labels: topProjectsLabels,
      datasets: [
        {
          label: 'Top Projects',
          data: topProjectsValues,
          backgroundColor: [
            '#007bff',
            '#28a745',
            '#ffc107',
            '#dc3545',
            '#17a2b8',
            '#6610f2',
          ],
          borderWidth: 1,
        },
      ],
    };

    new Chart('reportChart', {
      type: 'bar',
      data: data,
      options: {
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Top Projects',
          },
        },
      },
    });
  }
}
