// inicializar chrome :
// chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security


import { Component, OnInit, HostListener, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getFileType, FileTypeEnum, TONE_LIST, Tone } from './app.model';
import { DomSanitizer } from '@angular/platform-browser';
// import { HttpParamsOptions, HttpParams } from '@angular/common/http/src/params';
// import { Observable } from 'rxjs';
// import { text } from '@angular/core/src/render3/instructions';
// import { HttpClient, HttpRequest, HttpResponse } from 'selenium-webdriver/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit { // }, AfterViewInit {
  showLink = false;
  title = 'app';
  doc: HTMLDocument; // = new HTMLDocument();

  // by artist::: class="art_music-link"


  editMode = true;

  linhasTela = 60;
  colunas = 4;
  divIdSelect = 1;

  fontsSize = [];
  showTones = [];
  showFonts = [];
  showConfigs = [];
  tabs = [];
  chords = [];
  lines = [];
  columns = [];
  edits = [];

  urls = [];

  fonts = [
    // 'Roboto Mono',
    'Courier New', 'Courier', 'monospace', 'Lucida Console', 'Consolas'];

  baseFont = 14;
  fontSize = this.baseFont;
  fontFamily = 'monospace';
  cifraColor = '#554488';
  lyricsColor = '#444433';
  backColor = '#ececef';
  tablature = false;
  cifra = true;

  countDownPages = 0;
  countDownProcess = 0;
  _loadingGet = '';
  

  // urlRoot = 'https://www.tubeoffline.to/downloadFrom.php?host=OnLine&video=https%3A%2F%2Fwww.redtube.com.br%2F';

  pages = []; // página extraída
  _outpages = []; // conteúdo exibido
  tones = [];

  get outPages(): string[] {
    if (this._outpages && this._outpages.length > 0) {
      return this._outpages;
    }
    return this.pages;
  }
  



  constructor(
    public http: HttpClient,
    private elRef: ElementRef,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
  ) {}

  get applying(): string {
    if (this.countDownProcess > 0) {
      return 'processing...';
    }
    return '';
  }




  get loadingGet(): string {

    if (this.countDownPages > 0) {
      return 'loading...';

      // const base = 'loading';
     
      // const now = new Date();
      // let sec = ('' + now.getSeconds());
      // sec = sec.slice(sec.length - 1);
      // const num = +sec;
      // const dots = 3;
      // const dot = '.';
      // let temp = '';
      // let i = 0;
      // while (i < num) {
      //   if (temp.length >= dots) {
      //     temp = '';
      //   } else {
      //     temp += dot;
      //   }


      // }
      // return base + temp;
    }
    return '';
  }

  // doLoading() {
  //   if (this.countDownPages > 0) {
  //     const base = 'loading.';
  //     this._loadingGet = base;
  //     let count = 0;
  //     let dot = 0;
  //     while (this.countDownPages > 0 && count < 120) {
  //       setTimeout(() => {
  //         if (dot < 3) {
  //           this._loadingGet += '.';
  //           dot++;
  //         } else {
  //           dot = 0;
  //           this._loadingGet = base;
  //         }
  //         count++;

  //       }, 500);
  //     }
  
  //   }
    
  // }
  getSongParams(id: number) {

    this.getParams();

    let element: HTMLInputElement = document.getElementById('lines' + (id + 1)) as HTMLInputElement;
    if (element) {
      this.linhasTela = +element.value;
    }
    element = document.getElementById('columns' + (id + 1)) as HTMLInputElement;
    if (element) {
      this.colunas = +element.value;
    }
    element = document.getElementById('fontS') as HTMLInputElement;
    this.fontSize = +element.value;

    element = document.getElementById('showTab' + (id + 1)) as HTMLInputElement;
    this.tablature = (element.value && element.value === 'true');
    element = document.getElementById('showChord' + (id + 1)) as HTMLInputElement;
    this.cifra = (element.value && element.value === 'true');

  }


  getParams() {

    let element: HTMLInputElement = document.getElementById('lines') as HTMLInputElement;
    this.linhasTela = +element.value;
    element = document.getElementById('columns') as HTMLInputElement;
    this.colunas = +element.value;

    element = document.getElementById('fontF') as HTMLInputElement;
    this.fontFamily = element.value;
    element = document.getElementById('fontS') as HTMLInputElement;
    this.fontSize = +element.value;
    console.log('fontSize: ' + this.fontSize);


    element = document.getElementById('tablature') as HTMLInputElement;
    this.tablature = (element.value && element.value === 'true');
    element = document.getElementById('cifra') as HTMLInputElement;
    this.cifra = (element.value && element.value === 'true');

    element = document.getElementById('colorCifra') as HTMLInputElement;
    this.cifraColor = element.value;
    element = document.getElementById('colorLyrics') as HTMLInputElement;
    this.lyricsColor = element.value;
    element = document.getElementById('colorBack') as HTMLInputElement;
    this.backColor = element.value;
  
   

  }


  setParams() {

    let element: HTMLInputElement = document.getElementById('lines') as HTMLInputElement;
    element.value = this.linhasTela.toString();
    element = document.getElementById('columns') as HTMLInputElement;
    element.value = this.colunas.toString();

    element = document.getElementById('fontF') as HTMLInputElement;
    element.value = this.fontFamily.toString();
    element = document.getElementById('fontS') as HTMLInputElement;
    element.value = this.fontSize.toString();

    element = document.getElementById('tablature') as HTMLInputElement;
    element.checked = this.tablature;
    element = document.getElementById('cifra') as HTMLInputElement;
    element.checked = this.cifra;

    element = document.getElementById('colorCifra') as HTMLInputElement;
    element.value = this.cifraColor.toString();
    element = document.getElementById('colorLyrics') as HTMLInputElement;
    element.value = this.lyricsColor.toString();
    element = document.getElementById('colorBack') as HTMLInputElement;
    element.value = this.backColor.toString();
  
   

  }

  // addNewToneButtons(divId: string) {
    
  //   let buttonDec = document.getElementById('btnDec' + divId);
  //   let buttonInc = document.getElementById('btnInc' + divId);

  //   if (!(buttonDec && buttonInc)) {
  //     buttonDec = this.renderer.createElement('button');
  //     const buttonTextDec = this.renderer.createText('b <');
  //     this.renderer.appendChild(buttonDec, buttonTextDec);
  //     buttonDec.id = 'btnDec' + divId;
  
  //     buttonInc = this.renderer.createElement('button');
  //     const buttonTextInc = this.renderer.createText('> #');
  //     this.renderer.appendChild(buttonInc, buttonTextInc);
  //     buttonInc.id = 'btnInc' + divId;
  
  //     const span = document.getElementById('spanTone' + divId);
  //     if (span) {
  //       this.renderer.appendChild(span, buttonDec);
  //       this.renderer.appendChild(span, buttonInc);
  //     }
      
  
  
  //   }
   
   
  //   this.renderer.listen(buttonDec, 'click', () => this.changeRowTone(divId, -1));
  //   this.renderer.listen(buttonInc, 'click', () => this.changeRowTone(divId, 1));
  // }


  

