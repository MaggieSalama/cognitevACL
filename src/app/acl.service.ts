import { Injectable } from "@angular/core";
import { HttpMethod } from "../../node_modules/blocking-proxy/built/lib/webdriver_commands";

@Injectable({
  providedIn: "root"
})
/** main Acl Class */
export class AclService {
  constructor() {}
  // constructor(public name: string) {}
  public currentRole: string;
  public currentVerb: HttpMethod;
  public currentEndPoint: string;
  public currentRolePermissionList;
  public currentPermission;
  //route:string;
  static accessList = {
    roles: [],
    allPermissionsList: {}
  };
  /**************************************************Role methods */

  /** create role*
   * @param role
   *
   *  **/
  createRole(role: string): void {
    console.log(role + " role has been added successfuly");
    AclService.accessList.roles.push(role);
  }
  /**retrieve all available roles */
  getRoles(): string[] {
    return AclService.accessList.roles;
  }
  /** Remove all roles**/
  removeRoles(): void {
    AclService.accessList.roles = [];
  }

  /************************************************** helper methods */

  /**check role availability
   * @param role
   * return boolean
   */
  public isAvailableRole(role: string): boolean {
    if (AclService.accessList.roles.indexOf(role) === -1) {
      console.log(role + " not found in role list");
      return false;
    } else {
      return true;
    }
  }

  /**check if certain role has any permissions
   * @param role
   * return boolean
   */
  public hasPermission(role: string): boolean {
    return typeof AclService.accessList.allPermissionsList[role] === "object";
  }

  /**
   * check if a give  the permission array for the given role
   *
   * @param role
   * @returns {Array}
   */
  public getUserPermissionsList(role): boolean {
    return this.hasPermission(role)
      ? AclService.accessList.allPermissionsList[role]
      : [];
  }
  /**retrieve all available roles */
  public getAllPermissionsList(): any {
    return AclService.accessList.allPermissionsList;
  }
}

class permissionSetting extends AclService {
  constructor() {
    super();
  }
  /** alias of (from) */
  to: typeof permissionSetting.prototype.from;
  /**************************************************permission setting methods */
  /**setting permissions
   

  /** set permissions to a each role
   *
   * @param role
   * @param httpVerb
   * @param endpoint
   */

  public can(httpVerb: HttpMethod): any {
    this.currentVerb = httpVerb;
    return this;
  }

  /** set accessabile endpoint
   *
   * @param endPoint
   *
   */
  public from(endPoint: string): any {
    /**check if user have role */
    if (this.isAvailableRole(this.currentRole)) {
      /**if role is available then check for permissions  */
      if (!this.hasPermission(this.currentRole)) {
        //if no permission assigned define an array of RolePermissionsList
        AclService.accessList.allPermissionsList[this.currentRole] = {
          rolePermissionList: []
        };
      }
      /**assign permission to the role */
      this.currentEndPoint = endPoint;
      AclService.accessList.allPermissionsList[
        this.currentRole
      ].rolePermissionList.push({
        verb: this.currentVerb,
        route: endPoint
      });

      console.log(
        "Permission Granted, " +
          this.currentRole +
          " role can now " +
          this.currentVerb +
          " from " +
          endPoint +
          " route"
      );
    }
    return this;
  }

  public when(callback: (params: object, user: object) => boolean): void {
    var currentObj =
      AclService.accessList.allPermissionsList[this.currentRole]
        .rolePermissionList;
    var l = currentObj.length;
    for (; l--; ) {
      // Grab the the current role
      let permission = currentObj[l];
      if (
        permission.verb === this.currentVerb &&
        permission.route === this.currentEndPoint
      ) {
        let currentPerm =
          AclService.accessList.allPermissionsList[this.currentRole]
            .rolePermissionList[l];
        currentPerm.additionalCondition = callback;

        console.log("optional condition has been added", currentPerm);
      }
    }
  }
}
/**intialize (to) method with (from) method */
permissionSetting.prototype.to = permissionSetting.prototype.from;

export class A extends permissionSetting {
  constructor(role: string) {
    super();
    this.currentRole = role;
    return this;
  }
}
export class An extends permissionSetting {
  constructor(role: string) {
    super();
    this.currentRole = role;
    return this;
  }
}

export class Check extends permissionSetting {
  constructor() {
    super();
  }
  /**************************************************checking permissions methods */
  to: typeof Check.prototype.from;

  public if(role): any {
    if (!this.isAvailableRole(role)) {
      return;
    } else {
      this.currentRole = role;
      this.currentRolePermissionList =
        AclService.accessList.allPermissionsList[role].rolePermissionList;
      // console.log(this);
      return this;
    }
  }

  public from(endPoint: string): any {
    if (!this.isAvailableRole(this.currentRole)) {
      /**if role is available then check for permissions  */
      console.log("no role");
      if (!this.hasPermission(this.currentRole)) {
        //if no permission assigned define an array of RolePermissionsList
        console.log("no valid verb");
        return false;
      }
    }

    this.currentEndPoint = endPoint;
    let currentUserPermission = this.currentRolePermissionList;
    let l = currentUserPermission.length;
    for (; l--; ) {
      // Grab the the current role
      let permission = currentUserPermission[l];
      // console.log(this.currentVerb)

      if (
        permission.verb === this.currentVerb &&
        permission.route === endPoint
      ) {
        console.log(
          this.currentRole +
            " can " +
            this.currentVerb +
            " (from/to) " +
            endPoint
        );
        return true;
      }
    }

    // so the permission not found in attached list
    console.log(
      this.currentRole + " can't " + this.currentVerb + " (from/to) " + endPoint
    );

    return this;
  }
  public when(user: object) {
    let currentObject = this.getcurrentObject();
    let definedUrl = this.currentEndPoint;
    let definedUrlSplitted = definedUrl.split("/");
    let urlParamId = definedUrlSplitted[2];

    let params = {
      userId: +urlParamId
    };

    if (currentObject.additionalCondition(params, user)) {
      console.log(
        this.currentRole +
          " with id " +
          urlParamId +
          " can " +
          this.currentVerb +
          " (from/to) " +
          this.currentEndPoint
      );
    }
  }
  public getcurrentObject(): any {
    var currentObj =
      AclService.accessList.allPermissionsList[this.currentRole]
        .rolePermissionList;
    var l = currentObj.length;

    for (; l--; ) {
      // Grab the the current role
      let permission = currentObj[l];
      if (permission.verb === this.currentVerb) {
        let currentPerm =
          AclService.accessList.allPermissionsList[this.currentRole]
            .rolePermissionList[l];
        // console.log(currentPerm);
        return currentPerm;
      }
    }
  }
}
/**intialize (to) method with (from) method -- check permissions*/
Check.prototype.to = Check.prototype.from;
