import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent {
  // Variables to communicate with the sidebar window
  // Set the title to be displayed in the header of the sidebar window
  title = 'XLSX';
  file: any | null = null;
  fullScreen = false;
  documentsList: Docs[] = [];

  constructor(public router: Router) {
    this.documentsList = [
      {
        icon: 'insert_chart_outlined',
        text: 'Documento 01.xlsx',
        path: 'app/assets/files/SAFsMensalidade.xlsx',
        date: '10/08/2015',
      },
      {
        icon: 'insert_chart_outlined',
        text: 'Documento 02.xlsx',
        path: 'app/assets/files/SAFsMensalidade-2.xlsx',
        date: '10/08/2020',
      },
    ];
  }

  ngOnInit() {}

  selectedDoc(file: any) {
    this.file = file;
  }

  handleChangeFullScreen = (): void => {
    this.fullScreen = !this.fullScreen;
  };
}

interface Docs {
  icon: string;
  text: string;
  path: string;
  date: string;
}
