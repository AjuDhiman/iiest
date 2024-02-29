import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPhone, faSun, faClose, faCopy, faUser, faLessThan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lms',
  templateUrl: './lms.component.html',
  styleUrls: ['./lms.component.scss']
})
export class LmsComponent implements OnInit {
  currentDate = new Date();
  weekDays: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  calendar: any[] = [];
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
 showMonth:string;
 todayDate:any;
 isCurrentDate :boolean;
 holidays:any= [
  {
  "date" : 6 ,
  "month" : "March",
  "year" : 2024,
  "day" : "Wednesday",
  "holiday" : "Maharishi Dayanand Saraswati Jayanti",
  "leave_type" : "RH"
  },
  {
  "date" :  8,
  "month" : "March",
  "year" : 2024,
  "day" : "Friday",
  "holiday" : "Maha Shivratri",
  "leave_type" : "RH"
  },
  {
  "date" : 24 ,
  "month" : " March",
  "year" : 2024,
  "day" : "Sunday",
  "holiday" : "Holika Dahana",
  "leave_type" : "RH"
  },
  {
  "date" : 25 ,
  "month" : "March",
  "year" :2024 ,
  "day" : "Monday",
  "holiday" : "Holi, Dolyatra ",
  "leave_type" : "RH"
  },
  {
  "date" :29  ,
  "month" : "March",
  "year" :2024,
  "day" : "Friday",
  "holiday" : "Good Friday",
  "leave_type" : "GH"
  },
  
  {
  "date" :31,
  "month" : "March",
  "year" :2024 ,
  "day" : "Sunday",
  "holiday" : "Easter Day",
  "leave_type" : "RH"
  },
  {
  "date" : 9,
  "month" : "April",
  "year" :2024 ,
  "day" : "Tuesday",
  "holiday" : "Ugadi",
  "leave_type" : "RH"
  },
  {
  "date" :10 ,
  "month" : "April",
  "year" : 2024,
  "day" : "Wednesday",
  "holiday" : "Id-ul-Fitr",
  "leave_type" : "RH"
  },
  {
  "date" :11 ,
  "month" : "April",
  "year" : 2024,
  "day" : "Thursday",
  "holiday" : "Ramzan",
  "leave_type" : "RH"
  },
  {
  "date" : 13,
  "month" : "April",
  "year" :2024 ,
  "day" : "Saturday",
  "holiday" : "Vaisakhi",
  "leave_type" : "RH"
  },
  {
  "date" :14 ,
  "month" : "April",
  "year" : 2024,
  "day" : "Sunday",
  "holiday" : "Dr Ambedkar Jayanti ",
  "leave_type" : "RH"
  },
  {
  "date" : 17,
  "month" : "April",
  "year" :2024 ,
  "day" : "Wednesday",
  "holiday" : "Rama Navami",
  "leave_type" : "GH"
  },
  {
  "date" :21 ,
  "month" : "April",
  "year" :2024 ,
  "day" : "Sunday",
  "holiday" : "Mahavir Jayanti",
  "leave_type" : "GH"
  },
  {
  "date" : 8,
  "month" : "May",
  "year" : 2024 ,
  "day" : "Wednesday",
  "holiday" : "Rabindra Jayanti",
  "leave_type" : "RH"
  },
  {
  "date" : 23 ,
  "month" : "May",
  "year" : 2024,
  "day" : "Thursday",
  "holiday" : "Buddha Purnima",
  "leave_type" : "GH"
  },
  {
  "date" :17 ,
  "month" : "June",
  "year" : 2024,
  "day" : "Monday",
  "holiday" : "Id-ul-Zuha(Bakrid)",
  "leave_type" : "GH"
  },
  {
  "date" :17 ,
  "month" : "July",
  "year" : 2024,
  "day" : "Wednesday",
  "holiday" : "Muharram",
  "leave_type" : "GH"
  },
  {
  "date" : 15,
  "month" : "August",
  "year" :2024 ,
  "day" : "Thursday",
  "holiday" : "Independence Day",
  "leave_type" : "GH"
  },
  {
  "date" :26 ,
  "month" : "August",
  "year" :2024 ,
  "day" : "Monday",
  "holiday" : "Janamashtami (Vaishnva)",
  "leave_type" : "GH"
  }
  ,{
  "date" :7 ,
  "month" : "September",
  "year" :2024 ,
  "day" : "Saturday",
  "holiday" : "Ganesh Chaturthi",
  "leave_type" : "RH"
  },
  {
  "date" :16 ,
  "month" : "September",
  "year" : 2024,
  "day" : "Monday",
  "holiday" : "Eid-Milad",
  "leave_type" : "RH"
  },
  {
  "date" : 2,
  "month" : "October",
  "year" :2024 ,
  "day" : "Wednesday",
  "holiday" : "Gandhi Jaynthi",
  "leave_type" : "GH"
  },
  {
  "date" : 12,
  "month" : "October",
  "year" : 2024,
  "day" : "Saturday",
  "holiday" : "Dussehra",
  "leave_type" : "GH"
  },
  {
  "date" :31 ,
  "month" : "October",
  "year" :2024 ,
  "day" : "Thursday",
  "holiday" : "Diwali",
  "leave_type" : "GH"
  },
  {
  "date" :15 ,
  "month" : "November",
  "year" : 2024 ,
  "day" : "Friday",
  "holiday" : " Guru Nanak's Birthday",
  "leave_type" : "GH"
  },
  {
  "date" :25 ,
  "month" : "December",
  "year" : 2024,
  "day" : "Wednesday",
  "holiday" : "Christmas",
  "leave_type" : "GH"
  }
  ];
leave:any=[{
  "annualLeave": {
    "available": 10.00,
    "availed": 4.00
  },
  "myLeave": {
    "available": 4.00,
    "availed": 0.00
  },
  "restrictedHoliday": {
    "available": 4.00,
    "availed": 2.00
  }
}
];
selectedDates: number[] = [];
selectedDateFormatted: string = ''; 
selectedDatesWithLeaveType:any[] = [];
selectedLeaveType: string = ''; 
isPopUpVisible: boolean = true;
isCalendar:boolean=true;
isApply:boolean=false;
halfLeave:string;
totalSelectedDates:any;
faPhone=faPhone;
faSun=faSun;
faClose=faClose;
faCopy=faCopy;
faUser=faUser;
faLessThan= faLessThan;

leaveForm: FormGroup;

