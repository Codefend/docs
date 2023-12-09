# Folders and Files naming convention

To ensure <b>detection</b> by Codefend's parser, it is <b>necessary</b> for folder and file names to begin with the following specific words.

- `pkg-.*`
- `cmp-.*`
- `lib-.*`
- `file-.*`
- `folder-.*`
- `module-.*`
- `style-.*`
- `main-.*`

```diff
------------------------------ Before Obfuscation ------------------------------

├── pkg-src
│   ├── pkg-controller
│   │   ├── file-user-controller.js
│   ├── pkg-views
│   │   ├── file-user-view.html
│   ├── pkg-model
│   │   ├── file-user-model.js
│   ├── file-index.js
├── pkg-public
│   ├── pkg-css
│   │   ├── main-style.css
│   ├── pkg-images
│   │   ├── file-image-1.png
│   ├── pkg-js
│   │   ├── file-sw.js
│   ├── file-index.html
├── pkg-dist
├── node_modules
├── package.json
├── package-lock.json
└── .gitignore
```

```diff
+------------------------------ After Obfuscation ------------------------------

├── Ox0
│   ├── Ox1
│   │   ├── Ox2.js
│   ├── Ox3
│   │   ├── Ox4.html
│   ├── Ox5
│   │   ├── Ox6.js
│   ├── Ox7.js
├── Ox8
│   ├── Ox9
│   │   ├── Ox10.css
│   ├── Ox11
│   │   ├── Ox12.png
│   ├── Ox13
│   │   ├── Ox14.js
│   ├── Ox15.html
├── Ox16
├── node_modules
├── package.json
├── package-lock.json
└── .gitignore

```

By implementing this naming convention, you can ensure that the names of <b>any file</b> `.js .css .html .png .json .vue .c .cpp .zip...` and <b>any folder</b> are obfuscated. Additionally, Codefend will automatically update the corresponding imports inside your code to reflect the changes made during obfuscation.

In addition to the existing list, you can also include additional words or characters based on the parser specifications. Please refer to the [parser -> regexList -> file](../../references/configuration.md) documentation to learn more.
