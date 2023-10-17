import { Component, OnInit } from '@angular/core';
import { GetdataService } from 'src/app/services/getdata.service';
import { RegisterService } from 'src/app/services/register.service';
import { faEye, faPencil, faTrash, faEnvelope, faXmark, faMagnifyingGlass, faFileCsv, faFilePdf } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-fbolist',
  templateUrl: './fbolist.component.html',
  styleUrls: ['./fbolist.component.scss']
})
export class FbolistComponent implements OnInit {
  createdBy: any;
  allFBOEntries: any;
  selectedFilter: string = 'byOwner';
  searchQuery: string = '';
  filteredData: any;
  isSearch: boolean = false;
  faEye = faEye;
  faPencil = faPencil;
  faTrash = faTrash;
  faEnvelope = faEnvelope;
  faXmark = faXmark;
  faFileCsv = faFileCsv;
  faFilePdf = faFilePdf;
  faMagnifyingGlass = faMagnifyingGlass;
  pageNumber: number = 1;
  //ngx-csv Options
  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Your title',
    useBom: true,
    noDownload: true,
    headers: ["First Name", "Last Name", "ID"]
  };
  constructor(private getDataService: GetdataService, 
              private registerService: RegisterService) { }

  ngOnInit(): void {
    this.fetchAllFboData();
  }

  fetchAllFboData(): void {
    this.getDataService.getAllFboData().subscribe(res => {
      this.allFBOEntries = res.fboData.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((elem: any, index: number) => ({ ...elem, serialNumber: index + 1 }));
      //console.log('data',this.allFBOEntries);
      this.filter();
    })
  }

  filter(): void {
    //console.log(this.filteredData)
    if (!this.searchQuery) {
      this.filteredData = this.allFBOEntries;
    } else {
      if (this.selectedFilter === 'byOwner') {
        this.filteredData = this.allFBOEntries.filter((elem: any) => elem.owner_name.toLowerCase().includes(this.searchQuery.toLowerCase()))
      } else if (this.selectedFilter === 'byEmail') {
        this.filteredData = this.allFBOEntries.filter((elem: any) => elem.email.toLowerCase().includes(this.searchQuery.toLowerCase()))
      } else if (this.selectedFilter === 'byName') {
        this.filteredData = this.allFBOEntries.filter((elem: any) => elem.fbo_name.toLowerCase().includes(this.searchQuery.toLowerCase()))
      } else if (this.selectedFilter === 'byDistrict') {
        this.filteredData = this.allFBOEntries.filter((elem: any) => elem.district.toLowerCase().includes(this.searchQuery.toLowerCase()))
      }
    }
  }

  onSearchChange(): void{
    this.pageNumber = 1;
    this.isSearch = true;
    this.filter();
  }

  onTableDataChange(event: any) {
    this.pageNumber = event;
    this.filter();
  }

  deleteFBO(fbo: any): void {
    this.registerService.deleteFbo(fbo._id).subscribe(
      res => {
        if (res.success) {
          const index = this.allFBOEntries.findIndex((entry: any) => entry._id === fbo._id);
          if (index !== -1) {
            this.allFBOEntries.splice(index, 1);
            this.filter();
          }
        } else {
          console.error(res.message);
        }
      }
    );
  }

  //Export To CSV
  exportToCsv(){
    alert
    //new ngxCsv( this.allFBOEntries, 'Report', this.options)
  }
}