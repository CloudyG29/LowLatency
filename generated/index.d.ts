
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model ApplicantProfile
 * 
 */
export type ApplicantProfile = $Result.DefaultSelection<Prisma.$ApplicantProfilePayload>
/**
 * Model Provider
 * 
 */
export type Provider = $Result.DefaultSelection<Prisma.$ProviderPayload>
/**
 * Model Listing
 * 
 */
export type Listing = $Result.DefaultSelection<Prisma.$ListingPayload>
/**
 * Model Application
 * 
 */
export type Application = $Result.DefaultSelection<Prisma.$ApplicationPayload>
/**
 * Model Skill
 * 
 */
export type Skill = $Result.DefaultSelection<Prisma.$SkillPayload>
/**
 * Model ApplicantSkill
 * 
 */
export type ApplicantSkill = $Result.DefaultSelection<Prisma.$ApplicantSkillPayload>
/**
 * Model Qualification
 * 
 */
export type Qualification = $Result.DefaultSelection<Prisma.$QualificationPayload>
/**
 * Model ApplicantQualification
 * 
 */
export type ApplicantQualification = $Result.DefaultSelection<Prisma.$ApplicantQualificationPayload>
/**
 * Model Report
 * 
 */
export type Report = $Result.DefaultSelection<Prisma.$ReportPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.applicantProfile`: Exposes CRUD operations for the **ApplicantProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ApplicantProfiles
    * const applicantProfiles = await prisma.applicantProfile.findMany()
    * ```
    */
  get applicantProfile(): Prisma.ApplicantProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.provider`: Exposes CRUD operations for the **Provider** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Providers
    * const providers = await prisma.provider.findMany()
    * ```
    */
  get provider(): Prisma.ProviderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.listing`: Exposes CRUD operations for the **Listing** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Listings
    * const listings = await prisma.listing.findMany()
    * ```
    */
  get listing(): Prisma.ListingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.application`: Exposes CRUD operations for the **Application** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Applications
    * const applications = await prisma.application.findMany()
    * ```
    */
  get application(): Prisma.ApplicationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.skill`: Exposes CRUD operations for the **Skill** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Skills
    * const skills = await prisma.skill.findMany()
    * ```
    */
  get skill(): Prisma.SkillDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.applicantSkill`: Exposes CRUD operations for the **ApplicantSkill** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ApplicantSkills
    * const applicantSkills = await prisma.applicantSkill.findMany()
    * ```
    */
  get applicantSkill(): Prisma.ApplicantSkillDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.qualification`: Exposes CRUD operations for the **Qualification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Qualifications
    * const qualifications = await prisma.qualification.findMany()
    * ```
    */
  get qualification(): Prisma.QualificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.applicantQualification`: Exposes CRUD operations for the **ApplicantQualification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ApplicantQualifications
    * const applicantQualifications = await prisma.applicantQualification.findMany()
    * ```
    */
  get applicantQualification(): Prisma.ApplicantQualificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.report`: Exposes CRUD operations for the **Report** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reports
    * const reports = await prisma.report.findMany()
    * ```
    */
  get report(): Prisma.ReportDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    ApplicantProfile: 'ApplicantProfile',
    Provider: 'Provider',
    Listing: 'Listing',
    Application: 'Application',
    Skill: 'Skill',
    ApplicantSkill: 'ApplicantSkill',
    Qualification: 'Qualification',
    ApplicantQualification: 'ApplicantQualification',
    Report: 'Report'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "applicantProfile" | "provider" | "listing" | "application" | "skill" | "applicantSkill" | "qualification" | "applicantQualification" | "report"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      ApplicantProfile: {
        payload: Prisma.$ApplicantProfilePayload<ExtArgs>
        fields: Prisma.ApplicantProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApplicantProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicantProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApplicantProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicantProfilePayload>
          }
          findFirst: {
            args: Prisma.ApplicantProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicantProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApplicantProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicantProfilePayload>
          }
          findMany: {
            args: Prisma.ApplicantProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicantProfilePayload>[]
          }
          create: {
            args: Prisma.ApplicantProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicantProfilePayload>
          }
          createMany: {
            args: Prisma.ApplicantProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ApplicantProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicantProfilePayload>
          }
          update: {
            args: Prisma.ApplicantProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicantProfilePayload>
          }
          deleteMany: {
            args: Prisma.ApplicantProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApplicantProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ApplicantProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicantProfilePayload>
          }
          aggregate: {
            args: Prisma.ApplicantProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApplicantProfile>
          }
          groupBy: {
            args: Prisma.ApplicantProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApplicantProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApplicantProfileCountArgs<ExtArgs>
            result: $Utils.Optional<ApplicantProfileCountAggregateOutputType> | number
          }
        }
      }
      Provider: {
        payload: Prisma.$ProviderPayload<ExtArgs>
        fields: Prisma.ProviderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProviderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProviderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>
          }
          findFirst: {
            args: Prisma.ProviderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProviderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>
          }
          findMany: {
            args: Prisma.ProviderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>[]
          }
          create: {
            args: Prisma.ProviderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>
          }
          createMany: {
            args: Prisma.ProviderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProviderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>
          }
          update: {
            args: Prisma.ProviderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>
          }
          deleteMany: {
            args: Prisma.ProviderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProviderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProviderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>
          }
          aggregate: {
            args: Prisma.ProviderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProvider>
          }
          groupBy: {
            args: Prisma.ProviderGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProviderGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProviderCountArgs<ExtArgs>
            result: $Utils.Optional<ProviderCountAggregateOutputType> | number
          }
        }
      }
      Listing: {
        payload: Prisma.$ListingPayload<ExtArgs>
        fields: Prisma.ListingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ListingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ListingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          findFirst: {
            args: Prisma.ListingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ListingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          findMany: {
            args: Prisma.ListingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>[]
          }
          create: {
            args: Prisma.ListingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          createMany: {
            args: Prisma.ListingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ListingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          update: {
            args: Prisma.ListingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          deleteMany: {
            args: Prisma.ListingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ListingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ListingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          aggregate: {
            args: Prisma.ListingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateListing>
          }
          groupBy: {
            args: Prisma.ListingGroupByArgs<ExtArgs>
            result: $Utils.Optional<ListingGroupByOutputType>[]
          }
          count: {
            args: Prisma.ListingCountArgs<ExtArgs>
            result: $Utils.Optional<ListingCountAggregateOutputType> | number
          }
        }
      }
      Application: {
        payload: Prisma.$ApplicationPayload<ExtArgs>
        fields: Prisma.ApplicationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApplicationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApplicationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          findFirst: {
            args: Prisma.ApplicationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApplicationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          findMany: {
            args: Prisma.ApplicationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>[]
          }
          create: {
            args: Prisma.ApplicationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          createMany: {
            args: Prisma.ApplicationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ApplicationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          update: {
            args: Prisma.ApplicationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          deleteMany: {
            args: Prisma.ApplicationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApplicationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ApplicationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          aggregate: {
            args: Prisma.ApplicationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApplication>
          }
          groupBy: {
            args: Prisma.ApplicationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApplicationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApplicationCountArgs<ExtArgs>
            result: $Utils.Optional<ApplicationCountAggregateOutputType> | number
          }
        }
      }
      Skill: {
        payload: Prisma.$SkillPayload<ExtArgs>
        fields: Prisma.SkillFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SkillFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SkillFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>
          }
          findFirst: {
            args: Prisma.SkillFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SkillFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>
          }
          findMany: {
            args: Prisma.SkillFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>[]
          }
          create: {
            args: Prisma.SkillCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>
          }
          createMany: {
            args: Prisma.SkillCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SkillDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>
          }
          update: {
            args: Prisma.SkillUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>
          }
          deleteMany: {
            args: Prisma.SkillDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SkillUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SkillUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>
          }
          aggregate: {
            args: Prisma.SkillAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSkill>
          }
          groupBy: {
            args: Prisma.SkillGroupByArgs<ExtArgs>
            result: $Utils.Optional<SkillGroupByOutputType>[]
          }
          count: {
            args: Prisma.SkillCountArgs<ExtArgs>
            result: $Utils.Optional<SkillCountAggregateOutputType> | number
          }
        }
      }
      ApplicantSkill: {
        payload: Prisma.$ApplicantSkillPayload<ExtArgs>
        fields: Prisma.ApplicantSkillFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApplicantSkillFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicantSkillPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApplicantSkillFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicantSkillPayload>
          }
          findFirst: {
            args: Prisma.ApplicantSkillFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicantSkillPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApplicantSkillFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicantSkillPayload>
          }
          findMany: {
            args: Prisma.ApplicantSkillFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicantSkillPayload>[]
          }
          create: {
            args: Prisma.ApplicantSkillCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicantSkillPayload>
          }
          createMany: {
            args: Prisma.ApplicantSkillCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ApplicantSkillDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicantSkillPayload>
          }
          update: {
            args: Prisma.ApplicantSkillUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicantSkillPayload>
          }
          deleteMany: {
            args: Prisma.ApplicantSkillDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApplicantSkillUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ApplicantSkillUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicantSkillPayload>
          }
          aggregate: {
            args: Prisma.ApplicantSkillAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApplicantSkill>
          }
          groupBy: {
            args: Prisma.ApplicantSkillGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApplicantSkillGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApplicantSkillCountArgs<ExtArgs>
            result: $Utils.Optional<ApplicantSkillCountAggregateOutputType> | number
          }
        }
      }
      Qualification: {
        payload: Prisma.$QualificationPayload<ExtArgs>
        fields: Prisma.QualificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QualificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QualificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QualificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QualificationPayload>
          }
          findFirst: {
            args: Prisma.QualificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QualificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QualificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QualificationPayload>
          }
          findMany: {
            args: Prisma.QualificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QualificationPayload>[]
          }
          create: {
            args: Prisma.QualificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QualificationPayload>
          }
          createMany: {
            args: Prisma.QualificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.QualificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QualificationPayload>
          }
          update: {
            args: Prisma.QualificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QualificationPayload>
          }
          deleteMany: {
            args: Prisma.QualificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QualificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.QualificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QualificationPayload>
          }
          aggregate: {
            args: Prisma.QualificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQualification>
          }
          groupBy: {
            args: Prisma.QualificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<QualificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.QualificationCountArgs<ExtArgs>
            result: $Utils.Optional<QualificationCountAggregateOutputType> | number
          }
        }
      }
      ApplicantQualification: {
        payload: Prisma.$ApplicantQualificationPayload<ExtArgs>
        fields: Prisma.ApplicantQualificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApplicantQualificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicantQualificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApplicantQualificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicantQualificationPayload>
          }
          findFirst: {
            args: Prisma.ApplicantQualificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicantQualificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApplicantQualificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicantQualificationPayload>
          }
          findMany: {
            args: Prisma.ApplicantQualificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicantQualificationPayload>[]
          }
          create: {
            args: Prisma.ApplicantQualificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicantQualificationPayload>
          }
          createMany: {
            args: Prisma.ApplicantQualificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ApplicantQualificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicantQualificationPayload>
          }
          update: {
            args: Prisma.ApplicantQualificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicantQualificationPayload>
          }
          deleteMany: {
            args: Prisma.ApplicantQualificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApplicantQualificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ApplicantQualificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicantQualificationPayload>
          }
          aggregate: {
            args: Prisma.ApplicantQualificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApplicantQualification>
          }
          groupBy: {
            args: Prisma.ApplicantQualificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApplicantQualificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApplicantQualificationCountArgs<ExtArgs>
            result: $Utils.Optional<ApplicantQualificationCountAggregateOutputType> | number
          }
        }
      }
      Report: {
        payload: Prisma.$ReportPayload<ExtArgs>
        fields: Prisma.ReportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          findFirst: {
            args: Prisma.ReportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          findMany: {
            args: Prisma.ReportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          create: {
            args: Prisma.ReportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          createMany: {
            args: Prisma.ReportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ReportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          update: {
            args: Prisma.ReportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          deleteMany: {
            args: Prisma.ReportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ReportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          aggregate: {
            args: Prisma.ReportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReport>
          }
          groupBy: {
            args: Prisma.ReportGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReportCountArgs<ExtArgs>
            result: $Utils.Optional<ReportCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    applicantProfile?: ApplicantProfileOmit
    provider?: ProviderOmit
    listing?: ListingOmit
    application?: ApplicationOmit
    skill?: SkillOmit
    applicantSkill?: ApplicantSkillOmit
    qualification?: QualificationOmit
    applicantQualification?: ApplicantQualificationOmit
    report?: ReportOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    applications: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | UserCountOutputTypeCountApplicationsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicationWhereInput
  }


  /**
   * Count Type ApplicantProfileCountOutputType
   */

  export type ApplicantProfileCountOutputType = {
    qualifications: number
    skills: number
  }

  export type ApplicantProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    qualifications?: boolean | ApplicantProfileCountOutputTypeCountQualificationsArgs
    skills?: boolean | ApplicantProfileCountOutputTypeCountSkillsArgs
  }

  // Custom InputTypes
  /**
   * ApplicantProfileCountOutputType without action
   */
  export type ApplicantProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicantProfileCountOutputType
     */
    select?: ApplicantProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ApplicantProfileCountOutputType without action
   */
  export type ApplicantProfileCountOutputTypeCountQualificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicantQualificationWhereInput
  }

  /**
   * ApplicantProfileCountOutputType without action
   */
  export type ApplicantProfileCountOutputTypeCountSkillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicantSkillWhereInput
  }


  /**
   * Count Type ProviderCountOutputType
   */

  export type ProviderCountOutputType = {
    applications: number
    listings: number
  }

  export type ProviderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | ProviderCountOutputTypeCountApplicationsArgs
    listings?: boolean | ProviderCountOutputTypeCountListingsArgs
  }

  // Custom InputTypes
  /**
   * ProviderCountOutputType without action
   */
  export type ProviderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderCountOutputType
     */
    select?: ProviderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProviderCountOutputType without action
   */
  export type ProviderCountOutputTypeCountApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicationWhereInput
  }

  /**
   * ProviderCountOutputType without action
   */
  export type ProviderCountOutputTypeCountListingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListingWhereInput
  }


  /**
   * Count Type ListingCountOutputType
   */

  export type ListingCountOutputType = {
    applications: number
    Report: number
  }

  export type ListingCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | ListingCountOutputTypeCountApplicationsArgs
    Report?: boolean | ListingCountOutputTypeCountReportArgs
  }

  // Custom InputTypes
  /**
   * ListingCountOutputType without action
   */
  export type ListingCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingCountOutputType
     */
    select?: ListingCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ListingCountOutputType without action
   */
  export type ListingCountOutputTypeCountApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicationWhereInput
  }

  /**
   * ListingCountOutputType without action
   */
  export type ListingCountOutputTypeCountReportArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
  }


  /**
   * Count Type SkillCountOutputType
   */

  export type SkillCountOutputType = {
    applicantSkills: number
  }

  export type SkillCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applicantSkills?: boolean | SkillCountOutputTypeCountApplicantSkillsArgs
  }

  // Custom InputTypes
  /**
   * SkillCountOutputType without action
   */
  export type SkillCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillCountOutputType
     */
    select?: SkillCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SkillCountOutputType without action
   */
  export type SkillCountOutputTypeCountApplicantSkillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicantSkillWhereInput
  }


  /**
   * Count Type QualificationCountOutputType
   */

  export type QualificationCountOutputType = {
    applicantQualifications: number
  }

  export type QualificationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applicantQualifications?: boolean | QualificationCountOutputTypeCountApplicantQualificationsArgs
  }

  // Custom InputTypes
  /**
   * QualificationCountOutputType without action
   */
  export type QualificationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QualificationCountOutputType
     */
    select?: QualificationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * QualificationCountOutputType without action
   */
  export type QualificationCountOutputTypeCountApplicantQualificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicantQualificationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    user_id: number | null
  }

  export type UserSumAggregateOutputType = {
    user_id: number | null
  }

  export type UserMinAggregateOutputType = {
    user_id: number | null
    name: string | null
    surname: string | null
    role: string | null
    email: string | null
    firebase_uid: string | null
  }

  export type UserMaxAggregateOutputType = {
    user_id: number | null
    name: string | null
    surname: string | null
    role: string | null
    email: string | null
    firebase_uid: string | null
  }

  export type UserCountAggregateOutputType = {
    user_id: number
    name: number
    surname: number
    role: number
    email: number
    firebase_uid: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    user_id?: true
  }

  export type UserSumAggregateInputType = {
    user_id?: true
  }

  export type UserMinAggregateInputType = {
    user_id?: true
    name?: true
    surname?: true
    role?: true
    email?: true
    firebase_uid?: true
  }

  export type UserMaxAggregateInputType = {
    user_id?: true
    name?: true
    surname?: true
    role?: true
    email?: true
    firebase_uid?: true
  }

  export type UserCountAggregateInputType = {
    user_id?: true
    name?: true
    surname?: true
    role?: true
    email?: true
    firebase_uid?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    user_id: number
    name: string
    surname: string
    role: string
    email: string
    firebase_uid: string
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    name?: boolean
    surname?: boolean
    role?: boolean
    email?: boolean
    firebase_uid?: boolean
    applicant?: boolean | User$applicantArgs<ExtArgs>
    applications?: boolean | User$applicationsArgs<ExtArgs>
    provider?: boolean | User$providerArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    user_id?: boolean
    name?: boolean
    surname?: boolean
    role?: boolean
    email?: boolean
    firebase_uid?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"user_id" | "name" | "surname" | "role" | "email" | "firebase_uid", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applicant?: boolean | User$applicantArgs<ExtArgs>
    applications?: boolean | User$applicationsArgs<ExtArgs>
    provider?: boolean | User$providerArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      applicant: Prisma.$ApplicantProfilePayload<ExtArgs> | null
      applications: Prisma.$ApplicationPayload<ExtArgs>[]
      provider: Prisma.$ProviderPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      user_id: number
      name: string
      surname: string
      role: string
      email: string
      firebase_uid: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `user_id`
     * const userWithUser_idOnly = await prisma.user.findMany({ select: { user_id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    applicant<T extends User$applicantArgs<ExtArgs> = {}>(args?: Subset<T, User$applicantArgs<ExtArgs>>): Prisma__ApplicantProfileClient<$Result.GetResult<Prisma.$ApplicantProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    applications<T extends User$applicationsArgs<ExtArgs> = {}>(args?: Subset<T, User$applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    provider<T extends User$providerArgs<ExtArgs> = {}>(args?: Subset<T, User$providerArgs<ExtArgs>>): Prisma__ProviderClient<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly user_id: FieldRef<"User", 'Int'>
    readonly name: FieldRef<"User", 'String'>
    readonly surname: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly firebase_uid: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.applicant
   */
  export type User$applicantArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicantProfile
     */
    select?: ApplicantProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicantProfile
     */
    omit?: ApplicantProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicantProfileInclude<ExtArgs> | null
    where?: ApplicantProfileWhereInput
  }

  /**
   * User.applications
   */
  export type User$applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    where?: ApplicationWhereInput
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    cursor?: ApplicationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[]
  }

  /**
   * User.provider
   */
  export type User$providerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Provider
     */
    omit?: ProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderInclude<ExtArgs> | null
    where?: ProviderWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model ApplicantProfile
   */

  export type AggregateApplicantProfile = {
    _count: ApplicantProfileCountAggregateOutputType | null
    _avg: ApplicantProfileAvgAggregateOutputType | null
    _sum: ApplicantProfileSumAggregateOutputType | null
    _min: ApplicantProfileMinAggregateOutputType | null
    _max: ApplicantProfileMaxAggregateOutputType | null
  }

  export type ApplicantProfileAvgAggregateOutputType = {
    applicant_id: number | null
    user_id: number | null
  }

  export type ApplicantProfileSumAggregateOutputType = {
    applicant_id: number | null
    user_id: number | null
  }

  export type ApplicantProfileMinAggregateOutputType = {
    applicant_id: number | null
    user_id: number | null
    phone: string | null
    dob: Date | null
    bio: string | null
  }

  export type ApplicantProfileMaxAggregateOutputType = {
    applicant_id: number | null
    user_id: number | null
    phone: string | null
    dob: Date | null
    bio: string | null
  }

  export type ApplicantProfileCountAggregateOutputType = {
    applicant_id: number
    user_id: number
    phone: number
    dob: number
    bio: number
    _all: number
  }


  export type ApplicantProfileAvgAggregateInputType = {
    applicant_id?: true
    user_id?: true
  }

  export type ApplicantProfileSumAggregateInputType = {
    applicant_id?: true
    user_id?: true
  }

  export type ApplicantProfileMinAggregateInputType = {
    applicant_id?: true
    user_id?: true
    phone?: true
    dob?: true
    bio?: true
  }

  export type ApplicantProfileMaxAggregateInputType = {
    applicant_id?: true
    user_id?: true
    phone?: true
    dob?: true
    bio?: true
  }

  export type ApplicantProfileCountAggregateInputType = {
    applicant_id?: true
    user_id?: true
    phone?: true
    dob?: true
    bio?: true
    _all?: true
  }

  export type ApplicantProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApplicantProfile to aggregate.
     */
    where?: ApplicantProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApplicantProfiles to fetch.
     */
    orderBy?: ApplicantProfileOrderByWithRelationInput | ApplicantProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApplicantProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApplicantProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApplicantProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ApplicantProfiles
    **/
    _count?: true | ApplicantProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ApplicantProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ApplicantProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApplicantProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApplicantProfileMaxAggregateInputType
  }

  export type GetApplicantProfileAggregateType<T extends ApplicantProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateApplicantProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApplicantProfile[P]>
      : GetScalarType<T[P], AggregateApplicantProfile[P]>
  }




  export type ApplicantProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicantProfileWhereInput
    orderBy?: ApplicantProfileOrderByWithAggregationInput | ApplicantProfileOrderByWithAggregationInput[]
    by: ApplicantProfileScalarFieldEnum[] | ApplicantProfileScalarFieldEnum
    having?: ApplicantProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApplicantProfileCountAggregateInputType | true
    _avg?: ApplicantProfileAvgAggregateInputType
    _sum?: ApplicantProfileSumAggregateInputType
    _min?: ApplicantProfileMinAggregateInputType
    _max?: ApplicantProfileMaxAggregateInputType
  }

  export type ApplicantProfileGroupByOutputType = {
    applicant_id: number
    user_id: number
    phone: string | null
    dob: Date | null
    bio: string | null
    _count: ApplicantProfileCountAggregateOutputType | null
    _avg: ApplicantProfileAvgAggregateOutputType | null
    _sum: ApplicantProfileSumAggregateOutputType | null
    _min: ApplicantProfileMinAggregateOutputType | null
    _max: ApplicantProfileMaxAggregateOutputType | null
  }

  type GetApplicantProfileGroupByPayload<T extends ApplicantProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApplicantProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApplicantProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApplicantProfileGroupByOutputType[P]>
            : GetScalarType<T[P], ApplicantProfileGroupByOutputType[P]>
        }
      >
    >


  export type ApplicantProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    applicant_id?: boolean
    user_id?: boolean
    phone?: boolean
    dob?: boolean
    bio?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    qualifications?: boolean | ApplicantProfile$qualificationsArgs<ExtArgs>
    skills?: boolean | ApplicantProfile$skillsArgs<ExtArgs>
    _count?: boolean | ApplicantProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["applicantProfile"]>



  export type ApplicantProfileSelectScalar = {
    applicant_id?: boolean
    user_id?: boolean
    phone?: boolean
    dob?: boolean
    bio?: boolean
  }

  export type ApplicantProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"applicant_id" | "user_id" | "phone" | "dob" | "bio", ExtArgs["result"]["applicantProfile"]>
  export type ApplicantProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    qualifications?: boolean | ApplicantProfile$qualificationsArgs<ExtArgs>
    skills?: boolean | ApplicantProfile$skillsArgs<ExtArgs>
    _count?: boolean | ApplicantProfileCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ApplicantProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ApplicantProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      qualifications: Prisma.$ApplicantQualificationPayload<ExtArgs>[]
      skills: Prisma.$ApplicantSkillPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      applicant_id: number
      user_id: number
      phone: string | null
      dob: Date | null
      bio: string | null
    }, ExtArgs["result"]["applicantProfile"]>
    composites: {}
  }

  type ApplicantProfileGetPayload<S extends boolean | null | undefined | ApplicantProfileDefaultArgs> = $Result.GetResult<Prisma.$ApplicantProfilePayload, S>

  type ApplicantProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ApplicantProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ApplicantProfileCountAggregateInputType | true
    }

  export interface ApplicantProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ApplicantProfile'], meta: { name: 'ApplicantProfile' } }
    /**
     * Find zero or one ApplicantProfile that matches the filter.
     * @param {ApplicantProfileFindUniqueArgs} args - Arguments to find a ApplicantProfile
     * @example
     * // Get one ApplicantProfile
     * const applicantProfile = await prisma.applicantProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApplicantProfileFindUniqueArgs>(args: SelectSubset<T, ApplicantProfileFindUniqueArgs<ExtArgs>>): Prisma__ApplicantProfileClient<$Result.GetResult<Prisma.$ApplicantProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ApplicantProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ApplicantProfileFindUniqueOrThrowArgs} args - Arguments to find a ApplicantProfile
     * @example
     * // Get one ApplicantProfile
     * const applicantProfile = await prisma.applicantProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApplicantProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, ApplicantProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApplicantProfileClient<$Result.GetResult<Prisma.$ApplicantProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApplicantProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicantProfileFindFirstArgs} args - Arguments to find a ApplicantProfile
     * @example
     * // Get one ApplicantProfile
     * const applicantProfile = await prisma.applicantProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApplicantProfileFindFirstArgs>(args?: SelectSubset<T, ApplicantProfileFindFirstArgs<ExtArgs>>): Prisma__ApplicantProfileClient<$Result.GetResult<Prisma.$ApplicantProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApplicantProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicantProfileFindFirstOrThrowArgs} args - Arguments to find a ApplicantProfile
     * @example
     * // Get one ApplicantProfile
     * const applicantProfile = await prisma.applicantProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApplicantProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, ApplicantProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApplicantProfileClient<$Result.GetResult<Prisma.$ApplicantProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ApplicantProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicantProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ApplicantProfiles
     * const applicantProfiles = await prisma.applicantProfile.findMany()
     * 
     * // Get first 10 ApplicantProfiles
     * const applicantProfiles = await prisma.applicantProfile.findMany({ take: 10 })
     * 
     * // Only select the `applicant_id`
     * const applicantProfileWithApplicant_idOnly = await prisma.applicantProfile.findMany({ select: { applicant_id: true } })
     * 
     */
    findMany<T extends ApplicantProfileFindManyArgs>(args?: SelectSubset<T, ApplicantProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicantProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ApplicantProfile.
     * @param {ApplicantProfileCreateArgs} args - Arguments to create a ApplicantProfile.
     * @example
     * // Create one ApplicantProfile
     * const ApplicantProfile = await prisma.applicantProfile.create({
     *   data: {
     *     // ... data to create a ApplicantProfile
     *   }
     * })
     * 
     */
    create<T extends ApplicantProfileCreateArgs>(args: SelectSubset<T, ApplicantProfileCreateArgs<ExtArgs>>): Prisma__ApplicantProfileClient<$Result.GetResult<Prisma.$ApplicantProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ApplicantProfiles.
     * @param {ApplicantProfileCreateManyArgs} args - Arguments to create many ApplicantProfiles.
     * @example
     * // Create many ApplicantProfiles
     * const applicantProfile = await prisma.applicantProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApplicantProfileCreateManyArgs>(args?: SelectSubset<T, ApplicantProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ApplicantProfile.
     * @param {ApplicantProfileDeleteArgs} args - Arguments to delete one ApplicantProfile.
     * @example
     * // Delete one ApplicantProfile
     * const ApplicantProfile = await prisma.applicantProfile.delete({
     *   where: {
     *     // ... filter to delete one ApplicantProfile
     *   }
     * })
     * 
     */
    delete<T extends ApplicantProfileDeleteArgs>(args: SelectSubset<T, ApplicantProfileDeleteArgs<ExtArgs>>): Prisma__ApplicantProfileClient<$Result.GetResult<Prisma.$ApplicantProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ApplicantProfile.
     * @param {ApplicantProfileUpdateArgs} args - Arguments to update one ApplicantProfile.
     * @example
     * // Update one ApplicantProfile
     * const applicantProfile = await prisma.applicantProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApplicantProfileUpdateArgs>(args: SelectSubset<T, ApplicantProfileUpdateArgs<ExtArgs>>): Prisma__ApplicantProfileClient<$Result.GetResult<Prisma.$ApplicantProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ApplicantProfiles.
     * @param {ApplicantProfileDeleteManyArgs} args - Arguments to filter ApplicantProfiles to delete.
     * @example
     * // Delete a few ApplicantProfiles
     * const { count } = await prisma.applicantProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApplicantProfileDeleteManyArgs>(args?: SelectSubset<T, ApplicantProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApplicantProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicantProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ApplicantProfiles
     * const applicantProfile = await prisma.applicantProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApplicantProfileUpdateManyArgs>(args: SelectSubset<T, ApplicantProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ApplicantProfile.
     * @param {ApplicantProfileUpsertArgs} args - Arguments to update or create a ApplicantProfile.
     * @example
     * // Update or create a ApplicantProfile
     * const applicantProfile = await prisma.applicantProfile.upsert({
     *   create: {
     *     // ... data to create a ApplicantProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ApplicantProfile we want to update
     *   }
     * })
     */
    upsert<T extends ApplicantProfileUpsertArgs>(args: SelectSubset<T, ApplicantProfileUpsertArgs<ExtArgs>>): Prisma__ApplicantProfileClient<$Result.GetResult<Prisma.$ApplicantProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ApplicantProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicantProfileCountArgs} args - Arguments to filter ApplicantProfiles to count.
     * @example
     * // Count the number of ApplicantProfiles
     * const count = await prisma.applicantProfile.count({
     *   where: {
     *     // ... the filter for the ApplicantProfiles we want to count
     *   }
     * })
    **/
    count<T extends ApplicantProfileCountArgs>(
      args?: Subset<T, ApplicantProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApplicantProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ApplicantProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicantProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ApplicantProfileAggregateArgs>(args: Subset<T, ApplicantProfileAggregateArgs>): Prisma.PrismaPromise<GetApplicantProfileAggregateType<T>>

    /**
     * Group by ApplicantProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicantProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ApplicantProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApplicantProfileGroupByArgs['orderBy'] }
        : { orderBy?: ApplicantProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ApplicantProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApplicantProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ApplicantProfile model
   */
  readonly fields: ApplicantProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ApplicantProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApplicantProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    qualifications<T extends ApplicantProfile$qualificationsArgs<ExtArgs> = {}>(args?: Subset<T, ApplicantProfile$qualificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicantQualificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    skills<T extends ApplicantProfile$skillsArgs<ExtArgs> = {}>(args?: Subset<T, ApplicantProfile$skillsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicantSkillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ApplicantProfile model
   */
  interface ApplicantProfileFieldRefs {
    readonly applicant_id: FieldRef<"ApplicantProfile", 'Int'>
    readonly user_id: FieldRef<"ApplicantProfile", 'Int'>
    readonly phone: FieldRef<"ApplicantProfile", 'String'>
    readonly dob: FieldRef<"ApplicantProfile", 'DateTime'>
    readonly bio: FieldRef<"ApplicantProfile", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ApplicantProfile findUnique
   */
  export type ApplicantProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicantProfile
     */
    select?: ApplicantProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicantProfile
     */
    omit?: ApplicantProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicantProfileInclude<ExtArgs> | null
    /**
     * Filter, which ApplicantProfile to fetch.
     */
    where: ApplicantProfileWhereUniqueInput
  }

  /**
   * ApplicantProfile findUniqueOrThrow
   */
  export type ApplicantProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicantProfile
     */
    select?: ApplicantProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicantProfile
     */
    omit?: ApplicantProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicantProfileInclude<ExtArgs> | null
    /**
     * Filter, which ApplicantProfile to fetch.
     */
    where: ApplicantProfileWhereUniqueInput
  }

  /**
   * ApplicantProfile findFirst
   */
  export type ApplicantProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicantProfile
     */
    select?: ApplicantProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicantProfile
     */
    omit?: ApplicantProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicantProfileInclude<ExtArgs> | null
    /**
     * Filter, which ApplicantProfile to fetch.
     */
    where?: ApplicantProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApplicantProfiles to fetch.
     */
    orderBy?: ApplicantProfileOrderByWithRelationInput | ApplicantProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApplicantProfiles.
     */
    cursor?: ApplicantProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApplicantProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApplicantProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApplicantProfiles.
     */
    distinct?: ApplicantProfileScalarFieldEnum | ApplicantProfileScalarFieldEnum[]
  }

  /**
   * ApplicantProfile findFirstOrThrow
   */
  export type ApplicantProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicantProfile
     */
    select?: ApplicantProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicantProfile
     */
    omit?: ApplicantProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicantProfileInclude<ExtArgs> | null
    /**
     * Filter, which ApplicantProfile to fetch.
     */
    where?: ApplicantProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApplicantProfiles to fetch.
     */
    orderBy?: ApplicantProfileOrderByWithRelationInput | ApplicantProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApplicantProfiles.
     */
    cursor?: ApplicantProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApplicantProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApplicantProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApplicantProfiles.
     */
    distinct?: ApplicantProfileScalarFieldEnum | ApplicantProfileScalarFieldEnum[]
  }

  /**
   * ApplicantProfile findMany
   */
  export type ApplicantProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicantProfile
     */
    select?: ApplicantProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicantProfile
     */
    omit?: ApplicantProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicantProfileInclude<ExtArgs> | null
    /**
     * Filter, which ApplicantProfiles to fetch.
     */
    where?: ApplicantProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApplicantProfiles to fetch.
     */
    orderBy?: ApplicantProfileOrderByWithRelationInput | ApplicantProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ApplicantProfiles.
     */
    cursor?: ApplicantProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApplicantProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApplicantProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApplicantProfiles.
     */
    distinct?: ApplicantProfileScalarFieldEnum | ApplicantProfileScalarFieldEnum[]
  }

  /**
   * ApplicantProfile create
   */
  export type ApplicantProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicantProfile
     */
    select?: ApplicantProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicantProfile
     */
    omit?: ApplicantProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicantProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a ApplicantProfile.
     */
    data: XOR<ApplicantProfileCreateInput, ApplicantProfileUncheckedCreateInput>
  }

  /**
   * ApplicantProfile createMany
   */
  export type ApplicantProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ApplicantProfiles.
     */
    data: ApplicantProfileCreateManyInput | ApplicantProfileCreateManyInput[]
  }

  /**
   * ApplicantProfile update
   */
  export type ApplicantProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicantProfile
     */
    select?: ApplicantProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicantProfile
     */
    omit?: ApplicantProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicantProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a ApplicantProfile.
     */
    data: XOR<ApplicantProfileUpdateInput, ApplicantProfileUncheckedUpdateInput>
    /**
     * Choose, which ApplicantProfile to update.
     */
    where: ApplicantProfileWhereUniqueInput
  }

  /**
   * ApplicantProfile updateMany
   */
  export type ApplicantProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ApplicantProfiles.
     */
    data: XOR<ApplicantProfileUpdateManyMutationInput, ApplicantProfileUncheckedUpdateManyInput>
    /**
     * Filter which ApplicantProfiles to update
     */
    where?: ApplicantProfileWhereInput
    /**
     * Limit how many ApplicantProfiles to update.
     */
    limit?: number
  }

  /**
   * ApplicantProfile upsert
   */
  export type ApplicantProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicantProfile
     */
    select?: ApplicantProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicantProfile
     */
    omit?: ApplicantProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicantProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the ApplicantProfile to update in case it exists.
     */
    where: ApplicantProfileWhereUniqueInput
    /**
     * In case the ApplicantProfile found by the `where` argument doesn't exist, create a new ApplicantProfile with this data.
     */
    create: XOR<ApplicantProfileCreateInput, ApplicantProfileUncheckedCreateInput>
    /**
     * In case the ApplicantProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApplicantProfileUpdateInput, ApplicantProfileUncheckedUpdateInput>
  }

  /**
   * ApplicantProfile delete
   */
  export type ApplicantProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicantProfile
     */
    select?: ApplicantProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicantProfile
     */
    omit?: ApplicantProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicantProfileInclude<ExtArgs> | null
    /**
     * Filter which ApplicantProfile to delete.
     */
    where: ApplicantProfileWhereUniqueInput
  }

  /**
   * ApplicantProfile deleteMany
   */
  export type ApplicantProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApplicantProfiles to delete
     */
    where?: ApplicantProfileWhereInput
    /**
     * Limit how many ApplicantProfiles to delete.
     */
    limit?: number
  }

  /**
   * ApplicantProfile.qualifications
   */
  export type ApplicantProfile$qualificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicantQualification
     */
    select?: ApplicantQualificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicantQualification
     */
    omit?: ApplicantQualificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicantQualificationInclude<ExtArgs> | null
    where?: ApplicantQualificationWhereInput
    orderBy?: ApplicantQualificationOrderByWithRelationInput | ApplicantQualificationOrderByWithRelationInput[]
    cursor?: ApplicantQualificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApplicantQualificationScalarFieldEnum | ApplicantQualificationScalarFieldEnum[]
  }

  /**
   * ApplicantProfile.skills
   */
  export type ApplicantProfile$skillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicantSkill
     */
    select?: ApplicantSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicantSkill
     */
    omit?: ApplicantSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicantSkillInclude<ExtArgs> | null
    where?: ApplicantSkillWhereInput
    orderBy?: ApplicantSkillOrderByWithRelationInput | ApplicantSkillOrderByWithRelationInput[]
    cursor?: ApplicantSkillWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApplicantSkillScalarFieldEnum | ApplicantSkillScalarFieldEnum[]
  }

  /**
   * ApplicantProfile without action
   */
  export type ApplicantProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicantProfile
     */
    select?: ApplicantProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicantProfile
     */
    omit?: ApplicantProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicantProfileInclude<ExtArgs> | null
  }


  /**
   * Model Provider
   */

  export type AggregateProvider = {
    _count: ProviderCountAggregateOutputType | null
    _avg: ProviderAvgAggregateOutputType | null
    _sum: ProviderSumAggregateOutputType | null
    _min: ProviderMinAggregateOutputType | null
    _max: ProviderMaxAggregateOutputType | null
  }

  export type ProviderAvgAggregateOutputType = {
    provider_id: number | null
    user_id: number | null
  }

  export type ProviderSumAggregateOutputType = {
    provider_id: number | null
    user_id: number | null
  }

  export type ProviderMinAggregateOutputType = {
    provider_id: number | null
    provider_name: string | null
    profile: string | null
    user_id: number | null
    onboarded: boolean | null
  }

  export type ProviderMaxAggregateOutputType = {
    provider_id: number | null
    provider_name: string | null
    profile: string | null
    user_id: number | null
    onboarded: boolean | null
  }

  export type ProviderCountAggregateOutputType = {
    provider_id: number
    provider_name: number
    profile: number
    user_id: number
    onboarded: number
    _all: number
  }


  export type ProviderAvgAggregateInputType = {
    provider_id?: true
    user_id?: true
  }

  export type ProviderSumAggregateInputType = {
    provider_id?: true
    user_id?: true
  }

  export type ProviderMinAggregateInputType = {
    provider_id?: true
    provider_name?: true
    profile?: true
    user_id?: true
    onboarded?: true
  }

  export type ProviderMaxAggregateInputType = {
    provider_id?: true
    provider_name?: true
    profile?: true
    user_id?: true
    onboarded?: true
  }

  export type ProviderCountAggregateInputType = {
    provider_id?: true
    provider_name?: true
    profile?: true
    user_id?: true
    onboarded?: true
    _all?: true
  }

  export type ProviderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Provider to aggregate.
     */
    where?: ProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Providers to fetch.
     */
    orderBy?: ProviderOrderByWithRelationInput | ProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Providers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Providers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Providers
    **/
    _count?: true | ProviderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProviderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProviderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProviderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProviderMaxAggregateInputType
  }

  export type GetProviderAggregateType<T extends ProviderAggregateArgs> = {
        [P in keyof T & keyof AggregateProvider]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProvider[P]>
      : GetScalarType<T[P], AggregateProvider[P]>
  }




  export type ProviderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProviderWhereInput
    orderBy?: ProviderOrderByWithAggregationInput | ProviderOrderByWithAggregationInput[]
    by: ProviderScalarFieldEnum[] | ProviderScalarFieldEnum
    having?: ProviderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProviderCountAggregateInputType | true
    _avg?: ProviderAvgAggregateInputType
    _sum?: ProviderSumAggregateInputType
    _min?: ProviderMinAggregateInputType
    _max?: ProviderMaxAggregateInputType
  }

  export type ProviderGroupByOutputType = {
    provider_id: number
    provider_name: string
    profile: string | null
    user_id: number
    onboarded: boolean
    _count: ProviderCountAggregateOutputType | null
    _avg: ProviderAvgAggregateOutputType | null
    _sum: ProviderSumAggregateOutputType | null
    _min: ProviderMinAggregateOutputType | null
    _max: ProviderMaxAggregateOutputType | null
  }

  type GetProviderGroupByPayload<T extends ProviderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProviderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProviderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProviderGroupByOutputType[P]>
            : GetScalarType<T[P], ProviderGroupByOutputType[P]>
        }
      >
    >


  export type ProviderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    provider_id?: boolean
    provider_name?: boolean
    profile?: boolean
    user_id?: boolean
    onboarded?: boolean
    applications?: boolean | Provider$applicationsArgs<ExtArgs>
    listings?: boolean | Provider$listingsArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | ProviderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["provider"]>



  export type ProviderSelectScalar = {
    provider_id?: boolean
    provider_name?: boolean
    profile?: boolean
    user_id?: boolean
    onboarded?: boolean
  }

  export type ProviderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"provider_id" | "provider_name" | "profile" | "user_id" | "onboarded", ExtArgs["result"]["provider"]>
  export type ProviderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | Provider$applicationsArgs<ExtArgs>
    listings?: boolean | Provider$listingsArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | ProviderCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ProviderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Provider"
    objects: {
      applications: Prisma.$ApplicationPayload<ExtArgs>[]
      listings: Prisma.$ListingPayload<ExtArgs>[]
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      provider_id: number
      provider_name: string
      profile: string | null
      user_id: number
      onboarded: boolean
    }, ExtArgs["result"]["provider"]>
    composites: {}
  }

  type ProviderGetPayload<S extends boolean | null | undefined | ProviderDefaultArgs> = $Result.GetResult<Prisma.$ProviderPayload, S>

  type ProviderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProviderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProviderCountAggregateInputType | true
    }

  export interface ProviderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Provider'], meta: { name: 'Provider' } }
    /**
     * Find zero or one Provider that matches the filter.
     * @param {ProviderFindUniqueArgs} args - Arguments to find a Provider
     * @example
     * // Get one Provider
     * const provider = await prisma.provider.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProviderFindUniqueArgs>(args: SelectSubset<T, ProviderFindUniqueArgs<ExtArgs>>): Prisma__ProviderClient<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Provider that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProviderFindUniqueOrThrowArgs} args - Arguments to find a Provider
     * @example
     * // Get one Provider
     * const provider = await prisma.provider.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProviderFindUniqueOrThrowArgs>(args: SelectSubset<T, ProviderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProviderClient<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Provider that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderFindFirstArgs} args - Arguments to find a Provider
     * @example
     * // Get one Provider
     * const provider = await prisma.provider.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProviderFindFirstArgs>(args?: SelectSubset<T, ProviderFindFirstArgs<ExtArgs>>): Prisma__ProviderClient<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Provider that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderFindFirstOrThrowArgs} args - Arguments to find a Provider
     * @example
     * // Get one Provider
     * const provider = await prisma.provider.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProviderFindFirstOrThrowArgs>(args?: SelectSubset<T, ProviderFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProviderClient<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Providers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Providers
     * const providers = await prisma.provider.findMany()
     * 
     * // Get first 10 Providers
     * const providers = await prisma.provider.findMany({ take: 10 })
     * 
     * // Only select the `provider_id`
     * const providerWithProvider_idOnly = await prisma.provider.findMany({ select: { provider_id: true } })
     * 
     */
    findMany<T extends ProviderFindManyArgs>(args?: SelectSubset<T, ProviderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Provider.
     * @param {ProviderCreateArgs} args - Arguments to create a Provider.
     * @example
     * // Create one Provider
     * const Provider = await prisma.provider.create({
     *   data: {
     *     // ... data to create a Provider
     *   }
     * })
     * 
     */
    create<T extends ProviderCreateArgs>(args: SelectSubset<T, ProviderCreateArgs<ExtArgs>>): Prisma__ProviderClient<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Providers.
     * @param {ProviderCreateManyArgs} args - Arguments to create many Providers.
     * @example
     * // Create many Providers
     * const provider = await prisma.provider.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProviderCreateManyArgs>(args?: SelectSubset<T, ProviderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Provider.
     * @param {ProviderDeleteArgs} args - Arguments to delete one Provider.
     * @example
     * // Delete one Provider
     * const Provider = await prisma.provider.delete({
     *   where: {
     *     // ... filter to delete one Provider
     *   }
     * })
     * 
     */
    delete<T extends ProviderDeleteArgs>(args: SelectSubset<T, ProviderDeleteArgs<ExtArgs>>): Prisma__ProviderClient<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Provider.
     * @param {ProviderUpdateArgs} args - Arguments to update one Provider.
     * @example
     * // Update one Provider
     * const provider = await prisma.provider.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProviderUpdateArgs>(args: SelectSubset<T, ProviderUpdateArgs<ExtArgs>>): Prisma__ProviderClient<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Providers.
     * @param {ProviderDeleteManyArgs} args - Arguments to filter Providers to delete.
     * @example
     * // Delete a few Providers
     * const { count } = await prisma.provider.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProviderDeleteManyArgs>(args?: SelectSubset<T, ProviderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Providers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Providers
     * const provider = await prisma.provider.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProviderUpdateManyArgs>(args: SelectSubset<T, ProviderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Provider.
     * @param {ProviderUpsertArgs} args - Arguments to update or create a Provider.
     * @example
     * // Update or create a Provider
     * const provider = await prisma.provider.upsert({
     *   create: {
     *     // ... data to create a Provider
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Provider we want to update
     *   }
     * })
     */
    upsert<T extends ProviderUpsertArgs>(args: SelectSubset<T, ProviderUpsertArgs<ExtArgs>>): Prisma__ProviderClient<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Providers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderCountArgs} args - Arguments to filter Providers to count.
     * @example
     * // Count the number of Providers
     * const count = await prisma.provider.count({
     *   where: {
     *     // ... the filter for the Providers we want to count
     *   }
     * })
    **/
    count<T extends ProviderCountArgs>(
      args?: Subset<T, ProviderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProviderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Provider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProviderAggregateArgs>(args: Subset<T, ProviderAggregateArgs>): Prisma.PrismaPromise<GetProviderAggregateType<T>>

    /**
     * Group by Provider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProviderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProviderGroupByArgs['orderBy'] }
        : { orderBy?: ProviderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProviderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProviderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Provider model
   */
  readonly fields: ProviderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Provider.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProviderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    applications<T extends Provider$applicationsArgs<ExtArgs> = {}>(args?: Subset<T, Provider$applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    listings<T extends Provider$listingsArgs<ExtArgs> = {}>(args?: Subset<T, Provider$listingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Provider model
   */
  interface ProviderFieldRefs {
    readonly provider_id: FieldRef<"Provider", 'Int'>
    readonly provider_name: FieldRef<"Provider", 'String'>
    readonly profile: FieldRef<"Provider", 'String'>
    readonly user_id: FieldRef<"Provider", 'Int'>
    readonly onboarded: FieldRef<"Provider", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Provider findUnique
   */
  export type ProviderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Provider
     */
    omit?: ProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderInclude<ExtArgs> | null
    /**
     * Filter, which Provider to fetch.
     */
    where: ProviderWhereUniqueInput
  }

  /**
   * Provider findUniqueOrThrow
   */
  export type ProviderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Provider
     */
    omit?: ProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderInclude<ExtArgs> | null
    /**
     * Filter, which Provider to fetch.
     */
    where: ProviderWhereUniqueInput
  }

  /**
   * Provider findFirst
   */
  export type ProviderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Provider
     */
    omit?: ProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderInclude<ExtArgs> | null
    /**
     * Filter, which Provider to fetch.
     */
    where?: ProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Providers to fetch.
     */
    orderBy?: ProviderOrderByWithRelationInput | ProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Providers.
     */
    cursor?: ProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Providers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Providers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Providers.
     */
    distinct?: ProviderScalarFieldEnum | ProviderScalarFieldEnum[]
  }

  /**
   * Provider findFirstOrThrow
   */
  export type ProviderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Provider
     */
    omit?: ProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderInclude<ExtArgs> | null
    /**
     * Filter, which Provider to fetch.
     */
    where?: ProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Providers to fetch.
     */
    orderBy?: ProviderOrderByWithRelationInput | ProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Providers.
     */
    cursor?: ProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Providers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Providers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Providers.
     */
    distinct?: ProviderScalarFieldEnum | ProviderScalarFieldEnum[]
  }

  /**
   * Provider findMany
   */
  export type ProviderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Provider
     */
    omit?: ProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderInclude<ExtArgs> | null
    /**
     * Filter, which Providers to fetch.
     */
    where?: ProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Providers to fetch.
     */
    orderBy?: ProviderOrderByWithRelationInput | ProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Providers.
     */
    cursor?: ProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Providers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Providers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Providers.
     */
    distinct?: ProviderScalarFieldEnum | ProviderScalarFieldEnum[]
  }

  /**
   * Provider create
   */
  export type ProviderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Provider
     */
    omit?: ProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderInclude<ExtArgs> | null
    /**
     * The data needed to create a Provider.
     */
    data: XOR<ProviderCreateInput, ProviderUncheckedCreateInput>
  }

  /**
   * Provider createMany
   */
  export type ProviderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Providers.
     */
    data: ProviderCreateManyInput | ProviderCreateManyInput[]
  }

  /**
   * Provider update
   */
  export type ProviderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Provider
     */
    omit?: ProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderInclude<ExtArgs> | null
    /**
     * The data needed to update a Provider.
     */
    data: XOR<ProviderUpdateInput, ProviderUncheckedUpdateInput>
    /**
     * Choose, which Provider to update.
     */
    where: ProviderWhereUniqueInput
  }

  /**
   * Provider updateMany
   */
  export type ProviderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Providers.
     */
    data: XOR<ProviderUpdateManyMutationInput, ProviderUncheckedUpdateManyInput>
    /**
     * Filter which Providers to update
     */
    where?: ProviderWhereInput
    /**
     * Limit how many Providers to update.
     */
    limit?: number
  }

  /**
   * Provider upsert
   */
  export type ProviderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Provider
     */
    omit?: ProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderInclude<ExtArgs> | null
    /**
     * The filter to search for the Provider to update in case it exists.
     */
    where: ProviderWhereUniqueInput
    /**
     * In case the Provider found by the `where` argument doesn't exist, create a new Provider with this data.
     */
    create: XOR<ProviderCreateInput, ProviderUncheckedCreateInput>
    /**
     * In case the Provider was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProviderUpdateInput, ProviderUncheckedUpdateInput>
  }

  /**
   * Provider delete
   */
  export type ProviderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Provider
     */
    omit?: ProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderInclude<ExtArgs> | null
    /**
     * Filter which Provider to delete.
     */
    where: ProviderWhereUniqueInput
  }

  /**
   * Provider deleteMany
   */
  export type ProviderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Providers to delete
     */
    where?: ProviderWhereInput
    /**
     * Limit how many Providers to delete.
     */
    limit?: number
  }

  /**
   * Provider.applications
   */
  export type Provider$applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    where?: ApplicationWhereInput
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    cursor?: ApplicationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[]
  }

  /**
   * Provider.listings
   */
  export type Provider$listingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    where?: ListingWhereInput
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    cursor?: ListingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ListingScalarFieldEnum | ListingScalarFieldEnum[]
  }

  /**
   * Provider without action
   */
  export type ProviderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Provider
     */
    omit?: ProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderInclude<ExtArgs> | null
  }


  /**
   * Model Listing
   */

  export type AggregateListing = {
    _count: ListingCountAggregateOutputType | null
    _avg: ListingAvgAggregateOutputType | null
    _sum: ListingSumAggregateOutputType | null
    _min: ListingMinAggregateOutputType | null
    _max: ListingMaxAggregateOutputType | null
  }

  export type ListingAvgAggregateOutputType = {
    listings_id: number | null
    nqf_level: number | null
    provider_id: number | null
    stipend: number | null
  }

  export type ListingSumAggregateOutputType = {
    listings_id: number | null
    nqf_level: number | null
    provider_id: number | null
    stipend: number | null
  }

  export type ListingMinAggregateOutputType = {
    listings_id: number | null
    listname: string | null
    list_type: string | null
    nqf_level: number | null
    description: string | null
    provider_id: number | null
    status: string | null
    closing_date: Date | null
    duration: string | null
    location: string | null
    requirements: string | null
    stipend: number | null
    sector: string | null
    cvUploadedAt: Date | null
  }

  export type ListingMaxAggregateOutputType = {
    listings_id: number | null
    listname: string | null
    list_type: string | null
    nqf_level: number | null
    description: string | null
    provider_id: number | null
    status: string | null
    closing_date: Date | null
    duration: string | null
    location: string | null
    requirements: string | null
    stipend: number | null
    sector: string | null
    cvUploadedAt: Date | null
  }

  export type ListingCountAggregateOutputType = {
    listings_id: number
    listname: number
    list_type: number
    nqf_level: number
    description: number
    provider_id: number
    status: number
    closing_date: number
    duration: number
    location: number
    requirements: number
    stipend: number
    sector: number
    cvUploadedAt: number
    _all: number
  }


  export type ListingAvgAggregateInputType = {
    listings_id?: true
    nqf_level?: true
    provider_id?: true
    stipend?: true
  }

  export type ListingSumAggregateInputType = {
    listings_id?: true
    nqf_level?: true
    provider_id?: true
    stipend?: true
  }

  export type ListingMinAggregateInputType = {
    listings_id?: true
    listname?: true
    list_type?: true
    nqf_level?: true
    description?: true
    provider_id?: true
    status?: true
    closing_date?: true
    duration?: true
    location?: true
    requirements?: true
    stipend?: true
    sector?: true
    cvUploadedAt?: true
  }

  export type ListingMaxAggregateInputType = {
    listings_id?: true
    listname?: true
    list_type?: true
    nqf_level?: true
    description?: true
    provider_id?: true
    status?: true
    closing_date?: true
    duration?: true
    location?: true
    requirements?: true
    stipend?: true
    sector?: true
    cvUploadedAt?: true
  }

  export type ListingCountAggregateInputType = {
    listings_id?: true
    listname?: true
    list_type?: true
    nqf_level?: true
    description?: true
    provider_id?: true
    status?: true
    closing_date?: true
    duration?: true
    location?: true
    requirements?: true
    stipend?: true
    sector?: true
    cvUploadedAt?: true
    _all?: true
  }

  export type ListingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Listing to aggregate.
     */
    where?: ListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Listings to fetch.
     */
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Listings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Listings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Listings
    **/
    _count?: true | ListingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ListingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ListingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ListingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ListingMaxAggregateInputType
  }

  export type GetListingAggregateType<T extends ListingAggregateArgs> = {
        [P in keyof T & keyof AggregateListing]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateListing[P]>
      : GetScalarType<T[P], AggregateListing[P]>
  }




  export type ListingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListingWhereInput
    orderBy?: ListingOrderByWithAggregationInput | ListingOrderByWithAggregationInput[]
    by: ListingScalarFieldEnum[] | ListingScalarFieldEnum
    having?: ListingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ListingCountAggregateInputType | true
    _avg?: ListingAvgAggregateInputType
    _sum?: ListingSumAggregateInputType
    _min?: ListingMinAggregateInputType
    _max?: ListingMaxAggregateInputType
  }

  export type ListingGroupByOutputType = {
    listings_id: number
    listname: string
    list_type: string
    nqf_level: number | null
    description: string | null
    provider_id: number
    status: string
    closing_date: Date | null
    duration: string | null
    location: string | null
    requirements: string | null
    stipend: number | null
    sector: string | null
    cvUploadedAt: Date | null
    _count: ListingCountAggregateOutputType | null
    _avg: ListingAvgAggregateOutputType | null
    _sum: ListingSumAggregateOutputType | null
    _min: ListingMinAggregateOutputType | null
    _max: ListingMaxAggregateOutputType | null
  }

  type GetListingGroupByPayload<T extends ListingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ListingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ListingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ListingGroupByOutputType[P]>
            : GetScalarType<T[P], ListingGroupByOutputType[P]>
        }
      >
    >


  export type ListingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    listings_id?: boolean
    listname?: boolean
    list_type?: boolean
    nqf_level?: boolean
    description?: boolean
    provider_id?: boolean
    status?: boolean
    closing_date?: boolean
    duration?: boolean
    location?: boolean
    requirements?: boolean
    stipend?: boolean
    sector?: boolean
    cvUploadedAt?: boolean
    applications?: boolean | Listing$applicationsArgs<ExtArgs>
    provider?: boolean | ProviderDefaultArgs<ExtArgs>
    Report?: boolean | Listing$ReportArgs<ExtArgs>
    _count?: boolean | ListingCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["listing"]>



  export type ListingSelectScalar = {
    listings_id?: boolean
    listname?: boolean
    list_type?: boolean
    nqf_level?: boolean
    description?: boolean
    provider_id?: boolean
    status?: boolean
    closing_date?: boolean
    duration?: boolean
    location?: boolean
    requirements?: boolean
    stipend?: boolean
    sector?: boolean
    cvUploadedAt?: boolean
  }

  export type ListingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"listings_id" | "listname" | "list_type" | "nqf_level" | "description" | "provider_id" | "status" | "closing_date" | "duration" | "location" | "requirements" | "stipend" | "sector" | "cvUploadedAt", ExtArgs["result"]["listing"]>
  export type ListingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | Listing$applicationsArgs<ExtArgs>
    provider?: boolean | ProviderDefaultArgs<ExtArgs>
    Report?: boolean | Listing$ReportArgs<ExtArgs>
    _count?: boolean | ListingCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ListingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Listing"
    objects: {
      applications: Prisma.$ApplicationPayload<ExtArgs>[]
      provider: Prisma.$ProviderPayload<ExtArgs>
      Report: Prisma.$ReportPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      listings_id: number
      listname: string
      list_type: string
      nqf_level: number | null
      description: string | null
      provider_id: number
      status: string
      closing_date: Date | null
      duration: string | null
      location: string | null
      requirements: string | null
      stipend: number | null
      sector: string | null
      cvUploadedAt: Date | null
    }, ExtArgs["result"]["listing"]>
    composites: {}
  }

  type ListingGetPayload<S extends boolean | null | undefined | ListingDefaultArgs> = $Result.GetResult<Prisma.$ListingPayload, S>

  type ListingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ListingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ListingCountAggregateInputType | true
    }

  export interface ListingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Listing'], meta: { name: 'Listing' } }
    /**
     * Find zero or one Listing that matches the filter.
     * @param {ListingFindUniqueArgs} args - Arguments to find a Listing
     * @example
     * // Get one Listing
     * const listing = await prisma.listing.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ListingFindUniqueArgs>(args: SelectSubset<T, ListingFindUniqueArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Listing that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ListingFindUniqueOrThrowArgs} args - Arguments to find a Listing
     * @example
     * // Get one Listing
     * const listing = await prisma.listing.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ListingFindUniqueOrThrowArgs>(args: SelectSubset<T, ListingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Listing that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingFindFirstArgs} args - Arguments to find a Listing
     * @example
     * // Get one Listing
     * const listing = await prisma.listing.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ListingFindFirstArgs>(args?: SelectSubset<T, ListingFindFirstArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Listing that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingFindFirstOrThrowArgs} args - Arguments to find a Listing
     * @example
     * // Get one Listing
     * const listing = await prisma.listing.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ListingFindFirstOrThrowArgs>(args?: SelectSubset<T, ListingFindFirstOrThrowArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Listings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Listings
     * const listings = await prisma.listing.findMany()
     * 
     * // Get first 10 Listings
     * const listings = await prisma.listing.findMany({ take: 10 })
     * 
     * // Only select the `listings_id`
     * const listingWithListings_idOnly = await prisma.listing.findMany({ select: { listings_id: true } })
     * 
     */
    findMany<T extends ListingFindManyArgs>(args?: SelectSubset<T, ListingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Listing.
     * @param {ListingCreateArgs} args - Arguments to create a Listing.
     * @example
     * // Create one Listing
     * const Listing = await prisma.listing.create({
     *   data: {
     *     // ... data to create a Listing
     *   }
     * })
     * 
     */
    create<T extends ListingCreateArgs>(args: SelectSubset<T, ListingCreateArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Listings.
     * @param {ListingCreateManyArgs} args - Arguments to create many Listings.
     * @example
     * // Create many Listings
     * const listing = await prisma.listing.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ListingCreateManyArgs>(args?: SelectSubset<T, ListingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Listing.
     * @param {ListingDeleteArgs} args - Arguments to delete one Listing.
     * @example
     * // Delete one Listing
     * const Listing = await prisma.listing.delete({
     *   where: {
     *     // ... filter to delete one Listing
     *   }
     * })
     * 
     */
    delete<T extends ListingDeleteArgs>(args: SelectSubset<T, ListingDeleteArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Listing.
     * @param {ListingUpdateArgs} args - Arguments to update one Listing.
     * @example
     * // Update one Listing
     * const listing = await prisma.listing.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ListingUpdateArgs>(args: SelectSubset<T, ListingUpdateArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Listings.
     * @param {ListingDeleteManyArgs} args - Arguments to filter Listings to delete.
     * @example
     * // Delete a few Listings
     * const { count } = await prisma.listing.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ListingDeleteManyArgs>(args?: SelectSubset<T, ListingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Listings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Listings
     * const listing = await prisma.listing.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ListingUpdateManyArgs>(args: SelectSubset<T, ListingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Listing.
     * @param {ListingUpsertArgs} args - Arguments to update or create a Listing.
     * @example
     * // Update or create a Listing
     * const listing = await prisma.listing.upsert({
     *   create: {
     *     // ... data to create a Listing
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Listing we want to update
     *   }
     * })
     */
    upsert<T extends ListingUpsertArgs>(args: SelectSubset<T, ListingUpsertArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Listings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingCountArgs} args - Arguments to filter Listings to count.
     * @example
     * // Count the number of Listings
     * const count = await prisma.listing.count({
     *   where: {
     *     // ... the filter for the Listings we want to count
     *   }
     * })
    **/
    count<T extends ListingCountArgs>(
      args?: Subset<T, ListingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ListingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Listing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ListingAggregateArgs>(args: Subset<T, ListingAggregateArgs>): Prisma.PrismaPromise<GetListingAggregateType<T>>

    /**
     * Group by Listing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ListingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ListingGroupByArgs['orderBy'] }
        : { orderBy?: ListingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ListingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetListingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Listing model
   */
  readonly fields: ListingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Listing.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ListingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    applications<T extends Listing$applicationsArgs<ExtArgs> = {}>(args?: Subset<T, Listing$applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    provider<T extends ProviderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProviderDefaultArgs<ExtArgs>>): Prisma__ProviderClient<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    Report<T extends Listing$ReportArgs<ExtArgs> = {}>(args?: Subset<T, Listing$ReportArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Listing model
   */
  interface ListingFieldRefs {
    readonly listings_id: FieldRef<"Listing", 'Int'>
    readonly listname: FieldRef<"Listing", 'String'>
    readonly list_type: FieldRef<"Listing", 'String'>
    readonly nqf_level: FieldRef<"Listing", 'Int'>
    readonly description: FieldRef<"Listing", 'String'>
    readonly provider_id: FieldRef<"Listing", 'Int'>
    readonly status: FieldRef<"Listing", 'String'>
    readonly closing_date: FieldRef<"Listing", 'DateTime'>
    readonly duration: FieldRef<"Listing", 'String'>
    readonly location: FieldRef<"Listing", 'String'>
    readonly requirements: FieldRef<"Listing", 'String'>
    readonly stipend: FieldRef<"Listing", 'Float'>
    readonly sector: FieldRef<"Listing", 'String'>
    readonly cvUploadedAt: FieldRef<"Listing", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Listing findUnique
   */
  export type ListingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter, which Listing to fetch.
     */
    where: ListingWhereUniqueInput
  }

  /**
   * Listing findUniqueOrThrow
   */
  export type ListingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter, which Listing to fetch.
     */
    where: ListingWhereUniqueInput
  }

  /**
   * Listing findFirst
   */
  export type ListingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter, which Listing to fetch.
     */
    where?: ListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Listings to fetch.
     */
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Listings.
     */
    cursor?: ListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Listings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Listings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Listings.
     */
    distinct?: ListingScalarFieldEnum | ListingScalarFieldEnum[]
  }

  /**
   * Listing findFirstOrThrow
   */
  export type ListingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter, which Listing to fetch.
     */
    where?: ListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Listings to fetch.
     */
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Listings.
     */
    cursor?: ListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Listings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Listings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Listings.
     */
    distinct?: ListingScalarFieldEnum | ListingScalarFieldEnum[]
  }

  /**
   * Listing findMany
   */
  export type ListingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter, which Listings to fetch.
     */
    where?: ListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Listings to fetch.
     */
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Listings.
     */
    cursor?: ListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Listings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Listings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Listings.
     */
    distinct?: ListingScalarFieldEnum | ListingScalarFieldEnum[]
  }

  /**
   * Listing create
   */
  export type ListingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * The data needed to create a Listing.
     */
    data: XOR<ListingCreateInput, ListingUncheckedCreateInput>
  }

  /**
   * Listing createMany
   */
  export type ListingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Listings.
     */
    data: ListingCreateManyInput | ListingCreateManyInput[]
  }

  /**
   * Listing update
   */
  export type ListingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * The data needed to update a Listing.
     */
    data: XOR<ListingUpdateInput, ListingUncheckedUpdateInput>
    /**
     * Choose, which Listing to update.
     */
    where: ListingWhereUniqueInput
  }

  /**
   * Listing updateMany
   */
  export type ListingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Listings.
     */
    data: XOR<ListingUpdateManyMutationInput, ListingUncheckedUpdateManyInput>
    /**
     * Filter which Listings to update
     */
    where?: ListingWhereInput
    /**
     * Limit how many Listings to update.
     */
    limit?: number
  }

  /**
   * Listing upsert
   */
  export type ListingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * The filter to search for the Listing to update in case it exists.
     */
    where: ListingWhereUniqueInput
    /**
     * In case the Listing found by the `where` argument doesn't exist, create a new Listing with this data.
     */
    create: XOR<ListingCreateInput, ListingUncheckedCreateInput>
    /**
     * In case the Listing was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ListingUpdateInput, ListingUncheckedUpdateInput>
  }

  /**
   * Listing delete
   */
  export type ListingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter which Listing to delete.
     */
    where: ListingWhereUniqueInput
  }

  /**
   * Listing deleteMany
   */
  export type ListingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Listings to delete
     */
    where?: ListingWhereInput
    /**
     * Limit how many Listings to delete.
     */
    limit?: number
  }

  /**
   * Listing.applications
   */
  export type Listing$applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    where?: ApplicationWhereInput
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    cursor?: ApplicationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[]
  }

  /**
   * Listing.Report
   */
  export type Listing$ReportArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    where?: ReportWhereInput
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    cursor?: ReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Listing without action
   */
  export type ListingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Listing
     */
    omit?: ListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
  }


  /**
   * Model Application
   */

  export type AggregateApplication = {
    _count: ApplicationCountAggregateOutputType | null
    _avg: ApplicationAvgAggregateOutputType | null
    _sum: ApplicationSumAggregateOutputType | null
    _min: ApplicationMinAggregateOutputType | null
    _max: ApplicationMaxAggregateOutputType | null
  }

  export type ApplicationAvgAggregateOutputType = {
    application_id: number | null
    user_id: number | null
    provider_id: number | null
    listing_id: number | null
  }

  export type ApplicationSumAggregateOutputType = {
    application_id: number | null
    user_id: number | null
    provider_id: number | null
    listing_id: number | null
  }

  export type ApplicationMinAggregateOutputType = {
    application_id: number | null
    user_id: number | null
    provider_id: number | null
    availability: string | null
    motivation: string | null
    status: string | null
    listing_id: number | null
    created_at: Date | null
    updated_at: Date | null
    availability: string | null
    motivation: string | null
    cvFilePath: string | null
    cvOriginalFilename: string | null
    cvUploadedAt: Date | null
  }

  export type ApplicationMaxAggregateOutputType = {
    application_id: number | null
    user_id: number | null
    provider_id: number | null
    availability: string | null
    motivation: string | null
    status: string | null
    listing_id: number | null
    created_at: Date | null
    updated_at: Date | null
    availability: string | null
    motivation: string | null
    cvFilePath: string | null
    cvOriginalFilename: string | null
    cvUploadedAt: Date | null
  }

  export type ApplicationCountAggregateOutputType = {
    application_id: number
    user_id: number
    provider_id: number
    availability: number
    motivation: number
    status: number
    listing_id: number
    created_at: number
    updated_at: number
    availability: number
    motivation: number
    cvFilePath: number
    cvOriginalFilename: number
    cvUploadedAt: number
    _all: number
  }


  export type ApplicationAvgAggregateInputType = {
    application_id?: true
    user_id?: true
    provider_id?: true
    listing_id?: true
  }

  export type ApplicationSumAggregateInputType = {
    application_id?: true
    user_id?: true
    provider_id?: true
    listing_id?: true
  }

  export type ApplicationMinAggregateInputType = {
    application_id?: true
    user_id?: true
    provider_id?: true
    availability?: true
    motivation?: true
    status?: true
    listing_id?: true
    created_at?: true
    updated_at?: true
    availability?: true
    motivation?: true
    cvFilePath?: true
    cvOriginalFilename?: true
    cvUploadedAt?: true
  }

  export type ApplicationMaxAggregateInputType = {
    application_id?: true
    user_id?: true
    provider_id?: true
    availability?: true
    motivation?: true
    status?: true
    listing_id?: true
    created_at?: true
    updated_at?: true
    availability?: true
    motivation?: true
    cvFilePath?: true
    cvOriginalFilename?: true
    cvUploadedAt?: true
  }

  export type ApplicationCountAggregateInputType = {
    application_id?: true
    user_id?: true
    provider_id?: true
    availability?: true
    motivation?: true
    status?: true
    listing_id?: true
    created_at?: true
    updated_at?: true
    availability?: true
    motivation?: true
    cvFilePath?: true
    cvOriginalFilename?: true
    cvUploadedAt?: true
    _all?: true
  }

  export type ApplicationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Application to aggregate.
     */
    where?: ApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Applications to fetch.
     */
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Applications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Applications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Applications
    **/
    _count?: true | ApplicationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ApplicationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ApplicationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApplicationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApplicationMaxAggregateInputType
  }

  export type GetApplicationAggregateType<T extends ApplicationAggregateArgs> = {
        [P in keyof T & keyof AggregateApplication]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApplication[P]>
      : GetScalarType<T[P], AggregateApplication[P]>
  }




  export type ApplicationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicationWhereInput
    orderBy?: ApplicationOrderByWithAggregationInput | ApplicationOrderByWithAggregationInput[]
    by: ApplicationScalarFieldEnum[] | ApplicationScalarFieldEnum
    having?: ApplicationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApplicationCountAggregateInputType | true
    _avg?: ApplicationAvgAggregateInputType
    _sum?: ApplicationSumAggregateInputType
    _min?: ApplicationMinAggregateInputType
    _max?: ApplicationMaxAggregateInputType
  }

  export type ApplicationGroupByOutputType = {
    application_id: number
    user_id: number
    provider_id: number
    availability: string | null
    motivation: string | null
    status: string
    listing_id: number
    created_at: Date
    updated_at: Date
    availability: string | null
    motivation: string | null
    cvFilePath: string | null
    cvOriginalFilename: string | null
    cvUploadedAt: Date | null
    _count: ApplicationCountAggregateOutputType | null
    _avg: ApplicationAvgAggregateOutputType | null
    _sum: ApplicationSumAggregateOutputType | null
    _min: ApplicationMinAggregateOutputType | null
    _max: ApplicationMaxAggregateOutputType | null
  }

  type GetApplicationGroupByPayload<T extends ApplicationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApplicationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApplicationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApplicationGroupByOutputType[P]>
            : GetScalarType<T[P], ApplicationGroupByOutputType[P]>
        }
      >
    >


  export type ApplicationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    application_id?: boolean
    user_id?: boolean
    provider_id?: boolean
    availability?: boolean
    motivation?: boolean
    status?: boolean
    listing_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    availability?: boolean
    motivation?: boolean
    cvFilePath?: boolean
    cvOriginalFilename?: boolean
    cvUploadedAt?: boolean
    listing?: boolean | ListingDefaultArgs<ExtArgs>
    provider?: boolean | ProviderDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["application"]>



  export type ApplicationSelectScalar = {
    application_id?: boolean
    user_id?: boolean
    provider_id?: boolean
    availability?: boolean
    motivation?: boolean
    status?: boolean
    listing_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    availability?: boolean
    motivation?: boolean
    cvFilePath?: boolean
    cvOriginalFilename?: boolean
    cvUploadedAt?: boolean
  }

  export type ApplicationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"application_id" | "user_id" | "provider_id" | "status" | "listing_id" | "created_at" | "updated_at" | "availability" | "motivation" | "cvFilePath" | "cvOriginalFilename" | "cvUploadedAt", ExtArgs["result"]["application"]>
  export type ApplicationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listing?: boolean | ListingDefaultArgs<ExtArgs>
    provider?: boolean | ProviderDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ApplicationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Application"
    objects: {
      listing: Prisma.$ListingPayload<ExtArgs>
      provider: Prisma.$ProviderPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      application_id: number
      user_id: number
      provider_id: number
      availability: string | null
      motivation: string | null
      status: string
      listing_id: number
      created_at: Date
      updated_at: Date
      availability: string | null
      motivation: string | null
      cvFilePath: string | null
      cvOriginalFilename: string | null
      cvUploadedAt: Date | null
    }, ExtArgs["result"]["application"]>
    composites: {}
  }

  type ApplicationGetPayload<S extends boolean | null | undefined | ApplicationDefaultArgs> = $Result.GetResult<Prisma.$ApplicationPayload, S>

  type ApplicationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ApplicationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ApplicationCountAggregateInputType | true
    }

  export interface ApplicationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Application'], meta: { name: 'Application' } }
    /**
     * Find zero or one Application that matches the filter.
     * @param {ApplicationFindUniqueArgs} args - Arguments to find a Application
     * @example
     * // Get one Application
     * const application = await prisma.application.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApplicationFindUniqueArgs>(args: SelectSubset<T, ApplicationFindUniqueArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Application that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ApplicationFindUniqueOrThrowArgs} args - Arguments to find a Application
     * @example
     * // Get one Application
     * const application = await prisma.application.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApplicationFindUniqueOrThrowArgs>(args: SelectSubset<T, ApplicationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Application that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationFindFirstArgs} args - Arguments to find a Application
     * @example
     * // Get one Application
     * const application = await prisma.application.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApplicationFindFirstArgs>(args?: SelectSubset<T, ApplicationFindFirstArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Application that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationFindFirstOrThrowArgs} args - Arguments to find a Application
     * @example
     * // Get one Application
     * const application = await prisma.application.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApplicationFindFirstOrThrowArgs>(args?: SelectSubset<T, ApplicationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Applications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Applications
     * const applications = await prisma.application.findMany()
     * 
     * // Get first 10 Applications
     * const applications = await prisma.application.findMany({ take: 10 })
     * 
     * // Only select the `application_id`
     * const applicationWithApplication_idOnly = await prisma.application.findMany({ select: { application_id: true } })
     * 
     */
    findMany<T extends ApplicationFindManyArgs>(args?: SelectSubset<T, ApplicationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Application.
     * @param {ApplicationCreateArgs} args - Arguments to create a Application.
     * @example
     * // Create one Application
     * const Application = await prisma.application.create({
     *   data: {
     *     // ... data to create a Application
     *   }
     * })
     * 
     */
    create<T extends ApplicationCreateArgs>(args: SelectSubset<T, ApplicationCreateArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Applications.
     * @param {ApplicationCreateManyArgs} args - Arguments to create many Applications.
     * @example
     * // Create many Applications
     * const application = await prisma.application.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApplicationCreateManyArgs>(args?: SelectSubset<T, ApplicationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Application.
     * @param {ApplicationDeleteArgs} args - Arguments to delete one Application.
     * @example
     * // Delete one Application
     * const Application = await prisma.application.delete({
     *   where: {
     *     // ... filter to delete one Application
     *   }
     * })
     * 
     */
    delete<T extends ApplicationDeleteArgs>(args: SelectSubset<T, ApplicationDeleteArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Application.
     * @param {ApplicationUpdateArgs} args - Arguments to update one Application.
     * @example
     * // Update one Application
     * const application = await prisma.application.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApplicationUpdateArgs>(args: SelectSubset<T, ApplicationUpdateArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Applications.
     * @param {ApplicationDeleteManyArgs} args - Arguments to filter Applications to delete.
     * @example
     * // Delete a few Applications
     * const { count } = await prisma.application.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApplicationDeleteManyArgs>(args?: SelectSubset<T, ApplicationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Applications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Applications
     * const application = await prisma.application.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApplicationUpdateManyArgs>(args: SelectSubset<T, ApplicationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Application.
     * @param {ApplicationUpsertArgs} args - Arguments to update or create a Application.
     * @example
     * // Update or create a Application
     * const application = await prisma.application.upsert({
     *   create: {
     *     // ... data to create a Application
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Application we want to update
     *   }
     * })
     */
    upsert<T extends ApplicationUpsertArgs>(args: SelectSubset<T, ApplicationUpsertArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Applications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationCountArgs} args - Arguments to filter Applications to count.
     * @example
     * // Count the number of Applications
     * const count = await prisma.application.count({
     *   where: {
     *     // ... the filter for the Applications we want to count
     *   }
     * })
    **/
    count<T extends ApplicationCountArgs>(
      args?: Subset<T, ApplicationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApplicationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Application.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ApplicationAggregateArgs>(args: Subset<T, ApplicationAggregateArgs>): Prisma.PrismaPromise<GetApplicationAggregateType<T>>

    /**
     * Group by Application.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ApplicationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApplicationGroupByArgs['orderBy'] }
        : { orderBy?: ApplicationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ApplicationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApplicationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Application model
   */
  readonly fields: ApplicationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Application.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApplicationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    listing<T extends ListingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ListingDefaultArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    provider<T extends ProviderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProviderDefaultArgs<ExtArgs>>): Prisma__ProviderClient<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Application model
   */
  interface ApplicationFieldRefs {
    readonly application_id: FieldRef<"Application", 'Int'>
    readonly user_id: FieldRef<"Application", 'Int'>
    readonly provider_id: FieldRef<"Application", 'Int'>
    readonly availability: FieldRef<"Application", 'String'>
    readonly motivation: FieldRef<"Application", 'String'>
    readonly status: FieldRef<"Application", 'String'>
    readonly listing_id: FieldRef<"Application", 'Int'>
    readonly created_at: FieldRef<"Application", 'DateTime'>
    readonly updated_at: FieldRef<"Application", 'DateTime'>
    readonly availability: FieldRef<"Application", 'String'>
    readonly motivation: FieldRef<"Application", 'String'>
    readonly cvFilePath: FieldRef<"Application", 'String'>
    readonly cvOriginalFilename: FieldRef<"Application", 'String'>
    readonly cvUploadedAt: FieldRef<"Application", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Application findUnique
   */
  export type ApplicationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter, which Application to fetch.
     */
    where: ApplicationWhereUniqueInput
  }

  /**
   * Application findUniqueOrThrow
   */
  export type ApplicationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter, which Application to fetch.
     */
    where: ApplicationWhereUniqueInput
  }

  /**
   * Application findFirst
   */
  export type ApplicationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter, which Application to fetch.
     */
    where?: ApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Applications to fetch.
     */
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Applications.
     */
    cursor?: ApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Applications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Applications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Applications.
     */
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[]
  }

  /**
   * Application findFirstOrThrow
   */
  export type ApplicationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter, which Application to fetch.
     */
    where?: ApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Applications to fetch.
     */
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Applications.
     */
    cursor?: ApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Applications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Applications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Applications.
     */
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[]
  }

  /**
   * Application findMany
   */
  export type ApplicationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter, which Applications to fetch.
     */
    where?: ApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Applications to fetch.
     */
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Applications.
     */
    cursor?: ApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Applications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Applications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Applications.
     */
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[]
  }

  /**
   * Application create
   */
  export type ApplicationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * The data needed to create a Application.
     */
    data: XOR<ApplicationCreateInput, ApplicationUncheckedCreateInput>
  }

  /**
   * Application createMany
   */
  export type ApplicationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Applications.
     */
    data: ApplicationCreateManyInput | ApplicationCreateManyInput[]
  }

  /**
   * Application update
   */
  export type ApplicationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * The data needed to update a Application.
     */
    data: XOR<ApplicationUpdateInput, ApplicationUncheckedUpdateInput>
    /**
     * Choose, which Application to update.
     */
    where: ApplicationWhereUniqueInput
  }

  /**
   * Application updateMany
   */
  export type ApplicationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Applications.
     */
    data: XOR<ApplicationUpdateManyMutationInput, ApplicationUncheckedUpdateManyInput>
    /**
     * Filter which Applications to update
     */
    where?: ApplicationWhereInput
    /**
     * Limit how many Applications to update.
     */
    limit?: number
  }

  /**
   * Application upsert
   */
  export type ApplicationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * The filter to search for the Application to update in case it exists.
     */
    where: ApplicationWhereUniqueInput
    /**
     * In case the Application found by the `where` argument doesn't exist, create a new Application with this data.
     */
    create: XOR<ApplicationCreateInput, ApplicationUncheckedCreateInput>
    /**
     * In case the Application was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApplicationUpdateInput, ApplicationUncheckedUpdateInput>
  }

  /**
   * Application delete
   */
  export type ApplicationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter which Application to delete.
     */
    where: ApplicationWhereUniqueInput
  }

  /**
   * Application deleteMany
   */
  export type ApplicationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Applications to delete
     */
    where?: ApplicationWhereInput
    /**
     * Limit how many Applications to delete.
     */
    limit?: number
  }

  /**
   * Application without action
   */
  export type ApplicationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
  }


  /**
   * Model Skill
   */

  export type AggregateSkill = {
    _count: SkillCountAggregateOutputType | null
    _avg: SkillAvgAggregateOutputType | null
    _sum: SkillSumAggregateOutputType | null
    _min: SkillMinAggregateOutputType | null
    _max: SkillMaxAggregateOutputType | null
  }

  export type SkillAvgAggregateOutputType = {
    skill_id: number | null
    nqf_level: number | null
  }

  export type SkillSumAggregateOutputType = {
    skill_id: number | null
    nqf_level: number | null
  }

  export type SkillMinAggregateOutputType = {
    skill_id: number | null
    name: string | null
    nqf_level: number | null
    saqa_id: string | null
    sector: string | null
  }

  export type SkillMaxAggregateOutputType = {
    skill_id: number | null
    name: string | null
    nqf_level: number | null
    saqa_id: string | null
    sector: string | null
  }

  export type SkillCountAggregateOutputType = {
    skill_id: number
    name: number
    nqf_level: number
    saqa_id: number
    sector: number
    _all: number
  }


  export type SkillAvgAggregateInputType = {
    skill_id?: true
    nqf_level?: true
  }

  export type SkillSumAggregateInputType = {
    skill_id?: true
    nqf_level?: true
  }

  export type SkillMinAggregateInputType = {
    skill_id?: true
    name?: true
    nqf_level?: true
    saqa_id?: true
    sector?: true
  }

  export type SkillMaxAggregateInputType = {
    skill_id?: true
    name?: true
    nqf_level?: true
    saqa_id?: true
    sector?: true
  }

  export type SkillCountAggregateInputType = {
    skill_id?: true
    name?: true
    nqf_level?: true
    saqa_id?: true
    sector?: true
    _all?: true
  }

  export type SkillAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Skill to aggregate.
     */
    where?: SkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Skills to fetch.
     */
    orderBy?: SkillOrderByWithRelationInput | SkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Skills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Skills
    **/
    _count?: true | SkillCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SkillAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SkillSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SkillMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SkillMaxAggregateInputType
  }

  export type GetSkillAggregateType<T extends SkillAggregateArgs> = {
        [P in keyof T & keyof AggregateSkill]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSkill[P]>
      : GetScalarType<T[P], AggregateSkill[P]>
  }




  export type SkillGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SkillWhereInput
    orderBy?: SkillOrderByWithAggregationInput | SkillOrderByWithAggregationInput[]
    by: SkillScalarFieldEnum[] | SkillScalarFieldEnum
    having?: SkillScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SkillCountAggregateInputType | true
    _avg?: SkillAvgAggregateInputType
    _sum?: SkillSumAggregateInputType
    _min?: SkillMinAggregateInputType
    _max?: SkillMaxAggregateInputType
  }

  export type SkillGroupByOutputType = {
    skill_id: number
    name: string
    nqf_level: number | null
    saqa_id: string | null
    sector: string | null
    _count: SkillCountAggregateOutputType | null
    _avg: SkillAvgAggregateOutputType | null
    _sum: SkillSumAggregateOutputType | null
    _min: SkillMinAggregateOutputType | null
    _max: SkillMaxAggregateOutputType | null
  }

  type GetSkillGroupByPayload<T extends SkillGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SkillGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SkillGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SkillGroupByOutputType[P]>
            : GetScalarType<T[P], SkillGroupByOutputType[P]>
        }
      >
    >


  export type SkillSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    skill_id?: boolean
    name?: boolean
    nqf_level?: boolean
    saqa_id?: boolean
    sector?: boolean
    applicantSkills?: boolean | Skill$applicantSkillsArgs<ExtArgs>
    _count?: boolean | SkillCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["skill"]>



  export type SkillSelectScalar = {
    skill_id?: boolean
    name?: boolean
    nqf_level?: boolean
    saqa_id?: boolean
    sector?: boolean
  }

  export type SkillOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"skill_id" | "name" | "nqf_level" | "saqa_id" | "sector", ExtArgs["result"]["skill"]>
  export type SkillInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applicantSkills?: boolean | Skill$applicantSkillsArgs<ExtArgs>
    _count?: boolean | SkillCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $SkillPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Skill"
    objects: {
      applicantSkills: Prisma.$ApplicantSkillPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      skill_id: number
      name: string
      nqf_level: number | null
      saqa_id: string | null
      sector: string | null
    }, ExtArgs["result"]["skill"]>
    composites: {}
  }

  type SkillGetPayload<S extends boolean | null | undefined | SkillDefaultArgs> = $Result.GetResult<Prisma.$SkillPayload, S>

  type SkillCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SkillFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SkillCountAggregateInputType | true
    }

  export interface SkillDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Skill'], meta: { name: 'Skill' } }
    /**
     * Find zero or one Skill that matches the filter.
     * @param {SkillFindUniqueArgs} args - Arguments to find a Skill
     * @example
     * // Get one Skill
     * const skill = await prisma.skill.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SkillFindUniqueArgs>(args: SelectSubset<T, SkillFindUniqueArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Skill that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SkillFindUniqueOrThrowArgs} args - Arguments to find a Skill
     * @example
     * // Get one Skill
     * const skill = await prisma.skill.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SkillFindUniqueOrThrowArgs>(args: SelectSubset<T, SkillFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Skill that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillFindFirstArgs} args - Arguments to find a Skill
     * @example
     * // Get one Skill
     * const skill = await prisma.skill.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SkillFindFirstArgs>(args?: SelectSubset<T, SkillFindFirstArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Skill that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillFindFirstOrThrowArgs} args - Arguments to find a Skill
     * @example
     * // Get one Skill
     * const skill = await prisma.skill.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SkillFindFirstOrThrowArgs>(args?: SelectSubset<T, SkillFindFirstOrThrowArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Skills that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Skills
     * const skills = await prisma.skill.findMany()
     * 
     * // Get first 10 Skills
     * const skills = await prisma.skill.findMany({ take: 10 })
     * 
     * // Only select the `skill_id`
     * const skillWithSkill_idOnly = await prisma.skill.findMany({ select: { skill_id: true } })
     * 
     */
    findMany<T extends SkillFindManyArgs>(args?: SelectSubset<T, SkillFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Skill.
     * @param {SkillCreateArgs} args - Arguments to create a Skill.
     * @example
     * // Create one Skill
     * const Skill = await prisma.skill.create({
     *   data: {
     *     // ... data to create a Skill
     *   }
     * })
     * 
     */
    create<T extends SkillCreateArgs>(args: SelectSubset<T, SkillCreateArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Skills.
     * @param {SkillCreateManyArgs} args - Arguments to create many Skills.
     * @example
     * // Create many Skills
     * const skill = await prisma.skill.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SkillCreateManyArgs>(args?: SelectSubset<T, SkillCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Skill.
     * @param {SkillDeleteArgs} args - Arguments to delete one Skill.
     * @example
     * // Delete one Skill
     * const Skill = await prisma.skill.delete({
     *   where: {
     *     // ... filter to delete one Skill
     *   }
     * })
     * 
     */
    delete<T extends SkillDeleteArgs>(args: SelectSubset<T, SkillDeleteArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Skill.
     * @param {SkillUpdateArgs} args - Arguments to update one Skill.
     * @example
     * // Update one Skill
     * const skill = await prisma.skill.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SkillUpdateArgs>(args: SelectSubset<T, SkillUpdateArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Skills.
     * @param {SkillDeleteManyArgs} args - Arguments to filter Skills to delete.
     * @example
     * // Delete a few Skills
     * const { count } = await prisma.skill.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SkillDeleteManyArgs>(args?: SelectSubset<T, SkillDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Skills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Skills
     * const skill = await prisma.skill.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SkillUpdateManyArgs>(args: SelectSubset<T, SkillUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Skill.
     * @param {SkillUpsertArgs} args - Arguments to update or create a Skill.
     * @example
     * // Update or create a Skill
     * const skill = await prisma.skill.upsert({
     *   create: {
     *     // ... data to create a Skill
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Skill we want to update
     *   }
     * })
     */
    upsert<T extends SkillUpsertArgs>(args: SelectSubset<T, SkillUpsertArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Skills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillCountArgs} args - Arguments to filter Skills to count.
     * @example
     * // Count the number of Skills
     * const count = await prisma.skill.count({
     *   where: {
     *     // ... the filter for the Skills we want to count
     *   }
     * })
    **/
    count<T extends SkillCountArgs>(
      args?: Subset<T, SkillCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SkillCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Skill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SkillAggregateArgs>(args: Subset<T, SkillAggregateArgs>): Prisma.PrismaPromise<GetSkillAggregateType<T>>

    /**
     * Group by Skill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SkillGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SkillGroupByArgs['orderBy'] }
        : { orderBy?: SkillGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SkillGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSkillGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Skill model
   */
  readonly fields: SkillFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Skill.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SkillClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    applicantSkills<T extends Skill$applicantSkillsArgs<ExtArgs> = {}>(args?: Subset<T, Skill$applicantSkillsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicantSkillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Skill model
   */
  interface SkillFieldRefs {
    readonly skill_id: FieldRef<"Skill", 'Int'>
    readonly name: FieldRef<"Skill", 'String'>
    readonly nqf_level: FieldRef<"Skill", 'Int'>
    readonly saqa_id: FieldRef<"Skill", 'String'>
    readonly sector: FieldRef<"Skill", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Skill findUnique
   */
  export type SkillFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * Filter, which Skill to fetch.
     */
    where: SkillWhereUniqueInput
  }

  /**
   * Skill findUniqueOrThrow
   */
  export type SkillFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * Filter, which Skill to fetch.
     */
    where: SkillWhereUniqueInput
  }

  /**
   * Skill findFirst
   */
  export type SkillFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * Filter, which Skill to fetch.
     */
    where?: SkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Skills to fetch.
     */
    orderBy?: SkillOrderByWithRelationInput | SkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Skills.
     */
    cursor?: SkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Skills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Skills.
     */
    distinct?: SkillScalarFieldEnum | SkillScalarFieldEnum[]
  }

  /**
   * Skill findFirstOrThrow
   */
  export type SkillFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * Filter, which Skill to fetch.
     */
    where?: SkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Skills to fetch.
     */
    orderBy?: SkillOrderByWithRelationInput | SkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Skills.
     */
    cursor?: SkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Skills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Skills.
     */
    distinct?: SkillScalarFieldEnum | SkillScalarFieldEnum[]
  }

  /**
   * Skill findMany
   */
  export type SkillFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * Filter, which Skills to fetch.
     */
    where?: SkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Skills to fetch.
     */
    orderBy?: SkillOrderByWithRelationInput | SkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Skills.
     */
    cursor?: SkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Skills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Skills.
     */
    distinct?: SkillScalarFieldEnum | SkillScalarFieldEnum[]
  }

  /**
   * Skill create
   */
  export type SkillCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * The data needed to create a Skill.
     */
    data: XOR<SkillCreateInput, SkillUncheckedCreateInput>
  }

  /**
   * Skill createMany
   */
  export type SkillCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Skills.
     */
    data: SkillCreateManyInput | SkillCreateManyInput[]
  }

  /**
   * Skill update
   */
  export type SkillUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * The data needed to update a Skill.
     */
    data: XOR<SkillUpdateInput, SkillUncheckedUpdateInput>
    /**
     * Choose, which Skill to update.
     */
    where: SkillWhereUniqueInput
  }

  /**
   * Skill updateMany
   */
  export type SkillUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Skills.
     */
    data: XOR<SkillUpdateManyMutationInput, SkillUncheckedUpdateManyInput>
    /**
     * Filter which Skills to update
     */
    where?: SkillWhereInput
    /**
     * Limit how many Skills to update.
     */
    limit?: number
  }

  /**
   * Skill upsert
   */
  export type SkillUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * The filter to search for the Skill to update in case it exists.
     */
    where: SkillWhereUniqueInput
    /**
     * In case the Skill found by the `where` argument doesn't exist, create a new Skill with this data.
     */
    create: XOR<SkillCreateInput, SkillUncheckedCreateInput>
    /**
     * In case the Skill was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SkillUpdateInput, SkillUncheckedUpdateInput>
  }

  /**
   * Skill delete
   */
  export type SkillDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * Filter which Skill to delete.
     */
    where: SkillWhereUniqueInput
  }

  /**
   * Skill deleteMany
   */
  export type SkillDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Skills to delete
     */
    where?: SkillWhereInput
    /**
     * Limit how many Skills to delete.
     */
    limit?: number
  }

  /**
   * Skill.applicantSkills
   */
  export type Skill$applicantSkillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicantSkill
     */
    select?: ApplicantSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicantSkill
     */
    omit?: ApplicantSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicantSkillInclude<ExtArgs> | null
    where?: ApplicantSkillWhereInput
    orderBy?: ApplicantSkillOrderByWithRelationInput | ApplicantSkillOrderByWithRelationInput[]
    cursor?: ApplicantSkillWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApplicantSkillScalarFieldEnum | ApplicantSkillScalarFieldEnum[]
  }

  /**
   * Skill without action
   */
  export type SkillDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
  }


  /**
   * Model ApplicantSkill
   */

  export type AggregateApplicantSkill = {
    _count: ApplicantSkillCountAggregateOutputType | null
    _avg: ApplicantSkillAvgAggregateOutputType | null
    _sum: ApplicantSkillSumAggregateOutputType | null
    _min: ApplicantSkillMinAggregateOutputType | null
    _max: ApplicantSkillMaxAggregateOutputType | null
  }

  export type ApplicantSkillAvgAggregateOutputType = {
    id: number | null
    applicant_id: number | null
    skill_id: number | null
  }

  export type ApplicantSkillSumAggregateOutputType = {
    id: number | null
    applicant_id: number | null
    skill_id: number | null
  }

  export type ApplicantSkillMinAggregateOutputType = {
    id: number | null
    applicant_id: number | null
    skill_id: number | null
  }

  export type ApplicantSkillMaxAggregateOutputType = {
    id: number | null
    applicant_id: number | null
    skill_id: number | null
  }

  export type ApplicantSkillCountAggregateOutputType = {
    id: number
    applicant_id: number
    skill_id: number
    _all: number
  }


  export type ApplicantSkillAvgAggregateInputType = {
    id?: true
    applicant_id?: true
    skill_id?: true
  }

  export type ApplicantSkillSumAggregateInputType = {
    id?: true
    applicant_id?: true
    skill_id?: true
  }

  export type ApplicantSkillMinAggregateInputType = {
    id?: true
    applicant_id?: true
    skill_id?: true
  }

  export type ApplicantSkillMaxAggregateInputType = {
    id?: true
    applicant_id?: true
    skill_id?: true
  }

  export type ApplicantSkillCountAggregateInputType = {
    id?: true
    applicant_id?: true
    skill_id?: true
    _all?: true
  }

  export type ApplicantSkillAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApplicantSkill to aggregate.
     */
    where?: ApplicantSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApplicantSkills to fetch.
     */
    orderBy?: ApplicantSkillOrderByWithRelationInput | ApplicantSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApplicantSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApplicantSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApplicantSkills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ApplicantSkills
    **/
    _count?: true | ApplicantSkillCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ApplicantSkillAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ApplicantSkillSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApplicantSkillMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApplicantSkillMaxAggregateInputType
  }

  export type GetApplicantSkillAggregateType<T extends ApplicantSkillAggregateArgs> = {
        [P in keyof T & keyof AggregateApplicantSkill]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApplicantSkill[P]>
      : GetScalarType<T[P], AggregateApplicantSkill[P]>
  }




  export type ApplicantSkillGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicantSkillWhereInput
    orderBy?: ApplicantSkillOrderByWithAggregationInput | ApplicantSkillOrderByWithAggregationInput[]
    by: ApplicantSkillScalarFieldEnum[] | ApplicantSkillScalarFieldEnum
    having?: ApplicantSkillScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApplicantSkillCountAggregateInputType | true
    _avg?: ApplicantSkillAvgAggregateInputType
    _sum?: ApplicantSkillSumAggregateInputType
    _min?: ApplicantSkillMinAggregateInputType
    _max?: ApplicantSkillMaxAggregateInputType
  }

  export type ApplicantSkillGroupByOutputType = {
    id: number
    applicant_id: number
    skill_id: number
    _count: ApplicantSkillCountAggregateOutputType | null
    _avg: ApplicantSkillAvgAggregateOutputType | null
    _sum: ApplicantSkillSumAggregateOutputType | null
    _min: ApplicantSkillMinAggregateOutputType | null
    _max: ApplicantSkillMaxAggregateOutputType | null
  }

  type GetApplicantSkillGroupByPayload<T extends ApplicantSkillGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApplicantSkillGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApplicantSkillGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApplicantSkillGroupByOutputType[P]>
            : GetScalarType<T[P], ApplicantSkillGroupByOutputType[P]>
        }
      >
    >


  export type ApplicantSkillSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    applicant_id?: boolean
    skill_id?: boolean
    applicant?: boolean | ApplicantProfileDefaultArgs<ExtArgs>
    skill?: boolean | SkillDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["applicantSkill"]>



  export type ApplicantSkillSelectScalar = {
    id?: boolean
    applicant_id?: boolean
    skill_id?: boolean
  }

  export type ApplicantSkillOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "applicant_id" | "skill_id", ExtArgs["result"]["applicantSkill"]>
  export type ApplicantSkillInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applicant?: boolean | ApplicantProfileDefaultArgs<ExtArgs>
    skill?: boolean | SkillDefaultArgs<ExtArgs>
  }

  export type $ApplicantSkillPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ApplicantSkill"
    objects: {
      applicant: Prisma.$ApplicantProfilePayload<ExtArgs>
      skill: Prisma.$SkillPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      applicant_id: number
      skill_id: number
    }, ExtArgs["result"]["applicantSkill"]>
    composites: {}
  }

  type ApplicantSkillGetPayload<S extends boolean | null | undefined | ApplicantSkillDefaultArgs> = $Result.GetResult<Prisma.$ApplicantSkillPayload, S>

  type ApplicantSkillCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ApplicantSkillFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ApplicantSkillCountAggregateInputType | true
    }

  export interface ApplicantSkillDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ApplicantSkill'], meta: { name: 'ApplicantSkill' } }
    /**
     * Find zero or one ApplicantSkill that matches the filter.
     * @param {ApplicantSkillFindUniqueArgs} args - Arguments to find a ApplicantSkill
     * @example
     * // Get one ApplicantSkill
     * const applicantSkill = await prisma.applicantSkill.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApplicantSkillFindUniqueArgs>(args: SelectSubset<T, ApplicantSkillFindUniqueArgs<ExtArgs>>): Prisma__ApplicantSkillClient<$Result.GetResult<Prisma.$ApplicantSkillPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ApplicantSkill that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ApplicantSkillFindUniqueOrThrowArgs} args - Arguments to find a ApplicantSkill
     * @example
     * // Get one ApplicantSkill
     * const applicantSkill = await prisma.applicantSkill.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApplicantSkillFindUniqueOrThrowArgs>(args: SelectSubset<T, ApplicantSkillFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApplicantSkillClient<$Result.GetResult<Prisma.$ApplicantSkillPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApplicantSkill that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicantSkillFindFirstArgs} args - Arguments to find a ApplicantSkill
     * @example
     * // Get one ApplicantSkill
     * const applicantSkill = await prisma.applicantSkill.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApplicantSkillFindFirstArgs>(args?: SelectSubset<T, ApplicantSkillFindFirstArgs<ExtArgs>>): Prisma__ApplicantSkillClient<$Result.GetResult<Prisma.$ApplicantSkillPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApplicantSkill that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicantSkillFindFirstOrThrowArgs} args - Arguments to find a ApplicantSkill
     * @example
     * // Get one ApplicantSkill
     * const applicantSkill = await prisma.applicantSkill.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApplicantSkillFindFirstOrThrowArgs>(args?: SelectSubset<T, ApplicantSkillFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApplicantSkillClient<$Result.GetResult<Prisma.$ApplicantSkillPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ApplicantSkills that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicantSkillFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ApplicantSkills
     * const applicantSkills = await prisma.applicantSkill.findMany()
     * 
     * // Get first 10 ApplicantSkills
     * const applicantSkills = await prisma.applicantSkill.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const applicantSkillWithIdOnly = await prisma.applicantSkill.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApplicantSkillFindManyArgs>(args?: SelectSubset<T, ApplicantSkillFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicantSkillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ApplicantSkill.
     * @param {ApplicantSkillCreateArgs} args - Arguments to create a ApplicantSkill.
     * @example
     * // Create one ApplicantSkill
     * const ApplicantSkill = await prisma.applicantSkill.create({
     *   data: {
     *     // ... data to create a ApplicantSkill
     *   }
     * })
     * 
     */
    create<T extends ApplicantSkillCreateArgs>(args: SelectSubset<T, ApplicantSkillCreateArgs<ExtArgs>>): Prisma__ApplicantSkillClient<$Result.GetResult<Prisma.$ApplicantSkillPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ApplicantSkills.
     * @param {ApplicantSkillCreateManyArgs} args - Arguments to create many ApplicantSkills.
     * @example
     * // Create many ApplicantSkills
     * const applicantSkill = await prisma.applicantSkill.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApplicantSkillCreateManyArgs>(args?: SelectSubset<T, ApplicantSkillCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ApplicantSkill.
     * @param {ApplicantSkillDeleteArgs} args - Arguments to delete one ApplicantSkill.
     * @example
     * // Delete one ApplicantSkill
     * const ApplicantSkill = await prisma.applicantSkill.delete({
     *   where: {
     *     // ... filter to delete one ApplicantSkill
     *   }
     * })
     * 
     */
    delete<T extends ApplicantSkillDeleteArgs>(args: SelectSubset<T, ApplicantSkillDeleteArgs<ExtArgs>>): Prisma__ApplicantSkillClient<$Result.GetResult<Prisma.$ApplicantSkillPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ApplicantSkill.
     * @param {ApplicantSkillUpdateArgs} args - Arguments to update one ApplicantSkill.
     * @example
     * // Update one ApplicantSkill
     * const applicantSkill = await prisma.applicantSkill.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApplicantSkillUpdateArgs>(args: SelectSubset<T, ApplicantSkillUpdateArgs<ExtArgs>>): Prisma__ApplicantSkillClient<$Result.GetResult<Prisma.$ApplicantSkillPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ApplicantSkills.
     * @param {ApplicantSkillDeleteManyArgs} args - Arguments to filter ApplicantSkills to delete.
     * @example
     * // Delete a few ApplicantSkills
     * const { count } = await prisma.applicantSkill.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApplicantSkillDeleteManyArgs>(args?: SelectSubset<T, ApplicantSkillDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApplicantSkills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicantSkillUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ApplicantSkills
     * const applicantSkill = await prisma.applicantSkill.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApplicantSkillUpdateManyArgs>(args: SelectSubset<T, ApplicantSkillUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ApplicantSkill.
     * @param {ApplicantSkillUpsertArgs} args - Arguments to update or create a ApplicantSkill.
     * @example
     * // Update or create a ApplicantSkill
     * const applicantSkill = await prisma.applicantSkill.upsert({
     *   create: {
     *     // ... data to create a ApplicantSkill
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ApplicantSkill we want to update
     *   }
     * })
     */
    upsert<T extends ApplicantSkillUpsertArgs>(args: SelectSubset<T, ApplicantSkillUpsertArgs<ExtArgs>>): Prisma__ApplicantSkillClient<$Result.GetResult<Prisma.$ApplicantSkillPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ApplicantSkills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicantSkillCountArgs} args - Arguments to filter ApplicantSkills to count.
     * @example
     * // Count the number of ApplicantSkills
     * const count = await prisma.applicantSkill.count({
     *   where: {
     *     // ... the filter for the ApplicantSkills we want to count
     *   }
     * })
    **/
    count<T extends ApplicantSkillCountArgs>(
      args?: Subset<T, ApplicantSkillCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApplicantSkillCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ApplicantSkill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicantSkillAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ApplicantSkillAggregateArgs>(args: Subset<T, ApplicantSkillAggregateArgs>): Prisma.PrismaPromise<GetApplicantSkillAggregateType<T>>

    /**
     * Group by ApplicantSkill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicantSkillGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ApplicantSkillGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApplicantSkillGroupByArgs['orderBy'] }
        : { orderBy?: ApplicantSkillGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ApplicantSkillGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApplicantSkillGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ApplicantSkill model
   */
  readonly fields: ApplicantSkillFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ApplicantSkill.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApplicantSkillClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    applicant<T extends ApplicantProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ApplicantProfileDefaultArgs<ExtArgs>>): Prisma__ApplicantProfileClient<$Result.GetResult<Prisma.$ApplicantProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    skill<T extends SkillDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SkillDefaultArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ApplicantSkill model
   */
  interface ApplicantSkillFieldRefs {
    readonly id: FieldRef<"ApplicantSkill", 'Int'>
    readonly applicant_id: FieldRef<"ApplicantSkill", 'Int'>
    readonly skill_id: FieldRef<"ApplicantSkill", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ApplicantSkill findUnique
   */
  export type ApplicantSkillFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicantSkill
     */
    select?: ApplicantSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicantSkill
     */
    omit?: ApplicantSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicantSkillInclude<ExtArgs> | null
    /**
     * Filter, which ApplicantSkill to fetch.
     */
    where: ApplicantSkillWhereUniqueInput
  }

  /**
   * ApplicantSkill findUniqueOrThrow
   */
  export type ApplicantSkillFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicantSkill
     */
    select?: ApplicantSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicantSkill
     */
    omit?: ApplicantSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicantSkillInclude<ExtArgs> | null
    /**
     * Filter, which ApplicantSkill to fetch.
     */
    where: ApplicantSkillWhereUniqueInput
  }

  /**
   * ApplicantSkill findFirst
   */
  export type ApplicantSkillFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicantSkill
     */
    select?: ApplicantSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicantSkill
     */
    omit?: ApplicantSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicantSkillInclude<ExtArgs> | null
    /**
     * Filter, which ApplicantSkill to fetch.
     */
    where?: ApplicantSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApplicantSkills to fetch.
     */
    orderBy?: ApplicantSkillOrderByWithRelationInput | ApplicantSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApplicantSkills.
     */
    cursor?: ApplicantSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApplicantSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApplicantSkills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApplicantSkills.
     */
    distinct?: ApplicantSkillScalarFieldEnum | ApplicantSkillScalarFieldEnum[]
  }

  /**
   * ApplicantSkill findFirstOrThrow
   */
  export type ApplicantSkillFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicantSkill
     */
    select?: ApplicantSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicantSkill
     */
    omit?: ApplicantSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicantSkillInclude<ExtArgs> | null
    /**
     * Filter, which ApplicantSkill to fetch.
     */
    where?: ApplicantSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApplicantSkills to fetch.
     */
    orderBy?: ApplicantSkillOrderByWithRelationInput | ApplicantSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApplicantSkills.
     */
    cursor?: ApplicantSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApplicantSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApplicantSkills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApplicantSkills.
     */
    distinct?: ApplicantSkillScalarFieldEnum | ApplicantSkillScalarFieldEnum[]
  }

  /**
   * ApplicantSkill findMany
   */
  export type ApplicantSkillFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicantSkill
     */
    select?: ApplicantSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicantSkill
     */
    omit?: ApplicantSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicantSkillInclude<ExtArgs> | null
    /**
     * Filter, which ApplicantSkills to fetch.
     */
    where?: ApplicantSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApplicantSkills to fetch.
     */
    orderBy?: ApplicantSkillOrderByWithRelationInput | ApplicantSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ApplicantSkills.
     */
    cursor?: ApplicantSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApplicantSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApplicantSkills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApplicantSkills.
     */
    distinct?: ApplicantSkillScalarFieldEnum | ApplicantSkillScalarFieldEnum[]
  }

  /**
   * ApplicantSkill create
   */
  export type ApplicantSkillCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicantSkill
     */
    select?: ApplicantSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicantSkill
     */
    omit?: ApplicantSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicantSkillInclude<ExtArgs> | null
    /**
     * The data needed to create a ApplicantSkill.
     */
    data: XOR<ApplicantSkillCreateInput, ApplicantSkillUncheckedCreateInput>
  }

  /**
   * ApplicantSkill createMany
   */
  export type ApplicantSkillCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ApplicantSkills.
     */
    data: ApplicantSkillCreateManyInput | ApplicantSkillCreateManyInput[]
  }

  /**
   * ApplicantSkill update
   */
  export type ApplicantSkillUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicantSkill
     */
    select?: ApplicantSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicantSkill
     */
    omit?: ApplicantSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicantSkillInclude<ExtArgs> | null
    /**
     * The data needed to update a ApplicantSkill.
     */
    data: XOR<ApplicantSkillUpdateInput, ApplicantSkillUncheckedUpdateInput>
    /**
     * Choose, which ApplicantSkill to update.
     */
    where: ApplicantSkillWhereUniqueInput
  }

  /**
   * ApplicantSkill updateMany
   */
  export type ApplicantSkillUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ApplicantSkills.
     */
    data: XOR<ApplicantSkillUpdateManyMutationInput, ApplicantSkillUncheckedUpdateManyInput>
    /**
     * Filter which ApplicantSkills to update
     */
    where?: ApplicantSkillWhereInput
    /**
     * Limit how many ApplicantSkills to update.
     */
    limit?: number
  }

  /**
   * ApplicantSkill upsert
   */
  export type ApplicantSkillUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicantSkill
     */
    select?: ApplicantSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicantSkill
     */
    omit?: ApplicantSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicantSkillInclude<ExtArgs> | null
    /**
     * The filter to search for the ApplicantSkill to update in case it exists.
     */
    where: ApplicantSkillWhereUniqueInput
    /**
     * In case the ApplicantSkill found by the `where` argument doesn't exist, create a new ApplicantSkill with this data.
     */
    create: XOR<ApplicantSkillCreateInput, ApplicantSkillUncheckedCreateInput>
    /**
     * In case the ApplicantSkill was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApplicantSkillUpdateInput, ApplicantSkillUncheckedUpdateInput>
  }

  /**
   * ApplicantSkill delete
   */
  export type ApplicantSkillDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicantSkill
     */
    select?: ApplicantSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicantSkill
     */
    omit?: ApplicantSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicantSkillInclude<ExtArgs> | null
    /**
     * Filter which ApplicantSkill to delete.
     */
    where: ApplicantSkillWhereUniqueInput
  }

  /**
   * ApplicantSkill deleteMany
   */
  export type ApplicantSkillDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApplicantSkills to delete
     */
    where?: ApplicantSkillWhereInput
    /**
     * Limit how many ApplicantSkills to delete.
     */
    limit?: number
  }

  /**
   * ApplicantSkill without action
   */
  export type ApplicantSkillDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicantSkill
     */
    select?: ApplicantSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicantSkill
     */
    omit?: ApplicantSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicantSkillInclude<ExtArgs> | null
  }


  /**
   * Model Qualification
   */

  export type AggregateQualification = {
    _count: QualificationCountAggregateOutputType | null
    _avg: QualificationAvgAggregateOutputType | null
    _sum: QualificationSumAggregateOutputType | null
    _min: QualificationMinAggregateOutputType | null
    _max: QualificationMaxAggregateOutputType | null
  }

  export type QualificationAvgAggregateOutputType = {
    qualification_id: number | null
    nqf_level: number | null
  }

  export type QualificationSumAggregateOutputType = {
    qualification_id: number | null
    nqf_level: number | null
  }

  export type QualificationMinAggregateOutputType = {
    qualification_id: number | null
    name: string | null
    nqf_level: number | null
    saqa_id: string | null
    sector: string | null
    originator: string | null
  }

  export type QualificationMaxAggregateOutputType = {
    qualification_id: number | null
    name: string | null
    nqf_level: number | null
    saqa_id: string | null
    sector: string | null
    originator: string | null
  }

  export type QualificationCountAggregateOutputType = {
    qualification_id: number
    name: number
    nqf_level: number
    saqa_id: number
    sector: number
    originator: number
    _all: number
  }


  export type QualificationAvgAggregateInputType = {
    qualification_id?: true
    nqf_level?: true
  }

  export type QualificationSumAggregateInputType = {
    qualification_id?: true
    nqf_level?: true
  }

  export type QualificationMinAggregateInputType = {
    qualification_id?: true
    name?: true
    nqf_level?: true
    saqa_id?: true
    sector?: true
    originator?: true
  }

  export type QualificationMaxAggregateInputType = {
    qualification_id?: true
    name?: true
    nqf_level?: true
    saqa_id?: true
    sector?: true
    originator?: true
  }

  export type QualificationCountAggregateInputType = {
    qualification_id?: true
    name?: true
    nqf_level?: true
    saqa_id?: true
    sector?: true
    originator?: true
    _all?: true
  }

  export type QualificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Qualification to aggregate.
     */
    where?: QualificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Qualifications to fetch.
     */
    orderBy?: QualificationOrderByWithRelationInput | QualificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QualificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Qualifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Qualifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Qualifications
    **/
    _count?: true | QualificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QualificationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QualificationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QualificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QualificationMaxAggregateInputType
  }

  export type GetQualificationAggregateType<T extends QualificationAggregateArgs> = {
        [P in keyof T & keyof AggregateQualification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQualification[P]>
      : GetScalarType<T[P], AggregateQualification[P]>
  }




  export type QualificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QualificationWhereInput
    orderBy?: QualificationOrderByWithAggregationInput | QualificationOrderByWithAggregationInput[]
    by: QualificationScalarFieldEnum[] | QualificationScalarFieldEnum
    having?: QualificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QualificationCountAggregateInputType | true
    _avg?: QualificationAvgAggregateInputType
    _sum?: QualificationSumAggregateInputType
    _min?: QualificationMinAggregateInputType
    _max?: QualificationMaxAggregateInputType
  }

  export type QualificationGroupByOutputType = {
    qualification_id: number
    name: string
    nqf_level: number
    saqa_id: string | null
    sector: string | null
    originator: string | null
    _count: QualificationCountAggregateOutputType | null
    _avg: QualificationAvgAggregateOutputType | null
    _sum: QualificationSumAggregateOutputType | null
    _min: QualificationMinAggregateOutputType | null
    _max: QualificationMaxAggregateOutputType | null
  }

  type GetQualificationGroupByPayload<T extends QualificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QualificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QualificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QualificationGroupByOutputType[P]>
            : GetScalarType<T[P], QualificationGroupByOutputType[P]>
        }
      >
    >


  export type QualificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    qualification_id?: boolean
    name?: boolean
    nqf_level?: boolean
    saqa_id?: boolean
    sector?: boolean
    originator?: boolean
    applicantQualifications?: boolean | Qualification$applicantQualificationsArgs<ExtArgs>
    _count?: boolean | QualificationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["qualification"]>



  export type QualificationSelectScalar = {
    qualification_id?: boolean
    name?: boolean
    nqf_level?: boolean
    saqa_id?: boolean
    sector?: boolean
    originator?: boolean
  }

  export type QualificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"qualification_id" | "name" | "nqf_level" | "saqa_id" | "sector" | "originator", ExtArgs["result"]["qualification"]>
  export type QualificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applicantQualifications?: boolean | Qualification$applicantQualificationsArgs<ExtArgs>
    _count?: boolean | QualificationCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $QualificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Qualification"
    objects: {
      applicantQualifications: Prisma.$ApplicantQualificationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      qualification_id: number
      name: string
      nqf_level: number
      saqa_id: string | null
      sector: string | null
      originator: string | null
    }, ExtArgs["result"]["qualification"]>
    composites: {}
  }

  type QualificationGetPayload<S extends boolean | null | undefined | QualificationDefaultArgs> = $Result.GetResult<Prisma.$QualificationPayload, S>

  type QualificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QualificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QualificationCountAggregateInputType | true
    }

  export interface QualificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Qualification'], meta: { name: 'Qualification' } }
    /**
     * Find zero or one Qualification that matches the filter.
     * @param {QualificationFindUniqueArgs} args - Arguments to find a Qualification
     * @example
     * // Get one Qualification
     * const qualification = await prisma.qualification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QualificationFindUniqueArgs>(args: SelectSubset<T, QualificationFindUniqueArgs<ExtArgs>>): Prisma__QualificationClient<$Result.GetResult<Prisma.$QualificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Qualification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QualificationFindUniqueOrThrowArgs} args - Arguments to find a Qualification
     * @example
     * // Get one Qualification
     * const qualification = await prisma.qualification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QualificationFindUniqueOrThrowArgs>(args: SelectSubset<T, QualificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QualificationClient<$Result.GetResult<Prisma.$QualificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Qualification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QualificationFindFirstArgs} args - Arguments to find a Qualification
     * @example
     * // Get one Qualification
     * const qualification = await prisma.qualification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QualificationFindFirstArgs>(args?: SelectSubset<T, QualificationFindFirstArgs<ExtArgs>>): Prisma__QualificationClient<$Result.GetResult<Prisma.$QualificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Qualification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QualificationFindFirstOrThrowArgs} args - Arguments to find a Qualification
     * @example
     * // Get one Qualification
     * const qualification = await prisma.qualification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QualificationFindFirstOrThrowArgs>(args?: SelectSubset<T, QualificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__QualificationClient<$Result.GetResult<Prisma.$QualificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Qualifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QualificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Qualifications
     * const qualifications = await prisma.qualification.findMany()
     * 
     * // Get first 10 Qualifications
     * const qualifications = await prisma.qualification.findMany({ take: 10 })
     * 
     * // Only select the `qualification_id`
     * const qualificationWithQualification_idOnly = await prisma.qualification.findMany({ select: { qualification_id: true } })
     * 
     */
    findMany<T extends QualificationFindManyArgs>(args?: SelectSubset<T, QualificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QualificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Qualification.
     * @param {QualificationCreateArgs} args - Arguments to create a Qualification.
     * @example
     * // Create one Qualification
     * const Qualification = await prisma.qualification.create({
     *   data: {
     *     // ... data to create a Qualification
     *   }
     * })
     * 
     */
    create<T extends QualificationCreateArgs>(args: SelectSubset<T, QualificationCreateArgs<ExtArgs>>): Prisma__QualificationClient<$Result.GetResult<Prisma.$QualificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Qualifications.
     * @param {QualificationCreateManyArgs} args - Arguments to create many Qualifications.
     * @example
     * // Create many Qualifications
     * const qualification = await prisma.qualification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QualificationCreateManyArgs>(args?: SelectSubset<T, QualificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Qualification.
     * @param {QualificationDeleteArgs} args - Arguments to delete one Qualification.
     * @example
     * // Delete one Qualification
     * const Qualification = await prisma.qualification.delete({
     *   where: {
     *     // ... filter to delete one Qualification
     *   }
     * })
     * 
     */
    delete<T extends QualificationDeleteArgs>(args: SelectSubset<T, QualificationDeleteArgs<ExtArgs>>): Prisma__QualificationClient<$Result.GetResult<Prisma.$QualificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Qualification.
     * @param {QualificationUpdateArgs} args - Arguments to update one Qualification.
     * @example
     * // Update one Qualification
     * const qualification = await prisma.qualification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QualificationUpdateArgs>(args: SelectSubset<T, QualificationUpdateArgs<ExtArgs>>): Prisma__QualificationClient<$Result.GetResult<Prisma.$QualificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Qualifications.
     * @param {QualificationDeleteManyArgs} args - Arguments to filter Qualifications to delete.
     * @example
     * // Delete a few Qualifications
     * const { count } = await prisma.qualification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QualificationDeleteManyArgs>(args?: SelectSubset<T, QualificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Qualifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QualificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Qualifications
     * const qualification = await prisma.qualification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QualificationUpdateManyArgs>(args: SelectSubset<T, QualificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Qualification.
     * @param {QualificationUpsertArgs} args - Arguments to update or create a Qualification.
     * @example
     * // Update or create a Qualification
     * const qualification = await prisma.qualification.upsert({
     *   create: {
     *     // ... data to create a Qualification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Qualification we want to update
     *   }
     * })
     */
    upsert<T extends QualificationUpsertArgs>(args: SelectSubset<T, QualificationUpsertArgs<ExtArgs>>): Prisma__QualificationClient<$Result.GetResult<Prisma.$QualificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Qualifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QualificationCountArgs} args - Arguments to filter Qualifications to count.
     * @example
     * // Count the number of Qualifications
     * const count = await prisma.qualification.count({
     *   where: {
     *     // ... the filter for the Qualifications we want to count
     *   }
     * })
    **/
    count<T extends QualificationCountArgs>(
      args?: Subset<T, QualificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QualificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Qualification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QualificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QualificationAggregateArgs>(args: Subset<T, QualificationAggregateArgs>): Prisma.PrismaPromise<GetQualificationAggregateType<T>>

    /**
     * Group by Qualification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QualificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QualificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QualificationGroupByArgs['orderBy'] }
        : { orderBy?: QualificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QualificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQualificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Qualification model
   */
  readonly fields: QualificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Qualification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QualificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    applicantQualifications<T extends Qualification$applicantQualificationsArgs<ExtArgs> = {}>(args?: Subset<T, Qualification$applicantQualificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicantQualificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Qualification model
   */
  interface QualificationFieldRefs {
    readonly qualification_id: FieldRef<"Qualification", 'Int'>
    readonly name: FieldRef<"Qualification", 'String'>
    readonly nqf_level: FieldRef<"Qualification", 'Int'>
    readonly saqa_id: FieldRef<"Qualification", 'String'>
    readonly sector: FieldRef<"Qualification", 'String'>
    readonly originator: FieldRef<"Qualification", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Qualification findUnique
   */
  export type QualificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Qualification
     */
    select?: QualificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Qualification
     */
    omit?: QualificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QualificationInclude<ExtArgs> | null
    /**
     * Filter, which Qualification to fetch.
     */
    where: QualificationWhereUniqueInput
  }

  /**
   * Qualification findUniqueOrThrow
   */
  export type QualificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Qualification
     */
    select?: QualificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Qualification
     */
    omit?: QualificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QualificationInclude<ExtArgs> | null
    /**
     * Filter, which Qualification to fetch.
     */
    where: QualificationWhereUniqueInput
  }

  /**
   * Qualification findFirst
   */
  export type QualificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Qualification
     */
    select?: QualificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Qualification
     */
    omit?: QualificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QualificationInclude<ExtArgs> | null
    /**
     * Filter, which Qualification to fetch.
     */
    where?: QualificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Qualifications to fetch.
     */
    orderBy?: QualificationOrderByWithRelationInput | QualificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Qualifications.
     */
    cursor?: QualificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Qualifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Qualifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Qualifications.
     */
    distinct?: QualificationScalarFieldEnum | QualificationScalarFieldEnum[]
  }

  /**
   * Qualification findFirstOrThrow
   */
  export type QualificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Qualification
     */
    select?: QualificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Qualification
     */
    omit?: QualificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QualificationInclude<ExtArgs> | null
    /**
     * Filter, which Qualification to fetch.
     */
    where?: QualificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Qualifications to fetch.
     */
    orderBy?: QualificationOrderByWithRelationInput | QualificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Qualifications.
     */
    cursor?: QualificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Qualifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Qualifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Qualifications.
     */
    distinct?: QualificationScalarFieldEnum | QualificationScalarFieldEnum[]
  }

  /**
   * Qualification findMany
   */
  export type QualificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Qualification
     */
    select?: QualificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Qualification
     */
    omit?: QualificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QualificationInclude<ExtArgs> | null
    /**
     * Filter, which Qualifications to fetch.
     */
    where?: QualificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Qualifications to fetch.
     */
    orderBy?: QualificationOrderByWithRelationInput | QualificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Qualifications.
     */
    cursor?: QualificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Qualifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Qualifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Qualifications.
     */
    distinct?: QualificationScalarFieldEnum | QualificationScalarFieldEnum[]
  }

  /**
   * Qualification create
   */
  export type QualificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Qualification
     */
    select?: QualificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Qualification
     */
    omit?: QualificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QualificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Qualification.
     */
    data: XOR<QualificationCreateInput, QualificationUncheckedCreateInput>
  }

  /**
   * Qualification createMany
   */
  export type QualificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Qualifications.
     */
    data: QualificationCreateManyInput | QualificationCreateManyInput[]
  }

  /**
   * Qualification update
   */
  export type QualificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Qualification
     */
    select?: QualificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Qualification
     */
    omit?: QualificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QualificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Qualification.
     */
    data: XOR<QualificationUpdateInput, QualificationUncheckedUpdateInput>
    /**
     * Choose, which Qualification to update.
     */
    where: QualificationWhereUniqueInput
  }

  /**
   * Qualification updateMany
   */
  export type QualificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Qualifications.
     */
    data: XOR<QualificationUpdateManyMutationInput, QualificationUncheckedUpdateManyInput>
    /**
     * Filter which Qualifications to update
     */
    where?: QualificationWhereInput
    /**
     * Limit how many Qualifications to update.
     */
    limit?: number
  }

  /**
   * Qualification upsert
   */
  export type QualificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Qualification
     */
    select?: QualificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Qualification
     */
    omit?: QualificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QualificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Qualification to update in case it exists.
     */
    where: QualificationWhereUniqueInput
    /**
     * In case the Qualification found by the `where` argument doesn't exist, create a new Qualification with this data.
     */
    create: XOR<QualificationCreateInput, QualificationUncheckedCreateInput>
    /**
     * In case the Qualification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QualificationUpdateInput, QualificationUncheckedUpdateInput>
  }

  /**
   * Qualification delete
   */
  export type QualificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Qualification
     */
    select?: QualificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Qualification
     */
    omit?: QualificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QualificationInclude<ExtArgs> | null
    /**
     * Filter which Qualification to delete.
     */
    where: QualificationWhereUniqueInput
  }

  /**
   * Qualification deleteMany
   */
  export type QualificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Qualifications to delete
     */
    where?: QualificationWhereInput
    /**
     * Limit how many Qualifications to delete.
     */
    limit?: number
  }

  /**
   * Qualification.applicantQualifications
   */
  export type Qualification$applicantQualificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicantQualification
     */
    select?: ApplicantQualificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicantQualification
     */
    omit?: ApplicantQualificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicantQualificationInclude<ExtArgs> | null
    where?: ApplicantQualificationWhereInput
    orderBy?: ApplicantQualificationOrderByWithRelationInput | ApplicantQualificationOrderByWithRelationInput[]
    cursor?: ApplicantQualificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApplicantQualificationScalarFieldEnum | ApplicantQualificationScalarFieldEnum[]
  }

  /**
   * Qualification without action
   */
  export type QualificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Qualification
     */
    select?: QualificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Qualification
     */
    omit?: QualificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QualificationInclude<ExtArgs> | null
  }


  /**
   * Model ApplicantQualification
   */

  export type AggregateApplicantQualification = {
    _count: ApplicantQualificationCountAggregateOutputType | null
    _avg: ApplicantQualificationAvgAggregateOutputType | null
    _sum: ApplicantQualificationSumAggregateOutputType | null
    _min: ApplicantQualificationMinAggregateOutputType | null
    _max: ApplicantQualificationMaxAggregateOutputType | null
  }

  export type ApplicantQualificationAvgAggregateOutputType = {
    id: number | null
    applicant_id: number | null
    qualification_id: number | null
    year_completed: number | null
  }

  export type ApplicantQualificationSumAggregateOutputType = {
    id: number | null
    applicant_id: number | null
    qualification_id: number | null
    year_completed: number | null
  }

  export type ApplicantQualificationMinAggregateOutputType = {
    id: number | null
    applicant_id: number | null
    qualification_id: number | null
    institution: string | null
    year_completed: number | null
  }

  export type ApplicantQualificationMaxAggregateOutputType = {
    id: number | null
    applicant_id: number | null
    qualification_id: number | null
    institution: string | null
    year_completed: number | null
  }

  export type ApplicantQualificationCountAggregateOutputType = {
    id: number
    applicant_id: number
    qualification_id: number
    institution: number
    year_completed: number
    _all: number
  }


  export type ApplicantQualificationAvgAggregateInputType = {
    id?: true
    applicant_id?: true
    qualification_id?: true
    year_completed?: true
  }

  export type ApplicantQualificationSumAggregateInputType = {
    id?: true
    applicant_id?: true
    qualification_id?: true
    year_completed?: true
  }

  export type ApplicantQualificationMinAggregateInputType = {
    id?: true
    applicant_id?: true
    qualification_id?: true
    institution?: true
    year_completed?: true
  }

  export type ApplicantQualificationMaxAggregateInputType = {
    id?: true
    applicant_id?: true
    qualification_id?: true
    institution?: true
    year_completed?: true
  }

  export type ApplicantQualificationCountAggregateInputType = {
    id?: true
    applicant_id?: true
    qualification_id?: true
    institution?: true
    year_completed?: true
    _all?: true
  }

  export type ApplicantQualificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApplicantQualification to aggregate.
     */
    where?: ApplicantQualificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApplicantQualifications to fetch.
     */
    orderBy?: ApplicantQualificationOrderByWithRelationInput | ApplicantQualificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApplicantQualificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApplicantQualifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApplicantQualifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ApplicantQualifications
    **/
    _count?: true | ApplicantQualificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ApplicantQualificationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ApplicantQualificationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApplicantQualificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApplicantQualificationMaxAggregateInputType
  }

  export type GetApplicantQualificationAggregateType<T extends ApplicantQualificationAggregateArgs> = {
        [P in keyof T & keyof AggregateApplicantQualification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApplicantQualification[P]>
      : GetScalarType<T[P], AggregateApplicantQualification[P]>
  }




  export type ApplicantQualificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicantQualificationWhereInput
    orderBy?: ApplicantQualificationOrderByWithAggregationInput | ApplicantQualificationOrderByWithAggregationInput[]
    by: ApplicantQualificationScalarFieldEnum[] | ApplicantQualificationScalarFieldEnum
    having?: ApplicantQualificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApplicantQualificationCountAggregateInputType | true
    _avg?: ApplicantQualificationAvgAggregateInputType
    _sum?: ApplicantQualificationSumAggregateInputType
    _min?: ApplicantQualificationMinAggregateInputType
    _max?: ApplicantQualificationMaxAggregateInputType
  }

  export type ApplicantQualificationGroupByOutputType = {
    id: number
    applicant_id: number
    qualification_id: number
    institution: string | null
    year_completed: number | null
    _count: ApplicantQualificationCountAggregateOutputType | null
    _avg: ApplicantQualificationAvgAggregateOutputType | null
    _sum: ApplicantQualificationSumAggregateOutputType | null
    _min: ApplicantQualificationMinAggregateOutputType | null
    _max: ApplicantQualificationMaxAggregateOutputType | null
  }

  type GetApplicantQualificationGroupByPayload<T extends ApplicantQualificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApplicantQualificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApplicantQualificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApplicantQualificationGroupByOutputType[P]>
            : GetScalarType<T[P], ApplicantQualificationGroupByOutputType[P]>
        }
      >
    >


  export type ApplicantQualificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    applicant_id?: boolean
    qualification_id?: boolean
    institution?: boolean
    year_completed?: boolean
    applicant?: boolean | ApplicantProfileDefaultArgs<ExtArgs>
    qualification?: boolean | QualificationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["applicantQualification"]>



  export type ApplicantQualificationSelectScalar = {
    id?: boolean
    applicant_id?: boolean
    qualification_id?: boolean
    institution?: boolean
    year_completed?: boolean
  }

  export type ApplicantQualificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "applicant_id" | "qualification_id" | "institution" | "year_completed", ExtArgs["result"]["applicantQualification"]>
  export type ApplicantQualificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applicant?: boolean | ApplicantProfileDefaultArgs<ExtArgs>
    qualification?: boolean | QualificationDefaultArgs<ExtArgs>
  }

  export type $ApplicantQualificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ApplicantQualification"
    objects: {
      applicant: Prisma.$ApplicantProfilePayload<ExtArgs>
      qualification: Prisma.$QualificationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      applicant_id: number
      qualification_id: number
      institution: string | null
      year_completed: number | null
    }, ExtArgs["result"]["applicantQualification"]>
    composites: {}
  }

  type ApplicantQualificationGetPayload<S extends boolean | null | undefined | ApplicantQualificationDefaultArgs> = $Result.GetResult<Prisma.$ApplicantQualificationPayload, S>

  type ApplicantQualificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ApplicantQualificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ApplicantQualificationCountAggregateInputType | true
    }

  export interface ApplicantQualificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ApplicantQualification'], meta: { name: 'ApplicantQualification' } }
    /**
     * Find zero or one ApplicantQualification that matches the filter.
     * @param {ApplicantQualificationFindUniqueArgs} args - Arguments to find a ApplicantQualification
     * @example
     * // Get one ApplicantQualification
     * const applicantQualification = await prisma.applicantQualification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApplicantQualificationFindUniqueArgs>(args: SelectSubset<T, ApplicantQualificationFindUniqueArgs<ExtArgs>>): Prisma__ApplicantQualificationClient<$Result.GetResult<Prisma.$ApplicantQualificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ApplicantQualification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ApplicantQualificationFindUniqueOrThrowArgs} args - Arguments to find a ApplicantQualification
     * @example
     * // Get one ApplicantQualification
     * const applicantQualification = await prisma.applicantQualification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApplicantQualificationFindUniqueOrThrowArgs>(args: SelectSubset<T, ApplicantQualificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApplicantQualificationClient<$Result.GetResult<Prisma.$ApplicantQualificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApplicantQualification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicantQualificationFindFirstArgs} args - Arguments to find a ApplicantQualification
     * @example
     * // Get one ApplicantQualification
     * const applicantQualification = await prisma.applicantQualification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApplicantQualificationFindFirstArgs>(args?: SelectSubset<T, ApplicantQualificationFindFirstArgs<ExtArgs>>): Prisma__ApplicantQualificationClient<$Result.GetResult<Prisma.$ApplicantQualificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApplicantQualification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicantQualificationFindFirstOrThrowArgs} args - Arguments to find a ApplicantQualification
     * @example
     * // Get one ApplicantQualification
     * const applicantQualification = await prisma.applicantQualification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApplicantQualificationFindFirstOrThrowArgs>(args?: SelectSubset<T, ApplicantQualificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApplicantQualificationClient<$Result.GetResult<Prisma.$ApplicantQualificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ApplicantQualifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicantQualificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ApplicantQualifications
     * const applicantQualifications = await prisma.applicantQualification.findMany()
     * 
     * // Get first 10 ApplicantQualifications
     * const applicantQualifications = await prisma.applicantQualification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const applicantQualificationWithIdOnly = await prisma.applicantQualification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApplicantQualificationFindManyArgs>(args?: SelectSubset<T, ApplicantQualificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicantQualificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ApplicantQualification.
     * @param {ApplicantQualificationCreateArgs} args - Arguments to create a ApplicantQualification.
     * @example
     * // Create one ApplicantQualification
     * const ApplicantQualification = await prisma.applicantQualification.create({
     *   data: {
     *     // ... data to create a ApplicantQualification
     *   }
     * })
     * 
     */
    create<T extends ApplicantQualificationCreateArgs>(args: SelectSubset<T, ApplicantQualificationCreateArgs<ExtArgs>>): Prisma__ApplicantQualificationClient<$Result.GetResult<Prisma.$ApplicantQualificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ApplicantQualifications.
     * @param {ApplicantQualificationCreateManyArgs} args - Arguments to create many ApplicantQualifications.
     * @example
     * // Create many ApplicantQualifications
     * const applicantQualification = await prisma.applicantQualification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApplicantQualificationCreateManyArgs>(args?: SelectSubset<T, ApplicantQualificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ApplicantQualification.
     * @param {ApplicantQualificationDeleteArgs} args - Arguments to delete one ApplicantQualification.
     * @example
     * // Delete one ApplicantQualification
     * const ApplicantQualification = await prisma.applicantQualification.delete({
     *   where: {
     *     // ... filter to delete one ApplicantQualification
     *   }
     * })
     * 
     */
    delete<T extends ApplicantQualificationDeleteArgs>(args: SelectSubset<T, ApplicantQualificationDeleteArgs<ExtArgs>>): Prisma__ApplicantQualificationClient<$Result.GetResult<Prisma.$ApplicantQualificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ApplicantQualification.
     * @param {ApplicantQualificationUpdateArgs} args - Arguments to update one ApplicantQualification.
     * @example
     * // Update one ApplicantQualification
     * const applicantQualification = await prisma.applicantQualification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApplicantQualificationUpdateArgs>(args: SelectSubset<T, ApplicantQualificationUpdateArgs<ExtArgs>>): Prisma__ApplicantQualificationClient<$Result.GetResult<Prisma.$ApplicantQualificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ApplicantQualifications.
     * @param {ApplicantQualificationDeleteManyArgs} args - Arguments to filter ApplicantQualifications to delete.
     * @example
     * // Delete a few ApplicantQualifications
     * const { count } = await prisma.applicantQualification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApplicantQualificationDeleteManyArgs>(args?: SelectSubset<T, ApplicantQualificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApplicantQualifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicantQualificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ApplicantQualifications
     * const applicantQualification = await prisma.applicantQualification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApplicantQualificationUpdateManyArgs>(args: SelectSubset<T, ApplicantQualificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ApplicantQualification.
     * @param {ApplicantQualificationUpsertArgs} args - Arguments to update or create a ApplicantQualification.
     * @example
     * // Update or create a ApplicantQualification
     * const applicantQualification = await prisma.applicantQualification.upsert({
     *   create: {
     *     // ... data to create a ApplicantQualification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ApplicantQualification we want to update
     *   }
     * })
     */
    upsert<T extends ApplicantQualificationUpsertArgs>(args: SelectSubset<T, ApplicantQualificationUpsertArgs<ExtArgs>>): Prisma__ApplicantQualificationClient<$Result.GetResult<Prisma.$ApplicantQualificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ApplicantQualifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicantQualificationCountArgs} args - Arguments to filter ApplicantQualifications to count.
     * @example
     * // Count the number of ApplicantQualifications
     * const count = await prisma.applicantQualification.count({
     *   where: {
     *     // ... the filter for the ApplicantQualifications we want to count
     *   }
     * })
    **/
    count<T extends ApplicantQualificationCountArgs>(
      args?: Subset<T, ApplicantQualificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApplicantQualificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ApplicantQualification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicantQualificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ApplicantQualificationAggregateArgs>(args: Subset<T, ApplicantQualificationAggregateArgs>): Prisma.PrismaPromise<GetApplicantQualificationAggregateType<T>>

    /**
     * Group by ApplicantQualification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicantQualificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ApplicantQualificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApplicantQualificationGroupByArgs['orderBy'] }
        : { orderBy?: ApplicantQualificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ApplicantQualificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApplicantQualificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ApplicantQualification model
   */
  readonly fields: ApplicantQualificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ApplicantQualification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApplicantQualificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    applicant<T extends ApplicantProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ApplicantProfileDefaultArgs<ExtArgs>>): Prisma__ApplicantProfileClient<$Result.GetResult<Prisma.$ApplicantProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    qualification<T extends QualificationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QualificationDefaultArgs<ExtArgs>>): Prisma__QualificationClient<$Result.GetResult<Prisma.$QualificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ApplicantQualification model
   */
  interface ApplicantQualificationFieldRefs {
    readonly id: FieldRef<"ApplicantQualification", 'Int'>
    readonly applicant_id: FieldRef<"ApplicantQualification", 'Int'>
    readonly qualification_id: FieldRef<"ApplicantQualification", 'Int'>
    readonly institution: FieldRef<"ApplicantQualification", 'String'>
    readonly year_completed: FieldRef<"ApplicantQualification", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ApplicantQualification findUnique
   */
  export type ApplicantQualificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicantQualification
     */
    select?: ApplicantQualificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicantQualification
     */
    omit?: ApplicantQualificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicantQualificationInclude<ExtArgs> | null
    /**
     * Filter, which ApplicantQualification to fetch.
     */
    where: ApplicantQualificationWhereUniqueInput
  }

  /**
   * ApplicantQualification findUniqueOrThrow
   */
  export type ApplicantQualificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicantQualification
     */
    select?: ApplicantQualificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicantQualification
     */
    omit?: ApplicantQualificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicantQualificationInclude<ExtArgs> | null
    /**
     * Filter, which ApplicantQualification to fetch.
     */
    where: ApplicantQualificationWhereUniqueInput
  }

  /**
   * ApplicantQualification findFirst
   */
  export type ApplicantQualificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicantQualification
     */
    select?: ApplicantQualificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicantQualification
     */
    omit?: ApplicantQualificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicantQualificationInclude<ExtArgs> | null
    /**
     * Filter, which ApplicantQualification to fetch.
     */
    where?: ApplicantQualificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApplicantQualifications to fetch.
     */
    orderBy?: ApplicantQualificationOrderByWithRelationInput | ApplicantQualificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApplicantQualifications.
     */
    cursor?: ApplicantQualificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApplicantQualifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApplicantQualifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApplicantQualifications.
     */
    distinct?: ApplicantQualificationScalarFieldEnum | ApplicantQualificationScalarFieldEnum[]
  }

  /**
   * ApplicantQualification findFirstOrThrow
   */
  export type ApplicantQualificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicantQualification
     */
    select?: ApplicantQualificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicantQualification
     */
    omit?: ApplicantQualificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicantQualificationInclude<ExtArgs> | null
    /**
     * Filter, which ApplicantQualification to fetch.
     */
    where?: ApplicantQualificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApplicantQualifications to fetch.
     */
    orderBy?: ApplicantQualificationOrderByWithRelationInput | ApplicantQualificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApplicantQualifications.
     */
    cursor?: ApplicantQualificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApplicantQualifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApplicantQualifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApplicantQualifications.
     */
    distinct?: ApplicantQualificationScalarFieldEnum | ApplicantQualificationScalarFieldEnum[]
  }

  /**
   * ApplicantQualification findMany
   */
  export type ApplicantQualificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicantQualification
     */
    select?: ApplicantQualificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicantQualification
     */
    omit?: ApplicantQualificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicantQualificationInclude<ExtArgs> | null
    /**
     * Filter, which ApplicantQualifications to fetch.
     */
    where?: ApplicantQualificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApplicantQualifications to fetch.
     */
    orderBy?: ApplicantQualificationOrderByWithRelationInput | ApplicantQualificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ApplicantQualifications.
     */
    cursor?: ApplicantQualificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApplicantQualifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApplicantQualifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApplicantQualifications.
     */
    distinct?: ApplicantQualificationScalarFieldEnum | ApplicantQualificationScalarFieldEnum[]
  }

  /**
   * ApplicantQualification create
   */
  export type ApplicantQualificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicantQualification
     */
    select?: ApplicantQualificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicantQualification
     */
    omit?: ApplicantQualificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicantQualificationInclude<ExtArgs> | null
    /**
     * The data needed to create a ApplicantQualification.
     */
    data: XOR<ApplicantQualificationCreateInput, ApplicantQualificationUncheckedCreateInput>
  }

  /**
   * ApplicantQualification createMany
   */
  export type ApplicantQualificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ApplicantQualifications.
     */
    data: ApplicantQualificationCreateManyInput | ApplicantQualificationCreateManyInput[]
  }

  /**
   * ApplicantQualification update
   */
  export type ApplicantQualificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicantQualification
     */
    select?: ApplicantQualificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicantQualification
     */
    omit?: ApplicantQualificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicantQualificationInclude<ExtArgs> | null
    /**
     * The data needed to update a ApplicantQualification.
     */
    data: XOR<ApplicantQualificationUpdateInput, ApplicantQualificationUncheckedUpdateInput>
    /**
     * Choose, which ApplicantQualification to update.
     */
    where: ApplicantQualificationWhereUniqueInput
  }

  /**
   * ApplicantQualification updateMany
   */
  export type ApplicantQualificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ApplicantQualifications.
     */
    data: XOR<ApplicantQualificationUpdateManyMutationInput, ApplicantQualificationUncheckedUpdateManyInput>
    /**
     * Filter which ApplicantQualifications to update
     */
    where?: ApplicantQualificationWhereInput
    /**
     * Limit how many ApplicantQualifications to update.
     */
    limit?: number
  }

  /**
   * ApplicantQualification upsert
   */
  export type ApplicantQualificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicantQualification
     */
    select?: ApplicantQualificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicantQualification
     */
    omit?: ApplicantQualificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicantQualificationInclude<ExtArgs> | null
    /**
     * The filter to search for the ApplicantQualification to update in case it exists.
     */
    where: ApplicantQualificationWhereUniqueInput
    /**
     * In case the ApplicantQualification found by the `where` argument doesn't exist, create a new ApplicantQualification with this data.
     */
    create: XOR<ApplicantQualificationCreateInput, ApplicantQualificationUncheckedCreateInput>
    /**
     * In case the ApplicantQualification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApplicantQualificationUpdateInput, ApplicantQualificationUncheckedUpdateInput>
  }

  /**
   * ApplicantQualification delete
   */
  export type ApplicantQualificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicantQualification
     */
    select?: ApplicantQualificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicantQualification
     */
    omit?: ApplicantQualificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicantQualificationInclude<ExtArgs> | null
    /**
     * Filter which ApplicantQualification to delete.
     */
    where: ApplicantQualificationWhereUniqueInput
  }

  /**
   * ApplicantQualification deleteMany
   */
  export type ApplicantQualificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApplicantQualifications to delete
     */
    where?: ApplicantQualificationWhereInput
    /**
     * Limit how many ApplicantQualifications to delete.
     */
    limit?: number
  }

  /**
   * ApplicantQualification without action
   */
  export type ApplicantQualificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApplicantQualification
     */
    select?: ApplicantQualificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApplicantQualification
     */
    omit?: ApplicantQualificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicantQualificationInclude<ExtArgs> | null
  }


  /**
   * Model Report
   */

  export type AggregateReport = {
    _count: ReportCountAggregateOutputType | null
    _avg: ReportAvgAggregateOutputType | null
    _sum: ReportSumAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  export type ReportAvgAggregateOutputType = {
    report_id: number | null
    listing_id: number | null
  }

  export type ReportSumAggregateOutputType = {
    report_id: number | null
    listing_id: number | null
  }

  export type ReportMinAggregateOutputType = {
    report_id: number | null
    listing_id: number | null
    reason: string | null
    details: string | null
    reported_by: string | null
    status: string | null
    created_at: Date | null
  }

  export type ReportMaxAggregateOutputType = {
    report_id: number | null
    listing_id: number | null
    reason: string | null
    details: string | null
    reported_by: string | null
    status: string | null
    created_at: Date | null
  }

  export type ReportCountAggregateOutputType = {
    report_id: number
    listing_id: number
    reason: number
    details: number
    reported_by: number
    status: number
    created_at: number
    _all: number
  }


  export type ReportAvgAggregateInputType = {
    report_id?: true
    listing_id?: true
  }

  export type ReportSumAggregateInputType = {
    report_id?: true
    listing_id?: true
  }

  export type ReportMinAggregateInputType = {
    report_id?: true
    listing_id?: true
    reason?: true
    details?: true
    reported_by?: true
    status?: true
    created_at?: true
  }

  export type ReportMaxAggregateInputType = {
    report_id?: true
    listing_id?: true
    reason?: true
    details?: true
    reported_by?: true
    status?: true
    created_at?: true
  }

  export type ReportCountAggregateInputType = {
    report_id?: true
    listing_id?: true
    reason?: true
    details?: true
    reported_by?: true
    status?: true
    created_at?: true
    _all?: true
  }

  export type ReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Report to aggregate.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reports
    **/
    _count?: true | ReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReportAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReportSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReportMaxAggregateInputType
  }

  export type GetReportAggregateType<T extends ReportAggregateArgs> = {
        [P in keyof T & keyof AggregateReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReport[P]>
      : GetScalarType<T[P], AggregateReport[P]>
  }




  export type ReportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
    orderBy?: ReportOrderByWithAggregationInput | ReportOrderByWithAggregationInput[]
    by: ReportScalarFieldEnum[] | ReportScalarFieldEnum
    having?: ReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReportCountAggregateInputType | true
    _avg?: ReportAvgAggregateInputType
    _sum?: ReportSumAggregateInputType
    _min?: ReportMinAggregateInputType
    _max?: ReportMaxAggregateInputType
  }

  export type ReportGroupByOutputType = {
    report_id: number
    listing_id: number
    reason: string
    details: string | null
    reported_by: string
    status: string
    created_at: Date
    _count: ReportCountAggregateOutputType | null
    _avg: ReportAvgAggregateOutputType | null
    _sum: ReportSumAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  type GetReportGroupByPayload<T extends ReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReportGroupByOutputType[P]>
            : GetScalarType<T[P], ReportGroupByOutputType[P]>
        }
      >
    >


  export type ReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    report_id?: boolean
    listing_id?: boolean
    reason?: boolean
    details?: boolean
    reported_by?: boolean
    status?: boolean
    created_at?: boolean
    Listing?: boolean | ListingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>



  export type ReportSelectScalar = {
    report_id?: boolean
    listing_id?: boolean
    reason?: boolean
    details?: boolean
    reported_by?: boolean
    status?: boolean
    created_at?: boolean
  }

  export type ReportOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"report_id" | "listing_id" | "reason" | "details" | "reported_by" | "status" | "created_at", ExtArgs["result"]["report"]>
  export type ReportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Listing?: boolean | ListingDefaultArgs<ExtArgs>
  }

  export type $ReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Report"
    objects: {
      Listing: Prisma.$ListingPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      report_id: number
      listing_id: number
      reason: string
      details: string | null
      reported_by: string
      status: string
      created_at: Date
    }, ExtArgs["result"]["report"]>
    composites: {}
  }

  type ReportGetPayload<S extends boolean | null | undefined | ReportDefaultArgs> = $Result.GetResult<Prisma.$ReportPayload, S>

  type ReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReportCountAggregateInputType | true
    }

  export interface ReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Report'], meta: { name: 'Report' } }
    /**
     * Find zero or one Report that matches the filter.
     * @param {ReportFindUniqueArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReportFindUniqueArgs>(args: SelectSubset<T, ReportFindUniqueArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Report that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReportFindUniqueOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReportFindUniqueOrThrowArgs>(args: SelectSubset<T, ReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Report that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReportFindFirstArgs>(args?: SelectSubset<T, ReportFindFirstArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Report that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReportFindFirstOrThrowArgs>(args?: SelectSubset<T, ReportFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reports
     * const reports = await prisma.report.findMany()
     * 
     * // Get first 10 Reports
     * const reports = await prisma.report.findMany({ take: 10 })
     * 
     * // Only select the `report_id`
     * const reportWithReport_idOnly = await prisma.report.findMany({ select: { report_id: true } })
     * 
     */
    findMany<T extends ReportFindManyArgs>(args?: SelectSubset<T, ReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Report.
     * @param {ReportCreateArgs} args - Arguments to create a Report.
     * @example
     * // Create one Report
     * const Report = await prisma.report.create({
     *   data: {
     *     // ... data to create a Report
     *   }
     * })
     * 
     */
    create<T extends ReportCreateArgs>(args: SelectSubset<T, ReportCreateArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reports.
     * @param {ReportCreateManyArgs} args - Arguments to create many Reports.
     * @example
     * // Create many Reports
     * const report = await prisma.report.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReportCreateManyArgs>(args?: SelectSubset<T, ReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Report.
     * @param {ReportDeleteArgs} args - Arguments to delete one Report.
     * @example
     * // Delete one Report
     * const Report = await prisma.report.delete({
     *   where: {
     *     // ... filter to delete one Report
     *   }
     * })
     * 
     */
    delete<T extends ReportDeleteArgs>(args: SelectSubset<T, ReportDeleteArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Report.
     * @param {ReportUpdateArgs} args - Arguments to update one Report.
     * @example
     * // Update one Report
     * const report = await prisma.report.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReportUpdateArgs>(args: SelectSubset<T, ReportUpdateArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reports.
     * @param {ReportDeleteManyArgs} args - Arguments to filter Reports to delete.
     * @example
     * // Delete a few Reports
     * const { count } = await prisma.report.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReportDeleteManyArgs>(args?: SelectSubset<T, ReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reports
     * const report = await prisma.report.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReportUpdateManyArgs>(args: SelectSubset<T, ReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Report.
     * @param {ReportUpsertArgs} args - Arguments to update or create a Report.
     * @example
     * // Update or create a Report
     * const report = await prisma.report.upsert({
     *   create: {
     *     // ... data to create a Report
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Report we want to update
     *   }
     * })
     */
    upsert<T extends ReportUpsertArgs>(args: SelectSubset<T, ReportUpsertArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportCountArgs} args - Arguments to filter Reports to count.
     * @example
     * // Count the number of Reports
     * const count = await prisma.report.count({
     *   where: {
     *     // ... the filter for the Reports we want to count
     *   }
     * })
    **/
    count<T extends ReportCountArgs>(
      args?: Subset<T, ReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReportAggregateArgs>(args: Subset<T, ReportAggregateArgs>): Prisma.PrismaPromise<GetReportAggregateType<T>>

    /**
     * Group by Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReportGroupByArgs['orderBy'] }
        : { orderBy?: ReportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Report model
   */
  readonly fields: ReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Report.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Listing<T extends ListingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ListingDefaultArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Report model
   */
  interface ReportFieldRefs {
    readonly report_id: FieldRef<"Report", 'Int'>
    readonly listing_id: FieldRef<"Report", 'Int'>
    readonly reason: FieldRef<"Report", 'String'>
    readonly details: FieldRef<"Report", 'String'>
    readonly reported_by: FieldRef<"Report", 'String'>
    readonly status: FieldRef<"Report", 'String'>
    readonly created_at: FieldRef<"Report", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Report findUnique
   */
  export type ReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report findUniqueOrThrow
   */
  export type ReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report findFirst
   */
  export type ReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report findFirstOrThrow
   */
  export type ReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report findMany
   */
  export type ReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Reports to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report create
   */
  export type ReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to create a Report.
     */
    data: XOR<ReportCreateInput, ReportUncheckedCreateInput>
  }

  /**
   * Report createMany
   */
  export type ReportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reports.
     */
    data: ReportCreateManyInput | ReportCreateManyInput[]
  }

  /**
   * Report update
   */
  export type ReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to update a Report.
     */
    data: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
    /**
     * Choose, which Report to update.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report updateMany
   */
  export type ReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reports.
     */
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyInput>
    /**
     * Filter which Reports to update
     */
    where?: ReportWhereInput
    /**
     * Limit how many Reports to update.
     */
    limit?: number
  }

  /**
   * Report upsert
   */
  export type ReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The filter to search for the Report to update in case it exists.
     */
    where: ReportWhereUniqueInput
    /**
     * In case the Report found by the `where` argument doesn't exist, create a new Report with this data.
     */
    create: XOR<ReportCreateInput, ReportUncheckedCreateInput>
    /**
     * In case the Report was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
  }

  /**
   * Report delete
   */
  export type ReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter which Report to delete.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report deleteMany
   */
  export type ReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reports to delete
     */
    where?: ReportWhereInput
    /**
     * Limit how many Reports to delete.
     */
    limit?: number
  }

  /**
   * Report without action
   */
  export type ReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable',
    Snapshot: 'Snapshot'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    user_id: 'user_id',
    name: 'name',
    surname: 'surname',
    role: 'role',
    email: 'email',
    firebase_uid: 'firebase_uid'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ApplicantProfileScalarFieldEnum: {
    applicant_id: 'applicant_id',
    user_id: 'user_id',
    phone: 'phone',
    dob: 'dob',
    bio: 'bio'
  };

  export type ApplicantProfileScalarFieldEnum = (typeof ApplicantProfileScalarFieldEnum)[keyof typeof ApplicantProfileScalarFieldEnum]


  export const ProviderScalarFieldEnum: {
    provider_id: 'provider_id',
    provider_name: 'provider_name',
    profile: 'profile',
    user_id: 'user_id',
    onboarded: 'onboarded'
  };

  export type ProviderScalarFieldEnum = (typeof ProviderScalarFieldEnum)[keyof typeof ProviderScalarFieldEnum]

  export type ReportMaxAggregateInputType = {
    report_id?: true
    listing_id?: true
    reason?: true
    details?: true
    reported_by?: true
    status?: true
    created_at?: true
  }

  export const ListingScalarFieldEnum: {
    listings_id: 'listings_id',
    listname: 'listname',
    list_type: 'list_type',
    nqf_level: 'nqf_level',
    description: 'description',
    provider_id: 'provider_id',
    status: 'status',
    closing_date: 'closing_date',
    duration: 'duration',
    location: 'location',
    requirements: 'requirements',
    stipend: 'stipend',
    sector: 'sector',
    cvUploadedAt: 'cvUploadedAt'
  };

  export type ReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Report to aggregate.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reports
    **/
    _count?: true | ReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReportAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReportSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReportMaxAggregateInputType
  }

  export type GetReportAggregateType<T extends ReportAggregateArgs> = {
        [P in keyof T & keyof AggregateReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReport[P]>
      : GetScalarType<T[P], AggregateReport[P]>
  }

  export const ApplicationScalarFieldEnum: {
    application_id: 'application_id',
    user_id: 'user_id',
    provider_id: 'provider_id',
    status: 'status',
    listing_id: 'listing_id',
    created_at: 'created_at',
    updated_at: 'updated_at',
    availability: 'availability',
    motivation: 'motivation',
    cvFilePath: 'cvFilePath',
    cvOriginalFilename: 'cvOriginalFilename',
    cvUploadedAt: 'cvUploadedAt'
  };



  export const SkillScalarFieldEnum: {
    skill_id: 'skill_id',
    name: 'name',
    nqf_level: 'nqf_level',
    saqa_id: 'saqa_id',
    sector: 'sector'
  };

  export type ReportGroupByOutputType = {
    report_id: number
    listing_id: number
    reason: string
    details: string | null
    reported_by: string
    status: string
    created_at: Date
    _count: ReportCountAggregateOutputType | null
    _avg: ReportAvgAggregateOutputType | null
    _sum: ReportSumAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  type GetReportGroupByPayload<T extends ReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReportGroupByOutputType[P]>
            : GetScalarType<T[P], ReportGroupByOutputType[P]>
        }
      >
    >


  export type ReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    report_id?: boolean
    listing_id?: boolean
    reason?: boolean
    details?: boolean
    reported_by?: boolean
    status?: boolean
    created_at?: boolean
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>


  export const QualificationScalarFieldEnum: {
    qualification_id: 'qualification_id',
    name: 'name',
    nqf_level: 'nqf_level',
    saqa_id: 'saqa_id',
    sector: 'sector',
    originator: 'originator'
  };

  export type ReportSelectScalar = {
    report_id?: boolean
    listing_id?: boolean
    reason?: boolean
    details?: boolean
    reported_by?: boolean
    status?: boolean
    created_at?: boolean
  }

  export type ReportOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"report_id" | "listing_id" | "reason" | "details" | "reported_by" | "status" | "created_at", ExtArgs["result"]["report"]>
  export type ReportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }

  export type $ReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Report"
    objects: {
      listing: Prisma.$ListingPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      report_id: number
      listing_id: number
      reason: string
      details: string | null
      reported_by: string
      status: string
      created_at: Date
    }, ExtArgs["result"]["report"]>
    composites: {}
  }

  type ReportGetPayload<S extends boolean | null | undefined | ReportDefaultArgs> = $Result.GetResult<Prisma.$ReportPayload, S>

  type ReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReportCountAggregateInputType | true
    }

  export interface ReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Report'], meta: { name: 'Report' } }
    /**
     * Find zero or one Report that matches the filter.
     * @param {ReportFindUniqueArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReportFindUniqueArgs>(args: SelectSubset<T, ReportFindUniqueArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Report that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReportFindUniqueOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReportFindUniqueOrThrowArgs>(args: SelectSubset<T, ReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Report that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReportFindFirstArgs>(args?: SelectSubset<T, ReportFindFirstArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Report that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReportFindFirstOrThrowArgs>(args?: SelectSubset<T, ReportFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reports
     * const reports = await prisma.report.findMany()
     * 
     * // Get first 10 Reports
     * const reports = await prisma.report.findMany({ take: 10 })
     * 
     * // Only select the `report_id`
     * const reportWithReport_idOnly = await prisma.report.findMany({ select: { report_id: true } })
     * 
     */
    findMany<T extends ReportFindManyArgs>(args?: SelectSubset<T, ReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Report.
     * @param {ReportCreateArgs} args - Arguments to create a Report.
     * @example
     * // Create one Report
     * const Report = await prisma.report.create({
     *   data: {
     *     // ... data to create a Report
     *   }
     * })
     * 
     */
    create<T extends ReportCreateArgs>(args: SelectSubset<T, ReportCreateArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reports.
     * @param {ReportCreateManyArgs} args - Arguments to create many Reports.
     * @example
     * // Create many Reports
     * const report = await prisma.report.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReportCreateManyArgs>(args?: SelectSubset<T, ReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Report.
     * @param {ReportDeleteArgs} args - Arguments to delete one Report.
     * @example
     * // Delete one Report
     * const Report = await prisma.report.delete({
     *   where: {
     *     // ... filter to delete one Report
     *   }
     * })
     * 
     */
    delete<T extends ReportDeleteArgs>(args: SelectSubset<T, ReportDeleteArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Report.
     * @param {ReportUpdateArgs} args - Arguments to update one Report.
     * @example
     * // Update one Report
     * const report = await prisma.report.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReportUpdateArgs>(args: SelectSubset<T, ReportUpdateArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reports.
     * @param {ReportDeleteManyArgs} args - Arguments to filter Reports to delete.
     * @example
     * // Delete a few Reports
     * const { count } = await prisma.report.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReportDeleteManyArgs>(args?: SelectSubset<T, ReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reports
     * const report = await prisma.report.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReportUpdateManyArgs>(args: SelectSubset<T, ReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Report.
     * @param {ReportUpsertArgs} args - Arguments to update or create a Report.
     * @example
     * // Update or create a Report
     * const report = await prisma.report.upsert({
     *   create: {
     *     // ... data to create a Report
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Report we want to update
     *   }
     * })
     */
    upsert<T extends ReportUpsertArgs>(args: SelectSubset<T, ReportUpsertArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportCountArgs} args - Arguments to filter Reports to count.
     * @example
     * // Count the number of Reports
     * const count = await prisma.report.count({
     *   where: {
     *     // ... the filter for the Reports we want to count
     *   }
     * })
    **/
    count<T extends ReportCountArgs>(
      args?: Subset<T, ReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReportAggregateArgs>(args: Subset<T, ReportAggregateArgs>): Prisma.PrismaPromise<GetReportAggregateType<T>>

    /**
     * Group by Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReportGroupByArgs['orderBy'] }
        : { orderBy?: ReportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Report model
   */
  readonly fields: ReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Report.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    listing<T extends ListingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ListingDefaultArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Report model
   */
  interface ReportFieldRefs {
    readonly report_id: FieldRef<"Report", 'Int'>
    readonly listing_id: FieldRef<"Report", 'Int'>
    readonly reason: FieldRef<"Report", 'String'>
    readonly details: FieldRef<"Report", 'String'>
    readonly reported_by: FieldRef<"Report", 'String'>
    readonly status: FieldRef<"Report", 'String'>
    readonly created_at: FieldRef<"Report", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Report findUnique
   */
  export type ReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report findUniqueOrThrow
   */
  export type ReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report findFirst
   */
  export type ReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report findFirstOrThrow
   */
  export type ReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report findMany
   */
  export type ReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Reports to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report create
   */
  export type ReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to create a Report.
     */
    data: XOR<ReportCreateInput, ReportUncheckedCreateInput>
  }

  /**
   * Report createMany
   */
  export type ReportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reports.
     */
    data: ReportCreateManyInput | ReportCreateManyInput[]
  }

  /**
   * Report update
   */
  export type ReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to update a Report.
     */
    data: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
    /**
     * Choose, which Report to update.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report updateMany
   */
  export type ReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reports.
     */
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyInput>
    /**
     * Filter which Reports to update
     */
    where?: ReportWhereInput
    /**
     * Limit how many Reports to update.
     */
    limit?: number
  }

  /**
   * Report upsert
   */
  export type ReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The filter to search for the Report to update in case it exists.
     */
    where: ReportWhereUniqueInput
    /**
     * In case the Report found by the `where` argument doesn't exist, create a new Report with this data.
     */
    create: XOR<ReportCreateInput, ReportUncheckedCreateInput>
    /**
     * In case the Report was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
  }

  /**
   * Report delete
   */
  export type ReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter which Report to delete.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report deleteMany
   */
  export type ReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reports to delete
     */
    where?: ReportWhereInput
    /**
     * Limit how many Reports to delete.
     */
    limit?: number
  }

  /**
   * Report without action
   */
  export type ReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable',
    Snapshot: 'Snapshot'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    user_id: 'user_id',
    firebase_uid: 'firebase_uid',
    email: 'email',
    name: 'name',
    surname: 'surname',
    role: 'role'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ApplicantProfileScalarFieldEnum: {
    applicant_id: 'applicant_id',
    user_id: 'user_id',
    phone: 'phone',
    dob: 'dob',
    bio: 'bio'
  };

  export type ApplicantProfileScalarFieldEnum = (typeof ApplicantProfileScalarFieldEnum)[keyof typeof ApplicantProfileScalarFieldEnum]


  export const ProviderScalarFieldEnum: {
    provider_id: 'provider_id',
    provider_name: 'provider_name',
    profile: 'profile',
    user_id: 'user_id',
    onboarded: 'onboarded'
  };

  export type ProviderScalarFieldEnum = (typeof ProviderScalarFieldEnum)[keyof typeof ProviderScalarFieldEnum]


  export const ListingScalarFieldEnum: {
    listings_id: 'listings_id',
    provider_id: 'provider_id',
    listname: 'listname',
    list_type: 'list_type',
    nqf_level: 'nqf_level',
    description: 'description',
    stipend: 'stipend',
    location: 'location',
    duration: 'duration',
    requirements: 'requirements',
    closing_date: 'closing_date',
    cvUploadedAt: 'cvUploadedAt',
    sector: 'sector',
    status: 'status'
  };

  export type ListingScalarFieldEnum = (typeof ListingScalarFieldEnum)[keyof typeof ListingScalarFieldEnum]


  export const ApplicationScalarFieldEnum: {
    application_id: 'application_id',
    user_id: 'user_id',
    listing_id: 'listing_id',
    provider_id: 'provider_id',
    availability: 'availability',
    motivation: 'motivation',
    status: 'status',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ApplicationScalarFieldEnum = (typeof ApplicationScalarFieldEnum)[keyof typeof ApplicationScalarFieldEnum]


  export const SkillScalarFieldEnum: {
    skill_id: 'skill_id',
    name: 'name',
    nqf_level: 'nqf_level'
  };

  export type SkillScalarFieldEnum = (typeof SkillScalarFieldEnum)[keyof typeof SkillScalarFieldEnum]


  export const ApplicantSkillScalarFieldEnum: {
    id: 'id',
    applicant_id: 'applicant_id',
    skill_id: 'skill_id'
  };

  export type ApplicantSkillScalarFieldEnum = (typeof ApplicantSkillScalarFieldEnum)[keyof typeof ApplicantSkillScalarFieldEnum]


  export const QualificationScalarFieldEnum: {
    qualification_id: 'qualification_id',
    name: 'name',
    nqf_level: 'nqf_level'
  };

  export type QualificationScalarFieldEnum = (typeof QualificationScalarFieldEnum)[keyof typeof QualificationScalarFieldEnum]


  export const ApplicantQualificationScalarFieldEnum: {
    id: 'id',
    applicant_id: 'applicant_id',
    qualification_id: 'qualification_id',
    institution: 'institution',
    year_completed: 'year_completed'
  };

  export type ApplicantQualificationScalarFieldEnum = (typeof ApplicantQualificationScalarFieldEnum)[keyof typeof ApplicantQualificationScalarFieldEnum]


  export const ReportScalarFieldEnum: {
    report_id: 'report_id',
    listing_id: 'listing_id',
    reason: 'reason',
    details: 'details',
    reported_by: 'reported_by',
    status: 'status',
    created_at: 'created_at'
  };

  export type ReportScalarFieldEnum = (typeof ReportScalarFieldEnum)[keyof typeof ReportScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    user_id?: IntFilter<"User"> | number
    name?: StringFilter<"User"> | string
    surname?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    firebase_uid?: StringFilter<"User"> | string
    applicant?: XOR<ApplicantProfileNullableScalarRelationFilter, ApplicantProfileWhereInput> | null
    applications?: ApplicationListRelationFilter
    provider?: XOR<ProviderNullableScalarRelationFilter, ProviderWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    user_id?: SortOrder
    name?: SortOrder
    surname?: SortOrder
    role?: SortOrder
    email?: SortOrder
    firebase_uid?: SortOrder
    applicant?: ApplicantProfileOrderByWithRelationInput
    applications?: ApplicationOrderByRelationAggregateInput
    provider?: ProviderOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    user_id?: number
    email?: string
    firebase_uid?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    surname?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    applicant?: XOR<ApplicantProfileNullableScalarRelationFilter, ApplicantProfileWhereInput> | null
    applications?: ApplicationListRelationFilter
    provider?: XOR<ProviderNullableScalarRelationFilter, ProviderWhereInput> | null
  }, "user_id" | "email" | "firebase_uid">

  export type UserOrderByWithAggregationInput = {
    user_id?: SortOrder
    name?: SortOrder
    surname?: SortOrder
    role?: SortOrder
    email?: SortOrder
    firebase_uid?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    user_id?: IntWithAggregatesFilter<"User"> | number
    name?: StringWithAggregatesFilter<"User"> | string
    surname?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    firebase_uid?: StringWithAggregatesFilter<"User"> | string
  }

  export type ApplicantProfileWhereInput = {
    AND?: ApplicantProfileWhereInput | ApplicantProfileWhereInput[]
    OR?: ApplicantProfileWhereInput[]
    NOT?: ApplicantProfileWhereInput | ApplicantProfileWhereInput[]
    applicant_id?: IntFilter<"ApplicantProfile"> | number
    user_id?: IntFilter<"ApplicantProfile"> | number
    phone?: StringNullableFilter<"ApplicantProfile"> | string | null
    dob?: DateTimeNullableFilter<"ApplicantProfile"> | Date | string | null
    bio?: StringNullableFilter<"ApplicantProfile"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    qualifications?: ApplicantQualificationListRelationFilter
    skills?: ApplicantSkillListRelationFilter
  }

  export type ApplicantProfileOrderByWithRelationInput = {
    applicant_id?: SortOrder
    user_id?: SortOrder
    phone?: SortOrderInput | SortOrder
    dob?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    qualifications?: ApplicantQualificationOrderByRelationAggregateInput
    skills?: ApplicantSkillOrderByRelationAggregateInput
  }

  export type ApplicantProfileWhereUniqueInput = Prisma.AtLeast<{
    applicant_id?: number
    user_id?: number
    AND?: ApplicantProfileWhereInput | ApplicantProfileWhereInput[]
    OR?: ApplicantProfileWhereInput[]
    NOT?: ApplicantProfileWhereInput | ApplicantProfileWhereInput[]
    phone?: StringNullableFilter<"ApplicantProfile"> | string | null
    dob?: DateTimeNullableFilter<"ApplicantProfile"> | Date | string | null
    bio?: StringNullableFilter<"ApplicantProfile"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    qualifications?: ApplicantQualificationListRelationFilter
    skills?: ApplicantSkillListRelationFilter
  }, "applicant_id" | "user_id">

  export type ApplicantProfileOrderByWithAggregationInput = {
    applicant_id?: SortOrder
    user_id?: SortOrder
    phone?: SortOrderInput | SortOrder
    dob?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    _count?: ApplicantProfileCountOrderByAggregateInput
    _avg?: ApplicantProfileAvgOrderByAggregateInput
    _max?: ApplicantProfileMaxOrderByAggregateInput
    _min?: ApplicantProfileMinOrderByAggregateInput
    _sum?: ApplicantProfileSumOrderByAggregateInput
  }

  export type ApplicantProfileScalarWhereWithAggregatesInput = {
    AND?: ApplicantProfileScalarWhereWithAggregatesInput | ApplicantProfileScalarWhereWithAggregatesInput[]
    OR?: ApplicantProfileScalarWhereWithAggregatesInput[]
    NOT?: ApplicantProfileScalarWhereWithAggregatesInput | ApplicantProfileScalarWhereWithAggregatesInput[]
    applicant_id?: IntWithAggregatesFilter<"ApplicantProfile"> | number
    user_id?: IntWithAggregatesFilter<"ApplicantProfile"> | number
    phone?: StringNullableWithAggregatesFilter<"ApplicantProfile"> | string | null
    dob?: DateTimeNullableWithAggregatesFilter<"ApplicantProfile"> | Date | string | null
    bio?: StringNullableWithAggregatesFilter<"ApplicantProfile"> | string | null
  }

  export type ProviderWhereInput = {
    AND?: ProviderWhereInput | ProviderWhereInput[]
    OR?: ProviderWhereInput[]
    NOT?: ProviderWhereInput | ProviderWhereInput[]
    provider_id?: IntFilter<"Provider"> | number
    provider_name?: StringFilter<"Provider"> | string
    profile?: StringNullableFilter<"Provider"> | string | null
    user_id?: IntFilter<"Provider"> | number
    onboarded?: BoolFilter<"Provider"> | boolean
    applications?: ApplicationListRelationFilter
    listings?: ListingListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ProviderOrderByWithRelationInput = {
    provider_id?: SortOrder
    provider_name?: SortOrder
    profile?: SortOrderInput | SortOrder
    user_id?: SortOrder
    onboarded?: SortOrder
    applications?: ApplicationOrderByRelationAggregateInput
    listings?: ListingOrderByRelationAggregateInput
    user?: UserOrderByWithRelationInput
  }

  export type ProviderWhereUniqueInput = Prisma.AtLeast<{
    provider_id?: number
    user_id?: number
    AND?: ProviderWhereInput | ProviderWhereInput[]
    OR?: ProviderWhereInput[]
    NOT?: ProviderWhereInput | ProviderWhereInput[]
    provider_name?: StringFilter<"Provider"> | string
    profile?: StringNullableFilter<"Provider"> | string | null
    onboarded?: BoolFilter<"Provider"> | boolean
    applications?: ApplicationListRelationFilter
    listings?: ListingListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "provider_id" | "user_id">

  export type ProviderOrderByWithAggregationInput = {
    provider_id?: SortOrder
    provider_name?: SortOrder
    profile?: SortOrderInput | SortOrder
    user_id?: SortOrder
    onboarded?: SortOrder
    _count?: ProviderCountOrderByAggregateInput
    _avg?: ProviderAvgOrderByAggregateInput
    _max?: ProviderMaxOrderByAggregateInput
    _min?: ProviderMinOrderByAggregateInput
    _sum?: ProviderSumOrderByAggregateInput
  }

  export type ProviderScalarWhereWithAggregatesInput = {
    AND?: ProviderScalarWhereWithAggregatesInput | ProviderScalarWhereWithAggregatesInput[]
    OR?: ProviderScalarWhereWithAggregatesInput[]
    NOT?: ProviderScalarWhereWithAggregatesInput | ProviderScalarWhereWithAggregatesInput[]
    provider_id?: IntWithAggregatesFilter<"Provider"> | number
    provider_name?: StringWithAggregatesFilter<"Provider"> | string
    profile?: StringNullableWithAggregatesFilter<"Provider"> | string | null
    user_id?: IntWithAggregatesFilter<"Provider"> | number
    onboarded?: BoolWithAggregatesFilter<"Provider"> | boolean
  }

  export type ListingWhereInput = {
    AND?: ListingWhereInput | ListingWhereInput[]
    OR?: ListingWhereInput[]
    NOT?: ListingWhereInput | ListingWhereInput[]
    listings_id?: IntFilter<"Listing"> | number
    listname?: StringFilter<"Listing"> | string
    list_type?: StringFilter<"Listing"> | string
    nqf_level?: IntNullableFilter<"Listing"> | number | null
    description?: StringNullableFilter<"Listing"> | string | null
    provider_id?: IntFilter<"Listing"> | number
    status?: StringFilter<"Listing"> | string
    closing_date?: DateTimeNullableFilter<"Listing"> | Date | string | null
    duration?: StringNullableFilter<"Listing"> | string | null
    location?: StringNullableFilter<"Listing"> | string | null
    requirements?: StringNullableFilter<"Listing"> | string | null
    stipend?: FloatNullableFilter<"Listing"> | number | null
    sector?: StringNullableFilter<"Listing"> | string | null
    cvUploadedAt?: DateTimeNullableFilter<"Listing"> | Date | string | null
    applications?: ApplicationListRelationFilter
    provider?: XOR<ProviderScalarRelationFilter, ProviderWhereInput>
    Report?: ReportListRelationFilter
  }

  export type ListingOrderByWithRelationInput = {
    listings_id?: SortOrder
    listname?: SortOrder
    list_type?: SortOrder
    nqf_level?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    provider_id?: SortOrder
    status?: SortOrder
    closing_date?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    requirements?: SortOrderInput | SortOrder
    stipend?: SortOrderInput | SortOrder
    sector?: SortOrderInput | SortOrder
    cvUploadedAt?: SortOrderInput | SortOrder
    applications?: ApplicationOrderByRelationAggregateInput
    provider?: ProviderOrderByWithRelationInput
    Report?: ReportOrderByRelationAggregateInput
  }

  export type ListingWhereUniqueInput = Prisma.AtLeast<{
    listings_id?: number
    AND?: ListingWhereInput | ListingWhereInput[]
    OR?: ListingWhereInput[]
    NOT?: ListingWhereInput | ListingWhereInput[]
    listname?: StringFilter<"Listing"> | string
    list_type?: StringFilter<"Listing"> | string
    nqf_level?: IntNullableFilter<"Listing"> | number | null
    description?: StringNullableFilter<"Listing"> | string | null
    provider_id?: IntFilter<"Listing"> | number
    status?: StringFilter<"Listing"> | string
    closing_date?: DateTimeNullableFilter<"Listing"> | Date | string | null
    duration?: StringNullableFilter<"Listing"> | string | null
    location?: StringNullableFilter<"Listing"> | string | null
    requirements?: StringNullableFilter<"Listing"> | string | null
    stipend?: FloatNullableFilter<"Listing"> | number | null
    sector?: StringNullableFilter<"Listing"> | string | null
    cvUploadedAt?: DateTimeNullableFilter<"Listing"> | Date | string | null
    applications?: ApplicationListRelationFilter
    provider?: XOR<ProviderScalarRelationFilter, ProviderWhereInput>
    Report?: ReportListRelationFilter
  }, "listings_id">

  export type ListingOrderByWithAggregationInput = {
    listings_id?: SortOrder
    listname?: SortOrder
    list_type?: SortOrder
    nqf_level?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    provider_id?: SortOrder
    status?: SortOrder
    closing_date?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    requirements?: SortOrderInput | SortOrder
    stipend?: SortOrderInput | SortOrder
    sector?: SortOrderInput | SortOrder
    cvUploadedAt?: SortOrderInput | SortOrder
    _count?: ListingCountOrderByAggregateInput
    _avg?: ListingAvgOrderByAggregateInput
    _max?: ListingMaxOrderByAggregateInput
    _min?: ListingMinOrderByAggregateInput
    _sum?: ListingSumOrderByAggregateInput
  }

  export type ListingScalarWhereWithAggregatesInput = {
    AND?: ListingScalarWhereWithAggregatesInput | ListingScalarWhereWithAggregatesInput[]
    OR?: ListingScalarWhereWithAggregatesInput[]
    NOT?: ListingScalarWhereWithAggregatesInput | ListingScalarWhereWithAggregatesInput[]
    listings_id?: IntWithAggregatesFilter<"Listing"> | number
    listname?: StringWithAggregatesFilter<"Listing"> | string
    list_type?: StringWithAggregatesFilter<"Listing"> | string
    nqf_level?: IntNullableWithAggregatesFilter<"Listing"> | number | null
    description?: StringNullableWithAggregatesFilter<"Listing"> | string | null
    provider_id?: IntWithAggregatesFilter<"Listing"> | number
    status?: StringWithAggregatesFilter<"Listing"> | string
    closing_date?: DateTimeNullableWithAggregatesFilter<"Listing"> | Date | string | null
    duration?: StringNullableWithAggregatesFilter<"Listing"> | string | null
    location?: StringNullableWithAggregatesFilter<"Listing"> | string | null
    requirements?: StringNullableWithAggregatesFilter<"Listing"> | string | null
    stipend?: FloatNullableWithAggregatesFilter<"Listing"> | number | null
    sector?: StringNullableWithAggregatesFilter<"Listing"> | string | null
    cvUploadedAt?: DateTimeNullableWithAggregatesFilter<"Listing"> | Date | string | null
  }

  export type ApplicationWhereInput = {
    AND?: ApplicationWhereInput | ApplicationWhereInput[]
    OR?: ApplicationWhereInput[]
    NOT?: ApplicationWhereInput | ApplicationWhereInput[]
    application_id?: IntFilter<"Application"> | number
    user_id?: IntFilter<"Application"> | number
    provider_id?: IntFilter<"Application"> | number
    availability?: StringNullableFilter<"Application"> | string | null
    motivation?: StringNullableFilter<"Application"> | string | null
    status?: StringFilter<"Application"> | string
    listing_id?: IntFilter<"Application"> | number
    created_at?: DateTimeFilter<"Application"> | Date | string
    updated_at?: DateTimeFilter<"Application"> | Date | string
    availability?: StringNullableFilter<"Application"> | string | null
    motivation?: StringNullableFilter<"Application"> | string | null
    cvFilePath?: StringNullableFilter<"Application"> | string | null
    cvOriginalFilename?: StringNullableFilter<"Application"> | string | null
    cvUploadedAt?: DateTimeNullableFilter<"Application"> | Date | string | null
    listing?: XOR<ListingScalarRelationFilter, ListingWhereInput>
    provider?: XOR<ProviderScalarRelationFilter, ProviderWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ApplicationOrderByWithRelationInput = {
    application_id?: SortOrder
    user_id?: SortOrder
    provider_id?: SortOrder
    availability?: SortOrderInput | SortOrder
    motivation?: SortOrderInput | SortOrder
    status?: SortOrder
    listing_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    availability?: SortOrderInput | SortOrder
    motivation?: SortOrderInput | SortOrder
    cvFilePath?: SortOrderInput | SortOrder
    cvOriginalFilename?: SortOrderInput | SortOrder
    cvUploadedAt?: SortOrderInput | SortOrder
    listing?: ListingOrderByWithRelationInput
    provider?: ProviderOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type ApplicationWhereUniqueInput = Prisma.AtLeast<{
    application_id?: number
    AND?: ApplicationWhereInput | ApplicationWhereInput[]
    OR?: ApplicationWhereInput[]
    NOT?: ApplicationWhereInput | ApplicationWhereInput[]
    user_id?: IntFilter<"Application"> | number
    provider_id?: IntFilter<"Application"> | number
    availability?: StringNullableFilter<"Application"> | string | null
    motivation?: StringNullableFilter<"Application"> | string | null
    status?: StringFilter<"Application"> | string
    listing_id?: IntFilter<"Application"> | number
    created_at?: DateTimeFilter<"Application"> | Date | string
    updated_at?: DateTimeFilter<"Application"> | Date | string
    availability?: StringNullableFilter<"Application"> | string | null
    motivation?: StringNullableFilter<"Application"> | string | null
    cvFilePath?: StringNullableFilter<"Application"> | string | null
    cvOriginalFilename?: StringNullableFilter<"Application"> | string | null
    cvUploadedAt?: DateTimeNullableFilter<"Application"> | Date | string | null
    listing?: XOR<ListingScalarRelationFilter, ListingWhereInput>
    provider?: XOR<ProviderScalarRelationFilter, ProviderWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "application_id">

  export type ApplicationOrderByWithAggregationInput = {
    application_id?: SortOrder
    user_id?: SortOrder
    provider_id?: SortOrder
    availability?: SortOrderInput | SortOrder
    motivation?: SortOrderInput | SortOrder
    status?: SortOrder
    listing_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    availability?: SortOrderInput | SortOrder
    motivation?: SortOrderInput | SortOrder
    cvFilePath?: SortOrderInput | SortOrder
    cvOriginalFilename?: SortOrderInput | SortOrder
    cvUploadedAt?: SortOrderInput | SortOrder
    _count?: ApplicationCountOrderByAggregateInput
    _avg?: ApplicationAvgOrderByAggregateInput
    _max?: ApplicationMaxOrderByAggregateInput
    _min?: ApplicationMinOrderByAggregateInput
    _sum?: ApplicationSumOrderByAggregateInput
  }

  export type ApplicationScalarWhereWithAggregatesInput = {
    AND?: ApplicationScalarWhereWithAggregatesInput | ApplicationScalarWhereWithAggregatesInput[]
    OR?: ApplicationScalarWhereWithAggregatesInput[]
    NOT?: ApplicationScalarWhereWithAggregatesInput | ApplicationScalarWhereWithAggregatesInput[]
    application_id?: IntWithAggregatesFilter<"Application"> | number
    user_id?: IntWithAggregatesFilter<"Application"> | number
    provider_id?: IntWithAggregatesFilter<"Application"> | number
    availability?: StringNullableWithAggregatesFilter<"Application"> | string | null
    motivation?: StringNullableWithAggregatesFilter<"Application"> | string | null
    status?: StringWithAggregatesFilter<"Application"> | string
    listing_id?: IntWithAggregatesFilter<"Application"> | number
    created_at?: DateTimeWithAggregatesFilter<"Application"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Application"> | Date | string
    availability?: StringNullableWithAggregatesFilter<"Application"> | string | null
    motivation?: StringNullableWithAggregatesFilter<"Application"> | string | null
    cvFilePath?: StringNullableWithAggregatesFilter<"Application"> | string | null
    cvOriginalFilename?: StringNullableWithAggregatesFilter<"Application"> | string | null
    cvUploadedAt?: DateTimeNullableWithAggregatesFilter<"Application"> | Date | string | null
  }

  export type SkillWhereInput = {
    AND?: SkillWhereInput | SkillWhereInput[]
    OR?: SkillWhereInput[]
    NOT?: SkillWhereInput | SkillWhereInput[]
    skill_id?: IntFilter<"Skill"> | number
    name?: StringFilter<"Skill"> | string
    nqf_level?: IntNullableFilter<"Skill"> | number | null
    saqa_id?: StringNullableFilter<"Skill"> | string | null
    sector?: StringNullableFilter<"Skill"> | string | null
    applicantSkills?: ApplicantSkillListRelationFilter
  }

  export type SkillOrderByWithRelationInput = {
    skill_id?: SortOrder
    name?: SortOrder
    nqf_level?: SortOrderInput | SortOrder
    saqa_id?: SortOrderInput | SortOrder
    sector?: SortOrderInput | SortOrder
    applicantSkills?: ApplicantSkillOrderByRelationAggregateInput
  }

  export type SkillWhereUniqueInput = Prisma.AtLeast<{
    skill_id?: number
    saqa_id?: string
    AND?: SkillWhereInput | SkillWhereInput[]
    OR?: SkillWhereInput[]
    NOT?: SkillWhereInput | SkillWhereInput[]
    name?: StringFilter<"Skill"> | string
    nqf_level?: IntNullableFilter<"Skill"> | number | null
    sector?: StringNullableFilter<"Skill"> | string | null
    applicantSkills?: ApplicantSkillListRelationFilter
  }, "skill_id" | "saqa_id">

  export type SkillOrderByWithAggregationInput = {
    skill_id?: SortOrder
    name?: SortOrder
    nqf_level?: SortOrderInput | SortOrder
    saqa_id?: SortOrderInput | SortOrder
    sector?: SortOrderInput | SortOrder
    _count?: SkillCountOrderByAggregateInput
    _avg?: SkillAvgOrderByAggregateInput
    _max?: SkillMaxOrderByAggregateInput
    _min?: SkillMinOrderByAggregateInput
    _sum?: SkillSumOrderByAggregateInput
  }

  export type SkillScalarWhereWithAggregatesInput = {
    AND?: SkillScalarWhereWithAggregatesInput | SkillScalarWhereWithAggregatesInput[]
    OR?: SkillScalarWhereWithAggregatesInput[]
    NOT?: SkillScalarWhereWithAggregatesInput | SkillScalarWhereWithAggregatesInput[]
    skill_id?: IntWithAggregatesFilter<"Skill"> | number
    name?: StringWithAggregatesFilter<"Skill"> | string
    nqf_level?: IntNullableWithAggregatesFilter<"Skill"> | number | null
    saqa_id?: StringNullableWithAggregatesFilter<"Skill"> | string | null
    sector?: StringNullableWithAggregatesFilter<"Skill"> | string | null
  }

  export type ApplicantSkillWhereInput = {
    AND?: ApplicantSkillWhereInput | ApplicantSkillWhereInput[]
    OR?: ApplicantSkillWhereInput[]
    NOT?: ApplicantSkillWhereInput | ApplicantSkillWhereInput[]
    id?: IntFilter<"ApplicantSkill"> | number
    applicant_id?: IntFilter<"ApplicantSkill"> | number
    skill_id?: IntFilter<"ApplicantSkill"> | number
    applicant?: XOR<ApplicantProfileScalarRelationFilter, ApplicantProfileWhereInput>
    skill?: XOR<SkillScalarRelationFilter, SkillWhereInput>
  }

  export type ApplicantSkillOrderByWithRelationInput = {
    id?: SortOrder
    applicant_id?: SortOrder
    skill_id?: SortOrder
    applicant?: ApplicantProfileOrderByWithRelationInput
    skill?: SkillOrderByWithRelationInput
  }

  export type ApplicantSkillWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ApplicantSkillWhereInput | ApplicantSkillWhereInput[]
    OR?: ApplicantSkillWhereInput[]
    NOT?: ApplicantSkillWhereInput | ApplicantSkillWhereInput[]
    applicant_id?: IntFilter<"ApplicantSkill"> | number
    skill_id?: IntFilter<"ApplicantSkill"> | number
    applicant?: XOR<ApplicantProfileScalarRelationFilter, ApplicantProfileWhereInput>
    skill?: XOR<SkillScalarRelationFilter, SkillWhereInput>
  }, "id">

  export type ApplicantSkillOrderByWithAggregationInput = {
    id?: SortOrder
    applicant_id?: SortOrder
    skill_id?: SortOrder
    _count?: ApplicantSkillCountOrderByAggregateInput
    _avg?: ApplicantSkillAvgOrderByAggregateInput
    _max?: ApplicantSkillMaxOrderByAggregateInput
    _min?: ApplicantSkillMinOrderByAggregateInput
    _sum?: ApplicantSkillSumOrderByAggregateInput
  }

  export type ApplicantSkillScalarWhereWithAggregatesInput = {
    AND?: ApplicantSkillScalarWhereWithAggregatesInput | ApplicantSkillScalarWhereWithAggregatesInput[]
    OR?: ApplicantSkillScalarWhereWithAggregatesInput[]
    NOT?: ApplicantSkillScalarWhereWithAggregatesInput | ApplicantSkillScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ApplicantSkill"> | number
    applicant_id?: IntWithAggregatesFilter<"ApplicantSkill"> | number
    skill_id?: IntWithAggregatesFilter<"ApplicantSkill"> | number
  }

  export type QualificationWhereInput = {
    AND?: QualificationWhereInput | QualificationWhereInput[]
    OR?: QualificationWhereInput[]
    NOT?: QualificationWhereInput | QualificationWhereInput[]
    qualification_id?: IntFilter<"Qualification"> | number
    name?: StringFilter<"Qualification"> | string
    nqf_level?: IntFilter<"Qualification"> | number
    saqa_id?: StringNullableFilter<"Qualification"> | string | null
    sector?: StringNullableFilter<"Qualification"> | string | null
    originator?: StringNullableFilter<"Qualification"> | string | null
    applicantQualifications?: ApplicantQualificationListRelationFilter
  }

  export type QualificationOrderByWithRelationInput = {
    qualification_id?: SortOrder
    name?: SortOrder
    nqf_level?: SortOrder
    saqa_id?: SortOrderInput | SortOrder
    sector?: SortOrderInput | SortOrder
    originator?: SortOrderInput | SortOrder
    applicantQualifications?: ApplicantQualificationOrderByRelationAggregateInput
  }

  export type QualificationWhereUniqueInput = Prisma.AtLeast<{
    qualification_id?: number
    saqa_id?: string
    AND?: QualificationWhereInput | QualificationWhereInput[]
    OR?: QualificationWhereInput[]
    NOT?: QualificationWhereInput | QualificationWhereInput[]
    name?: StringFilter<"Qualification"> | string
    nqf_level?: IntFilter<"Qualification"> | number
    sector?: StringNullableFilter<"Qualification"> | string | null
    originator?: StringNullableFilter<"Qualification"> | string | null
    applicantQualifications?: ApplicantQualificationListRelationFilter
  }, "qualification_id" | "saqa_id">

  export type QualificationOrderByWithAggregationInput = {
    qualification_id?: SortOrder
    name?: SortOrder
    nqf_level?: SortOrder
    saqa_id?: SortOrderInput | SortOrder
    sector?: SortOrderInput | SortOrder
    originator?: SortOrderInput | SortOrder
    _count?: QualificationCountOrderByAggregateInput
    _avg?: QualificationAvgOrderByAggregateInput
    _max?: QualificationMaxOrderByAggregateInput
    _min?: QualificationMinOrderByAggregateInput
    _sum?: QualificationSumOrderByAggregateInput
  }

  export type QualificationScalarWhereWithAggregatesInput = {
    AND?: QualificationScalarWhereWithAggregatesInput | QualificationScalarWhereWithAggregatesInput[]
    OR?: QualificationScalarWhereWithAggregatesInput[]
    NOT?: QualificationScalarWhereWithAggregatesInput | QualificationScalarWhereWithAggregatesInput[]
    qualification_id?: IntWithAggregatesFilter<"Qualification"> | number
    name?: StringWithAggregatesFilter<"Qualification"> | string
    nqf_level?: IntWithAggregatesFilter<"Qualification"> | number
    saqa_id?: StringNullableWithAggregatesFilter<"Qualification"> | string | null
    sector?: StringNullableWithAggregatesFilter<"Qualification"> | string | null
    originator?: StringNullableWithAggregatesFilter<"Qualification"> | string | null
  }

  export type ApplicantQualificationWhereInput = {
    AND?: ApplicantQualificationWhereInput | ApplicantQualificationWhereInput[]
    OR?: ApplicantQualificationWhereInput[]
    NOT?: ApplicantQualificationWhereInput | ApplicantQualificationWhereInput[]
    id?: IntFilter<"ApplicantQualification"> | number
    applicant_id?: IntFilter<"ApplicantQualification"> | number
    qualification_id?: IntFilter<"ApplicantQualification"> | number
    institution?: StringNullableFilter<"ApplicantQualification"> | string | null
    year_completed?: IntNullableFilter<"ApplicantQualification"> | number | null
    applicant?: XOR<ApplicantProfileScalarRelationFilter, ApplicantProfileWhereInput>
    qualification?: XOR<QualificationScalarRelationFilter, QualificationWhereInput>
  }

  export type ApplicantQualificationOrderByWithRelationInput = {
    id?: SortOrder
    applicant_id?: SortOrder
    qualification_id?: SortOrder
    institution?: SortOrderInput | SortOrder
    year_completed?: SortOrderInput | SortOrder
    applicant?: ApplicantProfileOrderByWithRelationInput
    qualification?: QualificationOrderByWithRelationInput
  }

  export type ApplicantQualificationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ApplicantQualificationWhereInput | ApplicantQualificationWhereInput[]
    OR?: ApplicantQualificationWhereInput[]
    NOT?: ApplicantQualificationWhereInput | ApplicantQualificationWhereInput[]
    applicant_id?: IntFilter<"ApplicantQualification"> | number
    qualification_id?: IntFilter<"ApplicantQualification"> | number
    institution?: StringNullableFilter<"ApplicantQualification"> | string | null
    year_completed?: IntNullableFilter<"ApplicantQualification"> | number | null
    applicant?: XOR<ApplicantProfileScalarRelationFilter, ApplicantProfileWhereInput>
    qualification?: XOR<QualificationScalarRelationFilter, QualificationWhereInput>
  }, "id">

  export type ApplicantQualificationOrderByWithAggregationInput = {
    id?: SortOrder
    applicant_id?: SortOrder
    qualification_id?: SortOrder
    institution?: SortOrderInput | SortOrder
    year_completed?: SortOrderInput | SortOrder
    _count?: ApplicantQualificationCountOrderByAggregateInput
    _avg?: ApplicantQualificationAvgOrderByAggregateInput
    _max?: ApplicantQualificationMaxOrderByAggregateInput
    _min?: ApplicantQualificationMinOrderByAggregateInput
    _sum?: ApplicantQualificationSumOrderByAggregateInput
  }

  export type ApplicantQualificationScalarWhereWithAggregatesInput = {
    AND?: ApplicantQualificationScalarWhereWithAggregatesInput | ApplicantQualificationScalarWhereWithAggregatesInput[]
    OR?: ApplicantQualificationScalarWhereWithAggregatesInput[]
    NOT?: ApplicantQualificationScalarWhereWithAggregatesInput | ApplicantQualificationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ApplicantQualification"> | number
    applicant_id?: IntWithAggregatesFilter<"ApplicantQualification"> | number
    qualification_id?: IntWithAggregatesFilter<"ApplicantQualification"> | number
    institution?: StringNullableWithAggregatesFilter<"ApplicantQualification"> | string | null
    year_completed?: IntNullableWithAggregatesFilter<"ApplicantQualification"> | number | null
  }

  export type ReportWhereInput = {
    AND?: ReportWhereInput | ReportWhereInput[]
    OR?: ReportWhereInput[]
    NOT?: ReportWhereInput | ReportWhereInput[]
    report_id?: IntFilter<"Report"> | number
    listing_id?: IntFilter<"Report"> | number
    reason?: StringFilter<"Report"> | string
    details?: StringNullableFilter<"Report"> | string | null
    reported_by?: StringFilter<"Report"> | string
    status?: StringFilter<"Report"> | string
    created_at?: DateTimeFilter<"Report"> | Date | string
    Listing?: XOR<ListingScalarRelationFilter, ListingWhereInput>
  }

  export type ReportOrderByWithRelationInput = {
    report_id?: SortOrder
    listing_id?: SortOrder
    reason?: SortOrder
    details?: SortOrderInput | SortOrder
    reported_by?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    Listing?: ListingOrderByWithRelationInput
  }

  export type ReportWhereUniqueInput = Prisma.AtLeast<{
    report_id?: number
    AND?: ReportWhereInput | ReportWhereInput[]
    OR?: ReportWhereInput[]
    NOT?: ReportWhereInput | ReportWhereInput[]
    listing_id?: IntFilter<"Report"> | number
    reason?: StringFilter<"Report"> | string
    details?: StringNullableFilter<"Report"> | string | null
    reported_by?: StringFilter<"Report"> | string
    status?: StringFilter<"Report"> | string
    created_at?: DateTimeFilter<"Report"> | Date | string
    Listing?: XOR<ListingScalarRelationFilter, ListingWhereInput>
  }, "report_id">

  export type ReportOrderByWithAggregationInput = {
    report_id?: SortOrder
    listing_id?: SortOrder
    reason?: SortOrder
    details?: SortOrderInput | SortOrder
    reported_by?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    _count?: ReportCountOrderByAggregateInput
    _avg?: ReportAvgOrderByAggregateInput
    _max?: ReportMaxOrderByAggregateInput
    _min?: ReportMinOrderByAggregateInput
    _sum?: ReportSumOrderByAggregateInput
  }

  export type ReportScalarWhereWithAggregatesInput = {
    AND?: ReportScalarWhereWithAggregatesInput | ReportScalarWhereWithAggregatesInput[]
    OR?: ReportScalarWhereWithAggregatesInput[]
    NOT?: ReportScalarWhereWithAggregatesInput | ReportScalarWhereWithAggregatesInput[]
    report_id?: IntWithAggregatesFilter<"Report"> | number
    listing_id?: IntWithAggregatesFilter<"Report"> | number
    reason?: StringWithAggregatesFilter<"Report"> | string
    details?: StringNullableWithAggregatesFilter<"Report"> | string | null
    reported_by?: StringWithAggregatesFilter<"Report"> | string
    status?: StringWithAggregatesFilter<"Report"> | string
    created_at?: DateTimeWithAggregatesFilter<"Report"> | Date | string
  }

  export type UserCreateInput = {
    name: string
    surname: string
    role: string
    email: string
    firebase_uid: string
    applicant?: ApplicantProfileCreateNestedOneWithoutUserInput
    applications?: ApplicationCreateNestedManyWithoutUserInput
    provider?: ProviderCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    user_id?: number
    name: string
    surname: string
    role: string
    email: string
    firebase_uid: string
    applicant?: ApplicantProfileUncheckedCreateNestedOneWithoutUserInput
    applications?: ApplicationUncheckedCreateNestedManyWithoutUserInput
    provider?: ProviderUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firebase_uid?: StringFieldUpdateOperationsInput | string
    applicant?: ApplicantProfileUpdateOneWithoutUserNestedInput
    applications?: ApplicationUpdateManyWithoutUserNestedInput
    provider?: ProviderUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firebase_uid?: StringFieldUpdateOperationsInput | string
    applicant?: ApplicantProfileUncheckedUpdateOneWithoutUserNestedInput
    applications?: ApplicationUncheckedUpdateManyWithoutUserNestedInput
    provider?: ProviderUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    name: string
    surname: string
    role: string
    email: string
    firebase_uid: string
  }

  export type UserUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firebase_uid?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firebase_uid?: StringFieldUpdateOperationsInput | string
  }

  export type ApplicantProfileCreateInput = {
    phone?: string | null
    dob?: Date | string | null
    bio?: string | null
    user: UserCreateNestedOneWithoutApplicantInput
    qualifications?: ApplicantQualificationCreateNestedManyWithoutApplicantInput
    skills?: ApplicantSkillCreateNestedManyWithoutApplicantInput
  }

  export type ApplicantProfileUncheckedCreateInput = {
    applicant_id?: number
    user_id: number
    phone?: string | null
    dob?: Date | string | null
    bio?: string | null
    qualifications?: ApplicantQualificationUncheckedCreateNestedManyWithoutApplicantInput
    skills?: ApplicantSkillUncheckedCreateNestedManyWithoutApplicantInput
  }

  export type ApplicantProfileUpdateInput = {
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutApplicantNestedInput
    qualifications?: ApplicantQualificationUpdateManyWithoutApplicantNestedInput
    skills?: ApplicantSkillUpdateManyWithoutApplicantNestedInput
  }

  export type ApplicantProfileUncheckedUpdateInput = {
    applicant_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    qualifications?: ApplicantQualificationUncheckedUpdateManyWithoutApplicantNestedInput
    skills?: ApplicantSkillUncheckedUpdateManyWithoutApplicantNestedInput
  }

  export type ApplicantProfileCreateManyInput = {
    user_id: number
    phone?: string | null
    dob?: Date | string | null
    bio?: string | null
  }

  export type ApplicantProfileUpdateManyMutationInput = {
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ApplicantProfileUncheckedUpdateManyInput = {
    applicant_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProviderCreateInput = {
    provider_name: string
    profile?: string | null
    onboarded?: boolean
    applications?: ApplicationCreateNestedManyWithoutProviderInput
    listings?: ListingCreateNestedManyWithoutProviderInput
    user: UserCreateNestedOneWithoutProviderInput
  }

  export type ProviderUncheckedCreateInput = {
    provider_id?: number
    provider_name: string
    profile?: string | null
    user_id: number
    onboarded?: boolean
    applications?: ApplicationUncheckedCreateNestedManyWithoutProviderInput
    listings?: ListingUncheckedCreateNestedManyWithoutProviderInput
  }

  export type ProviderUpdateInput = {
    provider_name?: StringFieldUpdateOperationsInput | string
    profile?: NullableStringFieldUpdateOperationsInput | string | null
    onboarded?: BoolFieldUpdateOperationsInput | boolean
    applications?: ApplicationUpdateManyWithoutProviderNestedInput
    listings?: ListingUpdateManyWithoutProviderNestedInput
    user?: UserUpdateOneRequiredWithoutProviderNestedInput
  }

  export type ProviderUncheckedUpdateInput = {
    provider_id?: IntFieldUpdateOperationsInput | number
    provider_name?: StringFieldUpdateOperationsInput | string
    profile?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: IntFieldUpdateOperationsInput | number
    onboarded?: BoolFieldUpdateOperationsInput | boolean
    applications?: ApplicationUncheckedUpdateManyWithoutProviderNestedInput
    listings?: ListingUncheckedUpdateManyWithoutProviderNestedInput
  }

  export type ProviderCreateManyInput = {
    provider_name: string
    profile?: string | null
    user_id: number
    onboarded?: boolean
  }

  export type ProviderUpdateManyMutationInput = {
    provider_name?: StringFieldUpdateOperationsInput | string
    profile?: NullableStringFieldUpdateOperationsInput | string | null
    onboarded?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProviderUncheckedUpdateManyInput = {
    provider_id?: IntFieldUpdateOperationsInput | number
    provider_name?: StringFieldUpdateOperationsInput | string
    profile?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: IntFieldUpdateOperationsInput | number
    onboarded?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ListingCreateInput = {
    listname: string
    list_type: string
    nqf_level?: number | null
    description?: string | null
    status?: string
    closing_date?: Date | string | null
    duration?: string | null
    location?: string | null
    requirements?: string | null
    stipend?: number | null
    sector?: string | null
    cvUploadedAt?: Date | string | null
    applications?: ApplicationCreateNestedManyWithoutListingInput
    provider: ProviderCreateNestedOneWithoutListingsInput
    Report?: ReportCreateNestedManyWithoutListingInput
  }

  export type ListingUncheckedCreateInput = {
    listings_id?: number
    listname: string
    list_type: string
    nqf_level?: number | null
    description?: string | null
    provider_id: number
    status?: string
    closing_date?: Date | string | null
    duration?: string | null
    location?: string | null
    requirements?: string | null
    stipend?: number | null
    sector?: string | null
    cvUploadedAt?: Date | string | null
    applications?: ApplicationUncheckedCreateNestedManyWithoutListingInput
    Report?: ReportUncheckedCreateNestedManyWithoutListingInput
  }

  export type ListingUpdateInput = {
    listname?: StringFieldUpdateOperationsInput | string
    list_type?: StringFieldUpdateOperationsInput | string
    nqf_level?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    closing_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    stipend?: NullableFloatFieldUpdateOperationsInput | number | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    cvUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    applications?: ApplicationUpdateManyWithoutListingNestedInput
    provider?: ProviderUpdateOneRequiredWithoutListingsNestedInput
    Report?: ReportUpdateManyWithoutListingNestedInput
  }

  export type ListingUncheckedUpdateInput = {
    listings_id?: IntFieldUpdateOperationsInput | number
    listname?: StringFieldUpdateOperationsInput | string
    list_type?: StringFieldUpdateOperationsInput | string
    nqf_level?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    provider_id?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    closing_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    stipend?: NullableFloatFieldUpdateOperationsInput | number | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    cvUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    applications?: ApplicationUncheckedUpdateManyWithoutListingNestedInput
    Report?: ReportUncheckedUpdateManyWithoutListingNestedInput
  }

  export type ListingCreateManyInput = {
    listname: string
    list_type: string
    nqf_level?: number | null
    description?: string | null
    provider_id: number
    status?: string
    closing_date?: Date | string | null
    duration?: string | null
    location?: string | null
    requirements?: string | null
    stipend?: number | null
    sector?: string | null
    cvUploadedAt?: Date | string | null
  }

  export type ListingUpdateManyMutationInput = {
    listname?: StringFieldUpdateOperationsInput | string
    list_type?: StringFieldUpdateOperationsInput | string
    nqf_level?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    closing_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    stipend?: NullableFloatFieldUpdateOperationsInput | number | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    cvUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ListingUncheckedUpdateManyInput = {
    listings_id?: IntFieldUpdateOperationsInput | number
    listname?: StringFieldUpdateOperationsInput | string
    list_type?: StringFieldUpdateOperationsInput | string
    nqf_level?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    provider_id?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    closing_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    stipend?: NullableFloatFieldUpdateOperationsInput | number | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    cvUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ApplicationCreateInput = {
    availability?: string | null
    motivation?: string | null
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    availability?: string | null
    motivation?: string | null
    cvFilePath?: string | null
    cvOriginalFilename?: string | null
    cvUploadedAt?: Date | string | null
    listing: ListingCreateNestedOneWithoutApplicationsInput
    provider: ProviderCreateNestedOneWithoutApplicationsInput
    user: UserCreateNestedOneWithoutApplicationsInput
  }

  export type ApplicationUncheckedCreateInput = {
    application_id?: number
    user_id: number
    provider_id: number
    availability?: string | null
    motivation?: string | null
    status?: string
    listing_id: number
    created_at?: Date | string
    updated_at?: Date | string
    availability?: string | null
    motivation?: string | null
    cvFilePath?: string | null
    cvOriginalFilename?: string | null
    cvUploadedAt?: Date | string | null
  }

  export type ApplicationUpdateInput = {
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    motivation?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    motivation?: NullableStringFieldUpdateOperationsInput | string | null
    cvFilePath?: NullableStringFieldUpdateOperationsInput | string | null
    cvOriginalFilename?: NullableStringFieldUpdateOperationsInput | string | null
    cvUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    listing?: ListingUpdateOneRequiredWithoutApplicationsNestedInput
    provider?: ProviderUpdateOneRequiredWithoutApplicationsNestedInput
    user?: UserUpdateOneRequiredWithoutApplicationsNestedInput
  }

  export type ApplicationUncheckedUpdateInput = {
    application_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    provider_id?: IntFieldUpdateOperationsInput | number
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    motivation?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    listing_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    motivation?: NullableStringFieldUpdateOperationsInput | string | null
    cvFilePath?: NullableStringFieldUpdateOperationsInput | string | null
    cvOriginalFilename?: NullableStringFieldUpdateOperationsInput | string | null
    cvUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ApplicationCreateManyInput = {
    user_id: number
    provider_id: number
    availability?: string | null
    motivation?: string | null
    status?: string
    listing_id: number
    created_at?: Date | string
    updated_at?: Date | string
    availability?: string | null
    motivation?: string | null
    cvFilePath?: string | null
    cvOriginalFilename?: string | null
    cvUploadedAt?: Date | string | null
  }

  export type ApplicationUpdateManyMutationInput = {
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    motivation?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    motivation?: NullableStringFieldUpdateOperationsInput | string | null
    cvFilePath?: NullableStringFieldUpdateOperationsInput | string | null
    cvOriginalFilename?: NullableStringFieldUpdateOperationsInput | string | null
    cvUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ApplicationUncheckedUpdateManyInput = {
    application_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    provider_id?: IntFieldUpdateOperationsInput | number
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    motivation?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    listing_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    motivation?: NullableStringFieldUpdateOperationsInput | string | null
    cvFilePath?: NullableStringFieldUpdateOperationsInput | string | null
    cvOriginalFilename?: NullableStringFieldUpdateOperationsInput | string | null
    cvUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SkillCreateInput = {
    name: string
    nqf_level?: number | null
    saqa_id?: string | null
    sector?: string | null
    applicantSkills?: ApplicantSkillCreateNestedManyWithoutSkillInput
  }

  export type SkillUncheckedCreateInput = {
    skill_id?: number
    name: string
    nqf_level?: number | null
    saqa_id?: string | null
    sector?: string | null
    applicantSkills?: ApplicantSkillUncheckedCreateNestedManyWithoutSkillInput
  }

  export type SkillUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    nqf_level?: NullableIntFieldUpdateOperationsInput | number | null
    saqa_id?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    applicantSkills?: ApplicantSkillUpdateManyWithoutSkillNestedInput
  }

  export type SkillUncheckedUpdateInput = {
    skill_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    nqf_level?: NullableIntFieldUpdateOperationsInput | number | null
    saqa_id?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    applicantSkills?: ApplicantSkillUncheckedUpdateManyWithoutSkillNestedInput
  }

  export type SkillCreateManyInput = {
    name: string
    nqf_level?: number | null
    saqa_id?: string | null
    sector?: string | null
  }

  export type SkillUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    nqf_level?: NullableIntFieldUpdateOperationsInput | number | null
    saqa_id?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SkillUncheckedUpdateManyInput = {
    skill_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    nqf_level?: NullableIntFieldUpdateOperationsInput | number | null
    saqa_id?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ApplicantSkillCreateInput = {
    applicant: ApplicantProfileCreateNestedOneWithoutSkillsInput
    skill: SkillCreateNestedOneWithoutApplicantSkillsInput
  }

  export type ApplicantSkillUncheckedCreateInput = {
    id?: number
    applicant_id: number
    skill_id: number
  }

  export type ApplicantSkillUpdateInput = {
    applicant?: ApplicantProfileUpdateOneRequiredWithoutSkillsNestedInput
    skill?: SkillUpdateOneRequiredWithoutApplicantSkillsNestedInput
  }

  export type ApplicantSkillUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    applicant_id?: IntFieldUpdateOperationsInput | number
    skill_id?: IntFieldUpdateOperationsInput | number
  }

  export type ApplicantSkillCreateManyInput = {
    applicant_id: number
    skill_id: number
  }

  export type ApplicantSkillUpdateManyMutationInput = {

  }

  export type ApplicantSkillUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    applicant_id?: IntFieldUpdateOperationsInput | number
    skill_id?: IntFieldUpdateOperationsInput | number
  }

  export type QualificationCreateInput = {
    name: string
    nqf_level: number
    saqa_id?: string | null
    sector?: string | null
    originator?: string | null
    applicantQualifications?: ApplicantQualificationCreateNestedManyWithoutQualificationInput
  }

  export type QualificationUncheckedCreateInput = {
    qualification_id?: number
    name: string
    nqf_level: number
    saqa_id?: string | null
    sector?: string | null
    originator?: string | null
    applicantQualifications?: ApplicantQualificationUncheckedCreateNestedManyWithoutQualificationInput
  }

  export type QualificationUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    nqf_level?: IntFieldUpdateOperationsInput | number
    saqa_id?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    originator?: NullableStringFieldUpdateOperationsInput | string | null
    applicantQualifications?: ApplicantQualificationUpdateManyWithoutQualificationNestedInput
  }

  export type QualificationUncheckedUpdateInput = {
    qualification_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    nqf_level?: IntFieldUpdateOperationsInput | number
    saqa_id?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    originator?: NullableStringFieldUpdateOperationsInput | string | null
    applicantQualifications?: ApplicantQualificationUncheckedUpdateManyWithoutQualificationNestedInput
  }

  export type QualificationCreateManyInput = {
    name: string
    nqf_level: number
    saqa_id?: string | null
    sector?: string | null
    originator?: string | null
  }

  export type QualificationUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    nqf_level?: IntFieldUpdateOperationsInput | number
    saqa_id?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    originator?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type QualificationUncheckedUpdateManyInput = {
    qualification_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    nqf_level?: IntFieldUpdateOperationsInput | number
    saqa_id?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    originator?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ApplicantQualificationCreateInput = {
    institution?: string | null
    year_completed?: number | null
    applicant: ApplicantProfileCreateNestedOneWithoutQualificationsInput
    qualification: QualificationCreateNestedOneWithoutApplicantQualificationsInput
  }

  export type ApplicantQualificationUncheckedCreateInput = {
    id?: number
    applicant_id: number
    qualification_id: number
    institution?: string | null
    year_completed?: number | null
  }

  export type ApplicantQualificationUpdateInput = {
    institution?: NullableStringFieldUpdateOperationsInput | string | null
    year_completed?: NullableIntFieldUpdateOperationsInput | number | null
    applicant?: ApplicantProfileUpdateOneRequiredWithoutQualificationsNestedInput
    qualification?: QualificationUpdateOneRequiredWithoutApplicantQualificationsNestedInput
  }

  export type ApplicantQualificationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    applicant_id?: IntFieldUpdateOperationsInput | number
    qualification_id?: IntFieldUpdateOperationsInput | number
    institution?: NullableStringFieldUpdateOperationsInput | string | null
    year_completed?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ApplicantQualificationCreateManyInput = {
    applicant_id: number
    qualification_id: number
    institution?: string | null
    year_completed?: number | null
  }

  export type ApplicantQualificationUpdateManyMutationInput = {
    institution?: NullableStringFieldUpdateOperationsInput | string | null
    year_completed?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ApplicantQualificationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    applicant_id?: IntFieldUpdateOperationsInput | number
    qualification_id?: IntFieldUpdateOperationsInput | number
    institution?: NullableStringFieldUpdateOperationsInput | string | null
    year_completed?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ReportCreateInput = {
    reason: string
    details?: string | null
    reported_by: string
    status?: string
    created_at?: Date | string
    Listing: ListingCreateNestedOneWithoutReportInput
  }

  export type ReportUncheckedCreateInput = {
    report_id?: number
    listing_id: number
    reason: string
    details?: string | null
    reported_by: string
    status?: string
    created_at?: Date | string
  }

  export type ReportUpdateInput = {
    reason?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    reported_by?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    Listing?: ListingUpdateOneRequiredWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateInput = {
    report_id?: IntFieldUpdateOperationsInput | number
    listing_id?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    reported_by?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportCreateManyInput = {
    listing_id: number
    reason: string
    details?: string | null
    reported_by: string
    status?: string
    created_at?: Date | string
  }

  export type ReportUpdateManyMutationInput = {
    reason?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    reported_by?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUncheckedUpdateManyInput = {
    report_id?: IntFieldUpdateOperationsInput | number
    listing_id?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    reported_by?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type ApplicantProfileNullableScalarRelationFilter = {
    is?: ApplicantProfileWhereInput | null
    isNot?: ApplicantProfileWhereInput | null
  }

  export type ApplicationListRelationFilter = {
    every?: ApplicationWhereInput
    some?: ApplicationWhereInput
    none?: ApplicationWhereInput
  }

  export type ProviderNullableScalarRelationFilter = {
    is?: ProviderWhereInput | null
    isNot?: ProviderWhereInput | null
  }

  export type ApplicationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    user_id?: SortOrder
    name?: SortOrder
    surname?: SortOrder
    role?: SortOrder
    email?: SortOrder
    firebase_uid?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    user_id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    user_id?: SortOrder
    name?: SortOrder
    surname?: SortOrder
    role?: SortOrder
    email?: SortOrder
    firebase_uid?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    user_id?: SortOrder
    name?: SortOrder
    surname?: SortOrder
    role?: SortOrder
    email?: SortOrder
    firebase_uid?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    user_id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ApplicantQualificationListRelationFilter = {
    every?: ApplicantQualificationWhereInput
    some?: ApplicantQualificationWhereInput
    none?: ApplicantQualificationWhereInput
  }

  export type ApplicantSkillListRelationFilter = {
    every?: ApplicantSkillWhereInput
    some?: ApplicantSkillWhereInput
    none?: ApplicantSkillWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ApplicantQualificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ApplicantSkillOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ApplicantProfileCountOrderByAggregateInput = {
    applicant_id?: SortOrder
    user_id?: SortOrder
    phone?: SortOrder
    dob?: SortOrder
    bio?: SortOrder
  }

  export type ApplicantProfileAvgOrderByAggregateInput = {
    applicant_id?: SortOrder
    user_id?: SortOrder
  }

  export type ApplicantProfileMaxOrderByAggregateInput = {
    applicant_id?: SortOrder
    user_id?: SortOrder
    phone?: SortOrder
    dob?: SortOrder
    bio?: SortOrder
  }

  export type ApplicantProfileMinOrderByAggregateInput = {
    applicant_id?: SortOrder
    user_id?: SortOrder
    phone?: SortOrder
    dob?: SortOrder
    bio?: SortOrder
  }

  export type ApplicantProfileSumOrderByAggregateInput = {
    applicant_id?: SortOrder
    user_id?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ListingListRelationFilter = {
    every?: ListingWhereInput
    some?: ListingWhereInput
    none?: ListingWhereInput
  }

  export type ListingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProviderCountOrderByAggregateInput = {
    provider_id?: SortOrder
    provider_name?: SortOrder
    profile?: SortOrder
    user_id?: SortOrder
    onboarded?: SortOrder
  }

  export type ProviderAvgOrderByAggregateInput = {
    provider_id?: SortOrder
    user_id?: SortOrder
  }

  export type ProviderMaxOrderByAggregateInput = {
    provider_id?: SortOrder
    provider_name?: SortOrder
    profile?: SortOrder
    user_id?: SortOrder
    onboarded?: SortOrder
  }

  export type ProviderMinOrderByAggregateInput = {
    provider_id?: SortOrder
    provider_name?: SortOrder
    profile?: SortOrder
    user_id?: SortOrder
    onboarded?: SortOrder
  }

  export type ProviderSumOrderByAggregateInput = {
    provider_id?: SortOrder
    user_id?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ProviderScalarRelationFilter = {
    is?: ProviderWhereInput
    isNot?: ProviderWhereInput
  }

  export type ReportListRelationFilter = {
    every?: ReportWhereInput
    some?: ReportWhereInput
    none?: ReportWhereInput
  }

  export type ReportOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ListingCountOrderByAggregateInput = {
    listings_id?: SortOrder
    listname?: SortOrder
    list_type?: SortOrder
    nqf_level?: SortOrder
    description?: SortOrder
    provider_id?: SortOrder
    status?: SortOrder
    closing_date?: SortOrder
    duration?: SortOrder
    location?: SortOrder
    requirements?: SortOrder
    stipend?: SortOrder
    sector?: SortOrder
    cvUploadedAt?: SortOrder
  }

  export type ListingAvgOrderByAggregateInput = {
    listings_id?: SortOrder
    nqf_level?: SortOrder
    provider_id?: SortOrder
    stipend?: SortOrder
  }

  export type ListingMaxOrderByAggregateInput = {
    listings_id?: SortOrder
    listname?: SortOrder
    list_type?: SortOrder
    nqf_level?: SortOrder
    description?: SortOrder
    provider_id?: SortOrder
    status?: SortOrder
    closing_date?: SortOrder
    duration?: SortOrder
    location?: SortOrder
    requirements?: SortOrder
    stipend?: SortOrder
    sector?: SortOrder
    cvUploadedAt?: SortOrder
  }

  export type ListingMinOrderByAggregateInput = {
    listings_id?: SortOrder
    listname?: SortOrder
    list_type?: SortOrder
    nqf_level?: SortOrder
    description?: SortOrder
    provider_id?: SortOrder
    status?: SortOrder
    closing_date?: SortOrder
    duration?: SortOrder
    location?: SortOrder
    requirements?: SortOrder
    stipend?: SortOrder
    sector?: SortOrder
    cvUploadedAt?: SortOrder
  }

  export type ListingSumOrderByAggregateInput = {
    listings_id?: SortOrder
    nqf_level?: SortOrder
    provider_id?: SortOrder
    stipend?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ListingScalarRelationFilter = {
    is?: ListingWhereInput
    isNot?: ListingWhereInput
  }

  export type ApplicationCountOrderByAggregateInput = {
    application_id?: SortOrder
    user_id?: SortOrder
    provider_id?: SortOrder
    availability?: SortOrder
    motivation?: SortOrder
    status?: SortOrder
    listing_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    availability?: SortOrder
    motivation?: SortOrder
    cvFilePath?: SortOrder
    cvOriginalFilename?: SortOrder
    cvUploadedAt?: SortOrder
  }

  export type ApplicationAvgOrderByAggregateInput = {
    application_id?: SortOrder
    user_id?: SortOrder
    provider_id?: SortOrder
    listing_id?: SortOrder
  }

  export type ApplicationMaxOrderByAggregateInput = {
    application_id?: SortOrder
    user_id?: SortOrder
    provider_id?: SortOrder
    availability?: SortOrder
    motivation?: SortOrder
    status?: SortOrder
    listing_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    availability?: SortOrder
    motivation?: SortOrder
    cvFilePath?: SortOrder
    cvOriginalFilename?: SortOrder
    cvUploadedAt?: SortOrder
  }

  export type ApplicationMinOrderByAggregateInput = {
    application_id?: SortOrder
    user_id?: SortOrder
    provider_id?: SortOrder
    availability?: SortOrder
    motivation?: SortOrder
    status?: SortOrder
    listing_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    availability?: SortOrder
    motivation?: SortOrder
    cvFilePath?: SortOrder
    cvOriginalFilename?: SortOrder
    cvUploadedAt?: SortOrder
  }

  export type ApplicationSumOrderByAggregateInput = {
    application_id?: SortOrder
    user_id?: SortOrder
    provider_id?: SortOrder
    listing_id?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type SkillCountOrderByAggregateInput = {
    skill_id?: SortOrder
    name?: SortOrder
    nqf_level?: SortOrder
    saqa_id?: SortOrder
    sector?: SortOrder
  }

  export type SkillAvgOrderByAggregateInput = {
    skill_id?: SortOrder
    nqf_level?: SortOrder
  }

  export type SkillMaxOrderByAggregateInput = {
    skill_id?: SortOrder
    name?: SortOrder
    nqf_level?: SortOrder
    saqa_id?: SortOrder
    sector?: SortOrder
  }

  export type SkillMinOrderByAggregateInput = {
    skill_id?: SortOrder
    name?: SortOrder
    nqf_level?: SortOrder
    saqa_id?: SortOrder
    sector?: SortOrder
  }

  export type SkillSumOrderByAggregateInput = {
    skill_id?: SortOrder
    nqf_level?: SortOrder
  }

  export type ApplicantProfileScalarRelationFilter = {
    is?: ApplicantProfileWhereInput
    isNot?: ApplicantProfileWhereInput
  }

  export type SkillScalarRelationFilter = {
    is?: SkillWhereInput
    isNot?: SkillWhereInput
  }

  export type ApplicantSkillCountOrderByAggregateInput = {
    id?: SortOrder
    applicant_id?: SortOrder
    skill_id?: SortOrder
  }

  export type ApplicantSkillAvgOrderByAggregateInput = {
    id?: SortOrder
    applicant_id?: SortOrder
    skill_id?: SortOrder
  }

  export type ApplicantSkillMaxOrderByAggregateInput = {
    id?: SortOrder
    applicant_id?: SortOrder
    skill_id?: SortOrder
  }

  export type ApplicantSkillMinOrderByAggregateInput = {
    id?: SortOrder
    applicant_id?: SortOrder
    skill_id?: SortOrder
  }

  export type ApplicantSkillSumOrderByAggregateInput = {
    id?: SortOrder
    applicant_id?: SortOrder
    skill_id?: SortOrder
  }

  export type QualificationCountOrderByAggregateInput = {
    qualification_id?: SortOrder
    name?: SortOrder
    nqf_level?: SortOrder
    saqa_id?: SortOrder
    sector?: SortOrder
    originator?: SortOrder
  }

  export type QualificationAvgOrderByAggregateInput = {
    qualification_id?: SortOrder
    nqf_level?: SortOrder
  }

  export type QualificationMaxOrderByAggregateInput = {
    qualification_id?: SortOrder
    name?: SortOrder
    nqf_level?: SortOrder
    saqa_id?: SortOrder
    sector?: SortOrder
    originator?: SortOrder
  }

  export type QualificationMinOrderByAggregateInput = {
    qualification_id?: SortOrder
    name?: SortOrder
    nqf_level?: SortOrder
    saqa_id?: SortOrder
    sector?: SortOrder
    originator?: SortOrder
  }

  export type QualificationSumOrderByAggregateInput = {
    qualification_id?: SortOrder
    nqf_level?: SortOrder
  }

  export type QualificationScalarRelationFilter = {
    is?: QualificationWhereInput
    isNot?: QualificationWhereInput
  }

  export type ApplicantQualificationCountOrderByAggregateInput = {
    id?: SortOrder
    applicant_id?: SortOrder
    qualification_id?: SortOrder
    institution?: SortOrder
    year_completed?: SortOrder
  }

  export type ApplicantQualificationAvgOrderByAggregateInput = {
    id?: SortOrder
    applicant_id?: SortOrder
    qualification_id?: SortOrder
    year_completed?: SortOrder
  }

  export type ApplicantQualificationMaxOrderByAggregateInput = {
    id?: SortOrder
    applicant_id?: SortOrder
    qualification_id?: SortOrder
    institution?: SortOrder
    year_completed?: SortOrder
  }

  export type ApplicantQualificationMinOrderByAggregateInput = {
    id?: SortOrder
    applicant_id?: SortOrder
    qualification_id?: SortOrder
    institution?: SortOrder
    year_completed?: SortOrder
  }

  export type ApplicantQualificationSumOrderByAggregateInput = {
    id?: SortOrder
    applicant_id?: SortOrder
    qualification_id?: SortOrder
    year_completed?: SortOrder
  }

  export type ReportCountOrderByAggregateInput = {
    report_id?: SortOrder
    listing_id?: SortOrder
    reason?: SortOrder
    details?: SortOrder
    reported_by?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
  }

  export type ReportAvgOrderByAggregateInput = {
    report_id?: SortOrder
    listing_id?: SortOrder
  }

  export type ReportMaxOrderByAggregateInput = {
    report_id?: SortOrder
    listing_id?: SortOrder
    reason?: SortOrder
    details?: SortOrder
    reported_by?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
  }

  export type ReportMinOrderByAggregateInput = {
    report_id?: SortOrder
    listing_id?: SortOrder
    reason?: SortOrder
    details?: SortOrder
    reported_by?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
  }

  export type ReportSumOrderByAggregateInput = {
    report_id?: SortOrder
    listing_id?: SortOrder
  }

  export type ApplicantProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<ApplicantProfileCreateWithoutUserInput, ApplicantProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ApplicantProfileCreateOrConnectWithoutUserInput
    connect?: ApplicantProfileWhereUniqueInput
  }

  export type ReportCountOrderByAggregateInput = {
    report_id?: SortOrder
    listing_id?: SortOrder
    reason?: SortOrder
    details?: SortOrder
    reported_by?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
  }

  export type ReportAvgOrderByAggregateInput = {
    report_id?: SortOrder
    listing_id?: SortOrder
  }

  export type ReportMaxOrderByAggregateInput = {
    report_id?: SortOrder
    listing_id?: SortOrder
    reason?: SortOrder
    details?: SortOrder
    reported_by?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
  }

  export type ReportMinOrderByAggregateInput = {
    report_id?: SortOrder
    listing_id?: SortOrder
    reason?: SortOrder
    details?: SortOrder
    reported_by?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
  }

  export type ReportSumOrderByAggregateInput = {
    report_id?: SortOrder
    listing_id?: SortOrder
  }

  export type ApplicationCreateNestedManyWithoutUserInput = {
    create?: XOR<ApplicationCreateWithoutUserInput, ApplicationUncheckedCreateWithoutUserInput> | ApplicationCreateWithoutUserInput[] | ApplicationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutUserInput | ApplicationCreateOrConnectWithoutUserInput[]
    createMany?: ApplicationCreateManyUserInputEnvelope
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
  }

  export type ProviderCreateNestedOneWithoutUserInput = {
    create?: XOR<ProviderCreateWithoutUserInput, ProviderUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProviderCreateOrConnectWithoutUserInput
    connect?: ProviderWhereUniqueInput
  }

  export type ApplicantProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<ApplicantProfileCreateWithoutUserInput, ApplicantProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ApplicantProfileCreateOrConnectWithoutUserInput
    connect?: ApplicantProfileWhereUniqueInput
  }

  export type ApplicationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ApplicationCreateWithoutUserInput, ApplicationUncheckedCreateWithoutUserInput> | ApplicationCreateWithoutUserInput[] | ApplicationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutUserInput | ApplicationCreateOrConnectWithoutUserInput[]
    createMany?: ApplicationCreateManyUserInputEnvelope
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
  }

  export type ProviderUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<ProviderCreateWithoutUserInput, ProviderUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProviderCreateOrConnectWithoutUserInput
    connect?: ProviderWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type ApplicantProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<ApplicantProfileCreateWithoutUserInput, ApplicantProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ApplicantProfileCreateOrConnectWithoutUserInput
    upsert?: ApplicantProfileUpsertWithoutUserInput
    disconnect?: ApplicantProfileWhereInput | boolean
    delete?: ApplicantProfileWhereInput | boolean
    connect?: ApplicantProfileWhereUniqueInput
    update?: XOR<XOR<ApplicantProfileUpdateToOneWithWhereWithoutUserInput, ApplicantProfileUpdateWithoutUserInput>, ApplicantProfileUncheckedUpdateWithoutUserInput>
  }

  export type ApplicationUpdateManyWithoutUserNestedInput = {
    create?: XOR<ApplicationCreateWithoutUserInput, ApplicationUncheckedCreateWithoutUserInput> | ApplicationCreateWithoutUserInput[] | ApplicationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutUserInput | ApplicationCreateOrConnectWithoutUserInput[]
    upsert?: ApplicationUpsertWithWhereUniqueWithoutUserInput | ApplicationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ApplicationCreateManyUserInputEnvelope
    set?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    disconnect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    delete?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    update?: ApplicationUpdateWithWhereUniqueWithoutUserInput | ApplicationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ApplicationUpdateManyWithWhereWithoutUserInput | ApplicationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
  }

  export type ProviderUpdateOneWithoutUserNestedInput = {
    create?: XOR<ProviderCreateWithoutUserInput, ProviderUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProviderCreateOrConnectWithoutUserInput
    upsert?: ProviderUpsertWithoutUserInput
    disconnect?: ProviderWhereInput | boolean
    delete?: ProviderWhereInput | boolean
    connect?: ProviderWhereUniqueInput
    update?: XOR<XOR<ProviderUpdateToOneWithWhereWithoutUserInput, ProviderUpdateWithoutUserInput>, ProviderUncheckedUpdateWithoutUserInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ApplicantProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<ApplicantProfileCreateWithoutUserInput, ApplicantProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ApplicantProfileCreateOrConnectWithoutUserInput
    upsert?: ApplicantProfileUpsertWithoutUserInput
    disconnect?: ApplicantProfileWhereInput | boolean
    delete?: ApplicantProfileWhereInput | boolean
    connect?: ApplicantProfileWhereUniqueInput
    update?: XOR<XOR<ApplicantProfileUpdateToOneWithWhereWithoutUserInput, ApplicantProfileUpdateWithoutUserInput>, ApplicantProfileUncheckedUpdateWithoutUserInput>
  }

  export type ApplicationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ApplicationCreateWithoutUserInput, ApplicationUncheckedCreateWithoutUserInput> | ApplicationCreateWithoutUserInput[] | ApplicationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutUserInput | ApplicationCreateOrConnectWithoutUserInput[]
    upsert?: ApplicationUpsertWithWhereUniqueWithoutUserInput | ApplicationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ApplicationCreateManyUserInputEnvelope
    set?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    disconnect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    delete?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    update?: ApplicationUpdateWithWhereUniqueWithoutUserInput | ApplicationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ApplicationUpdateManyWithWhereWithoutUserInput | ApplicationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
  }

  export type ProviderUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<ProviderCreateWithoutUserInput, ProviderUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProviderCreateOrConnectWithoutUserInput
    upsert?: ProviderUpsertWithoutUserInput
    disconnect?: ProviderWhereInput | boolean
    delete?: ProviderWhereInput | boolean
    connect?: ProviderWhereUniqueInput
    update?: XOR<XOR<ProviderUpdateToOneWithWhereWithoutUserInput, ProviderUpdateWithoutUserInput>, ProviderUncheckedUpdateWithoutUserInput>
  }

  export type UserCreateNestedOneWithoutApplicantInput = {
    create?: XOR<UserCreateWithoutApplicantInput, UserUncheckedCreateWithoutApplicantInput>
    connectOrCreate?: UserCreateOrConnectWithoutApplicantInput
    connect?: UserWhereUniqueInput
  }

  export type ApplicantQualificationCreateNestedManyWithoutApplicantInput = {
    create?: XOR<ApplicantQualificationCreateWithoutApplicantInput, ApplicantQualificationUncheckedCreateWithoutApplicantInput> | ApplicantQualificationCreateWithoutApplicantInput[] | ApplicantQualificationUncheckedCreateWithoutApplicantInput[]
    connectOrCreate?: ApplicantQualificationCreateOrConnectWithoutApplicantInput | ApplicantQualificationCreateOrConnectWithoutApplicantInput[]
    createMany?: ApplicantQualificationCreateManyApplicantInputEnvelope
    connect?: ApplicantQualificationWhereUniqueInput | ApplicantQualificationWhereUniqueInput[]
  }

  export type ApplicantSkillCreateNestedManyWithoutApplicantInput = {
    create?: XOR<ApplicantSkillCreateWithoutApplicantInput, ApplicantSkillUncheckedCreateWithoutApplicantInput> | ApplicantSkillCreateWithoutApplicantInput[] | ApplicantSkillUncheckedCreateWithoutApplicantInput[]
    connectOrCreate?: ApplicantSkillCreateOrConnectWithoutApplicantInput | ApplicantSkillCreateOrConnectWithoutApplicantInput[]
    createMany?: ApplicantSkillCreateManyApplicantInputEnvelope
    connect?: ApplicantSkillWhereUniqueInput | ApplicantSkillWhereUniqueInput[]
  }

  export type ApplicantQualificationUncheckedCreateNestedManyWithoutApplicantInput = {
    create?: XOR<ApplicantQualificationCreateWithoutApplicantInput, ApplicantQualificationUncheckedCreateWithoutApplicantInput> | ApplicantQualificationCreateWithoutApplicantInput[] | ApplicantQualificationUncheckedCreateWithoutApplicantInput[]
    connectOrCreate?: ApplicantQualificationCreateOrConnectWithoutApplicantInput | ApplicantQualificationCreateOrConnectWithoutApplicantInput[]
    createMany?: ApplicantQualificationCreateManyApplicantInputEnvelope
    connect?: ApplicantQualificationWhereUniqueInput | ApplicantQualificationWhereUniqueInput[]
  }

  export type ApplicantSkillUncheckedCreateNestedManyWithoutApplicantInput = {
    create?: XOR<ApplicantSkillCreateWithoutApplicantInput, ApplicantSkillUncheckedCreateWithoutApplicantInput> | ApplicantSkillCreateWithoutApplicantInput[] | ApplicantSkillUncheckedCreateWithoutApplicantInput[]
    connectOrCreate?: ApplicantSkillCreateOrConnectWithoutApplicantInput | ApplicantSkillCreateOrConnectWithoutApplicantInput[]
    createMany?: ApplicantSkillCreateManyApplicantInputEnvelope
    connect?: ApplicantSkillWhereUniqueInput | ApplicantSkillWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutApplicantNestedInput = {
    create?: XOR<UserCreateWithoutApplicantInput, UserUncheckedCreateWithoutApplicantInput>
    connectOrCreate?: UserCreateOrConnectWithoutApplicantInput
    upsert?: UserUpsertWithoutApplicantInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutApplicantInput, UserUpdateWithoutApplicantInput>, UserUncheckedUpdateWithoutApplicantInput>
  }

  export type ApplicantQualificationUpdateManyWithoutApplicantNestedInput = {
    create?: XOR<ApplicantQualificationCreateWithoutApplicantInput, ApplicantQualificationUncheckedCreateWithoutApplicantInput> | ApplicantQualificationCreateWithoutApplicantInput[] | ApplicantQualificationUncheckedCreateWithoutApplicantInput[]
    connectOrCreate?: ApplicantQualificationCreateOrConnectWithoutApplicantInput | ApplicantQualificationCreateOrConnectWithoutApplicantInput[]
    upsert?: ApplicantQualificationUpsertWithWhereUniqueWithoutApplicantInput | ApplicantQualificationUpsertWithWhereUniqueWithoutApplicantInput[]
    createMany?: ApplicantQualificationCreateManyApplicantInputEnvelope
    set?: ApplicantQualificationWhereUniqueInput | ApplicantQualificationWhereUniqueInput[]
    disconnect?: ApplicantQualificationWhereUniqueInput | ApplicantQualificationWhereUniqueInput[]
    delete?: ApplicantQualificationWhereUniqueInput | ApplicantQualificationWhereUniqueInput[]
    connect?: ApplicantQualificationWhereUniqueInput | ApplicantQualificationWhereUniqueInput[]
    update?: ApplicantQualificationUpdateWithWhereUniqueWithoutApplicantInput | ApplicantQualificationUpdateWithWhereUniqueWithoutApplicantInput[]
    updateMany?: ApplicantQualificationUpdateManyWithWhereWithoutApplicantInput | ApplicantQualificationUpdateManyWithWhereWithoutApplicantInput[]
    deleteMany?: ApplicantQualificationScalarWhereInput | ApplicantQualificationScalarWhereInput[]
  }

  export type ApplicantSkillUpdateManyWithoutApplicantNestedInput = {
    create?: XOR<ApplicantSkillCreateWithoutApplicantInput, ApplicantSkillUncheckedCreateWithoutApplicantInput> | ApplicantSkillCreateWithoutApplicantInput[] | ApplicantSkillUncheckedCreateWithoutApplicantInput[]
    connectOrCreate?: ApplicantSkillCreateOrConnectWithoutApplicantInput | ApplicantSkillCreateOrConnectWithoutApplicantInput[]
    upsert?: ApplicantSkillUpsertWithWhereUniqueWithoutApplicantInput | ApplicantSkillUpsertWithWhereUniqueWithoutApplicantInput[]
    createMany?: ApplicantSkillCreateManyApplicantInputEnvelope
    set?: ApplicantSkillWhereUniqueInput | ApplicantSkillWhereUniqueInput[]
    disconnect?: ApplicantSkillWhereUniqueInput | ApplicantSkillWhereUniqueInput[]
    delete?: ApplicantSkillWhereUniqueInput | ApplicantSkillWhereUniqueInput[]
    connect?: ApplicantSkillWhereUniqueInput | ApplicantSkillWhereUniqueInput[]
    update?: ApplicantSkillUpdateWithWhereUniqueWithoutApplicantInput | ApplicantSkillUpdateWithWhereUniqueWithoutApplicantInput[]
    updateMany?: ApplicantSkillUpdateManyWithWhereWithoutApplicantInput | ApplicantSkillUpdateManyWithWhereWithoutApplicantInput[]
    deleteMany?: ApplicantSkillScalarWhereInput | ApplicantSkillScalarWhereInput[]
  }

  export type ApplicantQualificationUncheckedUpdateManyWithoutApplicantNestedInput = {
    create?: XOR<ApplicantQualificationCreateWithoutApplicantInput, ApplicantQualificationUncheckedCreateWithoutApplicantInput> | ApplicantQualificationCreateWithoutApplicantInput[] | ApplicantQualificationUncheckedCreateWithoutApplicantInput[]
    connectOrCreate?: ApplicantQualificationCreateOrConnectWithoutApplicantInput | ApplicantQualificationCreateOrConnectWithoutApplicantInput[]
    upsert?: ApplicantQualificationUpsertWithWhereUniqueWithoutApplicantInput | ApplicantQualificationUpsertWithWhereUniqueWithoutApplicantInput[]
    createMany?: ApplicantQualificationCreateManyApplicantInputEnvelope
    set?: ApplicantQualificationWhereUniqueInput | ApplicantQualificationWhereUniqueInput[]
    disconnect?: ApplicantQualificationWhereUniqueInput | ApplicantQualificationWhereUniqueInput[]
    delete?: ApplicantQualificationWhereUniqueInput | ApplicantQualificationWhereUniqueInput[]
    connect?: ApplicantQualificationWhereUniqueInput | ApplicantQualificationWhereUniqueInput[]
    update?: ApplicantQualificationUpdateWithWhereUniqueWithoutApplicantInput | ApplicantQualificationUpdateWithWhereUniqueWithoutApplicantInput[]
    updateMany?: ApplicantQualificationUpdateManyWithWhereWithoutApplicantInput | ApplicantQualificationUpdateManyWithWhereWithoutApplicantInput[]
    deleteMany?: ApplicantQualificationScalarWhereInput | ApplicantQualificationScalarWhereInput[]
  }

  export type ApplicantSkillUncheckedUpdateManyWithoutApplicantNestedInput = {
    create?: XOR<ApplicantSkillCreateWithoutApplicantInput, ApplicantSkillUncheckedCreateWithoutApplicantInput> | ApplicantSkillCreateWithoutApplicantInput[] | ApplicantSkillUncheckedCreateWithoutApplicantInput[]
    connectOrCreate?: ApplicantSkillCreateOrConnectWithoutApplicantInput | ApplicantSkillCreateOrConnectWithoutApplicantInput[]
    upsert?: ApplicantSkillUpsertWithWhereUniqueWithoutApplicantInput | ApplicantSkillUpsertWithWhereUniqueWithoutApplicantInput[]
    createMany?: ApplicantSkillCreateManyApplicantInputEnvelope
    set?: ApplicantSkillWhereUniqueInput | ApplicantSkillWhereUniqueInput[]
    disconnect?: ApplicantSkillWhereUniqueInput | ApplicantSkillWhereUniqueInput[]
    delete?: ApplicantSkillWhereUniqueInput | ApplicantSkillWhereUniqueInput[]
    connect?: ApplicantSkillWhereUniqueInput | ApplicantSkillWhereUniqueInput[]
    update?: ApplicantSkillUpdateWithWhereUniqueWithoutApplicantInput | ApplicantSkillUpdateWithWhereUniqueWithoutApplicantInput[]
    updateMany?: ApplicantSkillUpdateManyWithWhereWithoutApplicantInput | ApplicantSkillUpdateManyWithWhereWithoutApplicantInput[]
    deleteMany?: ApplicantSkillScalarWhereInput | ApplicantSkillScalarWhereInput[]
  }

  export type ApplicationCreateNestedManyWithoutProviderInput = {
    create?: XOR<ApplicationCreateWithoutProviderInput, ApplicationUncheckedCreateWithoutProviderInput> | ApplicationCreateWithoutProviderInput[] | ApplicationUncheckedCreateWithoutProviderInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutProviderInput | ApplicationCreateOrConnectWithoutProviderInput[]
    createMany?: ApplicationCreateManyProviderInputEnvelope
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
  }

  export type ListingCreateNestedManyWithoutProviderInput = {
    create?: XOR<ListingCreateWithoutProviderInput, ListingUncheckedCreateWithoutProviderInput> | ListingCreateWithoutProviderInput[] | ListingUncheckedCreateWithoutProviderInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutProviderInput | ListingCreateOrConnectWithoutProviderInput[]
    createMany?: ListingCreateManyProviderInputEnvelope
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutProviderInput = {
    create?: XOR<UserCreateWithoutProviderInput, UserUncheckedCreateWithoutProviderInput>
    connectOrCreate?: UserCreateOrConnectWithoutProviderInput
    connect?: UserWhereUniqueInput
  }

  export type ApplicationUncheckedCreateNestedManyWithoutProviderInput = {
    create?: XOR<ApplicationCreateWithoutProviderInput, ApplicationUncheckedCreateWithoutProviderInput> | ApplicationCreateWithoutProviderInput[] | ApplicationUncheckedCreateWithoutProviderInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutProviderInput | ApplicationCreateOrConnectWithoutProviderInput[]
    createMany?: ApplicationCreateManyProviderInputEnvelope
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
  }

  export type ListingUncheckedCreateNestedManyWithoutProviderInput = {
    create?: XOR<ListingCreateWithoutProviderInput, ListingUncheckedCreateWithoutProviderInput> | ListingCreateWithoutProviderInput[] | ListingUncheckedCreateWithoutProviderInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutProviderInput | ListingCreateOrConnectWithoutProviderInput[]
    createMany?: ListingCreateManyProviderInputEnvelope
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ApplicationUpdateManyWithoutProviderNestedInput = {
    create?: XOR<ApplicationCreateWithoutProviderInput, ApplicationUncheckedCreateWithoutProviderInput> | ApplicationCreateWithoutProviderInput[] | ApplicationUncheckedCreateWithoutProviderInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutProviderInput | ApplicationCreateOrConnectWithoutProviderInput[]
    upsert?: ApplicationUpsertWithWhereUniqueWithoutProviderInput | ApplicationUpsertWithWhereUniqueWithoutProviderInput[]
    createMany?: ApplicationCreateManyProviderInputEnvelope
    set?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    disconnect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    delete?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    update?: ApplicationUpdateWithWhereUniqueWithoutProviderInput | ApplicationUpdateWithWhereUniqueWithoutProviderInput[]
    updateMany?: ApplicationUpdateManyWithWhereWithoutProviderInput | ApplicationUpdateManyWithWhereWithoutProviderInput[]
    deleteMany?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
  }

  export type ListingUpdateManyWithoutProviderNestedInput = {
    create?: XOR<ListingCreateWithoutProviderInput, ListingUncheckedCreateWithoutProviderInput> | ListingCreateWithoutProviderInput[] | ListingUncheckedCreateWithoutProviderInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutProviderInput | ListingCreateOrConnectWithoutProviderInput[]
    upsert?: ListingUpsertWithWhereUniqueWithoutProviderInput | ListingUpsertWithWhereUniqueWithoutProviderInput[]
    createMany?: ListingCreateManyProviderInputEnvelope
    set?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    disconnect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    delete?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    update?: ListingUpdateWithWhereUniqueWithoutProviderInput | ListingUpdateWithWhereUniqueWithoutProviderInput[]
    updateMany?: ListingUpdateManyWithWhereWithoutProviderInput | ListingUpdateManyWithWhereWithoutProviderInput[]
    deleteMany?: ListingScalarWhereInput | ListingScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutProviderNestedInput = {
    create?: XOR<UserCreateWithoutProviderInput, UserUncheckedCreateWithoutProviderInput>
    connectOrCreate?: UserCreateOrConnectWithoutProviderInput
    upsert?: UserUpsertWithoutProviderInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProviderInput, UserUpdateWithoutProviderInput>, UserUncheckedUpdateWithoutProviderInput>
  }

  export type ApplicationUncheckedUpdateManyWithoutProviderNestedInput = {
    create?: XOR<ApplicationCreateWithoutProviderInput, ApplicationUncheckedCreateWithoutProviderInput> | ApplicationCreateWithoutProviderInput[] | ApplicationUncheckedCreateWithoutProviderInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutProviderInput | ApplicationCreateOrConnectWithoutProviderInput[]
    upsert?: ApplicationUpsertWithWhereUniqueWithoutProviderInput | ApplicationUpsertWithWhereUniqueWithoutProviderInput[]
    createMany?: ApplicationCreateManyProviderInputEnvelope
    set?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    disconnect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    delete?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    update?: ApplicationUpdateWithWhereUniqueWithoutProviderInput | ApplicationUpdateWithWhereUniqueWithoutProviderInput[]
    updateMany?: ApplicationUpdateManyWithWhereWithoutProviderInput | ApplicationUpdateManyWithWhereWithoutProviderInput[]
    deleteMany?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
  }

  export type ListingUncheckedUpdateManyWithoutProviderNestedInput = {
    create?: XOR<ListingCreateWithoutProviderInput, ListingUncheckedCreateWithoutProviderInput> | ListingCreateWithoutProviderInput[] | ListingUncheckedCreateWithoutProviderInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutProviderInput | ListingCreateOrConnectWithoutProviderInput[]
    upsert?: ListingUpsertWithWhereUniqueWithoutProviderInput | ListingUpsertWithWhereUniqueWithoutProviderInput[]
    createMany?: ListingCreateManyProviderInputEnvelope
    set?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    disconnect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    delete?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    update?: ListingUpdateWithWhereUniqueWithoutProviderInput | ListingUpdateWithWhereUniqueWithoutProviderInput[]
    updateMany?: ListingUpdateManyWithWhereWithoutProviderInput | ListingUpdateManyWithWhereWithoutProviderInput[]
    deleteMany?: ListingScalarWhereInput | ListingScalarWhereInput[]
  }

  export type ApplicationCreateNestedManyWithoutListingInput = {
    create?: XOR<ApplicationCreateWithoutListingInput, ApplicationUncheckedCreateWithoutListingInput> | ApplicationCreateWithoutListingInput[] | ApplicationUncheckedCreateWithoutListingInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutListingInput | ApplicationCreateOrConnectWithoutListingInput[]
    createMany?: ApplicationCreateManyListingInputEnvelope
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
  }

  export type ProviderCreateNestedOneWithoutListingsInput = {
    create?: XOR<ProviderCreateWithoutListingsInput, ProviderUncheckedCreateWithoutListingsInput>
    connectOrCreate?: ProviderCreateOrConnectWithoutListingsInput
    connect?: ProviderWhereUniqueInput
  }

  export type ReportCreateNestedManyWithoutListingInput = {
    create?: XOR<ReportCreateWithoutListingInput, ReportUncheckedCreateWithoutListingInput> | ReportCreateWithoutListingInput[] | ReportUncheckedCreateWithoutListingInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutListingInput | ReportCreateOrConnectWithoutListingInput[]
    createMany?: ReportCreateManyListingInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type ReportCreateNestedManyWithoutListingInput = {
    create?: XOR<ReportCreateWithoutListingInput, ReportUncheckedCreateWithoutListingInput> | ReportCreateWithoutListingInput[] | ReportUncheckedCreateWithoutListingInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutListingInput | ReportCreateOrConnectWithoutListingInput[]
    createMany?: ReportCreateManyListingInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type ApplicationUncheckedCreateNestedManyWithoutListingInput = {
    create?: XOR<ApplicationCreateWithoutListingInput, ApplicationUncheckedCreateWithoutListingInput> | ApplicationCreateWithoutListingInput[] | ApplicationUncheckedCreateWithoutListingInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutListingInput | ApplicationCreateOrConnectWithoutListingInput[]
    createMany?: ApplicationCreateManyListingInputEnvelope
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
  }

  export type ReportUncheckedCreateNestedManyWithoutListingInput = {
    create?: XOR<ReportCreateWithoutListingInput, ReportUncheckedCreateWithoutListingInput> | ReportCreateWithoutListingInput[] | ReportUncheckedCreateWithoutListingInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutListingInput | ReportCreateOrConnectWithoutListingInput[]
    createMany?: ReportCreateManyListingInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ApplicationUpdateManyWithoutListingNestedInput = {
    create?: XOR<ApplicationCreateWithoutListingInput, ApplicationUncheckedCreateWithoutListingInput> | ApplicationCreateWithoutListingInput[] | ApplicationUncheckedCreateWithoutListingInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutListingInput | ApplicationCreateOrConnectWithoutListingInput[]
    upsert?: ApplicationUpsertWithWhereUniqueWithoutListingInput | ApplicationUpsertWithWhereUniqueWithoutListingInput[]
    createMany?: ApplicationCreateManyListingInputEnvelope
    set?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    disconnect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    delete?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    update?: ApplicationUpdateWithWhereUniqueWithoutListingInput | ApplicationUpdateWithWhereUniqueWithoutListingInput[]
    updateMany?: ApplicationUpdateManyWithWhereWithoutListingInput | ApplicationUpdateManyWithWhereWithoutListingInput[]
    deleteMany?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
  }

  export type ProviderUpdateOneRequiredWithoutListingsNestedInput = {
    create?: XOR<ProviderCreateWithoutListingsInput, ProviderUncheckedCreateWithoutListingsInput>
    connectOrCreate?: ProviderCreateOrConnectWithoutListingsInput
    upsert?: ProviderUpsertWithoutListingsInput
    connect?: ProviderWhereUniqueInput
    update?: XOR<XOR<ProviderUpdateToOneWithWhereWithoutListingsInput, ProviderUpdateWithoutListingsInput>, ProviderUncheckedUpdateWithoutListingsInput>
  }

  export type ReportUpdateManyWithoutListingNestedInput = {
    create?: XOR<ReportCreateWithoutListingInput, ReportUncheckedCreateWithoutListingInput> | ReportCreateWithoutListingInput[] | ReportUncheckedCreateWithoutListingInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutListingInput | ReportCreateOrConnectWithoutListingInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutListingInput | ReportUpsertWithWhereUniqueWithoutListingInput[]
    createMany?: ReportCreateManyListingInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutListingInput | ReportUpdateWithWhereUniqueWithoutListingInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutListingInput | ReportUpdateManyWithWhereWithoutListingInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type ApplicationUncheckedUpdateManyWithoutListingNestedInput = {
    create?: XOR<ApplicationCreateWithoutListingInput, ApplicationUncheckedCreateWithoutListingInput> | ApplicationCreateWithoutListingInput[] | ApplicationUncheckedCreateWithoutListingInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutListingInput | ApplicationCreateOrConnectWithoutListingInput[]
    upsert?: ApplicationUpsertWithWhereUniqueWithoutListingInput | ApplicationUpsertWithWhereUniqueWithoutListingInput[]
    createMany?: ApplicationCreateManyListingInputEnvelope
    set?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    disconnect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    delete?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    update?: ApplicationUpdateWithWhereUniqueWithoutListingInput | ApplicationUpdateWithWhereUniqueWithoutListingInput[]
    updateMany?: ApplicationUpdateManyWithWhereWithoutListingInput | ApplicationUpdateManyWithWhereWithoutListingInput[]
    deleteMany?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
  }

  export type ReportUncheckedUpdateManyWithoutListingNestedInput = {
    create?: XOR<ReportCreateWithoutListingInput, ReportUncheckedCreateWithoutListingInput> | ReportCreateWithoutListingInput[] | ReportUncheckedCreateWithoutListingInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutListingInput | ReportCreateOrConnectWithoutListingInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutListingInput | ReportUpsertWithWhereUniqueWithoutListingInput[]
    createMany?: ReportCreateManyListingInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutListingInput | ReportUpdateWithWhereUniqueWithoutListingInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutListingInput | ReportUpdateManyWithWhereWithoutListingInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type ListingCreateNestedOneWithoutApplicationsInput = {
    create?: XOR<ListingCreateWithoutApplicationsInput, ListingUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: ListingCreateOrConnectWithoutApplicationsInput
    connect?: ListingWhereUniqueInput
  }

  export type ProviderCreateNestedOneWithoutApplicationsInput = {
    create?: XOR<ProviderCreateWithoutApplicationsInput, ProviderUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: ProviderCreateOrConnectWithoutApplicationsInput
    connect?: ProviderWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutApplicationsInput = {
    create?: XOR<UserCreateWithoutApplicationsInput, UserUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutApplicationsInput
    connect?: UserWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ListingUpdateOneRequiredWithoutApplicationsNestedInput = {
    create?: XOR<ListingCreateWithoutApplicationsInput, ListingUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: ListingCreateOrConnectWithoutApplicationsInput
    upsert?: ListingUpsertWithoutApplicationsInput
    connect?: ListingWhereUniqueInput
    update?: XOR<XOR<ListingUpdateToOneWithWhereWithoutApplicationsInput, ListingUpdateWithoutApplicationsInput>, ListingUncheckedUpdateWithoutApplicationsInput>
  }

  export type ProviderUpdateOneRequiredWithoutApplicationsNestedInput = {
    create?: XOR<ProviderCreateWithoutApplicationsInput, ProviderUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: ProviderCreateOrConnectWithoutApplicationsInput
    upsert?: ProviderUpsertWithoutApplicationsInput
    connect?: ProviderWhereUniqueInput
    update?: XOR<XOR<ProviderUpdateToOneWithWhereWithoutApplicationsInput, ProviderUpdateWithoutApplicationsInput>, ProviderUncheckedUpdateWithoutApplicationsInput>
  }

  export type UserUpdateOneRequiredWithoutApplicationsNestedInput = {
    create?: XOR<UserCreateWithoutApplicationsInput, UserUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutApplicationsInput
    upsert?: UserUpsertWithoutApplicationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutApplicationsInput, UserUpdateWithoutApplicationsInput>, UserUncheckedUpdateWithoutApplicationsInput>
  }

  export type ApplicantSkillCreateNestedManyWithoutSkillInput = {
    create?: XOR<ApplicantSkillCreateWithoutSkillInput, ApplicantSkillUncheckedCreateWithoutSkillInput> | ApplicantSkillCreateWithoutSkillInput[] | ApplicantSkillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: ApplicantSkillCreateOrConnectWithoutSkillInput | ApplicantSkillCreateOrConnectWithoutSkillInput[]
    createMany?: ApplicantSkillCreateManySkillInputEnvelope
    connect?: ApplicantSkillWhereUniqueInput | ApplicantSkillWhereUniqueInput[]
  }

  export type ApplicantSkillUncheckedCreateNestedManyWithoutSkillInput = {
    create?: XOR<ApplicantSkillCreateWithoutSkillInput, ApplicantSkillUncheckedCreateWithoutSkillInput> | ApplicantSkillCreateWithoutSkillInput[] | ApplicantSkillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: ApplicantSkillCreateOrConnectWithoutSkillInput | ApplicantSkillCreateOrConnectWithoutSkillInput[]
    createMany?: ApplicantSkillCreateManySkillInputEnvelope
    connect?: ApplicantSkillWhereUniqueInput | ApplicantSkillWhereUniqueInput[]
  }

  export type ApplicantSkillUpdateManyWithoutSkillNestedInput = {
    create?: XOR<ApplicantSkillCreateWithoutSkillInput, ApplicantSkillUncheckedCreateWithoutSkillInput> | ApplicantSkillCreateWithoutSkillInput[] | ApplicantSkillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: ApplicantSkillCreateOrConnectWithoutSkillInput | ApplicantSkillCreateOrConnectWithoutSkillInput[]
    upsert?: ApplicantSkillUpsertWithWhereUniqueWithoutSkillInput | ApplicantSkillUpsertWithWhereUniqueWithoutSkillInput[]
    createMany?: ApplicantSkillCreateManySkillInputEnvelope
    set?: ApplicantSkillWhereUniqueInput | ApplicantSkillWhereUniqueInput[]
    disconnect?: ApplicantSkillWhereUniqueInput | ApplicantSkillWhereUniqueInput[]
    delete?: ApplicantSkillWhereUniqueInput | ApplicantSkillWhereUniqueInput[]
    connect?: ApplicantSkillWhereUniqueInput | ApplicantSkillWhereUniqueInput[]
    update?: ApplicantSkillUpdateWithWhereUniqueWithoutSkillInput | ApplicantSkillUpdateWithWhereUniqueWithoutSkillInput[]
    updateMany?: ApplicantSkillUpdateManyWithWhereWithoutSkillInput | ApplicantSkillUpdateManyWithWhereWithoutSkillInput[]
    deleteMany?: ApplicantSkillScalarWhereInput | ApplicantSkillScalarWhereInput[]
  }

  export type ApplicantSkillUncheckedUpdateManyWithoutSkillNestedInput = {
    create?: XOR<ApplicantSkillCreateWithoutSkillInput, ApplicantSkillUncheckedCreateWithoutSkillInput> | ApplicantSkillCreateWithoutSkillInput[] | ApplicantSkillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: ApplicantSkillCreateOrConnectWithoutSkillInput | ApplicantSkillCreateOrConnectWithoutSkillInput[]
    upsert?: ApplicantSkillUpsertWithWhereUniqueWithoutSkillInput | ApplicantSkillUpsertWithWhereUniqueWithoutSkillInput[]
    createMany?: ApplicantSkillCreateManySkillInputEnvelope
    set?: ApplicantSkillWhereUniqueInput | ApplicantSkillWhereUniqueInput[]
    disconnect?: ApplicantSkillWhereUniqueInput | ApplicantSkillWhereUniqueInput[]
    delete?: ApplicantSkillWhereUniqueInput | ApplicantSkillWhereUniqueInput[]
    connect?: ApplicantSkillWhereUniqueInput | ApplicantSkillWhereUniqueInput[]
    update?: ApplicantSkillUpdateWithWhereUniqueWithoutSkillInput | ApplicantSkillUpdateWithWhereUniqueWithoutSkillInput[]
    updateMany?: ApplicantSkillUpdateManyWithWhereWithoutSkillInput | ApplicantSkillUpdateManyWithWhereWithoutSkillInput[]
    deleteMany?: ApplicantSkillScalarWhereInput | ApplicantSkillScalarWhereInput[]
  }

  export type ApplicantProfileCreateNestedOneWithoutSkillsInput = {
    create?: XOR<ApplicantProfileCreateWithoutSkillsInput, ApplicantProfileUncheckedCreateWithoutSkillsInput>
    connectOrCreate?: ApplicantProfileCreateOrConnectWithoutSkillsInput
    connect?: ApplicantProfileWhereUniqueInput
  }

  export type SkillCreateNestedOneWithoutApplicantSkillsInput = {
    create?: XOR<SkillCreateWithoutApplicantSkillsInput, SkillUncheckedCreateWithoutApplicantSkillsInput>
    connectOrCreate?: SkillCreateOrConnectWithoutApplicantSkillsInput
    connect?: SkillWhereUniqueInput
  }

  export type ApplicantProfileUpdateOneRequiredWithoutSkillsNestedInput = {
    create?: XOR<ApplicantProfileCreateWithoutSkillsInput, ApplicantProfileUncheckedCreateWithoutSkillsInput>
    connectOrCreate?: ApplicantProfileCreateOrConnectWithoutSkillsInput
    upsert?: ApplicantProfileUpsertWithoutSkillsInput
    connect?: ApplicantProfileWhereUniqueInput
    update?: XOR<XOR<ApplicantProfileUpdateToOneWithWhereWithoutSkillsInput, ApplicantProfileUpdateWithoutSkillsInput>, ApplicantProfileUncheckedUpdateWithoutSkillsInput>
  }

  export type SkillUpdateOneRequiredWithoutApplicantSkillsNestedInput = {
    create?: XOR<SkillCreateWithoutApplicantSkillsInput, SkillUncheckedCreateWithoutApplicantSkillsInput>
    connectOrCreate?: SkillCreateOrConnectWithoutApplicantSkillsInput
    upsert?: SkillUpsertWithoutApplicantSkillsInput
    connect?: SkillWhereUniqueInput
    update?: XOR<XOR<SkillUpdateToOneWithWhereWithoutApplicantSkillsInput, SkillUpdateWithoutApplicantSkillsInput>, SkillUncheckedUpdateWithoutApplicantSkillsInput>
  }

  export type ApplicantQualificationCreateNestedManyWithoutQualificationInput = {
    create?: XOR<ApplicantQualificationCreateWithoutQualificationInput, ApplicantQualificationUncheckedCreateWithoutQualificationInput> | ApplicantQualificationCreateWithoutQualificationInput[] | ApplicantQualificationUncheckedCreateWithoutQualificationInput[]
    connectOrCreate?: ApplicantQualificationCreateOrConnectWithoutQualificationInput | ApplicantQualificationCreateOrConnectWithoutQualificationInput[]
    createMany?: ApplicantQualificationCreateManyQualificationInputEnvelope
    connect?: ApplicantQualificationWhereUniqueInput | ApplicantQualificationWhereUniqueInput[]
  }

  export type ApplicantQualificationUncheckedCreateNestedManyWithoutQualificationInput = {
    create?: XOR<ApplicantQualificationCreateWithoutQualificationInput, ApplicantQualificationUncheckedCreateWithoutQualificationInput> | ApplicantQualificationCreateWithoutQualificationInput[] | ApplicantQualificationUncheckedCreateWithoutQualificationInput[]
    connectOrCreate?: ApplicantQualificationCreateOrConnectWithoutQualificationInput | ApplicantQualificationCreateOrConnectWithoutQualificationInput[]
    createMany?: ApplicantQualificationCreateManyQualificationInputEnvelope
    connect?: ApplicantQualificationWhereUniqueInput | ApplicantQualificationWhereUniqueInput[]
  }

  export type ApplicantQualificationUpdateManyWithoutQualificationNestedInput = {
    create?: XOR<ApplicantQualificationCreateWithoutQualificationInput, ApplicantQualificationUncheckedCreateWithoutQualificationInput> | ApplicantQualificationCreateWithoutQualificationInput[] | ApplicantQualificationUncheckedCreateWithoutQualificationInput[]
    connectOrCreate?: ApplicantQualificationCreateOrConnectWithoutQualificationInput | ApplicantQualificationCreateOrConnectWithoutQualificationInput[]
    upsert?: ApplicantQualificationUpsertWithWhereUniqueWithoutQualificationInput | ApplicantQualificationUpsertWithWhereUniqueWithoutQualificationInput[]
    createMany?: ApplicantQualificationCreateManyQualificationInputEnvelope
    set?: ApplicantQualificationWhereUniqueInput | ApplicantQualificationWhereUniqueInput[]
    disconnect?: ApplicantQualificationWhereUniqueInput | ApplicantQualificationWhereUniqueInput[]
    delete?: ApplicantQualificationWhereUniqueInput | ApplicantQualificationWhereUniqueInput[]
    connect?: ApplicantQualificationWhereUniqueInput | ApplicantQualificationWhereUniqueInput[]
    update?: ApplicantQualificationUpdateWithWhereUniqueWithoutQualificationInput | ApplicantQualificationUpdateWithWhereUniqueWithoutQualificationInput[]
    updateMany?: ApplicantQualificationUpdateManyWithWhereWithoutQualificationInput | ApplicantQualificationUpdateManyWithWhereWithoutQualificationInput[]
    deleteMany?: ApplicantQualificationScalarWhereInput | ApplicantQualificationScalarWhereInput[]
  }

  export type ApplicantQualificationUncheckedUpdateManyWithoutQualificationNestedInput = {
    create?: XOR<ApplicantQualificationCreateWithoutQualificationInput, ApplicantQualificationUncheckedCreateWithoutQualificationInput> | ApplicantQualificationCreateWithoutQualificationInput[] | ApplicantQualificationUncheckedCreateWithoutQualificationInput[]
    connectOrCreate?: ApplicantQualificationCreateOrConnectWithoutQualificationInput | ApplicantQualificationCreateOrConnectWithoutQualificationInput[]
    upsert?: ApplicantQualificationUpsertWithWhereUniqueWithoutQualificationInput | ApplicantQualificationUpsertWithWhereUniqueWithoutQualificationInput[]
    createMany?: ApplicantQualificationCreateManyQualificationInputEnvelope
    set?: ApplicantQualificationWhereUniqueInput | ApplicantQualificationWhereUniqueInput[]
    disconnect?: ApplicantQualificationWhereUniqueInput | ApplicantQualificationWhereUniqueInput[]
    delete?: ApplicantQualificationWhereUniqueInput | ApplicantQualificationWhereUniqueInput[]
    connect?: ApplicantQualificationWhereUniqueInput | ApplicantQualificationWhereUniqueInput[]
    update?: ApplicantQualificationUpdateWithWhereUniqueWithoutQualificationInput | ApplicantQualificationUpdateWithWhereUniqueWithoutQualificationInput[]
    updateMany?: ApplicantQualificationUpdateManyWithWhereWithoutQualificationInput | ApplicantQualificationUpdateManyWithWhereWithoutQualificationInput[]
    deleteMany?: ApplicantQualificationScalarWhereInput | ApplicantQualificationScalarWhereInput[]
  }

  export type ApplicantProfileCreateNestedOneWithoutQualificationsInput = {
    create?: XOR<ApplicantProfileCreateWithoutQualificationsInput, ApplicantProfileUncheckedCreateWithoutQualificationsInput>
    connectOrCreate?: ApplicantProfileCreateOrConnectWithoutQualificationsInput
    connect?: ApplicantProfileWhereUniqueInput
  }

  export type QualificationCreateNestedOneWithoutApplicantQualificationsInput = {
    create?: XOR<QualificationCreateWithoutApplicantQualificationsInput, QualificationUncheckedCreateWithoutApplicantQualificationsInput>
    connectOrCreate?: QualificationCreateOrConnectWithoutApplicantQualificationsInput
    connect?: QualificationWhereUniqueInput
  }

  export type ApplicantProfileUpdateOneRequiredWithoutQualificationsNestedInput = {
    create?: XOR<ApplicantProfileCreateWithoutQualificationsInput, ApplicantProfileUncheckedCreateWithoutQualificationsInput>
    connectOrCreate?: ApplicantProfileCreateOrConnectWithoutQualificationsInput
    upsert?: ApplicantProfileUpsertWithoutQualificationsInput
    connect?: ApplicantProfileWhereUniqueInput
    update?: XOR<XOR<ApplicantProfileUpdateToOneWithWhereWithoutQualificationsInput, ApplicantProfileUpdateWithoutQualificationsInput>, ApplicantProfileUncheckedUpdateWithoutQualificationsInput>
  }

  export type QualificationUpdateOneRequiredWithoutApplicantQualificationsNestedInput = {
    create?: XOR<QualificationCreateWithoutApplicantQualificationsInput, QualificationUncheckedCreateWithoutApplicantQualificationsInput>
    connectOrCreate?: QualificationCreateOrConnectWithoutApplicantQualificationsInput
    upsert?: QualificationUpsertWithoutApplicantQualificationsInput
    connect?: QualificationWhereUniqueInput
    update?: XOR<XOR<QualificationUpdateToOneWithWhereWithoutApplicantQualificationsInput, QualificationUpdateWithoutApplicantQualificationsInput>, QualificationUncheckedUpdateWithoutApplicantQualificationsInput>
  }

  export type ListingCreateNestedOneWithoutReportInput = {
    create?: XOR<ListingCreateWithoutReportInput, ListingUncheckedCreateWithoutReportInput>
    connectOrCreate?: ListingCreateOrConnectWithoutReportInput
    connect?: ListingWhereUniqueInput
  }

  export type ListingUpdateOneRequiredWithoutReportNestedInput = {
    create?: XOR<ListingCreateWithoutReportInput, ListingUncheckedCreateWithoutReportInput>
    connectOrCreate?: ListingCreateOrConnectWithoutReportInput
    upsert?: ListingUpsertWithoutReportInput
    connect?: ListingWhereUniqueInput
    update?: XOR<XOR<ListingUpdateToOneWithWhereWithoutReportInput, ListingUpdateWithoutReportInput>, ListingUncheckedUpdateWithoutReportInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ApplicantProfileCreateWithoutUserInput = {
    phone?: string | null
    dob?: Date | string | null
    bio?: string | null
    qualifications?: ApplicantQualificationCreateNestedManyWithoutApplicantInput
    skills?: ApplicantSkillCreateNestedManyWithoutApplicantInput
  }

  export type ApplicantProfileUncheckedCreateWithoutUserInput = {
    applicant_id?: number
    phone?: string | null
    dob?: Date | string | null
    bio?: string | null
    qualifications?: ApplicantQualificationUncheckedCreateNestedManyWithoutApplicantInput
    skills?: ApplicantSkillUncheckedCreateNestedManyWithoutApplicantInput
  }

  export type ApplicantProfileCreateOrConnectWithoutUserInput = {
    where: ApplicantProfileWhereUniqueInput
    create: XOR<ApplicantProfileCreateWithoutUserInput, ApplicantProfileUncheckedCreateWithoutUserInput>
  }

  export type ApplicationCreateWithoutUserInput = {
    availability?: string | null
    motivation?: string | null
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    availability?: string | null
    motivation?: string | null
    cvFilePath?: string | null
    cvOriginalFilename?: string | null
    cvUploadedAt?: Date | string | null
    listing: ListingCreateNestedOneWithoutApplicationsInput
    provider: ProviderCreateNestedOneWithoutApplicationsInput
  }

  export type ApplicationUncheckedCreateWithoutUserInput = {
    application_id?: number
    provider_id: number
    availability?: string | null
    motivation?: string | null
    status?: string
    listing_id: number
    created_at?: Date | string
    updated_at?: Date | string
    availability?: string | null
    motivation?: string | null
    cvFilePath?: string | null
    cvOriginalFilename?: string | null
    cvUploadedAt?: Date | string | null
  }

  export type ApplicationCreateOrConnectWithoutUserInput = {
    where: ApplicationWhereUniqueInput
    create: XOR<ApplicationCreateWithoutUserInput, ApplicationUncheckedCreateWithoutUserInput>
  }

  export type ApplicationCreateManyUserInputEnvelope = {
    data: ApplicationCreateManyUserInput | ApplicationCreateManyUserInput[]
  }

  export type ProviderCreateWithoutUserInput = {
    provider_name: string
    profile?: string | null
    onboarded?: boolean
    applications?: ApplicationCreateNestedManyWithoutProviderInput
    listings?: ListingCreateNestedManyWithoutProviderInput
  }

  export type ProviderUncheckedCreateWithoutUserInput = {
    provider_id?: number
    provider_name: string
    profile?: string | null
    onboarded?: boolean
    applications?: ApplicationUncheckedCreateNestedManyWithoutProviderInput
    listings?: ListingUncheckedCreateNestedManyWithoutProviderInput
  }

  export type ProviderCreateOrConnectWithoutUserInput = {
    where: ProviderWhereUniqueInput
    create: XOR<ProviderCreateWithoutUserInput, ProviderUncheckedCreateWithoutUserInput>
  }

  export type ApplicantProfileUpsertWithoutUserInput = {
    update: XOR<ApplicantProfileUpdateWithoutUserInput, ApplicantProfileUncheckedUpdateWithoutUserInput>
    create: XOR<ApplicantProfileCreateWithoutUserInput, ApplicantProfileUncheckedCreateWithoutUserInput>
    where?: ApplicantProfileWhereInput
  }

  export type ApplicantProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: ApplicantProfileWhereInput
    data: XOR<ApplicantProfileUpdateWithoutUserInput, ApplicantProfileUncheckedUpdateWithoutUserInput>
  }

  export type ApplicantProfileUpdateWithoutUserInput = {
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    qualifications?: ApplicantQualificationUpdateManyWithoutApplicantNestedInput
    skills?: ApplicantSkillUpdateManyWithoutApplicantNestedInput
  }

  export type ApplicantProfileUncheckedUpdateWithoutUserInput = {
    applicant_id?: IntFieldUpdateOperationsInput | number
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    qualifications?: ApplicantQualificationUncheckedUpdateManyWithoutApplicantNestedInput
    skills?: ApplicantSkillUncheckedUpdateManyWithoutApplicantNestedInput
  }

  export type ApplicationUpsertWithWhereUniqueWithoutUserInput = {
    where: ApplicationWhereUniqueInput
    update: XOR<ApplicationUpdateWithoutUserInput, ApplicationUncheckedUpdateWithoutUserInput>
    create: XOR<ApplicationCreateWithoutUserInput, ApplicationUncheckedCreateWithoutUserInput>
  }

  export type ApplicationUpdateWithWhereUniqueWithoutUserInput = {
    where: ApplicationWhereUniqueInput
    data: XOR<ApplicationUpdateWithoutUserInput, ApplicationUncheckedUpdateWithoutUserInput>
  }

  export type ApplicationUpdateManyWithWhereWithoutUserInput = {
    where: ApplicationScalarWhereInput
    data: XOR<ApplicationUpdateManyMutationInput, ApplicationUncheckedUpdateManyWithoutUserInput>
  }

  export type ApplicationScalarWhereInput = {
    AND?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
    OR?: ApplicationScalarWhereInput[]
    NOT?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
    application_id?: IntFilter<"Application"> | number
    user_id?: IntFilter<"Application"> | number
    provider_id?: IntFilter<"Application"> | number
    availability?: StringNullableFilter<"Application"> | string | null
    motivation?: StringNullableFilter<"Application"> | string | null
    status?: StringFilter<"Application"> | string
    listing_id?: IntFilter<"Application"> | number
    created_at?: DateTimeFilter<"Application"> | Date | string
    updated_at?: DateTimeFilter<"Application"> | Date | string
    availability?: StringNullableFilter<"Application"> | string | null
    motivation?: StringNullableFilter<"Application"> | string | null
    cvFilePath?: StringNullableFilter<"Application"> | string | null
    cvOriginalFilename?: StringNullableFilter<"Application"> | string | null
    cvUploadedAt?: DateTimeNullableFilter<"Application"> | Date | string | null
  }

  export type ProviderUpsertWithoutUserInput = {
    update: XOR<ProviderUpdateWithoutUserInput, ProviderUncheckedUpdateWithoutUserInput>
    create: XOR<ProviderCreateWithoutUserInput, ProviderUncheckedCreateWithoutUserInput>
    where?: ProviderWhereInput
  }

  export type ProviderUpdateToOneWithWhereWithoutUserInput = {
    where?: ProviderWhereInput
    data: XOR<ProviderUpdateWithoutUserInput, ProviderUncheckedUpdateWithoutUserInput>
  }

  export type ProviderUpdateWithoutUserInput = {
    provider_name?: StringFieldUpdateOperationsInput | string
    profile?: NullableStringFieldUpdateOperationsInput | string | null
    onboarded?: BoolFieldUpdateOperationsInput | boolean
    applications?: ApplicationUpdateManyWithoutProviderNestedInput
    listings?: ListingUpdateManyWithoutProviderNestedInput
  }

  export type ProviderUncheckedUpdateWithoutUserInput = {
    provider_id?: IntFieldUpdateOperationsInput | number
    provider_name?: StringFieldUpdateOperationsInput | string
    profile?: NullableStringFieldUpdateOperationsInput | string | null
    onboarded?: BoolFieldUpdateOperationsInput | boolean
    applications?: ApplicationUncheckedUpdateManyWithoutProviderNestedInput
    listings?: ListingUncheckedUpdateManyWithoutProviderNestedInput
  }

  export type UserCreateWithoutApplicantInput = {
    name: string
    surname: string
    role: string
    email: string
    firebase_uid: string
    applications?: ApplicationCreateNestedManyWithoutUserInput
    provider?: ProviderCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutApplicantInput = {
    user_id?: number
    name: string
    surname: string
    role: string
    email: string
    firebase_uid: string
    applications?: ApplicationUncheckedCreateNestedManyWithoutUserInput
    provider?: ProviderUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutApplicantInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutApplicantInput, UserUncheckedCreateWithoutApplicantInput>
  }

  export type ApplicantQualificationCreateWithoutApplicantInput = {
    institution?: string | null
    year_completed?: number | null
    qualification: QualificationCreateNestedOneWithoutApplicantQualificationsInput
  }

  export type ApplicantQualificationUncheckedCreateWithoutApplicantInput = {
    id?: number
    qualification_id: number
    institution?: string | null
    year_completed?: number | null
  }

  export type ApplicantQualificationCreateOrConnectWithoutApplicantInput = {
    where: ApplicantQualificationWhereUniqueInput
    create: XOR<ApplicantQualificationCreateWithoutApplicantInput, ApplicantQualificationUncheckedCreateWithoutApplicantInput>
  }

  export type ApplicantQualificationCreateManyApplicantInputEnvelope = {
    data: ApplicantQualificationCreateManyApplicantInput | ApplicantQualificationCreateManyApplicantInput[]
  }

  export type ApplicantSkillCreateWithoutApplicantInput = {
    skill: SkillCreateNestedOneWithoutApplicantSkillsInput
  }

  export type ApplicantSkillUncheckedCreateWithoutApplicantInput = {
    id?: number
    skill_id: number
  }

  export type ApplicantSkillCreateOrConnectWithoutApplicantInput = {
    where: ApplicantSkillWhereUniqueInput
    create: XOR<ApplicantSkillCreateWithoutApplicantInput, ApplicantSkillUncheckedCreateWithoutApplicantInput>
  }

  export type ApplicantSkillCreateManyApplicantInputEnvelope = {
    data: ApplicantSkillCreateManyApplicantInput | ApplicantSkillCreateManyApplicantInput[]
  }

  export type UserUpsertWithoutApplicantInput = {
    update: XOR<UserUpdateWithoutApplicantInput, UserUncheckedUpdateWithoutApplicantInput>
    create: XOR<UserCreateWithoutApplicantInput, UserUncheckedCreateWithoutApplicantInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutApplicantInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutApplicantInput, UserUncheckedUpdateWithoutApplicantInput>
  }

  export type UserUpdateWithoutApplicantInput = {
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firebase_uid?: StringFieldUpdateOperationsInput | string
    applications?: ApplicationUpdateManyWithoutUserNestedInput
    provider?: ProviderUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutApplicantInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firebase_uid?: StringFieldUpdateOperationsInput | string
    applications?: ApplicationUncheckedUpdateManyWithoutUserNestedInput
    provider?: ProviderUncheckedUpdateOneWithoutUserNestedInput
  }

  export type ApplicantQualificationUpsertWithWhereUniqueWithoutApplicantInput = {
    where: ApplicantQualificationWhereUniqueInput
    update: XOR<ApplicantQualificationUpdateWithoutApplicantInput, ApplicantQualificationUncheckedUpdateWithoutApplicantInput>
    create: XOR<ApplicantQualificationCreateWithoutApplicantInput, ApplicantQualificationUncheckedCreateWithoutApplicantInput>
  }

  export type ApplicantQualificationUpdateWithWhereUniqueWithoutApplicantInput = {
    where: ApplicantQualificationWhereUniqueInput
    data: XOR<ApplicantQualificationUpdateWithoutApplicantInput, ApplicantQualificationUncheckedUpdateWithoutApplicantInput>
  }

  export type ApplicantQualificationUpdateManyWithWhereWithoutApplicantInput = {
    where: ApplicantQualificationScalarWhereInput
    data: XOR<ApplicantQualificationUpdateManyMutationInput, ApplicantQualificationUncheckedUpdateManyWithoutApplicantInput>
  }

  export type ApplicantQualificationScalarWhereInput = {
    AND?: ApplicantQualificationScalarWhereInput | ApplicantQualificationScalarWhereInput[]
    OR?: ApplicantQualificationScalarWhereInput[]
    NOT?: ApplicantQualificationScalarWhereInput | ApplicantQualificationScalarWhereInput[]
    id?: IntFilter<"ApplicantQualification"> | number
    applicant_id?: IntFilter<"ApplicantQualification"> | number
    qualification_id?: IntFilter<"ApplicantQualification"> | number
    institution?: StringNullableFilter<"ApplicantQualification"> | string | null
    year_completed?: IntNullableFilter<"ApplicantQualification"> | number | null
  }

  export type ApplicantSkillUpsertWithWhereUniqueWithoutApplicantInput = {
    where: ApplicantSkillWhereUniqueInput
    update: XOR<ApplicantSkillUpdateWithoutApplicantInput, ApplicantSkillUncheckedUpdateWithoutApplicantInput>
    create: XOR<ApplicantSkillCreateWithoutApplicantInput, ApplicantSkillUncheckedCreateWithoutApplicantInput>
  }

  export type ApplicantSkillUpdateWithWhereUniqueWithoutApplicantInput = {
    where: ApplicantSkillWhereUniqueInput
    data: XOR<ApplicantSkillUpdateWithoutApplicantInput, ApplicantSkillUncheckedUpdateWithoutApplicantInput>
  }

  export type ApplicantSkillUpdateManyWithWhereWithoutApplicantInput = {
    where: ApplicantSkillScalarWhereInput
    data: XOR<ApplicantSkillUpdateManyMutationInput, ApplicantSkillUncheckedUpdateManyWithoutApplicantInput>
  }

  export type ApplicantSkillScalarWhereInput = {
    AND?: ApplicantSkillScalarWhereInput | ApplicantSkillScalarWhereInput[]
    OR?: ApplicantSkillScalarWhereInput[]
    NOT?: ApplicantSkillScalarWhereInput | ApplicantSkillScalarWhereInput[]
    id?: IntFilter<"ApplicantSkill"> | number
    applicant_id?: IntFilter<"ApplicantSkill"> | number
    skill_id?: IntFilter<"ApplicantSkill"> | number
  }

  export type ApplicationCreateWithoutProviderInput = {
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    availability?: string | null
    motivation?: string | null
    cvFilePath?: string | null
    cvOriginalFilename?: string | null
    cvUploadedAt?: Date | string | null
    listing: ListingCreateNestedOneWithoutApplicationsInput
    user: UserCreateNestedOneWithoutApplicationsInput
  }

  export type ApplicationUncheckedCreateWithoutProviderInput = {
    application_id?: number
    user_id: number
    status?: string
    listing_id: number
    created_at?: Date | string
    updated_at?: Date | string
    availability?: string | null
    motivation?: string | null
    cvFilePath?: string | null
    cvOriginalFilename?: string | null
    cvUploadedAt?: Date | string | null
  }

  export type ApplicationCreateOrConnectWithoutProviderInput = {
    where: ApplicationWhereUniqueInput
    create: XOR<ApplicationCreateWithoutProviderInput, ApplicationUncheckedCreateWithoutProviderInput>
  }

  export type ApplicationCreateManyProviderInputEnvelope = {
    data: ApplicationCreateManyProviderInput | ApplicationCreateManyProviderInput[]
  }

  export type ListingCreateWithoutProviderInput = {
    listname: string
    list_type: string
    nqf_level?: number | null
    description?: string | null
    status?: string
    closing_date?: Date | string | null
    duration?: string | null
    location?: string | null
    requirements?: string | null
    stipend?: number | null
    sector?: string | null
    cvUploadedAt?: Date | string | null
    applications?: ApplicationCreateNestedManyWithoutListingInput
    Report?: ReportCreateNestedManyWithoutListingInput
  }

  export type ListingUncheckedCreateWithoutProviderInput = {
    listings_id?: number
    listname: string
    list_type: string
    nqf_level?: number | null
    description?: string | null
    status?: string
    closing_date?: Date | string | null
    duration?: string | null
    location?: string | null
    requirements?: string | null
    stipend?: number | null
    sector?: string | null
    cvUploadedAt?: Date | string | null
    applications?: ApplicationUncheckedCreateNestedManyWithoutListingInput
    Report?: ReportUncheckedCreateNestedManyWithoutListingInput
  }

  export type ListingCreateOrConnectWithoutProviderInput = {
    where: ListingWhereUniqueInput
    create: XOR<ListingCreateWithoutProviderInput, ListingUncheckedCreateWithoutProviderInput>
  }

  export type ListingCreateManyProviderInputEnvelope = {
    data: ListingCreateManyProviderInput | ListingCreateManyProviderInput[]
  }

  export type UserCreateWithoutProviderInput = {
    name: string
    surname: string
    role: string
    email: string
    firebase_uid: string
    applicant?: ApplicantProfileCreateNestedOneWithoutUserInput
    applications?: ApplicationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProviderInput = {
    user_id?: number
    name: string
    surname: string
    role: string
    email: string
    firebase_uid: string
    applicant?: ApplicantProfileUncheckedCreateNestedOneWithoutUserInput
    applications?: ApplicationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProviderInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProviderInput, UserUncheckedCreateWithoutProviderInput>
  }

  export type ApplicationUpsertWithWhereUniqueWithoutProviderInput = {
    where: ApplicationWhereUniqueInput
    update: XOR<ApplicationUpdateWithoutProviderInput, ApplicationUncheckedUpdateWithoutProviderInput>
    create: XOR<ApplicationCreateWithoutProviderInput, ApplicationUncheckedCreateWithoutProviderInput>
  }

  export type ApplicationUpdateWithWhereUniqueWithoutProviderInput = {
    where: ApplicationWhereUniqueInput
    data: XOR<ApplicationUpdateWithoutProviderInput, ApplicationUncheckedUpdateWithoutProviderInput>
  }

  export type ApplicationUpdateManyWithWhereWithoutProviderInput = {
    where: ApplicationScalarWhereInput
    data: XOR<ApplicationUpdateManyMutationInput, ApplicationUncheckedUpdateManyWithoutProviderInput>
  }

  export type ListingUpsertWithWhereUniqueWithoutProviderInput = {
    where: ListingWhereUniqueInput
    update: XOR<ListingUpdateWithoutProviderInput, ListingUncheckedUpdateWithoutProviderInput>
    create: XOR<ListingCreateWithoutProviderInput, ListingUncheckedCreateWithoutProviderInput>
  }

  export type ListingUpdateWithWhereUniqueWithoutProviderInput = {
    where: ListingWhereUniqueInput
    data: XOR<ListingUpdateWithoutProviderInput, ListingUncheckedUpdateWithoutProviderInput>
  }

  export type ListingUpdateManyWithWhereWithoutProviderInput = {
    where: ListingScalarWhereInput
    data: XOR<ListingUpdateManyMutationInput, ListingUncheckedUpdateManyWithoutProviderInput>
  }

  export type ListingScalarWhereInput = {
    AND?: ListingScalarWhereInput | ListingScalarWhereInput[]
    OR?: ListingScalarWhereInput[]
    NOT?: ListingScalarWhereInput | ListingScalarWhereInput[]
    listings_id?: IntFilter<"Listing"> | number
    listname?: StringFilter<"Listing"> | string
    list_type?: StringFilter<"Listing"> | string
    nqf_level?: IntNullableFilter<"Listing"> | number | null
    description?: StringNullableFilter<"Listing"> | string | null
    provider_id?: IntFilter<"Listing"> | number
    status?: StringFilter<"Listing"> | string
    closing_date?: DateTimeNullableFilter<"Listing"> | Date | string | null
    duration?: StringNullableFilter<"Listing"> | string | null
    location?: StringNullableFilter<"Listing"> | string | null
    requirements?: StringNullableFilter<"Listing"> | string | null
    stipend?: FloatNullableFilter<"Listing"> | number | null
    sector?: StringNullableFilter<"Listing"> | string | null
    cvUploadedAt?: DateTimeNullableFilter<"Listing"> | Date | string | null
  }

  export type UserUpsertWithoutProviderInput = {
    update: XOR<UserUpdateWithoutProviderInput, UserUncheckedUpdateWithoutProviderInput>
    create: XOR<UserCreateWithoutProviderInput, UserUncheckedCreateWithoutProviderInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProviderInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProviderInput, UserUncheckedUpdateWithoutProviderInput>
  }

  export type UserUpdateWithoutProviderInput = {
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firebase_uid?: StringFieldUpdateOperationsInput | string
    applicant?: ApplicantProfileUpdateOneWithoutUserNestedInput
    applications?: ApplicationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProviderInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firebase_uid?: StringFieldUpdateOperationsInput | string
    applicant?: ApplicantProfileUncheckedUpdateOneWithoutUserNestedInput
    applications?: ApplicationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ApplicationCreateWithoutListingInput = {
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    availability?: string | null
    motivation?: string | null
    cvFilePath?: string | null
    cvOriginalFilename?: string | null
    cvUploadedAt?: Date | string | null
    provider: ProviderCreateNestedOneWithoutApplicationsInput
    user: UserCreateNestedOneWithoutApplicationsInput
  }

  export type ApplicationUncheckedCreateWithoutListingInput = {
    application_id?: number
    user_id: number
    provider_id: number
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    availability?: string | null
    motivation?: string | null
    cvFilePath?: string | null
    cvOriginalFilename?: string | null
    cvUploadedAt?: Date | string | null
  }

  export type ApplicationCreateOrConnectWithoutListingInput = {
    where: ApplicationWhereUniqueInput
    create: XOR<ApplicationCreateWithoutListingInput, ApplicationUncheckedCreateWithoutListingInput>
  }

  export type ApplicationCreateManyListingInputEnvelope = {
    data: ApplicationCreateManyListingInput | ApplicationCreateManyListingInput[]
  }

  export type ProviderCreateWithoutListingsInput = {
    provider_name: string
    profile?: string | null
    onboarded?: boolean
    applications?: ApplicationCreateNestedManyWithoutProviderInput
    user: UserCreateNestedOneWithoutProviderInput
  }

  export type ProviderUncheckedCreateWithoutListingsInput = {
    provider_id?: number
    provider_name: string
    profile?: string | null
    user_id: number
    onboarded?: boolean
    applications?: ApplicationUncheckedCreateNestedManyWithoutProviderInput
  }

  export type ProviderCreateOrConnectWithoutListingsInput = {
    where: ProviderWhereUniqueInput
    create: XOR<ProviderCreateWithoutListingsInput, ProviderUncheckedCreateWithoutListingsInput>
  }

  export type ReportCreateWithoutListingInput = {
    reason: string
    details?: string | null
    reported_by: string
    status?: string
    created_at?: Date | string
  }

  export type ReportUncheckedCreateWithoutListingInput = {
    report_id?: number
    reason: string
    details?: string | null
    reported_by: string
    status?: string
    created_at?: Date | string
  }

  export type ReportCreateOrConnectWithoutListingInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutListingInput, ReportUncheckedCreateWithoutListingInput>
  }

  export type ReportCreateManyListingInputEnvelope = {
    data: ReportCreateManyListingInput | ReportCreateManyListingInput[]
  }

  export type ApplicationUpsertWithWhereUniqueWithoutListingInput = {
    where: ApplicationWhereUniqueInput
    update: XOR<ApplicationUpdateWithoutListingInput, ApplicationUncheckedUpdateWithoutListingInput>
    create: XOR<ApplicationCreateWithoutListingInput, ApplicationUncheckedCreateWithoutListingInput>
  }

  export type ApplicationUpdateWithWhereUniqueWithoutListingInput = {
    where: ApplicationWhereUniqueInput
    data: XOR<ApplicationUpdateWithoutListingInput, ApplicationUncheckedUpdateWithoutListingInput>
  }

  export type ApplicationUpdateManyWithWhereWithoutListingInput = {
    where: ApplicationScalarWhereInput
    data: XOR<ApplicationUpdateManyMutationInput, ApplicationUncheckedUpdateManyWithoutListingInput>
  }

  export type ReportCreateWithoutListingInput = {
    reason: string
    details?: string | null
    reported_by: string
    status?: string
    created_at?: Date | string
  }

  export type ReportUncheckedCreateWithoutListingInput = {
    report_id?: number
    reason: string
    details?: string | null
    reported_by: string
    status?: string
    created_at?: Date | string
  }

  export type ReportCreateOrConnectWithoutListingInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutListingInput, ReportUncheckedCreateWithoutListingInput>
  }

  export type ReportCreateManyListingInputEnvelope = {
    data: ReportCreateManyListingInput | ReportCreateManyListingInput[]
  }

  export type ProviderUpsertWithoutListingsInput = {
    update: XOR<ProviderUpdateWithoutListingsInput, ProviderUncheckedUpdateWithoutListingsInput>
    create: XOR<ProviderCreateWithoutListingsInput, ProviderUncheckedCreateWithoutListingsInput>
    where?: ProviderWhereInput
  }

  export type ProviderUpdateToOneWithWhereWithoutListingsInput = {
    where?: ProviderWhereInput
    data: XOR<ProviderUpdateWithoutListingsInput, ProviderUncheckedUpdateWithoutListingsInput>
  }

  export type ProviderUpdateWithoutListingsInput = {
    provider_name?: StringFieldUpdateOperationsInput | string
    profile?: NullableStringFieldUpdateOperationsInput | string | null
    onboarded?: BoolFieldUpdateOperationsInput | boolean
    applications?: ApplicationUpdateManyWithoutProviderNestedInput
    user?: UserUpdateOneRequiredWithoutProviderNestedInput
  }

  export type ProviderUncheckedUpdateWithoutListingsInput = {
    provider_id?: IntFieldUpdateOperationsInput | number
    provider_name?: StringFieldUpdateOperationsInput | string
    profile?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: IntFieldUpdateOperationsInput | number
    onboarded?: BoolFieldUpdateOperationsInput | boolean
    applications?: ApplicationUncheckedUpdateManyWithoutProviderNestedInput
  }

  export type ReportUpsertWithWhereUniqueWithoutListingInput = {
    where: ReportWhereUniqueInput
    update: XOR<ReportUpdateWithoutListingInput, ReportUncheckedUpdateWithoutListingInput>
    create: XOR<ReportCreateWithoutListingInput, ReportUncheckedCreateWithoutListingInput>
  }

  export type ReportUpdateWithWhereUniqueWithoutListingInput = {
    where: ReportWhereUniqueInput
    data: XOR<ReportUpdateWithoutListingInput, ReportUncheckedUpdateWithoutListingInput>
  }

  export type ReportUpdateManyWithWhereWithoutListingInput = {
    where: ReportScalarWhereInput
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyWithoutListingInput>
  }

  export type ReportScalarWhereInput = {
    AND?: ReportScalarWhereInput | ReportScalarWhereInput[]
    OR?: ReportScalarWhereInput[]
    NOT?: ReportScalarWhereInput | ReportScalarWhereInput[]
    report_id?: IntFilter<"Report"> | number
    listing_id?: IntFilter<"Report"> | number
    reason?: StringFilter<"Report"> | string
    details?: StringNullableFilter<"Report"> | string | null
    reported_by?: StringFilter<"Report"> | string
    status?: StringFilter<"Report"> | string
    created_at?: DateTimeFilter<"Report"> | Date | string
  }

  export type ListingCreateWithoutApplicationsInput = {
    listname: string
    list_type: string
    nqf_level?: number | null
    description?: string | null
    status?: string
    closing_date?: Date | string | null
    duration?: string | null
    location?: string | null
    requirements?: string | null
    stipend?: number | null
    sector?: string | null
    cvUploadedAt?: Date | string | null
    provider: ProviderCreateNestedOneWithoutListingsInput
    Report?: ReportCreateNestedManyWithoutListingInput
  }

  export type ListingUncheckedCreateWithoutApplicationsInput = {
    listings_id?: number
    listname: string
    list_type: string
    nqf_level?: number | null
    description?: string | null
    provider_id: number
    status?: string
    closing_date?: Date | string | null
    duration?: string | null
    location?: string | null
    requirements?: string | null
    stipend?: number | null
    sector?: string | null
    cvUploadedAt?: Date | string | null
    Report?: ReportUncheckedCreateNestedManyWithoutListingInput
  }

  export type ListingCreateOrConnectWithoutApplicationsInput = {
    where: ListingWhereUniqueInput
    create: XOR<ListingCreateWithoutApplicationsInput, ListingUncheckedCreateWithoutApplicationsInput>
  }

  export type ProviderCreateWithoutApplicationsInput = {
    provider_name: string
    profile?: string | null
    onboarded?: boolean
    listings?: ListingCreateNestedManyWithoutProviderInput
    user: UserCreateNestedOneWithoutProviderInput
  }

  export type ProviderUncheckedCreateWithoutApplicationsInput = {
    provider_id?: number
    provider_name: string
    profile?: string | null
    user_id: number
    onboarded?: boolean
    listings?: ListingUncheckedCreateNestedManyWithoutProviderInput
  }

  export type ProviderCreateOrConnectWithoutApplicationsInput = {
    where: ProviderWhereUniqueInput
    create: XOR<ProviderCreateWithoutApplicationsInput, ProviderUncheckedCreateWithoutApplicationsInput>
  }

  export type UserCreateWithoutApplicationsInput = {
    name: string
    surname: string
    role: string
    email: string
    firebase_uid: string
    applicant?: ApplicantProfileCreateNestedOneWithoutUserInput
    provider?: ProviderCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutApplicationsInput = {
    user_id?: number
    name: string
    surname: string
    role: string
    email: string
    firebase_uid: string
    applicant?: ApplicantProfileUncheckedCreateNestedOneWithoutUserInput
    provider?: ProviderUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutApplicationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutApplicationsInput, UserUncheckedCreateWithoutApplicationsInput>
  }

  export type ListingUpsertWithoutApplicationsInput = {
    update: XOR<ListingUpdateWithoutApplicationsInput, ListingUncheckedUpdateWithoutApplicationsInput>
    create: XOR<ListingCreateWithoutApplicationsInput, ListingUncheckedCreateWithoutApplicationsInput>
    where?: ListingWhereInput
  }

  export type ListingUpdateToOneWithWhereWithoutApplicationsInput = {
    where?: ListingWhereInput
    data: XOR<ListingUpdateWithoutApplicationsInput, ListingUncheckedUpdateWithoutApplicationsInput>
  }

  export type ListingUpdateWithoutApplicationsInput = {
    listname?: StringFieldUpdateOperationsInput | string
    list_type?: StringFieldUpdateOperationsInput | string
    nqf_level?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    closing_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    stipend?: NullableFloatFieldUpdateOperationsInput | number | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    cvUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    provider?: ProviderUpdateOneRequiredWithoutListingsNestedInput
    Report?: ReportUpdateManyWithoutListingNestedInput
  }

  export type ListingUncheckedUpdateWithoutApplicationsInput = {
    listings_id?: IntFieldUpdateOperationsInput | number
    listname?: StringFieldUpdateOperationsInput | string
    list_type?: StringFieldUpdateOperationsInput | string
    nqf_level?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    provider_id?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    closing_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    stipend?: NullableFloatFieldUpdateOperationsInput | number | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    cvUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Report?: ReportUncheckedUpdateManyWithoutListingNestedInput
  }

  export type ProviderUpsertWithoutApplicationsInput = {
    update: XOR<ProviderUpdateWithoutApplicationsInput, ProviderUncheckedUpdateWithoutApplicationsInput>
    create: XOR<ProviderCreateWithoutApplicationsInput, ProviderUncheckedCreateWithoutApplicationsInput>
    where?: ProviderWhereInput
  }

  export type ProviderUpdateToOneWithWhereWithoutApplicationsInput = {
    where?: ProviderWhereInput
    data: XOR<ProviderUpdateWithoutApplicationsInput, ProviderUncheckedUpdateWithoutApplicationsInput>
  }

  export type ProviderUpdateWithoutApplicationsInput = {
    provider_name?: StringFieldUpdateOperationsInput | string
    profile?: NullableStringFieldUpdateOperationsInput | string | null
    onboarded?: BoolFieldUpdateOperationsInput | boolean
    listings?: ListingUpdateManyWithoutProviderNestedInput
    user?: UserUpdateOneRequiredWithoutProviderNestedInput
  }

  export type ProviderUncheckedUpdateWithoutApplicationsInput = {
    provider_id?: IntFieldUpdateOperationsInput | number
    provider_name?: StringFieldUpdateOperationsInput | string
    profile?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: IntFieldUpdateOperationsInput | number
    onboarded?: BoolFieldUpdateOperationsInput | boolean
    listings?: ListingUncheckedUpdateManyWithoutProviderNestedInput
  }

  export type UserUpsertWithoutApplicationsInput = {
    update: XOR<UserUpdateWithoutApplicationsInput, UserUncheckedUpdateWithoutApplicationsInput>
    create: XOR<UserCreateWithoutApplicationsInput, UserUncheckedCreateWithoutApplicationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutApplicationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutApplicationsInput, UserUncheckedUpdateWithoutApplicationsInput>
  }

  export type UserUpdateWithoutApplicationsInput = {
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firebase_uid?: StringFieldUpdateOperationsInput | string
    applicant?: ApplicantProfileUpdateOneWithoutUserNestedInput
    provider?: ProviderUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutApplicationsInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firebase_uid?: StringFieldUpdateOperationsInput | string
    applicant?: ApplicantProfileUncheckedUpdateOneWithoutUserNestedInput
    provider?: ProviderUncheckedUpdateOneWithoutUserNestedInput
  }

  export type ApplicantSkillCreateWithoutSkillInput = {
    applicant: ApplicantProfileCreateNestedOneWithoutSkillsInput
  }

  export type ApplicantSkillUncheckedCreateWithoutSkillInput = {
    id?: number
    applicant_id: number
  }

  export type ApplicantSkillCreateOrConnectWithoutSkillInput = {
    where: ApplicantSkillWhereUniqueInput
    create: XOR<ApplicantSkillCreateWithoutSkillInput, ApplicantSkillUncheckedCreateWithoutSkillInput>
  }

  export type ApplicantSkillCreateManySkillInputEnvelope = {
    data: ApplicantSkillCreateManySkillInput | ApplicantSkillCreateManySkillInput[]
  }

  export type ApplicantSkillUpsertWithWhereUniqueWithoutSkillInput = {
    where: ApplicantSkillWhereUniqueInput
    update: XOR<ApplicantSkillUpdateWithoutSkillInput, ApplicantSkillUncheckedUpdateWithoutSkillInput>
    create: XOR<ApplicantSkillCreateWithoutSkillInput, ApplicantSkillUncheckedCreateWithoutSkillInput>
  }

  export type ApplicantSkillUpdateWithWhereUniqueWithoutSkillInput = {
    where: ApplicantSkillWhereUniqueInput
    data: XOR<ApplicantSkillUpdateWithoutSkillInput, ApplicantSkillUncheckedUpdateWithoutSkillInput>
  }

  export type ApplicantSkillUpdateManyWithWhereWithoutSkillInput = {
    where: ApplicantSkillScalarWhereInput
    data: XOR<ApplicantSkillUpdateManyMutationInput, ApplicantSkillUncheckedUpdateManyWithoutSkillInput>
  }

  export type ApplicantProfileCreateWithoutSkillsInput = {
    phone?: string | null
    dob?: Date | string | null
    bio?: string | null
    user: UserCreateNestedOneWithoutApplicantInput
    qualifications?: ApplicantQualificationCreateNestedManyWithoutApplicantInput
  }

  export type ApplicantProfileUncheckedCreateWithoutSkillsInput = {
    applicant_id?: number
    user_id: number
    phone?: string | null
    dob?: Date | string | null
    bio?: string | null
    qualifications?: ApplicantQualificationUncheckedCreateNestedManyWithoutApplicantInput
  }

  export type ApplicantProfileCreateOrConnectWithoutSkillsInput = {
    where: ApplicantProfileWhereUniqueInput
    create: XOR<ApplicantProfileCreateWithoutSkillsInput, ApplicantProfileUncheckedCreateWithoutSkillsInput>
  }

  export type SkillCreateWithoutApplicantSkillsInput = {
    name: string
    nqf_level?: number | null
    saqa_id?: string | null
    sector?: string | null
  }

  export type SkillUncheckedCreateWithoutApplicantSkillsInput = {
    skill_id?: number
    name: string
    nqf_level?: number | null
    saqa_id?: string | null
    sector?: string | null
  }

  export type SkillCreateOrConnectWithoutApplicantSkillsInput = {
    where: SkillWhereUniqueInput
    create: XOR<SkillCreateWithoutApplicantSkillsInput, SkillUncheckedCreateWithoutApplicantSkillsInput>
  }

  export type ApplicantProfileUpsertWithoutSkillsInput = {
    update: XOR<ApplicantProfileUpdateWithoutSkillsInput, ApplicantProfileUncheckedUpdateWithoutSkillsInput>
    create: XOR<ApplicantProfileCreateWithoutSkillsInput, ApplicantProfileUncheckedCreateWithoutSkillsInput>
    where?: ApplicantProfileWhereInput
  }

  export type ApplicantProfileUpdateToOneWithWhereWithoutSkillsInput = {
    where?: ApplicantProfileWhereInput
    data: XOR<ApplicantProfileUpdateWithoutSkillsInput, ApplicantProfileUncheckedUpdateWithoutSkillsInput>
  }

  export type ApplicantProfileUpdateWithoutSkillsInput = {
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutApplicantNestedInput
    qualifications?: ApplicantQualificationUpdateManyWithoutApplicantNestedInput
  }

  export type ApplicantProfileUncheckedUpdateWithoutSkillsInput = {
    applicant_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    qualifications?: ApplicantQualificationUncheckedUpdateManyWithoutApplicantNestedInput
  }

  export type SkillUpsertWithoutApplicantSkillsInput = {
    update: XOR<SkillUpdateWithoutApplicantSkillsInput, SkillUncheckedUpdateWithoutApplicantSkillsInput>
    create: XOR<SkillCreateWithoutApplicantSkillsInput, SkillUncheckedCreateWithoutApplicantSkillsInput>
    where?: SkillWhereInput
  }

  export type SkillUpdateToOneWithWhereWithoutApplicantSkillsInput = {
    where?: SkillWhereInput
    data: XOR<SkillUpdateWithoutApplicantSkillsInput, SkillUncheckedUpdateWithoutApplicantSkillsInput>
  }

  export type SkillUpdateWithoutApplicantSkillsInput = {
    name?: StringFieldUpdateOperationsInput | string
    nqf_level?: NullableIntFieldUpdateOperationsInput | number | null
    saqa_id?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SkillUncheckedUpdateWithoutApplicantSkillsInput = {
    skill_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    nqf_level?: NullableIntFieldUpdateOperationsInput | number | null
    saqa_id?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ApplicantQualificationCreateWithoutQualificationInput = {
    institution?: string | null
    year_completed?: number | null
    applicant: ApplicantProfileCreateNestedOneWithoutQualificationsInput
  }

  export type ApplicantQualificationUncheckedCreateWithoutQualificationInput = {
    id?: number
    applicant_id: number
    institution?: string | null
    year_completed?: number | null
  }

  export type ApplicantQualificationCreateOrConnectWithoutQualificationInput = {
    where: ApplicantQualificationWhereUniqueInput
    create: XOR<ApplicantQualificationCreateWithoutQualificationInput, ApplicantQualificationUncheckedCreateWithoutQualificationInput>
  }

  export type ApplicantQualificationCreateManyQualificationInputEnvelope = {
    data: ApplicantQualificationCreateManyQualificationInput | ApplicantQualificationCreateManyQualificationInput[]
  }

  export type ApplicantQualificationUpsertWithWhereUniqueWithoutQualificationInput = {
    where: ApplicantQualificationWhereUniqueInput
    update: XOR<ApplicantQualificationUpdateWithoutQualificationInput, ApplicantQualificationUncheckedUpdateWithoutQualificationInput>
    create: XOR<ApplicantQualificationCreateWithoutQualificationInput, ApplicantQualificationUncheckedCreateWithoutQualificationInput>
  }

  export type ApplicantQualificationUpdateWithWhereUniqueWithoutQualificationInput = {
    where: ApplicantQualificationWhereUniqueInput
    data: XOR<ApplicantQualificationUpdateWithoutQualificationInput, ApplicantQualificationUncheckedUpdateWithoutQualificationInput>
  }

  export type ApplicantQualificationUpdateManyWithWhereWithoutQualificationInput = {
    where: ApplicantQualificationScalarWhereInput
    data: XOR<ApplicantQualificationUpdateManyMutationInput, ApplicantQualificationUncheckedUpdateManyWithoutQualificationInput>
  }

  export type ApplicantProfileCreateWithoutQualificationsInput = {
    phone?: string | null
    dob?: Date | string | null
    bio?: string | null
    user: UserCreateNestedOneWithoutApplicantInput
    skills?: ApplicantSkillCreateNestedManyWithoutApplicantInput
  }

  export type ApplicantProfileUncheckedCreateWithoutQualificationsInput = {
    applicant_id?: number
    user_id: number
    phone?: string | null
    dob?: Date | string | null
    bio?: string | null
    skills?: ApplicantSkillUncheckedCreateNestedManyWithoutApplicantInput
  }

  export type ApplicantProfileCreateOrConnectWithoutQualificationsInput = {
    where: ApplicantProfileWhereUniqueInput
    create: XOR<ApplicantProfileCreateWithoutQualificationsInput, ApplicantProfileUncheckedCreateWithoutQualificationsInput>
  }

  export type QualificationCreateWithoutApplicantQualificationsInput = {
    name: string
    nqf_level: number
    saqa_id?: string | null
    sector?: string | null
    originator?: string | null
  }

  export type QualificationUncheckedCreateWithoutApplicantQualificationsInput = {
    qualification_id?: number
    name: string
    nqf_level: number
    saqa_id?: string | null
    sector?: string | null
    originator?: string | null
  }

  export type QualificationCreateOrConnectWithoutApplicantQualificationsInput = {
    where: QualificationWhereUniqueInput
    create: XOR<QualificationCreateWithoutApplicantQualificationsInput, QualificationUncheckedCreateWithoutApplicantQualificationsInput>
  }

  export type ApplicantProfileUpsertWithoutQualificationsInput = {
    update: XOR<ApplicantProfileUpdateWithoutQualificationsInput, ApplicantProfileUncheckedUpdateWithoutQualificationsInput>
    create: XOR<ApplicantProfileCreateWithoutQualificationsInput, ApplicantProfileUncheckedCreateWithoutQualificationsInput>
    where?: ApplicantProfileWhereInput
  }

  export type ApplicantProfileUpdateToOneWithWhereWithoutQualificationsInput = {
    where?: ApplicantProfileWhereInput
    data: XOR<ApplicantProfileUpdateWithoutQualificationsInput, ApplicantProfileUncheckedUpdateWithoutQualificationsInput>
  }

  export type ApplicantProfileUpdateWithoutQualificationsInput = {
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutApplicantNestedInput
    skills?: ApplicantSkillUpdateManyWithoutApplicantNestedInput
  }

  export type ApplicantProfileUncheckedUpdateWithoutQualificationsInput = {
    applicant_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: ApplicantSkillUncheckedUpdateManyWithoutApplicantNestedInput
  }

  export type QualificationUpsertWithoutApplicantQualificationsInput = {
    update: XOR<QualificationUpdateWithoutApplicantQualificationsInput, QualificationUncheckedUpdateWithoutApplicantQualificationsInput>
    create: XOR<QualificationCreateWithoutApplicantQualificationsInput, QualificationUncheckedCreateWithoutApplicantQualificationsInput>
    where?: QualificationWhereInput
  }

  export type QualificationUpdateToOneWithWhereWithoutApplicantQualificationsInput = {
    where?: QualificationWhereInput
    data: XOR<QualificationUpdateWithoutApplicantQualificationsInput, QualificationUncheckedUpdateWithoutApplicantQualificationsInput>
  }

  export type QualificationUpdateWithoutApplicantQualificationsInput = {
    name?: StringFieldUpdateOperationsInput | string
    nqf_level?: IntFieldUpdateOperationsInput | number
    saqa_id?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    originator?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type QualificationUncheckedUpdateWithoutApplicantQualificationsInput = {
    qualification_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    nqf_level?: IntFieldUpdateOperationsInput | number
    saqa_id?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    originator?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ListingCreateWithoutReportInput = {
    listname: string
    list_type: string
    nqf_level?: number | null
    description?: string | null
    status?: string
    closing_date?: Date | string | null
    duration?: string | null
    location?: string | null
    requirements?: string | null
    stipend?: number | null
    sector?: string | null
    cvUploadedAt?: Date | string | null
    applications?: ApplicationCreateNestedManyWithoutListingInput
    provider: ProviderCreateNestedOneWithoutListingsInput
  }

  export type ListingUncheckedCreateWithoutReportInput = {
    listings_id?: number
    listname: string
    list_type: string
    nqf_level?: number | null
    description?: string | null
    provider_id: number
    status?: string
    closing_date?: Date | string | null
    duration?: string | null
    location?: string | null
    requirements?: string | null
    stipend?: number | null
    sector?: string | null
    cvUploadedAt?: Date | string | null
    applications?: ApplicationUncheckedCreateNestedManyWithoutListingInput
  }

  export type ListingCreateOrConnectWithoutReportInput = {
    where: ListingWhereUniqueInput
    create: XOR<ListingCreateWithoutReportInput, ListingUncheckedCreateWithoutReportInput>
  }

  export type ListingUpsertWithoutReportInput = {
    update: XOR<ListingUpdateWithoutReportInput, ListingUncheckedUpdateWithoutReportInput>
    create: XOR<ListingCreateWithoutReportInput, ListingUncheckedCreateWithoutReportInput>
    where?: ListingWhereInput
  }

  export type ListingUpdateToOneWithWhereWithoutReportInput = {
    where?: ListingWhereInput
    data: XOR<ListingUpdateWithoutReportInput, ListingUncheckedUpdateWithoutReportInput>
  }

  export type ListingUpdateWithoutReportInput = {
    listname?: StringFieldUpdateOperationsInput | string
    list_type?: StringFieldUpdateOperationsInput | string
    nqf_level?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    closing_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    stipend?: NullableFloatFieldUpdateOperationsInput | number | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    cvUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    applications?: ApplicationUpdateManyWithoutListingNestedInput
    provider?: ProviderUpdateOneRequiredWithoutListingsNestedInput
  }

  export type ListingUncheckedUpdateWithoutReportInput = {
    listings_id?: IntFieldUpdateOperationsInput | number
    listname?: StringFieldUpdateOperationsInput | string
    list_type?: StringFieldUpdateOperationsInput | string
    nqf_level?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    provider_id?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    closing_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    stipend?: NullableFloatFieldUpdateOperationsInput | number | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    cvUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    applications?: ApplicationUncheckedUpdateManyWithoutListingNestedInput
  }

  export type ListingCreateWithoutReportsInput = {
    listname: string
    list_type: string
    nqf_level?: number | null
    description?: string | null
    stipend?: number | null
    location?: string | null
    duration?: string | null
    requirements?: string | null
    closing_date?: Date | string | null
    cvUploadedAt?: Date | string | null
    sector?: string | null
    status?: string
    provider: ProviderCreateNestedOneWithoutListingsInput
    applications?: ApplicationCreateNestedManyWithoutListingInput
  }

  export type ListingUncheckedCreateWithoutReportsInput = {
    listings_id?: number
    provider_id: number
    listname: string
    list_type: string
    nqf_level?: number | null
    description?: string | null
    stipend?: number | null
    location?: string | null
    duration?: string | null
    requirements?: string | null
    closing_date?: Date | string | null
    cvUploadedAt?: Date | string | null
    sector?: string | null
    status?: string
    applications?: ApplicationUncheckedCreateNestedManyWithoutListingInput
  }

  export type ListingCreateOrConnectWithoutReportsInput = {
    where: ListingWhereUniqueInput
    create: XOR<ListingCreateWithoutReportsInput, ListingUncheckedCreateWithoutReportsInput>
  }

  export type ListingUpsertWithoutReportsInput = {
    update: XOR<ListingUpdateWithoutReportsInput, ListingUncheckedUpdateWithoutReportsInput>
    create: XOR<ListingCreateWithoutReportsInput, ListingUncheckedCreateWithoutReportsInput>
    where?: ListingWhereInput
  }

  export type ListingUpdateToOneWithWhereWithoutReportsInput = {
    where?: ListingWhereInput
    data: XOR<ListingUpdateWithoutReportsInput, ListingUncheckedUpdateWithoutReportsInput>
  }

  export type ListingUpdateWithoutReportsInput = {
    listname?: StringFieldUpdateOperationsInput | string
    list_type?: StringFieldUpdateOperationsInput | string
    nqf_level?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    stipend?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    closing_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cvUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    provider?: ProviderUpdateOneRequiredWithoutListingsNestedInput
    applications?: ApplicationUpdateManyWithoutListingNestedInput
  }

  export type ListingUncheckedUpdateWithoutReportsInput = {
    listings_id?: IntFieldUpdateOperationsInput | number
    provider_id?: IntFieldUpdateOperationsInput | number
    listname?: StringFieldUpdateOperationsInput | string
    list_type?: StringFieldUpdateOperationsInput | string
    nqf_level?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    stipend?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    closing_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cvUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    applications?: ApplicationUncheckedUpdateManyWithoutListingNestedInput
  }

  export type ApplicationCreateManyUserInput = {
    provider_id: number
    availability?: string | null
    motivation?: string | null
    status?: string
    listing_id: number
    created_at?: Date | string
    updated_at?: Date | string
    availability?: string | null
    motivation?: string | null
    cvFilePath?: string | null
    cvOriginalFilename?: string | null
    cvUploadedAt?: Date | string | null
  }

  export type ApplicationUpdateWithoutUserInput = {
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    motivation?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    motivation?: NullableStringFieldUpdateOperationsInput | string | null
    cvFilePath?: NullableStringFieldUpdateOperationsInput | string | null
    cvOriginalFilename?: NullableStringFieldUpdateOperationsInput | string | null
    cvUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    listing?: ListingUpdateOneRequiredWithoutApplicationsNestedInput
    provider?: ProviderUpdateOneRequiredWithoutApplicationsNestedInput
  }

  export type ApplicationUncheckedUpdateWithoutUserInput = {
    application_id?: IntFieldUpdateOperationsInput | number
    provider_id?: IntFieldUpdateOperationsInput | number
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    motivation?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    listing_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    motivation?: NullableStringFieldUpdateOperationsInput | string | null
    cvFilePath?: NullableStringFieldUpdateOperationsInput | string | null
    cvOriginalFilename?: NullableStringFieldUpdateOperationsInput | string | null
    cvUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ApplicationUncheckedUpdateManyWithoutUserInput = {
    application_id?: IntFieldUpdateOperationsInput | number
    provider_id?: IntFieldUpdateOperationsInput | number
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    motivation?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    listing_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    motivation?: NullableStringFieldUpdateOperationsInput | string | null
    cvFilePath?: NullableStringFieldUpdateOperationsInput | string | null
    cvOriginalFilename?: NullableStringFieldUpdateOperationsInput | string | null
    cvUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ApplicantQualificationCreateManyApplicantInput = {
    qualification_id: number
    institution?: string | null
    year_completed?: number | null
  }

  export type ApplicantSkillCreateManyApplicantInput = {
    skill_id: number
  }

  export type ApplicantQualificationUpdateWithoutApplicantInput = {
    institution?: NullableStringFieldUpdateOperationsInput | string | null
    year_completed?: NullableIntFieldUpdateOperationsInput | number | null
    qualification?: QualificationUpdateOneRequiredWithoutApplicantQualificationsNestedInput
  }

  export type ApplicantQualificationUncheckedUpdateWithoutApplicantInput = {
    id?: IntFieldUpdateOperationsInput | number
    qualification_id?: IntFieldUpdateOperationsInput | number
    institution?: NullableStringFieldUpdateOperationsInput | string | null
    year_completed?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ApplicantQualificationUncheckedUpdateManyWithoutApplicantInput = {
    id?: IntFieldUpdateOperationsInput | number
    qualification_id?: IntFieldUpdateOperationsInput | number
    institution?: NullableStringFieldUpdateOperationsInput | string | null
    year_completed?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ApplicantSkillUpdateWithoutApplicantInput = {
    skill?: SkillUpdateOneRequiredWithoutApplicantSkillsNestedInput
  }

  export type ApplicantSkillUncheckedUpdateWithoutApplicantInput = {
    id?: IntFieldUpdateOperationsInput | number
    skill_id?: IntFieldUpdateOperationsInput | number
  }

  export type ApplicantSkillUncheckedUpdateManyWithoutApplicantInput = {
    id?: IntFieldUpdateOperationsInput | number
    skill_id?: IntFieldUpdateOperationsInput | number
  }

  export type ApplicationCreateManyProviderInput = {
    user_id: number
    status?: string
    listing_id: number
    created_at?: Date | string
    updated_at?: Date | string
    availability?: string | null
    motivation?: string | null
    cvFilePath?: string | null
    cvOriginalFilename?: string | null
    cvUploadedAt?: Date | string | null
  }

  export type ListingCreateManyProviderInput = {
    listname: string
    list_type: string
    nqf_level?: number | null
    description?: string | null
    status?: string
    closing_date?: Date | string | null
    duration?: string | null
    location?: string | null
    requirements?: string | null
    stipend?: number | null
    sector?: string | null
    cvUploadedAt?: Date | string | null
  }

  export type ApplicationUpdateWithoutProviderInput = {
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    motivation?: NullableStringFieldUpdateOperationsInput | string | null
    cvFilePath?: NullableStringFieldUpdateOperationsInput | string | null
    cvOriginalFilename?: NullableStringFieldUpdateOperationsInput | string | null
    cvUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    listing?: ListingUpdateOneRequiredWithoutApplicationsNestedInput
    user?: UserUpdateOneRequiredWithoutApplicationsNestedInput
  }

  export type ApplicationUncheckedUpdateWithoutProviderInput = {
    application_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    listing_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    motivation?: NullableStringFieldUpdateOperationsInput | string | null
    cvFilePath?: NullableStringFieldUpdateOperationsInput | string | null
    cvOriginalFilename?: NullableStringFieldUpdateOperationsInput | string | null
    cvUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ApplicationUncheckedUpdateManyWithoutProviderInput = {
    application_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    listing_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    motivation?: NullableStringFieldUpdateOperationsInput | string | null
    cvFilePath?: NullableStringFieldUpdateOperationsInput | string | null
    cvOriginalFilename?: NullableStringFieldUpdateOperationsInput | string | null
    cvUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ListingUpdateWithoutProviderInput = {
    listname?: StringFieldUpdateOperationsInput | string
    list_type?: StringFieldUpdateOperationsInput | string
    nqf_level?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    closing_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    stipend?: NullableFloatFieldUpdateOperationsInput | number | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    cvUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    applications?: ApplicationUpdateManyWithoutListingNestedInput
    Report?: ReportUpdateManyWithoutListingNestedInput
  }

  export type ListingUncheckedUpdateWithoutProviderInput = {
    listings_id?: IntFieldUpdateOperationsInput | number
    listname?: StringFieldUpdateOperationsInput | string
    list_type?: StringFieldUpdateOperationsInput | string
    nqf_level?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    closing_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    stipend?: NullableFloatFieldUpdateOperationsInput | number | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    cvUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    applications?: ApplicationUncheckedUpdateManyWithoutListingNestedInput
    Report?: ReportUncheckedUpdateManyWithoutListingNestedInput
  }

  export type ListingUncheckedUpdateManyWithoutProviderInput = {
    listings_id?: IntFieldUpdateOperationsInput | number
    listname?: StringFieldUpdateOperationsInput | string
    list_type?: StringFieldUpdateOperationsInput | string
    nqf_level?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    closing_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    stipend?: NullableFloatFieldUpdateOperationsInput | number | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    cvUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ApplicationCreateManyListingInput = {
    user_id: number
    provider_id: number
    availability?: string | null
    motivation?: string | null
    status?: string
    created_at?: Date | string
    updated_at?: Date | string
    availability?: string | null
    motivation?: string | null
    cvFilePath?: string | null
    cvOriginalFilename?: string | null
    cvUploadedAt?: Date | string | null
  }

  export type ReportCreateManyListingInput = {
    reason: string
    details?: string | null
    reported_by: string
    status?: string
    created_at?: Date | string
  }

  export type ReportCreateManyListingInput = {
    reason: string
    details?: string | null
    reported_by: string
    status?: string
    created_at?: Date | string
  }

  export type ApplicationUpdateWithoutListingInput = {
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    motivation?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    motivation?: NullableStringFieldUpdateOperationsInput | string | null
    cvFilePath?: NullableStringFieldUpdateOperationsInput | string | null
    cvOriginalFilename?: NullableStringFieldUpdateOperationsInput | string | null
    cvUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    provider?: ProviderUpdateOneRequiredWithoutApplicationsNestedInput
    user?: UserUpdateOneRequiredWithoutApplicationsNestedInput
  }

  export type ApplicationUncheckedUpdateWithoutListingInput = {
    application_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    provider_id?: IntFieldUpdateOperationsInput | number
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    motivation?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    motivation?: NullableStringFieldUpdateOperationsInput | string | null
    cvFilePath?: NullableStringFieldUpdateOperationsInput | string | null
    cvOriginalFilename?: NullableStringFieldUpdateOperationsInput | string | null
    cvUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ApplicationUncheckedUpdateManyWithoutListingInput = {
    application_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    provider_id?: IntFieldUpdateOperationsInput | number
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    motivation?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    motivation?: NullableStringFieldUpdateOperationsInput | string | null
    cvFilePath?: NullableStringFieldUpdateOperationsInput | string | null
    cvOriginalFilename?: NullableStringFieldUpdateOperationsInput | string | null
    cvUploadedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ReportUpdateWithoutListingInput = {
    reason?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    reported_by?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUncheckedUpdateWithoutListingInput = {
    report_id?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    reported_by?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUncheckedUpdateManyWithoutListingInput = {
    report_id?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    reported_by?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUpdateWithoutListingInput = {
    reason?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    reported_by?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUncheckedUpdateWithoutListingInput = {
    report_id?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    reported_by?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUncheckedUpdateManyWithoutListingInput = {
    report_id?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    reported_by?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicantSkillCreateManySkillInput = {
    applicant_id: number
  }

  export type ApplicantSkillUpdateWithoutSkillInput = {
    applicant?: ApplicantProfileUpdateOneRequiredWithoutSkillsNestedInput
  }

  export type ApplicantSkillUncheckedUpdateWithoutSkillInput = {
    id?: IntFieldUpdateOperationsInput | number
    applicant_id?: IntFieldUpdateOperationsInput | number
  }

  export type ApplicantSkillUncheckedUpdateManyWithoutSkillInput = {
    id?: IntFieldUpdateOperationsInput | number
    applicant_id?: IntFieldUpdateOperationsInput | number
  }

  export type ApplicantQualificationCreateManyQualificationInput = {
    applicant_id: number
    institution?: string | null
    year_completed?: number | null
  }

  export type ApplicantQualificationUpdateWithoutQualificationInput = {
    institution?: NullableStringFieldUpdateOperationsInput | string | null
    year_completed?: NullableIntFieldUpdateOperationsInput | number | null
    applicant?: ApplicantProfileUpdateOneRequiredWithoutQualificationsNestedInput
  }

  export type ApplicantQualificationUncheckedUpdateWithoutQualificationInput = {
    id?: IntFieldUpdateOperationsInput | number
    applicant_id?: IntFieldUpdateOperationsInput | number
    institution?: NullableStringFieldUpdateOperationsInput | string | null
    year_completed?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ApplicantQualificationUncheckedUpdateManyWithoutQualificationInput = {
    id?: IntFieldUpdateOperationsInput | number
    applicant_id?: IntFieldUpdateOperationsInput | number
    institution?: NullableStringFieldUpdateOperationsInput | string | null
    year_completed?: NullableIntFieldUpdateOperationsInput | number | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}