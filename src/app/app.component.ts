import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  searchText;
  selectedstatus: string;
  selectedCalltype: string;
  value: string;
  datalist = [];
  fromDate: any;
  toDate: any;
  model: any;
  filterStatus: boolean = false;

  toggle: boolean = true;

  statuslist = ["ALL", "NEW", "COMPLETED", "IN USE"];
  callType = ["ALL", "SALES", "SERVICE"];



  customerfulllist = [
    { id: 1, fullName: "", dos: new Date("2019-06-06T01:10:00Z"), status: 'NEW', custuid: 1, callType: "SALES" },
    { id: 2, fullName: "", dos: new Date("2019-06-15T01:10:00Z"), status: 'NEW', custuid: 2, callType: "SALES" },
    { id: 3, fullName: "", dos: new Date("2019-06-11T01:10:00Z"), status: 'NEW', custuid: 3, callType: "SALES" },
    { id: 4, fullName: "", dos: new Date('2019-05-15T01:10:00Z'), status: 'COMPLETED', custuid: 4, callType: "SERVICE" },
    { id: 5, fullName: "", dos: new Date("2019-06-10T01:10:00Z"), status: 'IN USE', custuid: 5, callType: "SALES" },
    { id: 6, fullName: "", dos: new Date('2019-03-22T01:10:00Z'), status: 'COMPLETED', custuid: 6, callType: "SERVICE" },
    { id: 7, fullName: "", dos: new Date('2019-05-27T01:10:00Z'), status: 'NEW', custuid: 7, callType: "SALES" },
    { id: 8, fullName: "", dos: new Date('2019-06-10T01:10:00Z'), status: 'IN USE', custuid: 8, callType: "SALES" },
    { id: 9, fullName: "", dos: new Date('2019-05-22T01:10:00Z'), status: 'NEW', custuid: 9, callType: "SERVICE" },
    { id: 10, fullName: "", dos: new Date('2019-06-04T01:10:00Z'), status: 'NEW', custuid: 10, callType: "SALES" },
    { id: 11, fullName: "", dos: new Date('2019-06-02T01:10:00Z'), status: 'IN USE', custuid: 11, callType: "SERVICE" }
  ];

  userMaster = [
    { uid: 1, title: 'Mr', firstName: 'David', lastName: 'Ray', mobile: "0410223451", home: "0398765432" },
    { uid: 2, title: 'Mrs', firstName: 'B', lastName: 'More', mobile: "0410223454", home: "0398765433" },
    { uid: 3, title: 'Mrs', firstName: 'Barty', lastName: 'London', mobile: "0410223455", home: "0398765436" },
    { uid: 4, title: 'Mr', firstName: 'Lee', lastName: 'Chung', mobile: "0410223450", home: "0398765437" },
    { uid: 5, title: 'Mr', firstName: 'K', lastName: 'Prabhakar', mobile: "0410223459", home: "0398765438" },
    { uid: 6, title: 'Ms', firstName: 'Nice', lastName: 'Elizabeth', mobile: "0410223456", home: "0398765434" },
    { uid: 7, title: 'Ms', firstName: 'John', lastName: 'Doe', mobile: "0410223451", home: "0398765432" },
    { uid: 8, title: 'Mrs', firstName: 'K', lastName: 'Rehan', mobile: "0410223456", home: "0398765438" },
    { uid: 9, title: 'Mr', firstName: 'A', lastName: 'Pradhan', mobile: "0410223457", home: "0398765436" },
    { uid: 10, title: 'Mr', firstName: 'Roger', lastName: 'D', mobile: "0410223452", home: "0398765439" },
    { uid: 11, title: 'Mrs', firstName: 'Kelly', lastName: 'Rose', mobile: "0410223453", home: "0398765435" },
  ];

  customerViewList = [];
  callValue: string;

  constructor() { }

  ngOnInit() {
    this.selectedstatus = this.statuslist[0];
    this.selectedCalltype = this.callType[0];

    this.value = "";
    this.callValue = "";
    this.normalizeCustomerListView();
    this.datalist = this.customerfulllist;
  }

  normalizeCustomerListView() {
    let templist = [];
    this.customerfulllist.forEach(data => {
      let checkid = this.userMaster.filter(
        chkitem => chkitem.uid === data.custuid
      );
      if (checkid) {
        data.fullName = checkid[0].title + " " + checkid[0].firstName + " " + checkid[0].lastName;
      }

    });


  }

  getInCall(cus: any) {
    this.userMaster.forEach(data => {
      if (cus.custuid == data.uid) {
        this.model = data;
        return;
      }

    });
    this.toggle = !this.toggle;
  }


  getData() {
    this.filterStatus = true;

    let templist = [];

    if (this.selectedCalltype !== 'ALL') {
      templist = this.datalist.filter(
        status => status.callType === this.selectedCalltype);
      this.datalist = templist;
    }

    let tempdatalist = [];
    if (this.selectedstatus !== 'ALL') {
      tempdatalist = this.datalist.filter(
        status => status.status === this.selectedstatus);
      this.datalist = tempdatalist;
    }

    if (this.fromDate && this.toDate) {
      this.fromDate = new Date(this.fromDate);
      this.toDate = new Date(this.toDate);

      let tempd = [];
      for (let i = 0; i < this.datalist.length; i++) {
        if (this.datalist[i].dos.getTime() >= this.fromDate.getTime() &&
          this.datalist[i].dos.getTime() <= this.toDate.getTime()
        )
          tempd.push(this.datalist[i])
      }
      this.datalist = tempd
    }


  }

  resetList() {
    this.datalist = this.customerfulllist;
    this.filterStatus = false;
  }

  onstateChange(event: any) {
    if (event.state == 'changed')
      this.toggle = !this.toggle;
  }
  onModelChange(event: any) {
    if (event) {
      this.updateusermaster(event);
    }
  }

  updateusermaster(event) {
    this.userMaster.forEach(data => {
      if (event.model.uid == data.uid) {
        data = event.model;
        return;
      }

    });
    this.normalizeCustomerListView();
  }

}
