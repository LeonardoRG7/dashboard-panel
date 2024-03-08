import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/core/interfaces/project';
import { ProjectsService } from 'src/app/core/services/projects.service';

@Component({
  selector: 'app-create-project-preview',
  templateUrl: './create-project-preview.component.html',
  styleUrls: ['./create-project-preview.component.css'],
})
export class CreateProjectPreviewComponent implements OnInit {
  projectForm: FormGroup;
  developerOptions: string[] = ['Dev 1', 'Dev 2', 'Dev 3', 'Dev 4', 'Dev 5'];
  frontendTechnologyOptions: string[] = [
    'React',
    'React Native',
    'VueJs',
    'Angular',
  ];
  backendTechnologyOptions: string[] = ['.Net', 'Java', 'Python', 'NodeJs'];
  databaseOptions: string[] = ['SQLServer', 'MongoDB', 'PostgresSQL'];
  projectId: string | null;

  constructor(
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _projectService: ProjectsService,
    public dialogRef: MatDialogRef<CreateProjectPreviewComponent>,
    private aRouter: ActivatedRoute,

    @Inject(MAT_DIALOG_DATA)
    public project: { project: Project; projectId: string | null }
  ) {
    this.projectForm = this._fb.group({
      project_name: ['', Validators.required],
      client: ['', Validators.required],
      repo_url: ['https://', [Validators.required]],
      ci: [''],
      cd: [''],
      developers: ['', Validators.required],
      frontend_tecnology: ['', Validators.required],
      backend_tecnology: ['', Validators.required],
      databases: ['', Validators.required],
    });

    this.projectId = this.project ? this.project.projectId : null;
  }

  ngOnInit(): void {
    this.isUpdate();
  }

  createProject() {
    const PROJECT: Project = {
      project_name: this.projectForm.get('project_name')?.value,
      repo_url: this.projectForm.get('repo_url')?.value,
      client: this.projectForm.get('client')?.value,
      developers: this.projectForm.get('developers')?.value,
      ci: this.projectForm.get('ci')?.value,
      cd: this.projectForm.get('cd')?.value,
      frontend_tecnology: this.projectForm.get('frontend_tecnology')?.value,
      backend_tecnology: this.projectForm.get('backend_tecnology')?.value,
      databases: this.projectForm.get('databases')?.value,
      errors_count: 0,
      warning_count: 0,
      deploy_count: 0,
      percentage_completion: '0%',
      report_nc: 0,
      status: 'En Desarrollo',
    };

    if (this.projectId) {
      this._projectService.updateProjects(this.projectId, PROJECT).subscribe(
        (data) => {
          this.closeModal();
          this._toastr.info('Proyecto actualizado!', 'Correctamente!');
          this.ngOnInit();
        },
        (error) => {
          console.log(error);
          this.projectForm.reset();
        }
      );
    } else {
      if (!this.projectForm.invalid) {
        this._projectService.createProject(PROJECT).subscribe(
          (data) => {
            this.closeModal();
            this._toastr.success('Proyecto creado!', 'Correctamente');
            this.ngOnInit();
          },
          (error) => {
            console.log(error);
            this.projectForm.reset();
          }
        );
      } else {
        this._toastr.error('Error en formulario');
      }
    }
  }

  isUpdate() {
    if (this.projectId !== null) {
      this.projectForm.patchValue({
        project_name: this.project.project.project_name,
        client: this.project.project.client,
        repo_url: this.project.project.repo_url,
        ci: this.project.project.ci,
        cd: this.project.project.cd,
        developers: this.project.project.developers,
        frontend_tecnology: this.project.project.frontend_tecnology.split('|'),
        backend_tecnology: this.project.project.backend_tecnology.split('|'),
        databases: this.project.project.databases.split('|'),
      });
    }
  }

  closeModal() {
    this.dialogRef.close();
  }
}
