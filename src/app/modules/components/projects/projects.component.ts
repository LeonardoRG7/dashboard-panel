import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/core/interfaces/project';
import { CreateProjectPreviewComponent } from './components/create-project-preview/create-project-preview.component';
import { ProjectsService } from 'src/app/core/services/projects.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  projectId: string | undefined;

  constructor(
    private _projectsService: ProjectsService,
    private _dialog: MatDialog,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this._projectsService.getProjects().subscribe((res) => {
      this.projects = res;
    });
  }

  createProject() {
    this._dialog.open(CreateProjectPreviewComponent, {
      maxWidth: '35vw',
      maxHeight: '45vw',
      width: '100%',
      height: '100%',
      panelClass: 'create-project-dialog',
    });
  }

  editProject(project: Project) {
    this._dialog.open(CreateProjectPreviewComponent, {
      maxWidth: '35vw',
      maxHeight: '45vw',
      width: '100%',
      height: '100%',
      panelClass: 'edit-project-dialog',
      data: {
        project: project,
        projectId: project?.id,
      },
    });
  }

  deleteProject(id?: string) {
    if (id) {
      this._projectsService.deleteProjects(id).subscribe((res) => {
        this.ngOnInit();
        this._toastr.success('Proyecto creado con éxito!');
      });
    } else {
      console.error('ID is undefined or null');
    }
  }
}
