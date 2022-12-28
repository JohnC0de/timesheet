import { TRPCError } from "@trpc/server"
import { hash } from "argon2"
import { z } from "zod"

import { router, publicProcedure } from "../trpc"

export const userRouter = router({
  register: publicProcedure
    .input(z.object({ name: z.string(), email: z.string(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { email: input.email }
      })

      if (user) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Email already exists"
        })
      }
      const createdUser = ctx.prisma.user.create({
        data: {
          ...input,
          password: await hash(input.password)
        }
      })
      return createdUser
    })
})
