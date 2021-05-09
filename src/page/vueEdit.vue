<template>
  <div class="editor">
    <head-top></head-top>
    <div class="edit-container">
      <quill-editor
        v-model="content"
        ref="my-quill-editor"
        class="editer"
        :options="editorOption"
        @ready="onEditorReady($event)"
      >
      </quill-editor>
    </div>
    <div class="submit-button">
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import headTop from '../components/headTop'
import { quillEditor } from 'vue-quill-editor'
export default {
  data () {
    return {
      content: '<h3>文本编辑</h3>',
      editorOption: {}
    }
  },
  components: {
    headTop,
    quillEditor
  },
  computed: {
    editor () {
      return this.$refs['my-quill-editor'].quill
    }
  },
  methods: {
    onEditorReady (editor) {
      console.log('编辑就绪!', editor)
    },
    submit () {
      this.$message.success('提交成功！')
    }
  }
}
</script>

<style lang="less">
@import "../style/mixin";
.edit-container {
  padding: 40px;
  margin-bottom: 40px;
}
.editer {
  height: 350px;
}
.submit-button {
  text-align: center;
}
</style>
