import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field(() => Int)
  userId: number;

  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;
}
