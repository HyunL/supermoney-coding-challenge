import { FlattenSimpleInterpolation } from "styled-components";

type MediaFunction = (styles: string) => FlattenSimpleInterpolation;

export const media: {
  mobile: MediaFunction;
};