  constructor(private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.generateCalendar();
    this.applyForm();
   console.log(this.holidays)
  }

  applyForm(): void {
   
    this.leaveForm = this.formbuilder.group({
      approverName: ['', Validators.required], 
      cc: [''],
      contactNumber: ['', Validators.required],
      leaveReason: ['', Validators.required],
      selectedLeaveType: ['annual']
    });
  }


  generateCalendar(): void {
    const today = new Date();
    const firstDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
    const startDate = new Date(firstDayOfMonth);
    
    this.todayDate = today.toDateString().split(' ')
    console.log(this.currentDate.toDateString())
    console.log(this.todayDate[2])
    
    console.log(today.toDateString());
    // Adjust start date to start from Monday
    while (startDate.getDay() !== 1) { // Monday
      startDate.setDate(startDate.getDate() - 1);
    }
  
    this.calendar = [];
    let currentWeek: any[] = [];
    this.showMonth = this.months[this.currentDate.getMonth()];
    // Add week days at the top
    this.weekDays;
   
    while (startDate <= lastDayOfMonth) {
      const currentDate = new Date(startDate);
      this.currentDate.toDateString()
      this.isCurrentDate = this.currentDate.toDateString() === today.toDateString();
      if (currentDate.getMonth() === firstDayOfMonth.getMonth()) {
        currentWeek.push(currentDate.getDate());
      } else {
        currentWeek.push(null);
      }
  
      if (currentDate.getDay() === 0) { // Sunday
        this.calendar.push(currentWeek);
        currentWeek = [];
      }
  
      startDate.setDate(startDate.getDate() + 1);
    }
  
    // If the last week is not complete, add it
    if (currentWeek.length > 0) {
      this.calendar.push(currentWeek);
    }
  }
  goToPreviousMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar();
  }

  goToNextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar();
  }
  getDaySuffix(day: number): string {
    if (day >= 11 && day <= 13) {
        return 'th';
    }
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
 }

 selectedDate(day: number): void {
 
    const index = this.selectedDates.indexOf(day);
    if (index === -1) {
        this.selectedDates.push(day); 
    } else {
        this.selectedDates.splice(index, 1); 
    }    
    const selectedDateObj = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
    const dayOfWeek = this.weekDays[selectedDateObj.getDay()]; 
    this.showMonth = this.months[this.currentDate.getMonth()];
    this.selectedDateFormatted = `${day} ${this.showMonth.substring(0, 3)} ${this.currentDate.getFullYear()} (${dayOfWeek})`;
    console.log(this.selectedDates);
    console.log(this.selectedDateFormatted)

}
isSelected(day: number): boolean {
    return this.selectedDates.includes(day);
    
}
applySelection(): void {

  this.isCalendar = false;
  this.isApply = true; 
  
  

   // Logic for updating selected dates with leave type
  this.selectedDatesWithLeaveType = this.selectedDates.map(date => {
    return {
      date: `${date} ${this.showMonth} ${this.currentDate.getFullYear()}`,
      leaveType: this.selectedLeaveType
    };
  });
  
  this.totalSelectedDates = this.selectedDates.length;
 
}

halfDayLeave(date: string): void {
  const index = this.selectedDatesWithLeaveType.findIndex(item => item.date === date);
  if (index !== -1) {
    if (this.selectedDatesWithLeaveType[index].leaveType === 'half') {
      this.selectedDatesWithLeaveType[index].leaveType = '';
    } else {
      this.selectedDatesWithLeaveType[index].leaveType = 'half';
    }
  }
}

updateLeaves($event :any):void{
  this.selectedLeaveType= $event.target.value;

  this.totalSelectedDates = this.selectedDates.length;
  if (this.selectedLeaveType === 'annual') {
    this.leave[0].annualLeave.available -= this.totalSelectedDates;
    this.leave[0].annualLeave.availed += this.totalSelectedDates ;
    }
     else if (this.selectedLeaveType === 'my') {
    this.leave[0].myLeave.available -= this.totalSelectedDates ;
    this.leave[0].myLeave.availed += this.totalSelectedDates ;
     }

     this.selectedDatesWithLeaveType.forEach(date => {
      if (date.leaveType === 'half') {
        if (this.selectedLeaveType === 'annual') {
          this.leave[0].annualLeave.available -= 0.5;
          this.leave[0].annualLeave.availed += 0.5;
        } else if (this.selectedLeaveType === 'my') {
          this.leave[0].myLeave.available -= 0.5;
          this.leave[0].myLeave.availed += 0.5;
        }
      }
    });
}



onCancel():void{
  this.isCalendar = true;
  this.isApply = false;
  this.selectedDates = [];

}

}









