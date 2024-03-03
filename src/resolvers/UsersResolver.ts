import { User } from "../entities/User";
import { Me, MutationResolvers, QueryResolvers } from "../generated/graphql";
import { AppDataSource } from "../config/database";
import { comparePassword, hashPassword } from "../helpers/Encrypt";
import { GraphQLError } from "graphql";

const userRepository = AppDataSource.getRepository(User);

export const queries: QueryResolvers = {
  me: async (_, __, context) => {
    try {
      if (context.currentUser) {
        return context.currentUser;
      } else {
        throw Error("User Not found");
      }
    } catch (error) {
      throw error;
    }
  },
  users: async (_, _input) => {
    return await userRepository.find();
  },
};

export const mutations: MutationResolvers = {
  login: async (_, { input }) => {
    try {
      const user = await userRepository.findOneByOrFail({ email: input.email });
      if (comparePassword(input.password, user.password)) {
        return user.authToken;
      } else {
        throw new GraphQLError("Mot de passe incorrect", {
          extensions: {
            validation: {
              password: ["Mot de passe incorrect"],
            },
          },
        });
      }
    } catch (error) {
      throw error;
    }
  },
  createUser: async (_, { input }) => {
    const user = new User();
    user.email = input.email;
    user.password = hashPassword(input.password);
    await userRepository.save(user);
    return user;
  },
  updateUser: async (_, { input }, context) => {
    try {
      const user = await userRepository.findOneByOrFail({
        id: context.currentUser?.id,
      });
      if (input.email) {
        const emailExist = await userRepository.findOneBy({
          email: input.email,
        });
        if (!emailExist) {
          user.email = input.email;
        } else {
          console.log("email already exist");
        }
      }
      await userRepository.save(user);
      return user;
    } catch (error) {
      throw error;
    }
  },
  updatePassword: async (_, { input }, context) => {
    try {
      const user = await userRepository.findOneByOrFail({
        id: context.currentUser?.id,
      });
      if (comparePassword(input.password, user.password)) {
        user.password = hashPassword(input.newPassword);
        await userRepository.save(user);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  },
  delUser: async (_, _input, context) => {
    try {
      const isDelete = await userRepository.delete({
        id: context.currentUser?.id,
      });
      if (isDelete) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  },
};
