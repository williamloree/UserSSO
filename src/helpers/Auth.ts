import { User } from "../entities/User";
import AppDataSource from "../config/database";

const userRepository = AppDataSource.getRepository(User);

export const getUserFromBearer = async (authToken: string) => {
  try {
    if (!authToken) {
      throw "empty AuthToken";
    }

    const user = await userRepository.findOneOrFail({
      where: { authToken: authToken },
    });

    return user;
  } catch (error) {
    return null;
  }
};

// export const checkIsAdmin = async (userId: number) => {
//   const crtUser = await User.findOneByOrFail({ id: userId });
//   return crtUser.role.label === TRole.Admin;
// };

// export async function currentUserPolicies(user: User): Promise<Policy[]> {
//   const policiesReturn = [] as Policy[];

//   const policyAbilities = [{ entity: "UserPolicy", abilities: ["create"] }];

//   for (const policy of policyAbilities) {
//     for (const ability of policy.abilities) {
//       let can = true;
//       try {
//         can = await policies[policy.entity][ability](user);
//       } catch (e) {
//         can = false;
//       }

//       policiesReturn.push({
//         entity: policy.entity
//           .substring(0, policy.entity.indexOf("Policy"))
//           .toLowerCase(),
//         ability,
//         can,
//       });
//     }
//   }
//   return policiesReturn;
// }

// export const can = async (
//   user: User,
//   ability: string,
//   entity: string | {},
//   options?: { [key: string]: any }
// ): Promise<boolean> => {
//   let can;
//   let entityFile = "";

//   try {
//     if (typeof entity === "string") {
//       entityFile = capitalizeFirstLetter(entity);

//       if (options && Object.keys(options).length) {
//         can = await policies[`${entityFile}Policy`][ability](user, options);
//       } else {
//         can = await policies[`${entityFile}Policy`][ability](user);
//       }
//     } else {
//       entityFile = entity.constructor.name;

//       if (options && Object.keys(options).length) {
//         can = await policies[`${entityFile}Policy`][ability](
//           user,
//           entity,
//           options
//         );
//       } else {
//         can = await policies[`${entityFile}Policy`][ability](user, entity);
//       }
//     }
//   } catch (error) {
//     can = false;
//   }
//   return can;
// };

// export const createToken = (user: User, refresh: boolean) => {
//   const token = new Token();
//   token.userId = user.id;
//   token.token = randomToken();
//   let tokenExpireDate = new Date();
//   tokenExpireDate.setDate(tokenExpireDate.getDate() + 1);
//   token.tokenRevokedAt = tokenExpireDate;
//   if (refresh) {
//     token.refreshToken = randomToken();
//     let refreshExpireDate = new Date();
//     refreshExpireDate.setDate(refreshExpireDate.getDate() + 7);
//     token.refreshRevokedAt = refreshExpireDate;
//   }
//   return token;
// };

// export const refreshAToken = (token: Token) => {
//   token.token = randomToken();
//   let tokenExpireDate = new Date();
//   tokenExpireDate.setDate(tokenExpireDate.getDate() + 1);
//   token.tokenRevokedAt = tokenExpireDate;
//   let refreshExpireDate = new Date();
//   refreshExpireDate.setDate(refreshExpireDate.getDate() + 7);
//   token.refreshRevokedAt = refreshExpireDate;
//   return token;
// };
