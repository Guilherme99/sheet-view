import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SheetComponent } from './sheet/sheet.component';

@NgModule({
  declarations: [SheetComponent],
  imports: [CommonModule, RouterModule, HttpClientModule],
  exports: [SheetComponent],
})
export class ComponentsModule {}
