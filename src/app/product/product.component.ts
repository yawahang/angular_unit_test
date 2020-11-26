import { ProductService } from './product.service';
import { Component, OnInit } from '@angular/core';
import { MvProduct } from './product.model';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from './product-form/product-form.component';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  displayedColumns: string[];
  dataSource: MatTableDataSource<MvProduct>;
  gridData: MvProduct[] = [];
  productMsg = '';
  selectedProduct: MvProduct = {} as MvProduct;
  selection = new SelectionModel<MvProduct>(false, []);

  constructor(private ps: ProductService,
              public dialog: MatDialog) {

  }

  ngOnInit() {

    this.displayedColumns = ['productId', 'name', 'rate', 'quantityStock'];
    this.getProducts();
  }

  getProducts() {

    this.productMsg = '';
    this.ps.getProduct().subscribe((result: any) => {

      if (result) {

        this.gridData = result;
        this.dataSource = new MatTableDataSource<MvProduct>(this.gridData);
      } else {

        this.gridData = [];
        this.dataSource = new MatTableDataSource<MvProduct>();
        this.productMsg = 'No Products!';
      }
    });
  }

  addProduct() {

    this.selection.clear();
    this.selectedProduct = ({} as MvProduct);
    this.openDialog('Add');
  }

  editProduct() {

    this.openDialog('Edit');
  }

  openDialog(action: string) {

    if (action === 'Edit' && !this.selection.hasValue()) {

      this.productMsg = 'Please Select A Row to Edit Product!';
      return;
    }

    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '250px',
      data: { data: this.selectedProduct, action }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.selectedProduct = result;
        // save to server

        if (action === 'Edit') {

          // update in server database

          // modify grid data
          for (const index in this.gridData) {

            if (this.gridData[index].productId === this.selectedProduct.productId) {

              this.gridData[index] = { ...this.selectedProduct };
              this.dataSource = new MatTableDataSource<MvProduct>(this.gridData);
              break;
            }
          }
        } else { // Add

          // save to server database

          // get response from server and append to existing grid
          this.gridData.unshift({ ...this.selectedProduct });
          this.dataSource = new MatTableDataSource<MvProduct>(this.gridData);
        }

        this.productMsg = 'Product Added Sucessfully!';
      } else {

        this.productMsg = 'Action Cancelled!';
      }
    });
  }

  rowClick(e: any, row: MvProduct) {

    this.selectedProduct = { ...row };
    this.selection.toggle(row);
  }
}
