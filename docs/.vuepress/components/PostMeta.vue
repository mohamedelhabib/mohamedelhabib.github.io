<template>
  <article class="article" itemscope itemtype="https://schema.org/BlogPosting">
    <h3>
      <a v-bind:href="$withBase(path)">{{ title }}</a>
    </h3>
    <small v-if="date" class="date">
      <time pubdate itemprop="datePublished" :datetime="date">{{ resolvedDate }}</time>
    </small>
    <div v-if="tags" class="tags" itemprop="keywords">
      <PostTag v-for="tag in resolvedTags" :key="tag" :tag="tag" />
    </div>
  </article>
</template>

<script>
import dayjs from "dayjs";
import PostTag from "./PostTag.vue";

export default {
  name: "PostMeta",
  components: { PostTag },
  props: {
    tags: {
      type: [Array, String]
    },
    title: {
      type: String
    },
    path: {
      type: String
    },
    date: {
      type: String
    }
  },
  computed: {
    resolvedDate() {
      return dayjs(this.date).format(
        this.$themeConfig.dateFormat || "YYYY/MM/DD"
      );
    },
    resolvedTags() {
      if (!this.tags || Array.isArray(this.tags)) return this.tags;
      return [this.tags];
    }
  }
};
</script>
<style scoped>
.article {
  margin-bottom: 2rem;
  border-left: solid 5px #3eaf7c;
  padding: 0.5rem;
}
.tags {
  margin-top: 1.5rem;
}
.article h3 {
  margin-top: 0;
  margin-bottom: 0.1rem;
}
</style>
