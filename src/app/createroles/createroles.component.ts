import {Injectable ,Component, OnInit } from '@angular/core';
import { AclService } from '../acl.service';

@Component({
  selector: 'app-createroles',
  templateUrl: './createroles.component.html',
  styleUrls: ['./createroles.component.css']
})
@Injectable()
export class CreaterolesComponent implements OnInit {

  constructor(private acl: AclService) { 
    this.setRoles();
    this.getRoles();

    
  }
  /**set roles roles in service*/
  setRoles():void{
    this.acl.createRole("admin");
    this.acl.createRole("user");
    this.acl.createRole("guest");
    

  }

  /**get available roles in service*/
   getRoles():any {
    return this.acl.getRoles();    
  } 

  removeRoles():void{
    this.acl.removeRoles();
  }

  



  ngOnInit() {
  }

}