// ngAfterViewInit() {
//   // assume dynamic HTML was added before
//   this.elRef.nativeElement.querySelector('a').addEventListener('click', this.onClick.bind(this));
// }

  ngOnInit() {
    const div: HTMLInputElement = document.getElementById('url') as HTMLInputElement;
    div.value = '';

    div.value += ''
    // 

    // dia dos pais::
    + 'https://www.cifraclub.com.br/air-supply/without-you/;https://www.cifraclub.com.br/air-supply/all-out-of-love/;https://www.cifraclub.com.br/benito-di-paula/amigo-do-sol-amigo-da-lua-19754/;'; 

    div.value += 'https://www.cifraclub.com.br/pearl-jam/black/;';
    div.value += 'https://www.cifraclub.com.br/pearl-jam/alive/;';
div.value += 'https://www.cifraclub.com.br/kid-abelha/como-eu-quero/;';
    div.value += 'https://www.cifraclub.com.br/roberto-carlos/detalhes/;https://www.cifraclub.com.br/tim-maia/primavera/;https://www.cifraclub.com.br/tim-maia/voce/;';
    div.value += 'https://www.cifraclub.com.br/vander-lee/iluminado/;https://www.cifraclub.com.br/elton-john/blessed/;https://www.cifraclub.com.br/eric-clapton/tears-in-heaven/;https://www.cifraclub.com.br/papas-na-lingua/eu-sei/;';
    div.value += 'https://www.cifraclub.com.br/isreal-kamakawiwoole/somewhere-over-the-rainbow/;https://www.cifraclub.com.br/isreal-kamakawiwoole/what-a-wonderful-world/;';

    div.value += 'https://www.cifraclub.com.br/elvis-presley/my-way/;';
    div.value += 'https://www.cifraclub.com.br/lulu-santos/certas-coisas/;';
    div.value += 'https://www.cifraclub.com.br/lulu-santos/o-ultimo-romantico/;';
    div.value += 'https://www.cifraclub.com.br/fabio-jr/pai/acustica.html;';


    // mpb:
   div.value += 'https://www.cifraclub.com.br/djavan/eu-te-devoro/simplificada.html;';


    //  div.value += 'https://www.cifraclub.com.br/jason-mraz/im-yours/;';

    // + 'https://www.cifraclub.com.br/papas-na-lingua/eu-sei/;https://www.cifraclub.com.br/armandinho/desenho-de-deus/;'
    // https://www.cifraclub.com.br/geraldo-azevedo/dona-da-minha-cabeca/;https://www.cifraclub.com.br/geraldo-azevedo/dia-branco/simplificada.html;'
    // + 'https://www.cifraclub.com.br/nando-reis/de-janeiro-janeiro/jwkjmg.html;https://www.cifraclub.com.br/ana-vilela/trem-bala/;'
    // + 'https://www.cifraclub.com.br/cassia-eller/palavras-ao-vento/;https://www.cifraclub.com.br/vander-lee/iluminado/;'
    // + 'https://www.cifraclub.com.br/skank/dois-rios/iniciante.html;https://www.cifraclub.com.br/skank/vamos-fugir/;'
    // + 'https://www.cifraclub.com.br/lulu-santos/tempos-modernos/;https://www.cifraclub.com.br/cazuza/o-tempo-nao-para/;'
    // + 'https://www.cifraclub.com.br/kid-abelha/como-eu-quero/;https://www.cifraclub.com.br/kid-abelha/pintura-intima/;'
    // + 'https://www.cifraclub.com.br/leandro-e-leonardo/temporal-de-amor/;https://www.cifraclub.com.br/leandro-e-leonardo/nao-olhe-assim/;';

    

    // 
    // https://www.cifraclub.com.br/legiao-urbana/pais-filhos/
   
    // https://www.cifraclub.com.br/roberto-carlos/detalhes/
    // https://www.cifraclub.com.br/jose-augusto/aguenta-coracao/


    // div.value += 'https://www.cifraclub.com.br/asa-de-aguia/dia-dos-namorados/;';
    // div.value += 'https://www.cifraclub.com.br/asa-de-aguia/nao-tem-lua/;';
    // div.value += 'https://www.cifraclub.com.br/falamansa/xote-dos-milagres/;';
    // div.value += 'https://www.cifraclub.com.br/falamansa/rindo-toa/;';
    // div.value += 'https://www.cifraclub.com.br/pearl-jam/black/;';
    // div.value += 'https://www.cifraclub.com.br/pearl-jam/alive/;';
    // div.value += 'https://www.cifraclub.com.br/scorpions-e-berliner-philharmoniker/still-loving-you/;';
    // div.value += 'https://www.cifraclub.com.br/the-cranberries/zombie/;';
    // div.value += 'https://www.cifraclub.com.br/system-of-a-down/toxicity/;';
    // div.value += 'https://www.cifraclub.com.br/raimundos/mulher-de-fases/;';
    // div.value += 'https://www.cifraclub.com.br/ultraje-a-rigor/ciume/;';
    // div.value += 'https://www.cifraclub.com.br/dalto/muito-estranho-cuida-bem-de-mim/;';
    // div.value += 'https://www.cifraclub.com.br/kid-abelha/como-eu-quero/;https://www.cifraclub.com.br/kid-abelha/pintura-intima/;';
    // div.value += 'https://www.cifraclub.com.br/patricia-marx/sonho-de-amor/;';
    // div.value += 'https://www.cifraclub.com.br/tim-maia/primavera/;';
    // div.value += 'https://www.cifraclub.com.br/papas-na-lingua/eu-sei/;';
    // div.value += 'https://www.cifraclub.com.br/nando-reis/all-star/;';
    // div.value += 'https://www.cifraclub.com.br/jason-mraz/im-yours/;';
    // div.value += 'https://www.cifraclub.com.br/the-calling/wherever-you-will-go/;';
    // div.value += 'https://www.cifraclub.com.br/elvis-presley/my-way/;';
    // div.value += 'https://www.cifraclub.com.br/elvis-presley/always-on-my-mind/;';
    // div.value += 'https://www.cifraclub.com.br/u2/with-or-without-you/;';
    // div.value += 'https://www.cifraclub.com.br/u2/beautiful-day/;';


 

    /*
    
    div.value += 'https://www.cifraclub.com.br/bon-jovi/always/;';
    div.value += 'https://www.cifraclub.com.br/bon-jovi/its-my-life/;';
    div.value += 'https://www.cifraclub.com.br/bon-jovi/livin-on-prayer/;';
    div.value += 'https://www.cifraclub.com.br/pearl-jam/alive/;';
    div.value += 'https://www.cifraclub.com.br/pearl-jam/black/;';
    div.value += 'https://www.cifraclub.com.br/the-cranberries/zombie/;https://www.cifraclub.com.br/scorpions-e-berliner-philharmoniker/still-loving-you/;https://www.cifraclub.com.br/air-supply/all-out-of-love/;https://www.cifraclub.com.br/air-supply/making-love-out-of-nothing-at-all/;https://www.cifraclub.com.br/air-supply/goodbye/;https://www.cifraclub.com.br/air-supply/without-you/;https://www.cifraclub.com.br/michael-jackson/one-day-in-your-life/;https://www.cifraclub.com.br/fagner/borbulhas-de-amor/;';
    div.value += 'https://www.cifraclub.com.br/papas-na-lingua/eu-sei/;https://www.cifraclub.com.br/elton-john/blessed/;https://www.cifraclub.com.br/asa-de-aguia/dia-dos-namorados/;';
    div.value += 'https://www.cifraclub.com.br/tony-braxton/unbreak-my-heart/;';
    div.value += 'https://www.cifraclub.com.br/roberta-flack/killing-me-softly/';
    */
  }

  // getLink() {
  //   const col: HTMLCollectionOf<HTMLAnchorElement> = document.anchors; // .getElementsByTagName('a') as HTMLCollectionOf<HTMLAnchorElement>;
  //   for (let i = 0; i < col.length; i++) {
  //     let anchor: HTMLAnchorElement;
  //     anchor = col.item(i) as HTMLAnchorElement;
  //     if (anchor.href.indexOf('240P')) {
  //       const link: HTMLAnchorElement = document.getElementById('link') as HTMLAnchorElement;
  //       link.href = anchor.href;
  //       this.showLink = true;
  //       break;
  //     }
  //   }

  // }

  // processLayoutSong(id: number) {

  //   // this.getSongParams(id);

  //   // const linhas = this.lines



  // }

  processLayout(id?: number) {

    this.getParams();

    // console.log('órgãos externos');

    if (this.tones.length !== this.pages.length) {
      this.tones = [];
      this.fontsSize = [];
      this.showTones = [];
      this.showFonts = [];
      this.showConfigs = [];
      this.tabs = [];
      this.chords = [];
      this.lines = [];
      this.columns = [];
      this.edits = [];
    }
    

     // change tone::
    // tom:: direto na origem

    this._outpages = [];

    this.countDownProcess =  this.pages.length;

    console.log('linhas:' + this.linhasTela + ', colunas: ' + this.colunas);
    

    // tablature
    for (let i = 0; i < this.pages.length; i++ ) {
      if (this.tones.length < this.pages.length) {
        this.tones.push(0);
        this.fontsSize.push(this.fontSize);
        this.showTones.push(false);
        this.showFonts.push(false);
        this.showConfigs.push(false);
        this.tabs.push(this.tablature);
        this.chords.push(this.cifra);
        this.lines.push(this.linhasTela);
        this.columns.push(this.colunas);
        this.edits.push(false);
      }
      const divId = 'divId' + (i + 1);
      const outPage = this.showColumns(
        this.avaliarTablatura(this.pages[i], this.tablature), divId);

      this._outpages.push(this.sanitizer.bypassSecurityTrustHtml(outPage));
      this.countDownProcess--;


    }
    setTimeout(() => {
      this.selectFontFamily();
      this.changeFontSize();
      this.clickColorLyrics();
      
    }, 200);
    // cifra::

  

    // show columns::
    // linhas::
    // colunas:::
    // font family + size










  }


  /*




  */

  // síncrono:::

  setTablature(checked: boolean) {
    // console.log('tablature:' + checked);
    this.tablature = checked;

   this.processLayout();


  }

  setCifra(checked: boolean) {
    this.cifra = checked;
    // console.log('chords:' + checked);
    this.processLayout();

  }

  go(href: string) {
    window.location.hash = href;
  }



  // getDownLoad(code: number) {

  //   this.showLink = false;

  //   const div: HTMLDivElement = document.getElementById('content') as HTMLDivElement;
  //   div.innerHTML = '<object type="text/html" data="' + code + '" ></object>';

  //   setTimeout(() => {
  //     this.getLink();
  //   }, 10000);


  //   // document.getElementById('content').innerHTML = '<object type="text/html" data="' + this.urlRoot + code + '" ></object>';
  // }

