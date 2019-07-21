// inicializar chrome :
// chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security


import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { HttpClient, HttpRequest, HttpResponse } from 'selenium-webdriver/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showLink = false;
  title = 'app';
  doc: HTMLDocument; // = new HTMLDocument();

  urlRoot = 'https://www.tubeoffline.to/downloadFrom.php?host=OnLine&video=https%3A%2F%2Fwww.redtube.com.br%2F';

  constructor(
    public http: HttpClient
  ) {}

  getLink() {
    const col: HTMLCollectionOf<HTMLAnchorElement> = document.anchors; // .getElementsByTagName('a') as HTMLCollectionOf<HTMLAnchorElement>;
    for (let i = 0; i < col.length; i++) {
      let anchor: HTMLAnchorElement;
      anchor = col.item(i) as HTMLAnchorElement;
      if (anchor.href.indexOf('240P')) {
        const link: HTMLAnchorElement = document.getElementById('link') as HTMLAnchorElement;
        link.href = anchor.href;
        this.showLink = true;
        break;
      }
    }

  }

  getDownLoad(code: number) {

    this.showLink = false;

    const div: HTMLDivElement = document.getElementById('content') as HTMLDivElement;
    div.innerHTML = '<object type="text/html" data="' + this.urlRoot + code + '" ></object>';

    setTimeout(() => {
      this.getLink();
    }, 10000);


    // document.getElementById('content').innerHTML = '<object type="text/html" data="' + this.urlRoot + code + '" ></object>';
  }

  getPage(url: string) {
    this.http.get(url).subscribe(
      response => {
        console.log('response:');
        console.log(response);
      }, error => {
        console.log('error:');
        // console.log(error);
        // console.log(error.error.text);
        const div: HTMLDivElement = document.getElementById('content') as HTMLDivElement;
        div.innerHTML = '<div>' + error.error.text + '</div>';
    
      }
    );
  }

  getPageAntes(url: string) {
    // document.open(url);
    // // return  this.doc.toString();
    // const retorno = document.toString();
    // document.getElementById('resultado').innerHTML = retorno;

    // this.http.get(url, {headers: {'Access-Control-Allow-Origin': 'true'}})

    // const options = {headers: []};
    /*
    <add name="Access-Control-Allow-Origin" value="*" />
    <add name="Access-Control-Allow-Headers" value="Content-Type" />
    <add name="Access-Control-Allow-Methods" value="GET,POST,PUT,DELETE,OPTIONS" />
    <add name="Access-Control-Allow-Credentials" value="true" />
    */


  //  https://www.tubeoffline.to/downloadFrom.php?host=OnLine&video=https%3A%2F%2Fwww.redtube.com.br%2F

  const index = url.indexOf('br%2F');

  let code = '';

  if (index > 0) {
    code = url.slice(index + 5);
  } else {
    code = url;
  }

  this.getDownLoad(Number.parseInt(code) as number);

  //  document.getElementById('content').innerHTML = '<object type="text/html" data="' + url + '" ></object>';

  //  const head: HttpHeaders = new HttpHeaders();

  //  head.append('Access-Control-Allow-Origin', '*');
  //  head.append('Access-Control-Allow-Headers', 'Content-Type');
  //  head.append('Access-Control-Allow-Methods', 'GET'); // ,POST,PUT,DELETE,OPTIONS
  //  head.append('Access-Control-Allow-Credentials', 'true');

  //  this.http.get(url, {headers: head}).subscribe(
  //      response => {
  //       const texto = response.toString();
  //       document.getElementById('resultado').innerHTML = 'ok' + texto;
  //      },
  //      error => {
  //       document.getElementById('resultado').innerHTML = 'fail' + error;
  //      }
  //    );
  }


}
