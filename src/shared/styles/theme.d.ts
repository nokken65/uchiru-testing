import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    main:{
      colors: {
        white: string,
        black: string,
        primary:  string,
        blue: string,
        bluePale: string,
        gray: string,
        grayPale: string,
      },
      maxWidth: {
        lg: string,
      },
    }
  }
}