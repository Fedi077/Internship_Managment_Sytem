import { Component, OnInit,EventEmitter, Inject } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StageService } from 'src/app/services/stage.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit {
  onAddStage = new EventEmitter();
  onEditStage = new EventEmitter();
  stageForm:any = FormGroup;
  dialogAction:any="Add";
  action:any = "Add";
  responseMessage:any;
  categorys:any=[];



  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
private formBuilder:FormBuilder,
private stageService:StageService,
public dialogRef:MatDialogRef<StageComponent>,
private categoryService:CategoryService,
private snackbarService:SnackbarService
) { }

  ngOnInit(): void {
    this.getCategorys();
    this.stageForm = this.formBuilder.group({
      name:[null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      categoryId:[null,Validators.required],
      description:[null,Validators.required],
    })
    if (this.dialogData.action === 'Edit'){
      this.dialogAction='Edit';
      this.action='Update';
      this.stageForm.patchValue(this.dialogData.data);
    }
  }

  getCategorys(){
    this.categoryService.getCategorys().subscribe((response:any)=>{
      this.categorys = response;
    },(error:any)=> {
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }
handleSubmit(){
  if(this.dialogAction === 'Edit'){
    this.edit();
  }
  else{
    this.add();
  }
}
add(){
  var formData = this.stageForm.value;
  var data = {
    name:formData.name,
    categoryId:formData.categoryId,
    description:formData.description
  }
  this.stageService.add(data).subscribe((response:any)=>{
    this.dialogRef.close();
    this.onAddStage.emit();
    this.responseMessage = response.message;
    this.snackbarService.openSnackBar(this.responseMessage,"success");
  },(error:any)=>{ if(error.error?.message){
    this.responseMessage = error.error?.message;
  }
  else{
    this.responseMessage = GlobalConstants.genericError;
  }
  this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);})
}
edit(){
  var formData = this.stageForm.value;
  var data = {
    id : this.dialogData.data.id,
    name:formData.name,
    categoryId:formData.categoryId,
    description:formData.description
  }
  this.stageService.update(data).subscribe((response:any)=>{
    this.dialogRef.close();
    this.onEditStage.emit();
    this.responseMessage = response.message;
    this.snackbarService.openSnackBar(this.responseMessage,"success");
  },(error:any)=>{ if(error.error?.message){
    this.responseMessage = error.error?.message;
  }
  else{
    this.responseMessage = GlobalConstants.genericError;
  }
  this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);})

}
}