//   base64ToBytes(base64) {
//     const binary_string = window.atob(base64);
//     const len = binary_string.length;
//     const bytes = new Uint8Array(len);
//     for (let i = 0; i < len; i++) {
//         bytes[i] = binary_string.charCodeAt(i);
//     }
//     return bytes;
// }

// private getResponse(ret: Observable<any>): Observable<any> {
//   ret.
//   return ret.map(response => response.body);
// }

goDown(id: number) {
  let btn = document.getElementById('downdivId' + (id + 2));
  if (btn) {
    btn.focus();
  }
  btn = document.getElementById('downdivId' + (id + 1));
  if (btn) {
    btn.focus();
  }
}

goUp(id: number) {
  const btn = document.getElementById('updivId' + (id - 1));
  if (btn) {
    btn.focus();
  }
}

showTone(id: number) {
  this.showTones[id] = !this.showTones[id];
}

showFont(id: number) {
  this.showFonts[id] = !this.showFonts[id];
}

showConfig(id: number) {
  // toggle::
  this.showConfigs[id] = !this.showConfigs[id];
  if (this.showConfigs[id]) {
    setTimeout(() => {
      console.log('passando valor...');
   
      let element = document.getElementById('showTab' + (id + 1)) as HTMLInputElement;
      if (element) {
       element.checked = this.tabs[id];
       console.log('tab: ' + this.tabs[id]);
      } else {
        console.log('tab null');
        
      }
      element = document.getElementById('showChord' + (id + 1)) as HTMLInputElement;
      if (element) {
       element.checked = this.chords[id];
       console.log('chord: ' + this.chords[id]);
      } else {
       console.log('chord null');
       
     }
      element = document.getElementById('lines' + (id + 1)) as HTMLInputElement;
      if (element) {
       element.value = this.lines[id];
       console.log('lines: ' + this.lines[id]);
   
      } else {
       console.log('lines null');
       
     }
      element = document.getElementById('columns' + (id + 1)) as HTMLInputElement;
      if (element) {
       element.value = this.columns[id];
       console.log('col: ' + this.columns[id]);
   
      } else {
       console.log('col null');
       
     }

    }, 200);
   
  

  }
}

