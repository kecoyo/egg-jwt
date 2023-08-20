import { IgnoreOrMatch } from 'egg';
import { SignCallback, SignOptions, VerifyCallback, VerifyOptions } from 'jsonwebtoken';

declare module 'egg' {
  interface Jwt {
    /**
     * koa-jwt2 middleware and sets ctx.state.user.
     */
    (ctx: Context, next: () => Promise<any>): any;
    /**
     * call jsonwebtoken's sign() method
     * @param payload datas. datas to be signed
     * @param secretOrPrivateKey secret key. string or { key, passphrase }
     * @param options jwt options。see more details in https://github.com/auth0/node-jsonwebtoken
     * @param callback callback
     */
    sign(payload: string | Buffer | object, secretOrPrivateKey?: string, options?: SignOptions, callback?: SignCallback): string;
    /**
     * call jsonwebtoken's verify() method
     * @param token jwt token.
     * @param secretOrPrivateKey secret key。string or { key, passphrase }
     * @param options jwt options。see more details in https://github.com/auth0/node-jsonwebtoken
     * @param callback callback
     */
    verify(token: string, secretOrPrivateKey?: string, options?: VerifyOptions, callback?: VerifyCallback): string;

    /**
     * call jsonwebtoken's decode() method
     * @param token jwt token
     */
    decode(token: string): string;
  }

  interface Application {
    jwt: Jwt;
  }

  interface EggAppConfig {
    jwt: {
      enable?: boolean;
      secret: string;
      sign?: SignOptions;
      verify?: VerifyOptions;
      ignore?: IgnoreOrMatch;
      match?: IgnoreOrMatch;
      getToken?: (ctx: Context) => any;
    };
  }
}
