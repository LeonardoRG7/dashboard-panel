import { Component, OnInit } from '@angular/core';
import { DevelopersService } from 'src/app/core/services/developers.service';
import { Chart, registerables } from 'node_modules/chart.js';
import { Commit } from 'src/app/core/interfaces/commit';
import { Server } from 'src/app/core/interfaces/server';
import { DeliveryReport } from 'src/app/core/interfaces/delivery-reports';
import { Notification } from 'src/app/core/interfaces/notification';
import { WeatherService } from 'src/app/core/services/weather.service';

Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // Projects data:
  projects: number = 0;
  projectsInDeploy: number = 0;
  totalNcs: number = 0;
  totalErrors: number = 0;

  // Report Commits data:
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

  // Weather
  backgroundColor: string = '';
  iconWeather: string = '';
  nameCity: string = '';
  temperature: string = '';

  constructor(
    private _developersService: DevelopersService,
    private _weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.getTopCharts();
    this.getReportsCommits();
    this.getServerDetails();
    this.getDeliveryReports();
    this.getNotifications();
    this.getWeatherByCity();
  }

  getNotifications() {
    this._developersService.getNotificaction().subscribe((res) => {
      this.notifications = res;
    });
  }

  getWeatherByCity() {
    // Llamar al servicio para obtener el clima de la ciudad de 'Cali'
    this._weatherService.getWeatherForCity('Cali').subscribe((res) => {
      // Extraer datos relacionados con el clima
      const weatherData = this.extractWeatherData(res);

      // Extraer datos relacionados con la fecha y hora
      const dateTimeData = this.extractDateTimeData(res);

      // Asignar los datos extraídos a las variables de la clase
      this.iconWeather = weatherData.icon; // Icono del clima
      this.temperature = weatherData.temperature; // Temperatura
      this.nameCity = weatherData.cityName; // Nombre de la ciudad

      // Calcular y asignar el color de fondo
      this.backgroundColor = this.calculateBackgroundColor(dateTimeData);
    });
  }

  // Extraer datos relacionados con el clima de la respuesta de la API
  private extractWeatherData(res: any): {
    icon: string;
    temperature: string;
    cityName: string;
  } {
    const { icon } = res.list[0].weather[0]; // Icono del clima
    const { temp } = res.list[0].main; // Temperatura en Kelvin
    const cityName = res.list[0].name; // Nombre de la ciudad
    const temperature = (temp - 273.15).toFixed(2); // Convertir de Kelvin a Celsius y redondear a dos decimales

    return { icon, temperature, cityName };
  }

  // Extraer datos relacionados con la fecha y hora de la respuesta de la API
  private extractDateTimeData(res: any): {
    utcHours: number;
    localHours: number;
    weatherDescription: string;
  } {
    const { description: weatherDescription } = res.list[0].weather[0]; // Descripción del clima
    const { lon } = res.list[0].coord; // Longitud de la ciudad
    const utcHours = new Date().getUTCHours(); // Hora UTC actual
    const localHours = utcHours + lon / 15; // Calcular la hora local en función de la longitud

    return { utcHours, localHours, weatherDescription };
  }

  // Calcular el color de fondo en función de los datos de fecha y hora
  private calculateBackgroundColor(dateTimeData: {
    localHours: number;
    weatherDescription: string;
  }): string {
    const { localHours, weatherDescription } = dateTimeData;
    const isDaytime = localHours >= 6 && localHours < 18; // Verificar si es de día
    const isClearOrFewClouds =
      weatherDescription.includes('clear') ||
      weatherDescription.includes('few clouds'); // Verificar si está despejado o hay pocas nubes

    if (isDaytime) {
      return isClearOrFewClouds ? '#FFFF00' : '#FFA500'; // Color amarillo si está despejado, de lo contrario, color naranja
    } else {
      return isClearOrFewClouds ? '#00008B' : '#000000'; // Color azul oscuro si está despejado, de lo contrario, negro
    }
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
