import { Component, OnInit } from "@angular/core";
import { Check,AclService } from "../acl.service";

@Component({
  selector: "app-checkpermissions",
  templateUrl: "./checkpermissions.component.html",
  styleUrls: ["./checkpermissions.component.css"]
})
export class CheckpermissionsComponent implements OnInit {
   check = new Check();

  constructor() {
    this.checkPermission();
    // this.acl.getUserPermissionsList("admin");
    //check.test();

  }

  checkPermission() {
   
    this.check.if("admin").can("GET").from("/users");//true  

    this.check.if('guest').can('POST').to('/users'); // false


    this.check.if('admin').can('POST').to('/admin/12/articles').when({ id: 12 }); // true

    this.check.if('user').can('POST').to('/users/10/articles').when({ id: 11 }); //false 
    
  }

  ngOnInit() {}
}
