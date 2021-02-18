<template>
  <div class="table-container">
    <el-tag
      size="medium"
      v-for="tag in tags"
      :key="tag.tagName"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >{{tag.tagName}}</el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
  </div>
</template>

<script>
  import { getTag,deleteTag,insertTag } from '@/api/clothes'

  export default {
    name: 'ComprehensiveTable',
    data() {
      return {
        tags: [],
        inputVisible: false,
        inputValue: ''
      }
    },
    computed: {
      height() {
        return this.$baseTableHeight()
      },
    },
    created() {
      this.fetchData()
    },
    beforeDestroy() {},
    mounted() {},
    methods: {
      async handleClose(tag) {
        // this.tags.splice(this.tags.indexOf(tag), 1);
        const id={
          tagId: tag.tagId
        }
        console.log(tag.tagId);
        await deleteTag(id);
        this.fetchData()
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      async handleInputConfirm() {
        const inputValue = {
          tagName: this.inputValue
        }
        if (inputValue) {
          await insertTag(inputValue)
        }
        this.inputVisible = false;
        this.inputValue = '';
        this.fetchData()
      },
      async fetchData() {
        this.listLoading = true
        const data = await getTag()
        console.log(data);
        this.tags = data.data
        console.log(this.tags);
        this.total = data.length
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      },
    },
  }
</script>
<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>

