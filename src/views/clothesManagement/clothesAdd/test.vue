<template>
  <div class="form-container">
    <el-row :gutter="20">
      <el-col :xs="20" :sm="16" :md="12" :lg="12" :xl="8">
        <el-form
          ref="ruleForm"
          :model="form"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="服装名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="服装价格" prop="cost">
            <el-input v-model.number="form.cost" type="number" :min="0" :change="checkPrice"></el-input>
          </el-form-item>
          <el-form-item label="服装租金" prop="rent">
            <el-input v-model.number="form.rent" type="number" :min="0" :change="checkPrice"></el-input>
          </el-form-item>
          <el-form-item label="服装数量" prop="num">
            <el-input v-model.number="form.num" type="number" :min="0" :change="checkNum"></el-input>
          </el-form-item>
          <el-form-item label="尺码" prop="size">
            <el-select v-model="form.size">
              <el-option label="S" value="S"></el-option>
              <el-option label="M" value="M"></el-option>
              <el-option label="L" value="L"></el-option>
              <el-option label="XL" value="XL"></el-option>
              <el-option label="XXL" value="XXL"></el-option>
              <el-option label="XXXL" value="XXXL"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="服装标签" prop="tag">
            <el-checkbox-group v-model="form.tag" @change="handleChecked">
              <el-checkbox-button v-for="item in tags" :label="item">{{item}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="图片" prop="img">
            <vab-upload
              ref="vabUpload"
              url="/upload"
              name="file"
              :limit="1"
              :size="5"
            ></vab-upload>
            <el-button type="primary" @click="handleShow({ key: 'value' })">
              上传图片
            </el-button>
            <vab-upload></vab-upload>
          </el-form-item>
          <el-form-item label="服装介绍" prop="info">
            <el-input v-model="form.info" type="textarea"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">
              立即创建
            </el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import VabUpload from '@/components/VabUpload'
  import  doAdd from '@/api/table'
  export default {
    name: 'Form',
    components: {
      VabUpload,
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger',
        }
        return statusMap[status]
      },
    },
    data() {
      return {
        form: {
          name: '',
          cost: '',
          rent: '',
          num: '',
          size: '',
          img: '',
          info: '',
          tag: []
        },
        tags: ["1","2","3","4"],
        rules: {
          name: [
            { required: true, message: '请输入服装名称', trigger: 'blur' },
          ],
          cost: [
            { required: true, message: '请输入服装价格', trigger: 'blur' },
          ],
          rent: [
            { required: true, message: '请输入服装租金', trigger: 'blur' },
          ],
          num: [
            { required: true, message: '请选择服装数量', trigger: 'blur' },
          ],
          size: [
            { required: true, message: '请选择尺码', trigger: 'change' },
          ],
        },
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      handleChecked() {
        console.log(this.form.tag);
      },
      checkNum: function(){
        var license_num = this.license_num;
        license_num = license_num.replace(/[^\d]/g, ''); // 清除“数字”和“.”以外的字符
        if (license_num.indexOf('.') < 0 && license_num != '') {
          // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
          license_num = parseInt(license_num);
        }
        this.license_num = license_num;
      },
      checkPrice: function(){
        var price = '' + this.price;
        price = price
          .replace(/[^\d.]/g, '') // 清除“数字”和“.”以外的字符
          .replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
          .replace('.', '$#$')
          .replace(/\./g, '')
          .replace('$#$', '.')
          .replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); // 只能输入两个小数
        if (price.indexOf('.') < 0 && price != '') {
          // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
          price = parseFloat(price);
        }
        this.price = price;
      },
      handleShow(data) {
        this.$refs['vabUpload'].handleShow(data)
      }
    }
  }
</script>
