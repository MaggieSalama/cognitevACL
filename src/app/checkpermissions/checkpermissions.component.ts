import { Component, OnInit } from "@angular/core";
import { AclService } from "../acl.service";

@Component({
  selector: "app-checkpermissions",
  templateUrl: "./checkpermissions.component.html",
  styleUrls: ["./checkpermissions.component.css"]
})
export class CheckpermissionsComponent implements OnInit {
  constructor(private acl: AclService) {
    this.checkPermission();
    // this.acl.getUserPermissionsList("admin");
    //check.test();
  }

  checkPermission() {
   
    this.acl.if("admin").can("GET").from2("/users");//true  

    this.acl.if('guest').can('POST').from2('/users'); // false


    this.acl.if('admin').can('POST').from2('/admin/12/articles').when2({ id: 12 }); // true

    this.acl.if('user').can('POST').from2('/users/10/articles').when2({ id: 10 });
    
  }

  ngOnInit() {}
}
