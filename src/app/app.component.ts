import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { debounceTime, Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-material-table-filter';

  displayedColumns: string[] = ['position', 'name', 'dob', 'email', 'group'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);
  positions: SelectPosition[] = [];
  selectedPosition: number[] = []
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  searchForm: FormGroup;
  name: string = '';
  dob: Date = new Date();
  group: string = '';
  email: string = '';
  position: string = '';

  unsubscribe$ = new Subject();

  constructor(private fb: FormBuilder) {

    this.searchForm = fb.group({
      'name': ['', Validators.required],
      'dob': [new Date(), Validators.required],
      'group': ['', Validators.required],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'position': ['', Validators.required]
    });
  }
  ngOnInit() {
    this.dataSource.data = ELEMENT_DATA
    this.positions = POSITION_DATA
    this.searchForm.get('name')?.valueChanges.pipe(
      debounceTime(250),
      takeUntil(this.unsubscribe$)
    ).subscribe(value => {
      this.reset()
      this.dataSource.data = this.dataSource.data.filter(res => res.name.toLowerCase().includes(value.toLowerCase()));
    }

    )

    // this.searchForm.get('dob')?.valueChanges.pipe(
    //   debounceTime(250),
    //   takeUntil(this.unsubscribe$)
    // ).subscribe(value => {
    //   this.reset()
    //   this.dataSource.data = this.dataSource.data.filter(res => moment(res.dob).format('DD-MMM-YYYY') === moment(value).format('DD-MMM-YYYY'))
    // }
    // )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  // nameChange(value: string) {
  //   this.reset()

  //   // this.searchForm.get('name')?.valueChanges.pipe(
  //   //   debounceTime(250),
  //   //   takeUntil(this.unsubscribe$)
  //   // ).subscribe(value => {
  //   //   console.log(value);
  //   // }

  //   // )
  //   this.dataSource.data = this.dataSource.data.filter(res => res.name.toLowerCase().includes(value.toLowerCase()));

  // }

  emailChange(value:string) {
    this.reset()
    this.dataSource.data = this.dataSource.data.filter(res => res.email === value)
  }

  positionSelect(value:string) {
    this.reset()
    
    this.dataSource.data = this.dataSource.data.filter(res => res.code === parseInt(value))
    
  }

  groupChange(value: string) {
    this.reset()
    this.dataSource.data = this.dataSource.data.filter(res => res.group === value)
  }

  dateChange(event: MatDatepickerInputEvent<Date>) {
    console.log(moment(event.value).format('DD-MMM-YYYY'));
    

    this.dataSource.data = this.dataSource.data.filter(res => moment(res.dob).format('DD-MMM-YYYY') === moment(event.value).format('DD-MMM-YYYY'))
    
  }

  reset() {
    this.dataSource.data = ELEMENT_DATA
  }

  resetAll() {
    this.dataSource.data = ELEMENT_DATA

    this.searchForm.controls['name'].clearValidators()
    this.searchForm.controls['name'].setValue('')
    this.searchForm.controls['name'].updateValueAndValidity()
    this.searchForm.controls['group'].clearValidators()
    this.searchForm.controls['group'].setValue('')
    this.searchForm.controls['group'].updateValueAndValidity()
    this.searchForm.controls['email'].clearValidators()
    this.searchForm.controls['email'].setValue('')
    this.searchForm.controls['email'].updateValueAndValidity()
    this.searchForm.controls['dob'].clearValidators()
    this.searchForm.controls['dob'].setValue(new Date())
    this.searchForm.controls['dob'].updateValueAndValidity()
    this.searchForm.controls['position'].clearValidators()
    this.searchForm.controls['position'].setValue('')
    this.searchForm.controls['position'].updateValueAndValidity()

  }
}
/* Static data */
export interface PeriodicElement {
  name: string;
  position: string;
  code: number;
  dob: string;
  email: string;
  group: string
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 'Captain', code: 1,name: 'Monkey D. Luffy', dob: '2001-01-01T00:00:00.511Z', email: 'luffy@strawhat.pirate', group: 'pirate' },
  { position: 'Vice', code: 2,name: 'Roronoa Zorro', dob: '1998-01-01T00:00:00.511Z', email: 'zorro@strawhat.pirate', group: 'pirate' },
  { position: 'Fighter', code: 3,name: 'Vinsmoke Sanji', dob: '1999-01-01T00:00:00.511Z', email: 'sanji@strawhat.pirate', group: 'pirate' },
  { position: 'Captain', code: 1,name: 'Trafalgar D. Water Law', dob: '1997-01-01T00:00:00.511Z', email: 'law@heart.pirate', group: 'pirate' },
  { position: 'Captain', code: 1,name: 'Eustass Kid', dob: '1997-01-01T00:00:00.511Z', email: 'kid@kid.pirate', group: 'pirate' },
  { position: 'Vice', code: 2,name: 'Killer', dob: '1995-01-01T00:00:00.511Z', email: 'killer@kid.pirate', group: 'pirate' },
  { position: 'Vice', code: 2,name: 'Beepo', dob: '2002-01-01T00:00:00.511Z', email: 'beepo@heart.pirate', group: 'pirate' },
  { position: 'Fighter', code: 3,name: 'Nico Robin', dob: '1991-01-01T00:00:00.511Z', email: 'robin@strawhat.pirate', group: 'pirate' },
  { position: 'Fighter', code: 3,name: 'Jean Bart', dob: '1990-01-01T00:00:00.511Z', email: 'jean_beart@heart.pirate', group: 'pirate' },
  { position: 'Fighter', code: 3,name: 'Heat', dob: '1999-01-01T00:00:00.511Z', email: 'heat@kid..pirate', group: 'pirate' },
  { position: 'Admiral', code: 4,name: 'Kuzan Aokiji', dob: '1975-01-01T00:00:00.511Z', email: 'aokiji@marine.gov', group: 'marine' },
  { position: 'Admiral', code: 4,name: 'Sakazuki Akainu', dob: '1978-01-01T00:00:00.511Z', email: 'akainu@marine.gov', group: 'marine' },
  { position: 'Admiral', code: 4,name: 'Borsalino Kizaru', dob: '1975-01-01T00:00:00.511Z', email: 'kizaru@marine.gov', group: 'marine' },
  { position: 'Admiral', code: 4,name: 'Issho Fujitora', dob: '1975-01-01T00:00:00.511Z', email: 'fujitora@marine.gov', group: 'marine' },
  { position: 'Vice-Admiaral', code: 5,name: 'Monkey D. Garp', dob: '1962-01-01T00:00:00.511Z', email: 'garp@marine.gov', group: 'marine' },
  { position: 'Vice-Admiral', code: 5,name: 'Smoker', dob: '1988-01-01T00:00:00.511Z', email: 'smoker@marine.gov', group: 'marine' },
  { position: 'Vice-Admiral', code: 5,name: 'Vergo', dob: '1988-01-01T00:00:00.511Z', email: 'vergo@marine.gov', group: 'marine' },
  { position: 'Captain', code: 1,name: 'Tashigi', dob: '1999-01-01T00:00:00.511Z', email: 'tashigi@marine.gov', group: 'marine' },
  { position: 'Captain', code: 1,name: 'Coby', dob: '2004-01-01T00:00:00.511Z', email: 'coby@marine.gov', group: 'marine' },
  { position: 'Inspector General', code: 6,name: 'Sengoku', dob: '1964-01-01T00:00:00.511Z', email: 'sengoku@marine.gov', group: 'marine' },
];

export interface SelectPosition {
  code: number;
  title: string
}

const POSITION_DATA : SelectPosition[] = [
  {code: 1, title: 'Captain'},
  {code: 2, title: 'Vice'},
  {code: 3, title: 'Fighter'},
  {code: 4, title: 'Admiral'},
  {code: 5, title: 'Vice-Admiral'},
  {code: 6, title: 'Inspector General'},

]