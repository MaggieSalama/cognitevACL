import { Component, OnInit } from "@angular/core";
//import { HttpMethod } from '../../../node_modules/blocking-proxy/built/lib/webdriver_commands';
import { AclService } from "../acl.service";
import { PARAMETERS } from "../../../node_modules/@angular/core/src/util/decorators";

@Component({
  selector: "app-setpermissions",
  templateUrl: "./setpermissions.component.html",
  styleUrls: ["./setpermissions.component.css"]
})
export class SetpermissionsComponent implements OnInit {
  constructor(private acl: AclService) {
    this.setPermissions();
    console.log(
      "available list of  permissions",
      this.getPermissions()
    );
  }

  /**permission getter*/
  getPermissions() {
    return this.acl.getAllPermissionsList();
  }
  /**permission setter */

  setPermissions() {
    this.acl
      .an("admin")
      .can("GET")
      .from("/users");
    this.acl
      .an("admin")
      .can("POST")
      .to("/admin/:userId/articles")
      .when((params, user) => params.userId === user.id);
      
    this.acl
      .a("user")
      .can("POST")
      .to("/users/:userId/articles")
      .when((params, user) => params.userId === user.id);
      
    this.acl
      .a("guest")
      .can("GET")
      .from("/articles");
    this.acl
      .an("editor")
      .can("DELETE")
      .from("/contenteditorpage");
     
  }

  ngOnInit() {}
}