showEdit(id: number) {
  this.edits[id] = !this.edits[id];
}

saveEdit(id: number) {
  const txtArea = document.getElementById('txtEditdivId' + (id + 1)) as HTMLTextAreaElement;
  this.pages[id] = txtArea.value;
  this.edits[id] = !this.edits[id];
  console.log('salvando...');
  console.warn('salvando...');
  
  this.processLayout();
}


incFont(id: number) {
  this.fontsSize[id] = this.fontsSize[id] + 1;
}

decFont(id: number) {
  this.fontsSize[id] = this.fontsSize[id] - 1;
}

setTab(id: number) {
  const inp = document.getElementById('showTab' + (id + 1)) as HTMLInputElement;
  if (inp) {
    this.tabs[id] = inp.checked;
  }

}


setChord(id: number) {
  const inp = document.getElementById('showChord' + (id + 1)) as HTMLInputElement;
  if (inp) {
    this.chords[id] = inp.checked;
  }

}


getFile() {

  this.editMode = false;

  setTimeout(() => {

    let content = '<script> ' +
    'function goDown(id) { ' +
        'id = id.slice(9); ' +
        'id = +id.slice(0, id.length - 1); ' +
       'var btn = document.getElementById(\'downdivId\' + (id + 2)); ' +
        'if (btn) { ' +
        '    btn.focus(); ' +
        '} ' +
        'btn = document.getElementById(\'downdivId\' + (id + 1)); ' +
        'if (btn) { ' +
        '    btn.focus(); ' +
        '} ' +
    '} ' +
    'function goUp(id) { ' +
        'id = id.slice(7); ' +
        'id = +id.slice(0, id.length - 1); ' +
        'var btn = document.getElementById(\'updivId\' + (id - 1)); ' +
        'if (btn) { ' +
        '    btn.focus(); ' +
        '} ' +
    '} ' +
  '</script>';


  content += '<style> .body { ' +
'    box-sizing: border-box; ' +
'    font-family: \'Lucida Sans\', \'Lucida Sans Regular\', \'Lucida Grande\', ' +
    '\'Lucida Sans Unicode\', \'Geneva\', \'Verdana\', \'sans-serif\'; ' +
'    color: #333; ' +
'    background-color: #fdfcff; ' +
'    border-radius: 5px; ' +
'  } ' +
'  * { ' +
'    box-sizing: border-box; ' +
'    font-family: \'Lucida Sans\', \'Lucida Sans Regular\', \'Lucida Grande\', ' +
'\'Lucida Sans Unicode\', \'Geneva\', \'Verdana\', \'sans-serif\'; ' +
'    color: #333; ' +
'    background-color: #fdfcff; ' +
'    border-radius: 3px; ' +
'     ' +
'  } ' +
'  .column { ' +
'    float: left; ' +
'    width: 25%; ' +
'    padding: 10px; ' +
'    height: 140px; ' +
'  } ' +
'  .row:after { ' +
'    content: "" !important; ' +
'    display: table !important; ' +
'    clear: both !important; ' +
'  } ' +
'  .button { ' +
'    display: block; ' +
'    width: 115px; ' +
'    height: 25px; ' +
'    background: #4E9CAF; ' +
'    padding: 10px; ' +
'    text-align: center; ' +
'    border-radius: 5px; ' +
'    color: white; ' +
'    font-weight: bold; ' +
'} ' +
'    pre { ' +
// '      white-space: pre-wrap;       /* css-3 */ ' +
'      white-space: nowrap; // -moz-pre-wrap;  /* Mozilla */ ' +
// '      white-space: -pre-wrap;      /* Opera 4-6 */ ' +
// '      white-space: -o-pre-wrap;    /* Opera 7 */ ' +
// '      word-wrap: break-word;       /* Internet Explorer 5.5+ */ ' +
'    } ' +
'.h1 { ' +
'  font-size: 20px; ' +
'}</style>';
  
    const div: HTMLDivElement = document.getElementById('content') as HTMLDivElement;
    content += div.innerHTML;
    if (content) {
      const a = document.createElement('a');
      const blob = new Blob([content], {type: 'text/html' }),
      url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = 'paginas.html';
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
  
    }
    this.editMode = true;
    
  }, 200);

  

 

}

handleFileInput(files: FileList) {
  console.log('importing project...');
  
  const fileToUpload: File = files.item(0);

  const fileReader = new FileReader();
  fileReader.onload = (e) => {
    const str = fileReader.result.toString();
    console.log('file content: ' + str);
    this.importProjectFile(JSON.parse(str));
  };
  fileReader.readAsText(fileToUpload);

}

