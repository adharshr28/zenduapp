import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { Component, OnInit, ViewChild, ElementRef, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';




@Component({
  selector: 'app-submissions-page',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, GoogleMapsModule,
    MatTableModule, MatFormFieldModule, MatExpansionModule,
    MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatIconModule, MatInputModule, ReactiveFormsModule, MatTabsModule, MatButtonToggleModule, MatCardModule
  ],
  templateUrl: './submissions-page.component.html',
  styleUrl: './submissions-page.component.scss'
})
export class SubmissionsPageComponent {

  displayedColumns: string[] = ['formName', 'status', 'from', 'to', 'dueDate', 'location'];
  center: google.maps.LatLngLiteral = { lat: 35.6895, lng: 139.6917 }; // Example coordinates (Tokyo)
  dataSource: MatTableDataSource<Submission>;
  zoom = 10; // Example zoom level


  // @ViewChild('map') mapContainer!: ElementRef; // Using the definite assignment assertion


  markers = [
    { position: { lat: 35.6895, lng: 139.6917 }, label: 'Marker 1' },
    { position: { lat: 35.6895, lng: 139.6927 }, label: 'Marker 2' },
  ];
  filterControl = new FormControl();
  searchControl = new FormControl();
  filters = ['Status', 'Due Date'];
  filteredFilters!: Observable<string[]>;

  formFilterControl = new FormControl('');
  statusFilterControl = new FormControl('');
  dueDateFilterControl = new FormControl(null);

  list: any = [];

  private map: any;



  showListView: boolean = true;



  originalData: Submission[] = [
  ];



  ngOnInit() {
    this.searchControl.valueChanges.subscribe(searchTerm => {
      this.applyFilter(searchTerm);
    });

    this.formFilterControl.valueChanges.subscribe(() => {
      this.applyFilters();
    });

    // Subscribe to the status filter control
    this.statusFilterControl.valueChanges.subscribe(() => {
      this.applyFilters();
    });

    // Subscribe to the due date filter control
    this.dueDateFilterControl.valueChanges.subscribe(() => {
      this.applyFilters();
    });


  }

  ngAfterViewInit(): void {

  }

  applyFilters() {
    const formFilter = this.formFilterControl.value;
    const statusFilter = this.statusFilterControl.value;
    let dueDateFilter: Date | null = this.dueDateFilterControl.value;

    if (formFilter) {

      this.dataSource.data = this.dataSource.data.filter(item =>
        item.formName.toLowerCase().includes(formFilter.toLowerCase())
      );
    }

    if (statusFilter) {
      this.dataSource.data = this.dataSource.data.filter(item =>
        item.status.toLowerCase().includes(statusFilter.toLowerCase())
      );
    }

    if (dueDateFilter) {
      // const filterTimestamp = new Date(dueDateFilter.getTime()).setHours(0, 0, 0, 0);

      // // Use the MatTableDataSource's filter predicate for custom filtering.
      // this.dataSource.filterPredicate = (data: Submission, filter: string) => {
      //   const date = new Date(data.dueDate);
      //   return date.setHours(0, 0, 0, 0) === filterTimestamp;
      // };

      // // Trigger the filter with any string since the actual filtering is done by the filterPredicate.
      // // You can just pass in a dummy string to trigger the filtering process.
      // this.dataSource.filter = 'trigger';
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  exportAsCSV() {
    const dataToExport = this.dataSource.filteredData; // Adjust as needed
    const headers = ['Form Name', 'Status', 'From', 'To', 'Due Date', 'Location']; // Adjust as needed

    let csvData = this.convertToCSV(dataToExport, headers);
    let blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    let fileName = 'export.csv';

    let link = document.createElement('a');
    if (link.download !== undefined) {
        let url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', fileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
  }

  private convertToCSV(objArray: any[], headers: string[]): string {
    let csvStr = headers.join(',') + '\n';
    objArray.forEach(row => {
      let rowStr = headers.map(header => {
        let cellValue = row[header.toLowerCase().replace(/\s/g, '')];
        return cellValue ? `"${cellValue}"` : '';
      }).join(',');
      csvStr += rowStr + '\n';
    });
    return csvStr;
  }

  toggleView() {
    this.showListView = !this.showListView;
    // if (!this.showListView && !this.map) {
    //   // Defer map initialization until after view check
    //   setTimeout(() => this.initMap(), 0);
    // }
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Mock data for the table
    const submissions: Submission[] = [
      { formName: 'Test', status: 'Dispatched', from: 'anishseeniraj@zenduit.com', to: 'anishseeniraj@zenduit.com', dueDate: new Date('2023-01-01'), location: '8502 Preston Rd. Inglewood, Maine 98380chdcdcd' },
      { formName: 'Emmerson Sample', status: 'Assigned', from: 'morgancrunkleton@gofleet.ca', to: 'service-zenducam-fleetdemo-v2@zenduit.com', dueDate: new Date('2023-01-02'), location: '3891 Ranchview Dr. Richardson, California 62639' },
      { formName: 'Mittens Transport', status: 'Need Review', from: 'user3@company.com', to: 'user4@company.com', dueDate: new Date('2023-01-03'), location: '1200 E. California Blvd., Pasadena, California 91125' },
      { formName: 'Quarterly Report', status: 'Completed', from: 'user5@company.com', to: 'user6@company.com', dueDate: new Date('2023-01-04'), location: '1600 Amphitheatre Parkway, Mountain View, California 94043' },
      { formName: 'Operation Plan', status: 'Rejected', from: 'user7@company.com', to: 'user8@company.com', dueDate: new Date('2023-01-05'), location: '1 Infinite Loop, Cupertino, California 95014' },
      { formName: 'New Hire Documents', status: 'Unassigned', from: 'hr@company.com', to: 'newhire@company.com', dueDate: new Date('2023-01-06'), location: '767 Fifth Ave, New York, NY 10153' },
      { formName: 'Budget Analysis', status: 'Needs Approval', from: 'finance@company.com', to: 'ceo@company.com', dueDate: new Date('2023-01-07'), location: '350 Fifth Avenue, New York, NY 10118' }
    ];
    this.list = submissions
    this.dataSource = new MatTableDataSource(submissions);
  }

  getStatusClass(status: string): string {
    return `status-${status.replace(/\s+/g, '-').toLowerCase()}`;
  }


}


export interface Submission {
  formName: string;
  status: string;
  from: string;
  to: string;
  dueDate: Date;
  location: string;
}