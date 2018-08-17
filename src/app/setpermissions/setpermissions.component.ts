import { Component, OnInit } from "@angular/core";
import { HttpMethod } from '../../../node_modules/blocking-proxy/built/lib/webdriver_commands';
import { A,An,AclService } from "../acl.service";

@Component({
  selector: "app-setpermissions",
  templateUrl: "./setpermissions.component.html",
  styleUrls: ["./setpermissions.component.css"]
})
export class SetpermissionsComponent implements OnInit {
  a = new A();
  an= new An();
  

  constructor() {
    this.setPermissions();
    console.log(
      "available list of  permissions",
      this.getPermissions()
    );

  }
  
  
  /**permission getter*/
  getPermissions() {
    return this.a.getAllPermissionsList();

  }
  /**permission setter */

  setPermissions() {
    this.an
      .an("admin")
      .can("GET")
      .from("/users");
    this.an
      .an("admin")
      .can("POST")
      .to("/admin/:userId/articles")
      .when((params, user) => params.userId === user.id);
      
    this.a
      .a("user")
      .can("POST")
      .to("/users/:userId/articles")
      .when((params, user) => params.userId === user.id);
      
    this.a
      .a("guest")
      .can("GET")
      .from("/articles");
    this.an
      .an("editor")
      .can("DELETE")
      .from("/contenteditorpage");
     
  }

  ngOnInit() {}
}
