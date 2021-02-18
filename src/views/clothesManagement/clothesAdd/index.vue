<template>
  <div class="form-container">
    <el-row :gutter="20">
      <el-col :xs="20" :sm="16" :md="12" :lg="12" :xl="8">
        <el-form
          ref="ruleForm"
          enctype="multipart/form-data"
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
              <el-checkbox-button v-for="(item,index) in tags" :label="item" :key="item">{{item}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="图片" prop="file">
            <el-upload
              ref="upload"
              :file-list="fileList"
              action="http://localhost:8080/insertClothes"
              :close-on-click-modal="false"
              :data="loadData"
              :limit="1"
              :auto-upload="false"
              :before-upload="beforeUpload"
              :on-change="handleChange"
              :on-exceed="handleExceed"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              accept="image/png, image/jpeg"
              class="upload-content"
              list-type="picture-card"
            >
              <i slot="trigger" class="el-icon-plus"></i>
              <el-dialog
                :visible.sync="dialogVisible"
                append-to-body
                title="查看大图"
              >
                <div>
                  <img :src="form.file" alt="" width="100%" />
                </div>
              </el-dialog>
            </el-upload>
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
  import {doAdd,getTag} from '@/api/clothes'
  import {mapGetters} from "vuex";

  export default {
    name: 'Form',
    data() {
      return {
        form: {
          name: '',
          cost: '',
          rent: '',
          num: '',
          size: '',
          file: null,
          info: '',
          tag: []
        },
        loadData: {},
        fileList: [],
        dialogVisible: false,
        disabled: false,
        limit: 1,
        tags: [],
        rules: {
          name: [
            {required: true, message: '请输入服装名称', trigger: 'blur'},
          ],
          cost: [
            {required: true, message: '请输入服装价格', trigger: 'blur'},
          ],
          rent: [
            {required: true, message: '请输入服装租金', trigger: 'blur'},
          ],
          num: [
            {required: true, message: '请选择服装数量', trigger: 'blur'},
          ],
          size: [
            {required: true, message: '请选择尺码', trigger: 'change'},
          ],
        },
      }
    },
    created() {
      this.showTag()
    },
    computed: {
      ...mapGetters({
        userid: 'user/userid',
      })
    },
    methods: {
      async showTag() {
        const data = await getTag()
        data.data.forEach((item) => {
          this.tags.push(item.tagName)
        })
        console.log(this.tags);
      },
      submitForm(formName){
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            this.$refs.upload.submit()
            this.fileList=[]
            this.$baseMessage('成功插入', 'success')
            this.$refs[formName].resetFields()
          }
        })
      },
      beforeUpload(){
        this.loadData.businessesId = parseInt(this.userid)
        this.loadData.clothesCost= this.form.cost
        this.loadData.clothesImg= null
        this.loadData.clothesInfo= this.form.info
        this.loadData.clothesName= this.form.name
        this.loadData.clothesNum= this.form.num
        this.loadData.clothesRent=this.form.rent
        this.loadData.clothesSize= this.form.size
        console.log(this.loadData);
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      handleChecked() {
        console.log(this.form.tag);
      },
      // handleSuccess(file){
      //   console.log(file);
      //   this.form.img = file.url
      //   this.$baseMessage(
      //     `文件[${file.raw.name}]上传成功,文件大小为${this.$baseLodash.round(
      //       file.raw.size / 1024,
      //       0
      //     )}KB`,
      //     'success'
      //   )
      // },
      handleChange(file, fileList) {
        //选择文件后，给fileList对象赋值
        this.fileList = fileList
      },
      handleRemove(file, fileList){
        this.fileList = fileList
      },
      // handleError(err, file) {
      //   this.imgNum = this.imgNum + 1
      //   this.imgErrorNum = this.imgErrorNum + 1
      //   this.$baseMessage(
      //     `文件[${file.raw.name}]上传失败,文件大小为${this.$baseLodash.round(
      //       file.raw.size / 1024,
      //       0
      //     )}KB`,
      //     'error'
      //   )
      //   setTimeout(() => {
      //     this.loading = false
      //     this.show = false
      //   }, 1000)
      // },
      handlePreview(file) {
        console.log(file);
        this.form.file = file.url
        console.log(this.form.file);
        this.dialogVisible = true
      },
      handleExceed(files) {
        this.$baseMessage(
          `当前限制选择 ${this.limit} 个文件，本次选择了
             ${files.length}
             个文件`,
          'error'
        )
      },
      // async uploadSectionFile(formData,file) {
      //   // console.log(param);
      //   const data = new FormData();
      //   // this.form.file = this.fileList[0].raw
      //   // console.log(this.fileList[0].raw)
      //   //
      //   // this.form.file = param.file // 将form中的files字段赋值File对象
      //   // console.log(param.file)
      //
      //   // 将form表单中的值都赋值给FormData传递给后台
      //   // const clothes = {
      //   //   businessesId: parseInt(this.userid),
      //   //   clothesCost: this.form.cost,
      //   //   clothesImg: null,
      //   //   clothesInfo: this.form.info,
      //   //   clothesName: this.form.name,
      //   //   clothesNum: this.form.num,
      //   //   clothesRent: this.form.rent,
      //   //   clothesSize: this.form.size
      //   // }
      //   data.append('file',file)
      //   data.append('clothes',formData)
      //   console.log(data);
      //
      //     axios({
      //       url:'/insertClothes',
      //       method:'post',
      //       headers: {
      //         'Content-Type': 'multipart/form-data',
      //       },
      //       data: data
      //     }).then((res) => {
      //       this.$refs.upload.clearFiles();
      //     }).catch((err) => {
      //     });
      // },
      checkNum: function () {
        var license_num = this.license_num;
        license_num = license_num.replace(/[^\d]/g, ''); // 清除“数字”和“.”以外的字符
        if (license_num.indexOf('.') < 0 && license_num != '') {
          // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
          license_num = parseInt(license_num);
        }
        this.license_num = license_num;
      },
      checkPrice: function () {
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
    }
  }
</script>
