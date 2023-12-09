import { OUTPUT_TYPE } from "../../../.vitepress/utils/constants";
import { IBaseExample } from "../common/base";

const NodeJsExample: IBaseExample = {
  intro: {
    title: "Node js",
    minutesRead: 5,
    prerequisites: [
      "Familiarity with the command line",
      "Install Node js version 16.0 or higher",
    ],
  },
  obfuscation: {
    terminal: [
      {
        type: OUTPUT_TYPE.IGNORE_TITLE,
        detectedWords: 1,
        registeredWords: 1,
      },
      {
        type: OUTPUT_TYPE.IGNORE_ITEM,
        from: "node_modules",
        occurrences: 1,
        regex: "Main",
      },
      {
        type: OUTPUT_TYPE.EMPTY_LINE,
      },
      {
        type: OUTPUT_TYPE.STATIC_TITLE,
        detectedWords: 0,
        registeredWords: 0,
      },
      {
        type: OUTPUT_TYPE.EMPTY_LINE,
      },
      {
        type: OUTPUT_TYPE.POOL_TITLE,
        detectedWords: 0,
        registeredWords: 0,
      },
      {
        type: OUTPUT_TYPE.EMPTY_LINE,
      },
      {
        type: OUTPUT_TYPE.DEFAULT_TITLE,
        detectedWords: 12,
      },
      {
        type: OUTPUT_TYPE.DEFAULT_ITEM,
        from: "pkg-lib",
        to: "Ox0",
        occurrences: 2,
        regex: "File",
      },
      {
        type: OUTPUT_TYPE.DEFAULT_ITEM,
        from: "file-user",
        to: "Ox1",
        occurrences: 2,
        regex: "File",
      },
      {
        type: OUTPUT_TYPE.DEFAULT_ITEM,
        from: "pkg-utils",
        to: "Ox2",
        occurrences: 2,
        regex: "File",
      },
      {
        type: OUTPUT_TYPE.DEFAULT_ITEM,
        from: "file-constants",
        to: "Ox3",
        occurrences: 2,
        regex: "File",
      },
      {
        type: OUTPUT_TYPE.DEFAULT_ITEM,
        from: "file-index",
        to: "Ox4",
        occurrences: 1,
        regex: "File",
      },
      {
        type: OUTPUT_TYPE.DEFAULT_ITEM,
        from: "l_fs",
        to: "Ox5",
        occurrences: 2,
        regex: "Main",
      },
      {
        type: OUTPUT_TYPE.DEFAULT_ITEM,
        from: "l_fullName",
        to: "Ox6",
        occurrences: 4,
        regex: "Main",
      },
      {
        type: OUTPUT_TYPE.DEFAULT_ITEM,
        from: "l_constants",
        to: "Ox7",
        occurrences: 2,
        regex: "Main",
      },
      {
        type: OUTPUT_TYPE.DEFAULT_ITEM,
        from: "l_sayHi",
        to: "Ox8",
        occurrences: 2,
        regex: "Main",
      },
      {
        type: OUTPUT_TYPE.DEFAULT_ITEM,
        from: "l_firstName",
        to: "Ox9",
        occurrences: 4,
        regex: "Main",
      },
      {
        type: OUTPUT_TYPE.DEFAULT_ITEM,
        from: "l_lastName",
        to: "Ox10",
        occurrences: 4,
        regex: "Main",
      },
      {
        type: OUTPUT_TYPE.DEFAULT_ITEM,
        from: "l_name",
        to: "Ox11",
        occurrences: 2,
        regex: "Main",
      },
      {
        type: OUTPUT_TYPE.DEFAULT_ITEM,
        from: "l_greeting",
        to: "Ox12",
        occurrences: 3,
        regex: "Main",
      },
    ],
  },
};

export default NodeJsExample;
