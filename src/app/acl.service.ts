import { Injectable } from "@angular/core";
import { HttpMethod } from "../../node_modules/blocking-proxy/built/lib/webdriver_commands";

@Injectable({
  providedIn: "root"
})
/** main Acl Class */
export class AclService {
  constructor(acl: AclService) {}
  // constructor(public name: string) {}
  protected currentRole: string;
  protected currentVerb: HttpMethod;
  protected currentEndPoint: string;
  protected currentRolePermissionList;
  protected currentPermission;
  //route:string;
  protected accessList = {
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
    this.accessList.roles.push(role);
  }
  /**retrieve all available roles */
  getRoles(): string[] {
    return this.accessList.roles;
  }
  /** Remove all roles**/
  removeRoles(): void {
    this.accessList.roles = [];
  }

  /************************************************** helper methods */
  /**check role availability
   * @param role
   * return boolean
   */
  protected isAvailableRole(role: string): boolean {
    if (this.accessList.roles.indexOf(role) === -1) {
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
  protected hasPermission(role: string): boolean {
    return typeof this.accessList.allPermissionsList[role] === "object";
  }

  /**
   * check if a give  the permission array for the given role
   *
   * @param role
   * @returns {Array}
   */
  protected getUserPermissionsList(role): boolean {
    return this.hasPermission(role)
      ? this.accessList.allPermissionsList[role]
      : [];
  }

  /**************************************************permission setting methods */
  /**setting permissions
   * *
   * @param role
   */
  a(role: string): any {
    this.currentRole = role;
    return this;
  }

  /** set permissions to a each role
   *
   * @param role
   * @param httpVerb
   * @param endpoint
   */

  can(httpVerb: HttpMethod): any {
    this.currentVerb = httpVerb;
    return this;
  }

  /** set accessabile endpoint
   *
   * @param endPoint
   *
   */
  from(endPoint: string): any {
    /**check if user have role */
    if (this.isAvailableRole(this.currentRole)) {
      /**if role is available then check for permissions  */
      if (!this.hasPermission(this.currentRole)) {
        //if no permission assigned define an array of RolePermissionsList
        this.accessList.allPermissionsList[this.currentRole] = {
          rolePermissionList: []
        };
      }
      /**assign permission to the role */
      this.currentEndPoint = endPoint;
      this.accessList.allPermissionsList[
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

  when(callback: (params: object, user: object) => boolean): void {
    var currentObj = this.accessList.allPermissionsList[this.currentRole]
      .rolePermissionList;
    var l = currentObj.length;
    for (; l--; ) {
      // Grab the the current role
      let permission = currentObj[l];
      if (
        permission.verb === this.currentVerb &&
        permission.route === this.currentEndPoint
      ) {
        let currentPerm = this.accessList.allPermissionsList[this.currentRole]
          .rolePermissionList[l];
        currentPerm.additionalCondition = callback;

        console.log("optional condition has been added", currentPerm);
      }
    }
  }

  /**retrieve all available roles */
  getAllPermissionsList() {
    return this.accessList.allPermissionsList;
  }
  /**************************************************checking permissions methods */

  if(role): any {
    if (!this.isAvailableRole(role)) {
      return;
    } else {
      this.currentRole = role;
      this.currentRolePermissionList = this.accessList.allPermissionsList[
        role
      ].rolePermissionList;
      // console.log(this);
      return this;
    }
  }

  from2(endPoint: string): any {
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
  when2(user: object) {
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
  protected getcurrentObject(): any {
    var currentObj = this.accessList.allPermissionsList[this.currentRole]
      .rolePermissionList;
    var l = currentObj.length;

    for (; l--; ) {
      // Grab the the current role
      let permission = currentObj[l];
      if (permission.verb === this.currentVerb) {
        let currentPerm = this.accessList.allPermissionsList[this.currentRole]
          .rolePermissionList[l];
        // console.log(currentPerm);
        return currentPerm;
      }
    }
  }
}

/**  acl interface for method aliasing */
export interface AclService {
  /** alias of (a) */
  an: typeof AclService.prototype.a;
  /** alias of (from) */
  to: typeof AclService.prototype.from;
}
/**intialize (an) method with (a) method */
AclService.prototype.an = AclService.prototype.a;
/**intialize (to) method with (from) method */
AclService.prototype.to = AclService.prototype.from;

class permissionSetting extends AclService {
  constructor(acl: AclService) {
    super(acl);
  }
}
export class a extends AclService {
  constructor(acl: AclService) {
    super(acl);
  }
}
export class an extends AclService {
  constructor(acl: AclService) {
    super(acl);
  }
}

export class Check extends AclService {
  constructor(acl: AclService) {
    super(acl);
  }
  test() {
    console.log("maggie");
  }
}
