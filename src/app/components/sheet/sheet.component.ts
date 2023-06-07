import { HttpClient } from '@angular/common/http';
import { Component, Input, SimpleChanges } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss'],
})
export class SheetComponent {
  @Input() fullScreen: boolean = false;
  @Input() file: any | null = null;
  @Input() handleChangeFullScreen: (() => void) | undefined;

  selectedSheetsName: string = '';
  sheetsName: any = [];
  columns: string[] = [];
  sheetData: any[] = [];
  documentsList: Docs[] = [];

  private httpClient: HttpClient;
  constructor(http: HttpClient) {
    this.httpClient = http;
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      const changedProp = changes[propName];
      if (!changedProp.isFirstChange()) {
        if (propName === 'file') {
          const to = changedProp.currentValue;
          this.selectedDoc(to);
        }
      }
    }
  }
  extractColumnHeaders(worksheet: any): string[] {
    const range: XLSX.Range = XLSX.utils.decode_range(worksheet['!ref']);
    const columnHeaders: string[] = [];
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellAddress: XLSX.CellAddress = { r: 0, c: col };
      const cellRef: string = XLSX.utils.encode_cell(cellAddress);
      const cellValue: any = worksheet[cellRef];
      if (cellValue?.v) columnHeaders.push(cellValue?.v);
    }
    return columnHeaders;
  }
  extractDataRows(worksheet: any): any[] {
    const range: XLSX.Range = XLSX.utils.decode_range(worksheet['!ref']);
    const dataRows: any[] = [];
    for (let row = range.s.r + 1; row <= range.e.r; row++) {
      const rowData: any = { rowNumber: row };
      for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress: XLSX.CellAddress = { r: row, c: col };
        const cellRef: string = XLSX.utils.encode_cell(cellAddress);
        const cellValue: XLSX.CellObject = worksheet[cellRef];
        rowData.cells = rowData.cells || [];
        rowData.cells.push(cellValue?.v);
      }
      dataRows.push(rowData);
    }
    return dataRows;
  }
  handleSelectedSheet(index: number): void {
    const sheetName: any = this.file?.workbook?.SheetNames[index];
    const worksheet: XLSX.WorkSheet = this.file?.workbook?.Sheets[sheetName];
    this.selectedSheetsName = sheetName;
    this.sheetsName = this.file?.workbook?.SheetNames;
    this.columns = this.extractColumnHeaders(worksheet);
    this.sheetData = this.extractDataRows(worksheet);
  }
  selectedDoc(file: any) {
    this.httpClient
      .get(file?.path, { responseType: 'arraybuffer' })
      .subscribe((response: any) => {
        console.log('response', response);
        const data: Uint8Array = new Uint8Array(response);
        const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'array' });
        this.file = {
          workbook,
          name: file?.text,
          date: file?.date,
        };
        const sheetName: string = workbook.SheetNames[0];
        const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
        this.selectedSheetsName = sheetName;
        this.sheetsName = workbook.SheetNames;
        this.columns = this.extractColumnHeaders(worksheet);
        this.sheetData = this.extractDataRows(worksheet);
      });
  }
  handleChangeSheet(number: any, sheet: string) {
    this.selectedSheetsName = sheet;
    this.handleSelectedSheet(number);
  }
}

interface Docs {
  icon: string;
  text: string;
  path: string;
  date: string;
}
