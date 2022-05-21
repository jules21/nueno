import UserEntity from "@business-logic/User";
import { User } from "@prisma/client";

import prisma from "@helpers/prisma";

describe("#create", () => {
  let signupRequestParams: { name: string; email: string; password: string };
  let entity: UserEntity;
  beforeEach(async () => {
    signupRequestParams = {
      name: "Jules Fabien",
      email: "julesfabien96@gmail.com",
      password: "password",
    };
    entity = new UserEntity();
  });
  it("Should not create user when email is invalid", async () => {
    signupRequestParams.email = "false.email";
    await expect(async () => {
      await entity.create(signupRequestParams);
    }).rejects.toThrowError("Invalid email");
  });

  it("should not create user if password is invalid", async () => {
    signupRequestParams.password = "123";
    await expect(async () => {
      await entity.create(signupRequestParams);
    }).rejects.toThrowError("Invalid input - password should be at least 7 characters long.");
  });

  it("should not create user if email exists", async () => {
    await entity.create(signupRequestParams);
    await expect(async () => {
      await entity.create(signupRequestParams);
    }).rejects.toThrowError("Email address is already registered.");
  });

  it("create user", async () => {
    const result = await entity.create(signupRequestParams);
    expect(result.message).toBe("User created");
  });
});
