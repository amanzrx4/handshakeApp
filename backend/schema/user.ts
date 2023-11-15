import { z } from "zod";
import { isValidHostname } from "../utils/helpers";
import { DOMAIN_CHECKER_SUFFIX } from "../utils/constants";

export const loginUserInput = z.object({
  username: z.string(),
  password: z.string(),
});

export const registerUserInput = z.object({
  username: z
    .string()
    .min(4)
    .max(20)
    .refine(
      u => {
        const regex = new RegExp("^[A-Za-z0-9]+$");

        return regex.test(u);
      },
      { message: "Username can only contain alphanumeric characters" }
    )
    .refine(
      u => {
        return isValidHostname(u + DOMAIN_CHECKER_SUFFIX);
      },
      {
        message: "Username is not valid",
      }
    ),

  password: z
    .string()
    //   .min(6)
    .max(20),
});