importProjectFile(project: any) {
  // const project = [];


  if (project['pages'] && project['pages'].length > 0 && project['config']) {

    const div: HTMLInputElement = document.getElementById('url') as HTMLInputElement;
    div.value = project['config']['urls'];
    this.linhasTela = project['config']['linhasTela'];
    this.colunas = project['config']['colunas'];
    this.fontFamily = project['config']['fontFamily'];
    this.fontSize = project['config']['fontSize'];

    this.tablature = project['config']['tablature'];
    this.cifra = project['config']['cifra'];

    this.cifraColor = project['config']['cifraColor'];
    this.lyricsColor = project['config']['lyricsColor'];
    this.backColor = project['config']['backColor'];

    if (project['pages'] && project['config']['tones'] && project['config']['tones'].length === project['pages'].length) {
      this.tones = project['config']['tones'];
      this.fontsSize = project['config']['fontsSize'];
      this.showTones = project['config']['showTones'];
      this.showFonts = project['config']['showFonts'];
      this.showConfigs = project['config']['showConfigs'];
      this.tabs = project['config']['tabs'];
      this.chords = project['config']['chords'];
      this.lines = project['config']['lines'];
      this.columns = project['config']['columns'];
      this.edits = project['config']['edits'];
    }
    this.pages = project['pages'];
  }

  this.setParams();

  // this.ngOnInit();

  this.processLayout();

}


getProjectFile() {

  let projStr = '';

  console.log('saving project...');

  const project = new Object();
    project['config'] = new Object();

    const div: HTMLInputElement = document.getElementById('url') as HTMLInputElement;
    project['config']['urls'] = div.value;
    project['config']['linhasTela'] = this.linhasTela;
    project['config']['colunas'] = this.colunas;
    project['config']['fontFamily'] = this.fontFamily;
    project['config']['fontSize'] = this.fontSize;

    project['config']['tablature'] = this.tablature;
    project['config']['cifra'] = this.cifra;

    project['config']['cifraColor'] = this.cifraColor;
    project['config']['lyricsColor'] = this.lyricsColor;
    project['config']['backColor'] = this.backColor;

  

  if (this.pages.length > 0) {

    console.log('with ' + this.pages.length + ' pages..');
    

    

    if (this.tones.length !== this.pages.length) {
      console.log('having tones..');
      
      project['config']['tones'] = [];
      project['config']['fontsSize'] = [];
      project['config']['showTones'] = [];
      project['config']['showFonts'] = [];
      project['config']['showConfigs'] = [];
      project['config']['tabs'] = [];
      project['config']['chords'] = [];
      project['config']['lines'] = [];
      project['config']['columns'] = [];
      project['config']['edits'] = [];
    } else {
      project['config']['tones'] = this.tones;
      project['config']['fontsSize'] = this.fontsSize;
      project['config']['showTones'] = this.showTones;
      project['config']['showFonts'] = this.showFonts;
      project['config']['showConfigs'] = this.showConfigs;
      project['config']['tabs'] = this.tabs;
      project['config']['chords'] = this.chords;
      project['config']['lines'] = this.lines;
      project['config']['columns'] = this.columns;
      project['config']['edits'] = this.edits;
    }
    

  } else {
    alert('no songs to save! saving layout...')
  }
  project['pages'] = this.pages;

    projStr += JSON.stringify(project);
    console.log('project: ' + (projStr));

    const a = document.createElement('a');
    const blob = new Blob([projStr], {type: 'text/json' }),
    url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'project.json';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();

}

valueId(id: string): string {
  const element = document.getElementById(id) as HTMLInputElement;
  if (element) {
    console.log(element.value);
    
    return element.value;
  }
  return '';

}

  getPage(url: string) {
    // console.log('getPage()');
    


    // const div: HTMLDivElement = document.getElementById('content') as HTMLDivElement;
    
    if (url) {
      // if (div) {
      //   div.innerHTML = '';
        
      // }
      
      if (url.indexOf(';') > 0) {
        
        this.urls = url.split(';');
      } else {
        this.urls = [url];
      }

        

        this.countDownPages = this.urls.length;
        // this.doLoading();
        
        for(let i = 0; i < this.urls.length; i++) {
          this.pages.push('');
          const divId = 'divId' + (i + 1);
          // div.innerHTML += '<div id="' + divId + '" ></div><br><hr><br>';
          // const singleURL = urls[i];
          this.getSinglePage( this.urls[i], divId);
         

        }

       

      // let limitExec = 100; // 1 min
      // while (limitExec > 0 && this.countDownPages > 0) {
      //   limitExec--;
      //   setTimeout(() => null, 500);
      // }
      // this.processLayout();

     

    } 
    // else {
    //   div.innerHTML = '<span>URL inválida!</span>';

    // }
    
  }


  getSinglePage(url: string, divId: string) { // OK!

    const id = +divId.replace('divId', '');

    
    const fileType = getFileType(url);

     const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers':
    'Content-Type', 'Access-Control-Allow-Methods': 'GET', 'Access-Control-Allow-Credentials': 'true',
    'Content-Type': 'text/plain; charset=utf-8'
       });
    

    
    this.http.get(url , {responseType: 'text', headers: headers}
    
      ).subscribe(
      response => {
        
        const html = this.extrairCifra(response, divId);
        this.pages[id - 1] = html;

        
        // const div: HTMLDivElement = document.getElementById(divId) as HTMLDivElement;
        // div.innerHTML += html;


        // setTimeout(() => {
        //   this.addNewToneButtons(divId);
          
        // }, 200);

        this.countDownPages--;
        

        

      }, error => {
        // console.log(error.error);
        // console.log('error base64:' + error.error.base64); // );
        // console.log('error text:' + error.error.text);
        // console.log(error);
        // console.log(error.error.text);
        const div: HTMLDivElement = document.getElementById('content') as HTMLDivElement;
        // div.innerHTML = '<div>' + error.error.text + '</div>';
        switch (fileType) {
          // case FileTypeEnum.Image:
          //   // ' + error.error.text + '
          //   div.innerHTML = '<img src="" id="imgFile">';
          //   document.getElementById('imgFile').setAttribute('src', 'data:image/jpg;base64,' + this.base64ToBytes(error.error.text));
          //   break;
          default:
            div.innerHTML += '<div>' + error.error.text + '</div>';
            break;

        }
        this.countDownPages--;
    
      }
    );
  }

  retirarCifra(html: string, id: number) {
    let bold = 0;
    let endLine = 0;
    
    while (bold >= 0) {
      bold = html.indexOf('<b>');
      endLine = html.indexOf('\n', bold);
      html = html.slice(0, bold) + html.slice(endLine + 1);
    }
    return html;
  }

  changeRowTone(divId: string, semitones: number): boolean {
    console.log('changing tone of ' + divId + ' ' + semitones + ' * 1/2 t');
    const id = +divId.replace('divId', '');
    this.tones[id - 1] = this.tones[id - 1] + semitones;

    // let html = this.changeChordsOfElement(this.pages[id - 1], this.tones[id - 1]);
    this.processLayout(id - 1);


    return false;



  }

 
  // getPageAntes(url: string) {// OK!
    
  // const index = url.indexOf('br%2F');

  // let code = '';

  // if (index > 0) {
  //   code = url.slice(index + 5);
  // } else {
  //   code = url;
  // }

  // this.getDownLoad(Number.parseInt(code) as number);

  
  // }

