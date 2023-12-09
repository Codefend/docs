import { outputBaseItem, outputBaseTitle } from "./output-base";

export const outputStaticTitle = (option: IOutputStaticTitleOption) => {
  return outputBaseTitle({
    icon: "✔",
    title: "Static Transformation",
    detectedWords: option.detectedWords,
    registeredWords: option.registeredWords,
  });
};

export const outputStaticItem = (option: IOutputStaticItemOption) => {
  return outputBaseItem({
    icon: "S",
    from: option.from,
    to: option.to,
    regex: option.regex,
    occurrences: option.occurrences,
    hasArrow: true,
  });
};

export interface IOutputStaticTitleOption {
  detectedWords: number;
  registeredWords: number;
}

export interface IOutputStaticItemOption {
  from: string;
  to: string;
  occurrences: number;
  regex: string;
}
