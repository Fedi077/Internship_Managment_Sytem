import { Component, AfterViewInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DashboardService } from '../services/dashboard.service';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';
import {  OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmationComponent } from '../material-component/dialog/confirmation/confirmation.component';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
	displayedColumns:string[] = ['name','categoryName','description','Language','edit'];
	dataSource:any;
	responseMessage:any;
	data:any;
	ngAfterViewInit() { }

	constructor(private dashboardService:DashboardService,
		private ngxService:NgxUiLoaderService,
		private dialog:MatDialog,
		private router:Router,
		//private stageService:StageService,
		private snackbarService:SnackbarService) 
		{ this.ngxService.start(); 
			this.dashboardData();
		}

		/*ngOnInit(): void {
			this.ngxService.start();
			this.tableData();
		  }*/

	dashboardData(){
		this.dashboardService.getDetails().subscribe((response:any) => {
            this.ngxService.stop();
			this.data = response;
		},(error:any) =>{
			this.ngxService.stop();
            console.log(error);
			if(error.error?.message){
                   this.responseMessage = error.error?.message;
			}
			else{
                this.responseMessage = GlobalConstants.genericError;
            }
			this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
		});
	}
/*
	tableData(){
		this.stageService.getStages().subscribe((response:any)=>{
		  this.ngxService.stop();
		  this.dataSource = new MatTableDataSource(response);
	}, (error:any)=>{
	  this.ngxService.stop();
	  console.log(error);
	  if(error.error?.message){
		this.responseMessage = error.error?.message;
	  }
	  else{
		this.responseMessage = GlobalConstants.genericError;
	  }
	  this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
	}
	)
	  }
	  applyFilter(event:Event){
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	  }
	  handleAddAction(){
		const dialogConfig = new MatDialogConfig();
		dialogConfig.data = {
		  action:'Add'
		}
		dialogConfig.width = '850px';
		const dialogRef = this.dialog.open(StageComponent,dialogConfig);
		this.router.events.subscribe(()=>{
		  dialogRef.close();
		})
		const sub = dialogRef.componentInstance.onAddStage.subscribe(
		(response)=>{
		  this.tableData();
		})
	  }
	
	  handleEditAction(values:any){
		const dialogConfig = new MatDialogConfig();
		dialogConfig.data = {
		  action:'Edit',
		  data:values
		}
		dialogConfig.width = '850px';
		const dialogRef = this.dialog.open(StageComponent,dialogConfig);
		this.router.events.subscribe(()=>{
		  dialogRef.close();
		})
		const sub = dialogRef.componentInstance.onEditStage.subscribe(
		(response)=>{
		  this.tableData();
		})
	  }
	
	  handleDeleteAction(values:any){
		const dialogConfig = new MatDialogConfig();
		dialogConfig.data={
		  message:'delete' +values.name+'stage'
		};
		const dialogRef = this.dialog.open(ConfirmationComponent,dialogConfig);
		const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response)=>{
		  this.ngxService.start();
		  this.deleteStage(values.id);
		  dialogRef.close();
		})
	
		
	  }
	  deleteStage(id:any){
		this.stageService.delete(id).subscribe((response:any)=>{
		  this.ngxService.stop();
		  this.tableData();
		  this.responseMessage = response?.message;
		  this.snackbarService.openSnackBar(this.responseMessage,"success");
		},(error:any)=>{
		  this.ngxService.stop();
	  console.log(error);
	  if(error.error?.message){
		this.responseMessage = error.error?.message;
	  }
	  else{
		this.responseMessage = GlobalConstants.genericError;
	  }
	  this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
		})
	
	  }
	
	  onChange(status:any,id:any){
		var data = {
		  status:status.toString(),
		  id:id
		}
		this.stageService.updateStatus(data).subscribe((response:any)=>{
		  this.ngxService.stop();
		  this.responseMessage = response?.message;
		  this.snackbarService.openSnackBar(this.responseMessage,"success");
		},(error:any)=>{
		  console.log(error);
		  if(error.error?.message){
			this.responseMessage = error.error?.message;
		  }
		  else{
			this.responseMessage = GlobalConstants.genericError;
		  }
		  this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
		})
	  }
	*/
}

