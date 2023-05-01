import { Inject, Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import EmailPassword from 'supertokens-node/recipe/emailpassword';

import { ConfigInjectionToken, AuthModuleConfig } from '../config.interface';
import Dashboard from 'supertokens-node/recipe/dashboard';
import { UserService } from '../../user/user.service';
import { UserRoleService } from '../../user/user-role.service';
import UserRoles from 'supertokens-node/recipe/userroles';
import { RoleService } from '../../user/roles.service';

async function createRole(role = 'USER') {
  /**
   * You can choose to give multiple or no permissions when creating a role
   * createNewRoleOrAddPermissions("user", []) - No permissions
   * createNewRoleOrAddPermissions("user", ["read", "write"]) - Multiple permissions
   */
  const response = await UserRoles.createNewRoleOrAddPermissions(role, [
    'read',
    'write',
  ]);

  if (response.createdNewRole === false) {
    // The role already exists
  }
}
async function addRoleToUser(userId: string, role = 'USER') {
  const response = await UserRoles.addRoleToUser(userId, role);
  console.log('ROLE ADDED', response);
  if (response.status === 'UNKNOWN_ROLE_ERROR') {
    await createRole(role);
    await addRoleToUser(userId, role);
    return;
  }

  if (response.didUserAlreadyHaveRole === true) {
    // The user already had the role
    return;
  }
}

@Injectable()
export class SupertokensService {
  constructor(
    @Inject(ConfigInjectionToken) private config: AuthModuleConfig,
    private readonly userService: UserService,
    private readonly userRoleService: UserRoleService,
    private readonly roleService: RoleService,
  ) {
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: config.connectionURI,
        apiKey: config.apiKey,
      },
      recipeList: [
        EmailPassword.init({
          signUpFeature: {
            formFields: [
              {
                id: 'email',
              },
              {
                id: 'login',
              },
              {
                id: 'password',
              },
            ],
          },
          override: {
            apis: (originalImplementation) => {
              return {
                ...originalImplementation,
                signUpPOST: async function (input) {
                  if (originalImplementation.signUpPOST === undefined) {
                    throw Error('Should never come here');
                  }
                  await createRole();

                  // First we call the original implementation of signUpPOST.
                  const response = await originalImplementation.signUpPOST(
                    input,
                  );

                  // Post sign up response, we check if it was successful
                  if (response.status === 'OK') {
                    // These are the input form fields values that the user used while signing up
                    const formFields = input.formFields;
                    const email = formFields.filter(
                      (obj) => obj.id === 'email',
                    )[0];
                    const login = formFields.filter(
                      (obj) => obj.id === 'login',
                    )[0];
                    const password = formFields.filter(
                      (obj) => obj.id === 'password',
                    )[0];
                    const userEntity = await userService.createUser({
                      active: true,
                      email: email.value,
                      login: login.value,
                      password: password.value,
                    });
                    await userRoleService.createUserRole({
                      user: {
                        connect: {
                          id: userEntity.id,
                        },
                      },
                      role: {
                        connect: {
                          system_name: 'USER',
                        },
                      },
                    });
                    await addRoleToUser(response.user.id);
                  }
                  return response;
                },
                signInPOST: async function (input) {
                  if (originalImplementation.signInPOST === undefined) {
                    throw Error('Should never come here');
                  }

                  // First we call the original implementation of signInPOST.
                  const response = await originalImplementation.signInPOST(
                    input,
                  );

                  // Post sign up response, we check if it was successful
                  if (response.status === 'OK') {
                    const { id, email } = response.user;

                    // These are the input form fields values that the user used while signing in
                    const formFields = input.formFields;
                    // TODO: post sign in logic
                    const currentUser: any = await userService.user({
                      email: email,
                    });
                    if (
                      currentUser.userRoles.some(
                        (role) => role.role.system_name == 'ADMIN',
                      )
                    ) {
                      await addRoleToUser(id, 'ADMIN');
                    }
                  }
                  return response;
                },
              };
            },
          },
        }),
        Session.init({ getTokenTransferMethod: () => 'cookie' }),
        Dashboard.init(),
        UserRoles.init(),
      ],
    });
  }
}
