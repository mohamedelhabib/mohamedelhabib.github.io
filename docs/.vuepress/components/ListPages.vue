<template>
  <div>
    <div v-for="page in files">
      <PostMeta
        :title="page.frontmatter.title"
        :tags="page.frontmatter.tags"
        :author="page.frontmatter.author"
        :date="page.frontmatter.date"
        :path="page.path"
      />
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    files() {
      return this.$site.pages.filter(p => {
        return p.path != "/";
      });
    }
  }
};
</script>