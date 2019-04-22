import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AlertController } from '@ionic/angular';
import { SR } from '../models/SR';
import { LoginRequest } from '../models/LoginRequest';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials':'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, origin',
      'Accept': 'application/json'
    }),
  }

  constructor(public httpClient: HttpClient, public alertCtrl: AlertController) { }

  async LoginAsync(username: string, password: string) {

    const apiUrl = SR.ApiRootUrl + '/Authentication/Authenticate';
    const request: LoginRequest = {
      $AuthenticationType: 'PasswordCredential',
      UserName: username,
      Password: password
    };

    return this.httpClient.post<string>(apiUrl, request, this.httpOptions).toPromise();
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async alert(title: string, subTitle: string, message: string) {
    if (!title || title.trim() === '') title = '提示'
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: subTitle,
      message: message,
      buttons: ['确定'],
    })

    await alert.present();
  }

  async alertConfirm(title: string, message: string, callback: Function) {
    if (!title || title.trim() === '') title = '提示'
    const alert = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          //cssClass: 'secondary',
          handler: blah => {
            //console.log('Confirm Cancel: blah')
          },
        },
        {
          text: '确定',
          handler: () => {
            callback();
          },
        },
      ],
    })

    await alert.present();
  }
}
