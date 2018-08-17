import { Injectable,Component, OnInit } from "@angular/core";
import { AclService } from "../acl.service";

@Component({
  selector: "app-checkpermissions",
  templateUrl: "./checkpermissions.component.html",
  styleUrls: ["./checkpermissions.component.css"]
})
@Injectable()
export class CheckpermissionsComponent implements OnInit {
  constructor(private acl: AclService) {
    this.checkPermission();
    // this.acl.getUserPermissionsList("admin");
    //check.test();
  }

  checkPermission() {
   
    this.acl.if("admin").can("GET").from2("/users");
    this.acl.if('guest').can('POST').from2('/users'); // false
    this.acl.if('admin').can('POST').from2('/users'); // true
    //this.acl.if('hacker').can('POST').from2('/content'); // true

    
    
  }

  ngOnInit() {}
}
