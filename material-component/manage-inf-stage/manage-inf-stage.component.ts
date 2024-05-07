import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from 'src/app/services/category.service';
import { FormService } from 'src/app/services/form.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StageService } from 'src/app/services/stage.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-manage-inf-stage',
  templateUrl: './manage-inf-stage.component.html',
  styleUrls: ['./manage-inf-stage.component.scss'],
})
export class ManageInfStageComponent implements OnInit {
  displayedColumns: string[] = ['name', 'category', 'edit'];
  dataSource: any = [];
  manageInfoStageForm: any = FormGroup;
  categorys: any = [];
  stages: any = [];
  responseMessage: any;
  constructor(
    private stageService: StageService,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.ngxService.start();
    this.getCategorys();
    this.manageInfoStageForm = this.formBuilder.group({
      name: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.nameRegex)],
      ],
      email: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.emailRegex)],
      ],
      supervisorName: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.nameRegex)],
      ],
      levelStudy: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.nameRegex)],
      ],
      category: [null, [Validators.required]],
      stage: [null, [Validators.required]],
    });
  }

  getCategorys() {
    this.categoryService.getCategorys().subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.categorys = response;
      },
      (error: any) => {
        this.ngxService.stop();
        console.log(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(
          this.responseMessage,
          GlobalConstants.error
        );
      }
    );
  }

  getStagesByCategory(value: any) {
    this.stageService.getStagesByCategory(value.id).subscribe(
      (response: any) => {
        this.stages = response;
      },
      (error: any) => {
        this.ngxService.stop();
        console.log(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(
          this.responseMessage,
          GlobalConstants.error
        );
      }
    );
  }

  getStageDetails(value: any) {
    this.stageService.getById(value.id).subscribe(
      (error: any) => {
        this.ngxService.stop();
        console.log(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(
          this.responseMessage,
          GlobalConstants.error
        );
      }
    );
  }
  validateStageAdd(){
    if(this.manageInfoStageForm.controls['stage'].value === null) 
      return true;
    else 
      return false;
  }

  validateSubmit() {
    if (
      this.manageInfoStageForm.controls['name'].value === null ||
      this.manageInfoStageForm.controls['email'].value === null ||
      this.manageInfoStageForm.controls['supervisorName'].value === null ||
      this.manageInfoStageForm.controls['levelStudy'].value === null ||
      !this.manageInfoStageForm.controls['email'].valid
    )
      return true;
    else return false;
  }

  add() {
    var formData = this.manageInfoStageForm.value;
    var stageName = this.dataSource.find(
      (e: { id: number }) => e.id == formData.stage.id
    );
    if (stageName === undefined) {
      this.dataSource.push({
        id: formData.stage.id,
        name: formData.stage.name,
        category: formData.category.name,
      });
      this.dataSource = [...this.dataSource];
      this.snackbarService.openSnackBar(
        GlobalConstants.stageAdded,
        "success"
      );
    } else {
      this.snackbarService.openSnackBar(
        GlobalConstants.stageExistError,
        GlobalConstants.error
      );
    }
  }

  handleDeleteAction(value:any,element:any){
    this.dataSource.splice(value,1);
    this.dataSource = [...this.dataSource];
    }

    submitAction(){
      var formData = this.manageInfoStageForm.value;
      var data = {
        name:formData.name,
        email:formData.email,
        supervisorName:formData.supervisorName,
        levelStudy:formData.levelStudy,
        stageDetails: JSON.stringify(this.dataSource)
      };
      this.formService.generateReport(data).subscribe((response:any)=>{
        this.downloadFile(response?.uuid);
        this.manageInfoStageForm.reset();
        this.dataSource = [];
        (error: any) => {
          this.ngxService.stop();
          console.log(error);
          if (error.error?.message) {
            this.responseMessage = error.error?.message;
          } else {
            this.responseMessage = GlobalConstants.genericError;
          }
          this.snackbarService.openSnackBar(
            this.responseMessage,
            GlobalConstants.error
          );
        }
      })
    }

    downloadFile(fileName:any){
      var data = {
        uuid:fileName
      }
      this.formService.getPDF(data).subscribe((response:any)=>{
        saveAs(response,fileName+".pdf");
        this.ngxService.stop();
      })
    }

}
