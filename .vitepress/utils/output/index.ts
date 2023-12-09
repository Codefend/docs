import { outputDefaultItem, outputDefaultTitle } from "./output-default";
import { outputIgnoreTitle, outputIgnoreItem } from "./output-ignore";
import { outputPoolTitle, outputPoolItem } from "./output-pool";
import { outputStaticTitle, outputStaticItem } from "./output-static";
import { outputEmptyLine } from "./output-empty";
import { OUTPUT_TYPE } from "../constants";

export const output = (options: any[]) => {
  if (!options) return [];
  const ret: any[] = [];

  options.forEach((option) => {
    switch (option.type) {
      case OUTPUT_TYPE.DEFAULT_ITEM:
        ret.push(outputDefaultItem(option));
        break;
      case OUTPUT_TYPE.POOL_ITEM:
        ret.push(outputPoolItem(option));
        break;
      case OUTPUT_TYPE.IGNORE_ITEM:
        ret.push(outputIgnoreItem(option));
        break;
      case OUTPUT_TYPE.STATIC_ITEM:
        ret.push(outputStaticItem(option));
        break;

      case OUTPUT_TYPE.EMPTY_LINE:
        ret.push(outputEmptyLine());
        break;

      case OUTPUT_TYPE.DEFAULT_TITLE:
        ret.push(outputDefaultTitle(option));
        break;
      case OUTPUT_TYPE.POOL_TITLE:
        ret.push(outputPoolTitle(option));
        break;
      case OUTPUT_TYPE.IGNORE_TITLE:
        ret.push(outputIgnoreTitle(option));
        break;
      case OUTPUT_TYPE.STATIC_TITLE:
        ret.push(outputStaticTitle(option));
        break;
    }
  });
  return ret;
};
