import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SuspendModalComponent } from '@app/modals/suspendModal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl:'./createSuspension.component.html'
})
export class CreateSuspensionComponent implements OnInit {

  step = 0;
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openSuspendDialog() {
    this.dialog.open(SuspendModalComponent)
  }
}
