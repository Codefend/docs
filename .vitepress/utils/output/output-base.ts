export const outputBaseTitle = (option: IOutputBaseTitleOption) => {
  return [
    `${option.icon} `,
    ` ${option.title} `,
    "",
    `${
      option.registeredWords === undefined
        ? option.detectedWords
        : `(${option.detectedWords}/${option.registeredWords})`
    }`,
    "",
    "",
  ];
};

export const outputBaseItem = (option: IOutputBaseItemOption) => {
  return [
    option.icon,
    `    ${option.from} `,
    `${option.hasArrow ? " -> " : ""}`,
    ` ${option.to} `,
    `${option.regex}`,
    ` (${option.occurrences})`,
  ];
};

export interface IOutputBaseTitleOption {
  icon: string;
  title: string;
  detectedWords: number;
  registeredWords?: number;
}

export interface IOutputBaseItemOption {
  icon: string;
  from: string;
  to: string;
  occurrences: number;
  regex: string;
  hasArrow: boolean;
}
