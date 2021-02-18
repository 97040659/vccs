<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="tag名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="add">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { insertTag } from '@/api/clothes'

  export default {
    name: 'TableEdit',
    data() {
      return {
        form: {
          name: '',
        },
        rules: {
          name: [{ required: true, trigger: 'blur', message: '请输入Tag名字' }],
        },
        title: 'tag添加',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      showEdit(row) {
        this.form = Object.assign({}, row)
        this.dialogFormVisible = true
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      },
      add() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            insertTag(this.form)
            this.$baseMessage('成功添加', 'success')
            this.$refs['form'].resetFields()
            this.dialogFormVisible = false
            this.$emit('fetch-data')
            this.form = this.$options.data().form
          } else {
            return false
          }
        })
      }
    }
  }
</script>
