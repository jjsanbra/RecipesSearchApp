import { Component, Inject, Input } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export interface DialogData {
  title: string;
  url: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  @Input() href: string;
  @Input() titleParent: string;
  public title: string;
  public url: string;

  constructor(
    public dialog: MatDialog
  ) { }

  openDialog(): void {
    const dialogRef = this.dialog.open( DialogOverviewComponent, {
      data: {
        title: this.titleParent,
        url: this.href
      }
    });

    dialogRef.afterClosed().subscribe( result => {
      // console.log('The dialog was closed');
      this.title = result;
    });
  }

}

@Component({
  selector: 'app-dialog-overview',
  templateUrl: 'dialog-overview.component.html',
})
export class DialogOverviewComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewComponent>,
    @Inject( MAT_DIALOG_DATA ) public data: DialogData) {
      console.log( data.url );
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
