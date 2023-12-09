<ClientOnly>
# Obfuscating a {{config.intro.title}} Project <Badge type="info" :text="`${config.intro.minutesRead}  minutes read`" />

:::tip Prerequisites
<template v-for="(prerequisite,index) in config.intro.prerequisites" :key="`prerequisites-${index}`"> - {{prerequisite}} <br></template>
:::
</ClientOnly>
