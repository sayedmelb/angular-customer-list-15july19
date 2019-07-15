import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'call-in-use',
  templateUrl: './call-in-use.html',
  styleUrls: ['./call-in-use.css']
})
export class CallInUse implements OnInit {

  @Input() data: any;
  holdingModel: {};
  @Output() togglestate = new EventEmitter();
  @Output() outmodel = new EventEmitter();

 

  constructor() { }

  ngOnInit() {
    console.log("data in use", this.data);
   this.holdingModel=this.assignModel(this.data);
  }
  assignModel(data:any){
    let tempObj = {
      uid: data.uid,
      title: data.title,
      firstName: data.firstName,
      lastName: data.lastName,
      mobile: data.mobile,
      home: data.home
    };
    return tempObj;
    
  }
  updateModel(){
    this.outmodel.emit({model: this.data});
    
  }
  callCompleted(){
     this.togglestate.emit({state:"changed" });
  }

  reset(){
  
    this.data=this.assignModel(this.holdingModel);
    console.log("reset data update", this.data);
  }
  callMobile(){
    alert("This will call mobile call app ");
  }
  callHome(){
    alert("This will call home call app ");
  }

}