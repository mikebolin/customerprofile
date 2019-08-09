import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent implements OnInit {
  alertMessageArray: AlertMessage[];
  isDisplaying = false;
  snackBar: any;
  constructor() {}

  ngOnInit() {
    this.alertMessageArray = new Array<AlertMessage>();
  }

  public showMessage() {
    // get the message
    const alertMessage = new AlertMessage(
      this.alertMessageArray[0].message,
      this.alertMessageArray[0].type
    );
    this.isDisplaying = true;

    // Get the snackbar DIV
    this.snackBar = document.getElementById('snackbar');
    this.snackBar.innerHTML = alertMessage.message;
    let basicClass = 'show';
    if (alertMessage.type === 'Error') {
      basicClass = basicClass + ' errorMessage';
    } else if (alertMessage.type === 'Warning') {
      basicClass = basicClass + ' warningMessage';
    } else {
      basicClass = basicClass + ' successMessage';
    }
    // Add the "show" class to DIV
    this.snackBar.className = basicClass;
  }

  public showAlertMessage(message: string, type: string) {
    // if we are displaying already add it to the array
    if (
      this.isDisplaying ||
      (this.alertMessageArray.length === 0 && message.length > 0)
    ) {
      this.alertMessageArray.push({ message: message, type: type });
      if (this.alertMessageArray.length > 1) {
        return;
      }
    }

    // show the message
    this.showNextAlertMessage();
  }

  private showNextAlertMessage() {
    // show the message
    this.showMessage();

    // delay and cleanup
    this.delayMessage();
  }

  private delayMessage() {
    // After 3 seconds, remove the show class from DIV
    const that = this;
    setTimeout(function(this) {
      that.snackBar.className = that.snackBar.className.replace('show', '');
      that.alertMessageArray.shift();
      that.isDisplaying = false;

      // show the next one?
      if (that.alertMessageArray.length) {
        that.showNextAlertMessage();
      }
    }, 3000);
  }
}

class AlertMessage {
  message: string;
  type: string;
  constructor(message: string, type: string) {
    this.message = message;
    this.type = type;
  }
}
