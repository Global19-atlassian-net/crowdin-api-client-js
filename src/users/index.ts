import { CrowdinApi, ResponseList, ResponseObject } from '../core';

export class Users extends CrowdinApi {
    /**
     * @param status filter users by status
     * @param search search users by firstName, lastName, username, email
     * @param twoFactor filter users by two-factor authentication status
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     */
    listUsers(
        status?: UsersModel.Status,
        search?: string,
        twoFactor?: UsersModel.TwoFactor,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<UsersModel.User>> {
        let url = `${this.url}/users`;
        url = this.addQueryParam(url, 'status', status);
        url = this.addQueryParam(url, 'search', search);
        url = this.addQueryParam(url, 'twoFactor', twoFactor);
        return this.getList(url, limit, offset);
    }

    /**
     * @param userId user identifier
     */
    getUserInfo(userId: number): Promise<ResponseObject<UsersModel.User>> {
        const url = `${this.url}/users/${userId}`;
        return this.get(url, this.defaultConfig());
    }

    getAuthenticatedUser(): Promise<ResponseObject<UsersModel.User>> {
        const url = `${this.url}/user`;
        return this.get(url, this.defaultConfig());
    }

    /**
     *
     * @param projectId project identifier
     * @param search search users by firstName, lastName or username
     * @param role defines role type
     * @param languageId language identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     */
    listProjectMembers(
        projectId: number,
        search?: string,
        role?: UsersModel.Role,
        languageId?: string,
        limit?: number,
        offset?: number,
    ): Promise<ResponseList<UsersModel.ProjectMember>> {
        let url = `${this.url}/projects/${projectId}/members`;
        url = this.addQueryParam(url, 'search', search);
        url = this.addQueryParam(url, 'role', role);
        url = this.addQueryParam(url, 'languageId', languageId);
        return this.getList(url, limit, offset);
    }

    getMemberInfo(projectId: number, memberId: number): Promise<ResponseObject<UsersModel.ProjectMember>> {
        const url = `${this.url}/projects/${projectId}/members/${memberId}`;
        return this.get(url, this.defaultConfig());
    }
}

export namespace UsersModel {
    export interface User {
        id: number;
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        status: Status;
        avatarUrl: string;
        createdAt: string;
        lastSeen: string;
        twoFactor: string;
        isAdmin: boolean;
        timezone: string;
    }

    export enum Status {
        ACTIVE = 'active',
        PENDING = 'pending',
        BLOCKED = 'blocked',
    }

    export enum TwoFactor {
        ENABLED = 'enabled',
        DISABLED = 'disabled',
    }

    export interface ProjectMember {
        id: number;
        username: string;
        fullName: string;
        role: Role;
        permissions: any;
        avatarUrl: string;
        joinedAt: string;
        timezone: string;
    }

    export enum Role {
        ALL = 'all',
        MANAGER = 'manager',
        PROOFREADER = 'proofreader',
        TRANSLATOR = 'translator',
        BLOCKED = 'blocked',
    }
}
