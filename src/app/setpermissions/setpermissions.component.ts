import { Component, OnInit } from "@angular/core";
import { HttpMethod } from '../../../node_modules/blocking-proxy/built/lib/webdriver_commands';
import { A,An,AclService } from "../acl.service";

@Component({
  selector: "app-setpermissions",
  templateUrl: "./setpermissions.component.html",
  styleUrls: ["./setpermissions.component.css"]
})
export class SetpermissionsComponent implements OnInit {
 
  constructor(private acl:AclService) {
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
   
    new An("admin")
      
      .can("GET")
      .from("/users");
    new An("admin")
      
      .can("POST")
      .to("/admin/:userId/articles")
      .when((params, user) => params.userId === user.id);
      
    new A("user")
     
      .can("POST")
      .to("/users/:userId/articles")
      .when((params, user) => params.userId === user.id);
      
    new A("guest")
     
      .can("GET")
      .from("/articles");
    new An("editor")
      
      .can("DELETE")
      .from("/contenteditorpage");
     
  }

  ngOnInit() {}
}
