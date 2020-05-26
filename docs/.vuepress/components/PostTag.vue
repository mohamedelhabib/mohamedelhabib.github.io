<template>
  <span class="tag">{{ tag }}</span>
</template>

<script>
export default {
  name: "PostTag",
  props: {
    tag: {
      type: String,
      required: true
    }
  }
};
</script>
<style scoped>
.tag {
  padding: 0.5rem;
  border-radius: 0.6rem;
  background: #3eaf7c;
  margin-right: 0.3rem;
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
}
</style>
