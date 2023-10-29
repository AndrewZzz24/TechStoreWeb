import { Inject, Injectable } from "@nestjs/common";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import { ConfigInjectionToken, AuthModuleConfig } from "../config.interface";
import Dashboard from "supertokens-node/recipe/dashboard";
import { UserService } from "../../user/user.service";
import { UserRole } from "@prisma/client";

@Injectable()
export class SupertokensService {
  constructor(
    @Inject(ConfigInjectionToken) private config: AuthModuleConfig,
    private readonly userService: UserService
  ) {
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: config.connectionURI,
        apiKey: config.apiKey
      },
      recipeList: [
        EmailPassword.init({
          signUpFeature: {
            formFields: [
              {
                id: "email"
              },
              {
                id: "username"
              },
              {
                id: "password"
              },
              {
                id: "surname"
              },
              {
                id: "name"
              },
            ]
          },
          override: {
            apis: (originalImplementation) => {
              return {
                ...originalImplementation,
                signUpPOST: async function(input) {
                  if (originalImplementation.signUpPOST === undefined) {
                    throw Error("Should never come here");
                  }

                  const response = await originalImplementation.signUpPOST(
                    input
                  );

                  if (response.status === "OK") {
                    // These are the input form fields values that the user used while signing up
                    const formFields = input.formFields;
                    const email = formFields.filter(
                      (obj) => obj.id === "email"
                    )[0];
                    const username = formFields.filter(
                      (obj) => obj.id === "username"
                    )[0];
                    const password = formFields.filter(
                      (obj) => obj.id === "password"
                    )[0];
                    const surname = formFields.filter(
                      (obj) => obj.id === "surname"
                    )[0];
                    const name = formFields.filter(
                      (obj) => obj.id === "name"
                    )[0];
                    const userEntity = await userService.createUser({
                        email: email.value.toLowerCase(),
                        username: username.value.toLowerCase(),
                        password: password.value,
                        surname: surname.value,
                        name: name.value
                      },
                      UserRole.CUSTOMER
                    );
                  }
                  return response;
                },
                signInPOST: async function(input) {
                  if (originalImplementation.signInPOST === undefined) {
                    throw Error("You can`t come here");
                  }

                  const response = await originalImplementation.signInPOST(
                    input
                  );

                  if (response.status === "OK") {
                    const { id, email } = response.user;

                    const formFields = input.formFields;
                    const currentUser: any = await userService.getSiteUserDataByEmail(email);
                  }
                  return response;
                }
              };
            }
          }
        }),
        Session.init({ getTokenTransferMethod: () => "cookie" }),
        Dashboard.init()
      ]
    });
  }
}
