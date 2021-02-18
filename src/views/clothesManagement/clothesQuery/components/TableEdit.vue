<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="服装名称" prop="clothesName">
        <el-input v-model="form.clothesName"></el-input>
      </el-form-item>
      <el-form-item label="服装价格" prop="clothesCost">
        <el-input v-model.number="form.clothesCost" type="number" :min="0" :change="checkPrice"></el-input>
      </el-form-item>
      <el-form-item label="服装租金" prop="clothesRent">
        <el-input v-model.number="form.clothesRent" type="number" :min="0" :change="checkPrice"></el-input>
      </el-form-item>
      <el-form-item label="服装数量" prop="clothesNum">
        <el-input v-model.number="form.clothesNum" type="number" :min="0" :change="checkNum"></el-input>
      </el-form-item>
      <el-form-item label="服装尺码" prop="clothesSize">
        <el-radio-group v-model.trim="form.clothesSize">
          <el-radio label="S"></el-radio>
          <el-radio label="M"></el-radio>
          <el-radio label="L"></el-radio>
          <el-radio label="XL"></el-radio>
          <el-radio label="XXL"></el-radio>
          <el-radio label="XXXL"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="图片" prop="file">
        <el-upload
          ref="upload"
          :file-list="fileList"
          action="http://localhost:8080/updateClothes"
          :close-on-click-modal="false"
          :data="loadData"
          :limit="1"
          :auto-upload="false"
          :before-upload="beforeUpload"
          :on-exceed="handleExceed"
          :on-preview="handlePreview"
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
              <img :src="form.clothesImg" alt="" width="100%" />
            </div>
          </el-dialog>
        </el-upload>
      </el-form-item>
      <el-form-item label="服装介绍" prop="info">
        <el-input v-model.trim="form.clothesInfo" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submitForm('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { doUpdate,getTag } from '@/api/clothes'
  import {mapGetters} from "vuex";

  export default {
    name: 'TableEdit',
    data() {
      return {
        form: {
          clothesId: '',
          clothesName: '',
          clothesCost: '',
          clothesRent: '',
          clothesNum: '',
          clothesSize: '',
          clothesImg: '',
          clothesInfo: '',
          businessId: '',
          tag: []
        },
        loadData: {},
        fileList: [],
        dialogVisible: false,
        // disabled: false,
        // imgNum: 0,
        limit: 1,
        tags: [],
        // rules: {
        //   name: [{ required: true, trigger: 'blur', message: '请输入名字' }],
        //   cost: [{ required: true, trigger: 'blur', message: '请输入价格' }],
        //   rent: [{ required: true, trigger: 'blur', message: '请输入租金' }],
        //   num: [{ required: true, trigger: 'blur', message: '请输入数量' }],
        //   size: [{ required: true, trigger: 'change', message: '请选择尺码' }],
        //   img: [{ required: true, trigger: 'change', message: '请选择图片' }],
        //   tag: [{ required: true, trigger: 'change', message: '请选择标签' }]
        // },
        title: '服装信息更新',
        dialogFormVisible: false,
      }
    },
    computed: {
      ...mapGetters({
        userid: 'user/userid',
      })
    },
    created() {
      this.showTag()
    },
    methods: {
      async showEdit(row) {
        this.form = Object.assign({}, row)
        this.dialogFormVisible = true
      },
      async showTag() {
        const data = await getTag()
        data.data.forEach((item) => {
          this.tags.push(item.tagName)
        })
        console.log(this.tags);
      },
      close() {
        this.fileList=[]
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      },
      beforeUpload(){
        this.loadData.businessesId = parseInt(this.userid)
        this.loadData.clothesCost= this.form.clothesCost
        this.loadData.clothesImg= null
        this.loadData.clothesInfo= this.form.clothesInfo
        this.loadData.clothesName= this.form.clothesName
        this.loadData.clothesNum= this.form.clothesNum
        this.loadData.clothesRent=this.form.clothesRent
        this.loadData.clothesSize= this.form.clothesSize
        this.loadData.clothesId= this.form.clothesId
        console.log(this.loadData);
      },
      submitForm(formName){
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            await this.$refs.upload.submit()
            this.fileList=[]
            this.$baseMessage('成功更新', 'success')
            this.$refs[formName].resetFields()
            this.$nextTick(async ()=>{
              await this.$parent.fetchData()
            })
            this.dialogFormVisible=false
            this.form = this.$options.data().form
          } else {
            return false
          }
        })
      },
      // update() {
      //   if(this.fileList!=null){
      //     this.form.clothesImg=this.fileList[0]
      //   }
      //   console.log(this.form.clothesImg);
      //   this.$refs['form'].validate(async (valid) => {
      //     if (valid) {
      //       const clothes = {
      //         clothesId: this.form.clothesId,
      //         clothesName: this.form.clothesName,
      //         clothesCost: this.form.clothesCost,
      //         clothesRent: this.form.clothesRent,
      //         clothesNum: this.form.clothesNum,
      //         clothesSize: this.form.clothesSize,
      //         clothesImg: null,
      //         clothesInfo: this.form.clothesInfo,
      //         businessId: this.userid,
      //         click: this.form.click
      //       }
      //       console.log(clothes);
      //       const { msg } = await doUpdate(clothes)
      //       this.$baseMessage(msg, 'success')
      //       this.$refs['form'].resetFields()
      //       this.dialogFormVisible = false
      //       this.$emit('fetch-data')
      //       this.form = this.$options.data().form
      //     } else {
      //       return false
      //     }
      //   })
      // },
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
      handleChecked() {
        console.log(this.form.tag);
      },
      handleSuccess(file){
        this.form.clothesImg = file.url
        this.$baseMessage(
          `文件[${file.raw.name}]上传成功,文件大小为${this.$baseLodash.round(
            file.raw.size / 1024,
            0
          )}KB`,
          'success'
        )
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
        this.form.clothesImg = file.url
        console.log(this.form.clothesImg);
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
    }
  }
</script>