//   @HostListener('click', ['$event'])
//     onClick(event: MouseEvent) {
//       event.currentTarget.dispatchEvent
//         console.log(event.currentTarget); // You can put this as a IF condition 
// }

  botoes(divId: string, isTone?: boolean): string {
    const id = +divId.replace('divId', '');

    let botoes = '';
    // botoes += '<span style="font-size: 10px; text-align:right;">';

    // botoes += '<b>Go</b>: ';

    // botoes += '<input type="button" onclick="location.href=''' + 'divId3' + ''';" value="<" />';

    if (!isTone) {
      // botoes += '<a class="button" ';
      // botoes += 'href="#updivId' + (id - 1) + '" id="up' + divId;
      // botoes += '"><</a>';
      // botoes += ' | ';
  
      // botoes += '<a class="button" ';
      // botoes += 'href="#downdivId' + (id + 1) + '" id="down' + divId;
      // botoes += '">></a>';

    } else {

      // botoes += '<span id="spanTone' + divId + '"></span>';

      // botoes += '<button style=" align-items: flex-end;" (click)="changeRowTone(' + divId + ', -1)" >b <</button>';
      // botoes += '<button style=" align-items: flex-end;" (click)="changeRowTone(' + divId + ', 1)" >> #</button>';

      // class="la la-trash"

      // botoes += '<button type="button" class="btn btn-link" (click)="changeRowTone(\'' + divId + '\', -1)">b</button>';
      // // botoes += ' | ';
      // botoes += '<button type="button" class="btn btn-link" (click)="changeRowTone(\'' + divId + '\', 1)">#</button>';

      

      // botoes += '<a class ="btn" ><i (click)="changeRowTone(\'' + divId + '\', -1)" >b</i></a>';
      // botoes += ' | ';
      // botoes += '<a class ="btn" ><i (click)="changeRowTone(\'' + divId + '\', 1)" >#</i></a>';


      /*
      botoes += '<a class="btn" ';
      botoes += ' queryParamsHandling="preserve" ';
      botoes += '[routerLink]="" ';
      botoes += '(click)="changeRowTone(\'' + divId + '\', -1)"';
      // botoes += 'href="#"'; // javascript: void(0);"'; // #updivId' + (id - 1) + '" id="up' + divId;
      botoes += ' style="cursor: pointer;"';
      botoes += '><</a>';

      botoes += ' | ';
  
      botoes += '<a class="btn" ';
      botoes += ' queryParamsHandling="preserve" ';
      botoes += '[routerLink]="" ';
      botoes += '(click)="changeRowTone(\'' + divId + '\', 1)"';
      botoes += ' style="cursor: pointer;" ';
      // botoes += 'href="#"'; // javascript: void(0);"'; // #downdivId' + (id + 1) + '" id="down' + divId;
      botoes += '>></a>';
      */
    }


    // TODO: futuro:::
    // botoes += ' - ';

    // botoes += '<a class="button" disabled ';
    // botoes += 'href="#subdivId' + (id - 1) + '" id="sub' + divId;
    // botoes += '">b</a>';
    // botoes += ' | ';

    // botoes += '<a class="button" disabled ';
    // botoes += 'href="#adddivId' + (id + 1) + '" id="add' + divId;
    // botoes += '">#</a>';

    return botoes;
  }

  extrairCifra(html: string, divId: string) { // OK!

    const id = +divId.replace('divId', '');

    let indice = html.indexOf('<h1');
    html = html.slice(indice + 5);
    indice = html.indexOf('<h1');
    html = /* '<b>' + */ html.slice(indice);
    indice = html.indexOf('</h1>');
    html = html.slice(0, indice + 5) + /* '</b>' + */ html.slice(indice + 5);

    html = html.replace('<h1 class="t1">', '<h1 class="t1" style="font-size: 24px;">' + this.botoes(divId) + ' ');

    html = html.replace('<h2', '<h2 style="font-size: 16px;"');

    // html = html.replace('</h1>', ' ' + this.botoes(divId) + '</h1>');

    indice = html.indexOf('<h2');
    // remove link::
    indice = html.indexOf('<a', indice);
    html = html.slice(0, indice) + html.slice(html.indexOf('>', indice + 1) + 1);
    indice = html.indexOf('</a>', indice);
    html = html.slice(0, indice) + html.slice(indice + 4);

    indice = html.indexOf('tom:');
    // remove link::
    indice = html.indexOf('<a', indice);
    html = html.slice(0, indice) + '<b>' + html.slice(html.indexOf('>', indice + 1) + 1);
    indice = html.indexOf('</a>', indice);
    html = html.slice(0, indice) + '</b>' + html.slice(indice + 4);



    indice = html.indexOf('<span id="cifra_tom">');

    html = html.slice(0, html.indexOf('</h2>') + 5) + html.slice(indice);

    // indice = html.indexOf('<a class="js-modal-trigger" href="#" title="alterar o tom da cifra">');
    // indice = html.indexOf('</a>', indice) + 4;

    indice = html.indexOf('tom:');
    indice = html.indexOf('</b>', indice) + 4;

    html = html.slice(0, indice) + '\t' + this.botoes(divId, true) + html.slice(indice);


    indice = html.indexOf('<a rel="nofollow"');
    html = html.slice(0, indice);

    indice = html.lastIndexOf('</div>');
    html = html.slice(0, indice);
    indice = html.lastIndexOf('</div>');
    html = html.slice(0, indice);

    html = this.avaliarTablatura(html, true);

    


    // html = this.showColumns(html, divId);

    // if (!this.cifra) {
    //   html = this.retirarCifra(html, id);

    // }

  

    return html;
  }

  setTablatureBold(html: string): string {
    for (let i = 19; i >= 0; i--) {
      const length = ('' + i).length;
      let indice = html.indexOf('' + i);
      while (indice > 1) {
        if (html.slice(indice - 2, indice) !== 'b>') { // or is digit?
          html = html.slice(0, indice) + '<b>' + i + '</b>' + html.slice(indice + length);
          indice = html.indexOf('' + i, indice + length + 4);
        }
        indice = html.indexOf('' + i, indice + length);
      }
      // html = html.replace('' + i, '<b>' + i + '</b>');
    }
    html = html.replace('</b><b>', '');

    return html;
  }

  avaliarTablatura(html: string, tablature: boolean): string {


      let pronto = false;
      let qtde = 0;
      let indice = 0;
      let indice2 = 0;


      while (!pronto && qtde < 100) {

        indice = html.indexOf('<span class="tablatura">', indice);

        if (indice >= 0) {
          indice2 = html.indexOf('<span class="cnt">', indice + 1);
          if (indice2 >= 0) {
            indice2 = html.indexOf('</span>', indice2 + 1);
          }
          indice2 = html.indexOf('</span>', indice2 + 1);
          // indice2 = this.indiceValido(html, indice2 + 7);

          if (!tablature) {
            html = html.slice(0, indice) + html.slice(indice2  + 7);

          } else {
            html = html.slice(0, indice) + this.setTablatureBold(html.slice(indice, indice2 + 7)) + html.slice(indice2  + 7);

          }
          indice++;


        } else {
          pronto = true;
        }
        qtde++;

      }
    return html;
  }

  showColumns(html: string, divId: string): string {

    const id = +divId.replace('divId', '');

    html = this.changeChordsOfElement(html, this.tones[id - 1]);

    while (html.indexOf('\n\n\n') >= 0) {
      html = html.replace('\n\n\n', '\n\n');
    }

    const linhas = (html.split('\n'));
    let correcaoFonte = 1;

    const totalLinhas = Math.max(Math.round(linhas.length + 4), this.linhasTela);

    if (linhas.length < this.linhasTela) {
      for (let i = linhas.length; i < this.linhasTela + 10; i++ ) {
        linhas.push('\n');
      }
      linhas.push('.');
    }

    
    let columnCount = (totalLinhas / this.linhasTela); // Math.ceil
    if (columnCount > this.colunas) {
      columnCount = this.colunas;
      correcaoFonte = this.colunas / columnCount;
    } else {
      columnCount = (Math.ceil(columnCount));
    }

    /* .row:after {
    content: "" !important;
    display: table !important;
    clear: both !important;
  }*/ 

    let quadro = '<div class="row">';
    // class="column" id="{}"
    const inicioCol = '<div class="column"  style="float: left; width: {%}%; height: 90%; padding-left: 9px;">';
    
    let linhaTela = 0;
    let coluna = 1;

    const fim = '</div>';
    const abrePre = '<pre>';
    const fechaPre = '</pre>';
    quadro += inicioCol.replace('{}', divId + 'col' + coluna);

    // quadro += this.botoes(divId);

  

    for (let index = 0; index < linhas.length; index++) {
      const linha = linhas[index];
      if (linhaTela === this.linhasTela) {
        linhaTela = 0;
        coluna++;
        quadro += fechaPre + fim + inicioCol.replace('{}', divId + 'col' + coluna
          // + '" *ngStyle="{\'height\':' + divId + 'col1.height}'
          ) + abrePre;
        
      }
      linhaTela++;
      quadro += linha + '\n';
    }

    quadro = quadro.replace('{%}', '' + Math.round(96 / coluna)).replace('{%}', '' + Math.round(96 / coluna))
      .replace('{%}', '' + Math.round(96 / coluna)).replace('{%}', '' + Math.round(96 / coluna));

    quadro = quadro.slice(0, quadro.lastIndexOf('</pre>'));

    // if (coluna < 4) {
    //   for (let index = coluna + 1; index <= 4; index++) {
    //     quadro += fechaPre + fim + inicioCol.replace('{}', divId + 'col' + index +
    //       '" *ngStyle="{\'height\':' + divId + 'col1.height}' ) + abrePre;

    //   }
    // }

    // if (linhaTela < this.linhasTela || coluna < 5) {
    //   for (let col = coluna; col < 5; col++) {
    //     if (col > coluna) {
    //       quadro += fechaPre + fim + inicioCol + abrePre;
    //     }
    //     for (let index = linhaTela; index < this.linhasTela + 2; index++) {
    //       quadro += '\n';
    //     }
    //     linhaTela = 0;
      // }
      
      // quadro += '\n';
    // }
    quadro += fechaPre +  fim + fim + '<br>';

    // quadro = this.changeChordsOfElement(quadro, 1);

    // quadro += '<hr>';
    return quadro;

  }

  indiceValido(html: string, next: number): number { // OK!

    

    const validChars = [];
    validChars.push('<');
    validChars.push('A');
    validChars.push('B');
    validChars.push('C');
    validChars.push('D');
    validChars.push('E');
    validChars.push('F');
    validChars.push('G');
    validChars.push('H');
    validChars.push('I');
    validChars.push('J');
    validChars.push('K');
    validChars.push('L');
    validChars.push('M');
    validChars.push('N');
    validChars.push('O');
    validChars.push('P');
    validChars.push('Q');
    validChars.push('R');
    validChars.push('S');
    validChars.push('T');
    validChars.push('U');
    validChars.push('V');
    validChars.push('W');
    validChars.push('X');
    validChars.push('Y');
    validChars.push('Z');

    validChars.push('a');
    validChars.push('b');
    validChars.push('c');
    validChars.push('d');
    validChars.push('e');
    validChars.push('f');
    validChars.push('g');
    validChars.push('h');
    validChars.push('i');
    validChars.push('j');
    validChars.push('k');
    validChars.push('l');
    validChars.push('m');
    validChars.push('n');
    validChars.push('o');
    validChars.push('p');
    validChars.push('q');
    validChars.push('r');
    validChars.push('s');
    validChars.push('t');
    validChars.push('u');
    validChars.push('v');
    validChars.push('w');
    validChars.push('x');
    validChars.push('y');
    validChars.push('z');
    validChars.push('[');
    validChars.push('(');


    for ( let i = next + 1; i < html.length; i++) {
      if (validChars.indexOf(html.charAt(i)) >= 0) {
        return i;
      }
    }
    return  html.length - 1;


  }

  changeChordsOfElement(html: string, semitones: number): string {

    let indB2 = 0;
    let indB1 = 0;
    let i = 0;

    while (indB2 < html.length && i < 200) {
      indB1 = html.indexOf('<b>', indB2) + 3;
      if (indB1 < 3) {
        console.log('não encontrou em ' + i);
        
        return html;
      }
      indB2 = html.indexOf('</b>', indB1);
      const chord = html.slice(indB1, indB2);
      const newChord = this.changeChord(chord, semitones);
      // console.log(chord + '->' + newChord);
      
      html = html.slice(0, indB1) + newChord + html.slice(indB2);
      i++;
  
  

    }

    console.log('não encontrou em ' + i);

    return html;

   

  }

  changeChord(chord: string, semitones: number): string {

    for (let index = 0; index < TONE_LIST.length; index++) {
      const tone = TONE_LIST[index];
      const i1 = chord.indexOf(tone.name);
      if (i1 >= 0) {
        return this.changeChord(chord.slice(0, i1), semitones) + this.changeTone(tone, semitones).name
          + this.changeChord(chord.slice(i1 + tone.name.length), semitones);
      }
    }
   
    // TONE_LIST.forEach(tone => {
    //   const i1 = chord.indexOf(tone.name);
    //   if (i1 >= 0) {
    //     return this.changeChord(chord.slice(0, i1), semitones) + this.changeTone(tone, semitones).name) + this.changeChord(chord.slice(i1 + tone.name), semitones);
    //   }
    // });

    return chord;

  }


  changeTone(tone: Tone, semitones: number): Tone {
    let newLevel = tone.level + semitones + 12;
    // console.log(tone.level + '->' + newLevel);
    if (newLevel >= 12) {
      newLevel = newLevel - 12;
      // console.log('*1: ' + tone.level + '->' + newLevel);
    }
    if (newLevel >= 12) {
      newLevel = newLevel - 12;
      // console.log('*2: ' + tone.level + '->' + newLevel);
    }
    if (newLevel < 0) {
      newLevel = newLevel + 12;
      // console.log('*3: ' + tone.level + '->' + newLevel);
    }


    const tones = TONE_LIST.filter(toneItem => toneItem.level === newLevel);
    // console.log(tones);
    
    if (tones && tones.length === 1) {
      return tones[0];
    } else if (tones.length > 1) {
      const tonesIn = TONE_LIST.filter(toneItem => toneItem.level === tone.level);
      if (tonesIn && tonesIn.length === 1) {
        return tones[(semitones > 0) ? 0 : 1];
      } else if (tonesIn.length > 1) {
        return tones[tonesIn.indexOf(tone)];
      }

    }


    return tone;

  }



  clickColorCifra() {
    
    
    const colorPicker: HTMLInputElement = (document.getElementById('colorCifra') as HTMLInputElement);
    // if (this.cifraColor !== colorPicker.value) {
      this.cifraColor = colorPicker.value;

      const elements =  document.getElementsByTagName('b');
      for (let index = 0; index < elements.length; index++) {
        const element = elements[index];
        element['style']['color'] =  this.cifraColor; // .attributes.m('style', 'color: rgb(80,50,180);');
      }
  
    // }
    
  }

  clickColorLyrics() {
    
    
    const colorPicker: HTMLInputElement = (document.getElementById('colorLyrics') as HTMLInputElement);
    // if (this.lyricsColor !== colorPicker.value) {
      this.lyricsColor = colorPicker.value;



      const elements =  document.getElementsByTagName('pre');
  
      for (let index = 0; index < elements.length; index++) {
        const element = elements[index];
        element['style']['color'] =  this.lyricsColor;
      }
      const elements2 =  document.getElementsByTagName('h2');
  
      for (let index = 0; index < elements2.length; index++) {
        const element2 = elements2[index];
        element2['style']['color'] =  this.lyricsColor;
      }
      this.clickColorCifra();
  
    // }
    
  }

  selectFontFamily() {
    
    const fontF: HTMLInputElement = (document.getElementById('fontF') as HTMLInputElement);
    // if (this.fontFamily !== fontF.value) {
      this.fontFamily = fontF.value;

      const elements =  document.getElementsByTagName('pre');
      for (let index = 0; index < elements.length; index++) {
        const element = elements[index];
        element['style']['font-family'] =  this.fontFamily; // .attributes.m('style', 'color: rgb(80,50,180);');
      }
  
    // }
    
  }

  changeFontSize() {
    

    const fontS: HTMLInputElement = (document.getElementById('fontS') as HTMLInputElement);

    if (this.fontSize !== +fontS.value) {
      this.fontSize = +fontS.value;

      console.log('fontSize: ' + this.fontSize);
      
  
        
      const elements =  document.getElementsByTagName('pre');
      for (let index = 0; index < elements.length; index++) {
        const element = elements[index];
        element['style']['font-size'] =  this.fontSize + 'px';
      }
  
    }

  }


 







}
