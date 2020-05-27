<template>
  <ParentLayout>
    <template #page-bottom>
      <Vssue :title="$title" />
    </template>
    <template #sidebar-bottom>
      <Footer/>
    </template>
  </ParentLayout>
</template>

<script>
import ParentLayout from '@parent-theme/layouts/Layout.vue'
import Footer from '@theme/components/Footer.vue'

export default {
  components: {
    ParentLayout,
    Footer
  }
}
</script>