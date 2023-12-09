<script setup>
import { output } from "../utils/output/index";
import { computed } from "vue";
const props = defineProps({
  items: {
    type: Array,
    default: [],
    required: true,
  },
});
const computedItems = computed(() => output(props.items));
</script>
<template>
  <div class="language-sh">
    <pre><code><template v-for="item in computedItems"><span style="color:var(--vt-c-green);">{{item[0]}}</span><span style="color:#A6ACCD;">{{item[1]}}<span style="color:#888;">{{item[2]}}<span style="color:#89DDFF;">{{item[3]}}</span><span style="color:#888;"> {{item[4]}}</span><span style="color:#89DDFF;">{{item[5]}}</span></span></span><br></template></code></pre>
  </div>
</template>
