import { css } from "styled-components";

export const media = {
  mobile: (styles) => css`
    @media (max-width: 480px) {
      ${styles}
    }
  `,
};
