<template>
  <div class="personalCenter-container">
    <el-tabs
      :tab-position="tabPosition"
      class="personContent"
    >
      <el-tab-pane>
        <span slot="label">
          <i class="el-icon-user-solid" />
          个人简介
        </span>
        <el-avatar
          icon="el-icon-user-solid"
          :src="form.headImg"
        />
        <el-row :gutter="24">
          <el-col
            :xs="24"
            :sm="16"
            :md="10"
            :lg="10"
            :xl="10"
          >
            <el-card class="box-card">
              <div>
                昵称：
                <div class="font-line">
                  {{ form.name }}
                </div>
              </div>
              <div>
                性别：
                <div class="font-line">
                  {{form.sex}}
                </div>
              </div>
              <div>
                手机号码：
                <div class="font-line">
                  {{form.phone}}
                </div>
              </div>
              <div>
                年龄：
                <div class="font-line">
                  {{form.age}}
                </div>
              </div>
              <div>
                简介：
                <div class="constant">
                  {{form.introduction}}
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <i class="el-icon-s-tools" />
          基本设置
        </span>
        <el-row :gutter="24">
          <el-col
            :xs="24"
            :sm="16"
            :md="10"
            :lg="10"
            :xl="10"
          >
            <el-card class="box-card2">
              <div>
                修改个人资料：
                <el-button
                  type="primary"
                  round
                  size="mini"
                  @click="dialogFormVisible = true"
                >
                  修改
                  <i class="el-icon-edit el-icon--right" />
                </el-button>
              </div>
              <el-divider />
              <div>
                修改头像：
                <el-button
                  type="primary"
                  round
                  size="mini"
                  @click="upavatar"
                >
                  上传
                  <i class="el-icon-upload el-icon--right" />
                </el-button>
              </div>
              <el-divider />
              <div>
                增加修改地址：
                <el-button
                  type="primary"
                  round
                  size="mini"
                  @click="dialogaddressVisible = true"
                >
                  上传
                  <i class="el-icon-upload el-icon--right" />
                </el-button>
              </div>

            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <i class="el-icon-s-opportunity" />
          安全设置
        </span>
        <el-row :gutter="24">
          <el-col
            :xs="24"
            :sm="16"
            :md="10"
            :lg="10"
            :xl="10"
          >
            <el-card class="box-card2">
              <div>
                修改密码：
                <el-button
                  type="primary"
                  round
                  size="mini"
                  @click="dialogPswVisible = true"
                >
                  密码
                  <i class="el-icon-lock el-icon--right" />
                </el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <!--<el-tab-pane label="账户绑定">安全设置</el-tab-pane> -->
    </el-tabs>

    <!--导入弹出窗-->
    <el-dialog
      title="修改资料"
      :visible.sync="dialogFormVisible"
      :width="dialogWidth"
    >
      <el-row :gutter="24">
        <el-col
          :xs="18"
          :sm="16"
          :md="15"
          :lg="15"
          :xl="15"
        >
          <el-form :model="form" ref="form">
            <el-form-item label="昵称">
              <el-input
                v-model="form.name"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item label="性别">
              <el-input
                v-model="form.sex"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item label="手机号码">
              <el-input
                v-model="form.phone"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item label="年龄">
              <el-input
                v-model="form.age"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item label="简介">
              <el-input
                v-model="form.introduction"
                autocomplete="off"
              />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">
          取 消
        </el-button>
        <el-button
          type="primary"
          @click="updateForm()"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
    <!--上传头像的弹窗-->
    <el-dialog
      title="收货地址"
      :visible.sync="dialogupdateVisible"
      :width="dialogWidth"
    >
      <el-row :gutter="24">
        <el-col
          :xs="18"
          :sm="16"
          :md="15"
          :lg="15"
          :xl="15"
        >
          <el-upload
            class="upload-demo"
            action="http://localhost:8080/updateUserImg"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :data="updata"
            :before-upload="upavatar"
            list-type="picture"
          >
            <el-button
              size="small"
              type="primary"
            >
              点击上传
            </el-button>
            <div
              slot="tip"
              class="el-upload__tip"
            >
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-col>
      </el-row>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="competeupavatar()">
          取 消
        </el-button>
        <el-button
          type="primary"
          @click="competeupavatar()"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
    <!---->
    <el-dialog
      title="增加地址"
      :visible.sync="dialogaddressVisible"
      :width="dialogWidth"
    >
      <el-row :gutter="24">
        <el-col
          :xs="18"
          :sm="16"
          :md="15"
          :lg="15"
          :xl="15"
        >
          <span>查看地址:</span>
          <el-select v-model="address" clearable placeholder="请选择">
            <el-option
              v-for="(item,index) in addressList"
              :key="index"
              :label="item.address"
              :value="item.addressId">
            </el-option>
          </el-select>
          <el-divider />
          <span>查看地址:</span>
          <div class="input">
            <el-input
              type="textarea"
              autosize
              placeholder="请输入地址"
              v-model="textarea">
            </el-input>
            <el-button class="el-icon-plus height" @click="addItem">新增地址</el-button>
          </div>
        </el-col>
      </el-row>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogaddressVisible = false">
          取 消
        </el-button>
        <el-button
          type="primary"
          @click="dialogaddressVisible = false"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
    <!---->
    <el-dialog
      title="修改密码"
      :visible.sync="dialogPswVisible"
      :width="dialogWidth"
      status-icon
    >
      <el-row :gutter="24">
        <el-col
          :xs="18"
          :sm="16"
          :md="15"
          :lg="15"
          :xl="15"
        >
          <el-form
            ref="PswForm"
            :model="PswForm"
            status-icon
            :rules="rules"
          >
            <el-form-item
              label="密码"
              prop="password"
            >
              <el-input
                v-model="PswForm.password"
                type="password"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item
              label="确认密码"
              prop="checkPassword"
            >
              <el-input
                v-model="PswForm.checkPassword"
                type="password"
                autocomplete="off"
              />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="resetForm('PswForm')">
          重 置
        </el-button>
        <el-button
          type="primary"
          @click="submitForm('PswForm')"
        >
          提 交
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getUserInfoList , UpdateUserList , updatePassword , selectAddressesByUserId , insertAddress} from '@/api/user'

  export default {
    name: 'PersonalCenter',
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.PswForm.checkPassword !== '') {
            this.$refs.PswForm.validateField('checkPassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.PswForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        tabPosition: 'left',
        dialogFormVisible: false,
        dialogupdateVisible: false,
        dialogPswVisible: false,
        dialogaddressVisible: false,
        form: [],
        dialogWidth: 0,
        fileList: [{}],
        PswForm: {
          password: '',
          checkPassword: '',
        },
        addressList: [],
        address:'',
        textarea: '',
        rules: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPassword: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        },
        updata: [],
      }
    },
    computed: {
      ...mapGetters({
        avatar: 'user/avatar',
        username: 'user/username',
        userid: 'user/userid',
      }),
    },
    created() {
      this.fetchData()
      this.setDialogWidth()
      this.getaddress()
    },
    mounted() {
      window.onresize = () => {
        return (() => {
          this.setDialogWidth()
        })()
      }
    },
    methods: {
      setDialogWidth() {
        console.log(document.body.clientWidth)
        var val = document.body.clientWidth
        const def = 800 // 默认宽度
        if (val < def) {
          this.dialogWidth = '94%'
        } else {
          this.dialogWidth = def * 0.6 + 'px'
        }
      },
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePreview(file) {
        console.log(file)
      },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const data = {
              userId: parseInt(this.userid),
              oldPassword: this.form.password,
              newPassword: this.PswForm.password
            }
            console.log(data);
            const { msg } = await updatePassword(data)
            console.log(msg);
            this.$refs[formName].resetFields();
            this.dialogPswVisible = false
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      async fetchData() {
        const { data } = await getUserInfoList(parseInt(this.userid))
        this.form = data
        console.log(this.form);
      },
      updateForm(){
        console.log(this.form.name);
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            const data = {
              userId: parseInt(this.userid),
              name: this.form.name,
              sex: this.form.sex,
              phone: this.form.phone,
              age: this.form.age,
              introduction: this.form.introduction,
            }
            console.log(data);
            const { msg } = await UpdateUserList(data)
            console.log(msg);
            this.fetchData()
            this.dialogFormVisible = false
          }
        })
      },
      async getaddress(){
        const List = {
          userId: parseInt(this.userid)
        }
        const { data } = await selectAddressesByUserId(List)
        this.addressList = data
        this.address = data[0].address
        console.log(this.addressList);
      },
      async addItem() {
        if(this.textarea != ''){
          const list = {
            address: this.textarea,
            userId: this.form.userId,
          }
          const { msg } = await insertAddress(list)
          this.$notify({
            title: '成功',
            message: '您的地址已提交成功',
            type: 'success'
          });
          this.textarea = ''
          this.getaddress()
        }
      },
      deleteItem(item) {
        var index = this.form.addresses.indexOf(item)
        if (index !== -1) {
          this.form.addresses.splice(index, 1)
        }
      },
      upavatar(){
        this.dialogupdateVisible = true
        const data = {
          userId: parseInt(this.userid)
        }
        this.updata = data
        console.log(this.updata);
      },
      competeupavatar(){
        this.dialogupdateVisible = false
        this.fetchData()
        async () => {
          await this.$store.dispatch('user/getUserInfo')
        }
      }
    },
  }
</script>
<style lang="scss" scoped>
  .personContent {
  .el-tabs__item {
    padding: 0 20px 0px 10px;
  }
  el-avatar {
    position: fixed;
  }
  .box-card {
    font-family: 微软雅黑;
    font-size: 0.93rem;
    line-height: 2rem;
    margin-left: 0.2em;
    margin-top: 0.5em;
    border-radius: 4px;
  .font-line {
    display: inline-block;
  }
  .constant {
    padding: 0.625rem;
    border: 0.0255rem solid #dfe6e9;
  }
  }
  .box-card2 {
    font-family: 微软雅黑;
    font-size: 0.97rem;
    line-height: 2rem;
    margin-left: 0.2em;
    margin-top: 0.5em;
    border-radius: 4px;
  div {
    margin-top: 0.1rem;
    margin-bottom: 0.325rem;
  }
  }
  .input{
    padding: 3px;
  .min-height{
    min-height: 25.992px;
  }
  }

  }
</style>

