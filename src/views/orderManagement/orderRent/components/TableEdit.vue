<<template>
  <el-dialog
    title="发货"
    :visible.sync="dialogFormVisible"
    width="35%"
    @close="close"
  >
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="发货地址">
        <el-select v-model="form.order.businessAddress" placeholder="请选择发货地址">
          <el-option v-for="item in addresses" :label="item.address" :value="item.address"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { doDelivery ,getAddress} from '@/api/order'
  import {mapGetters} from "vuex";

  export default {
    name: 'TableEdit',
    data() {
      return {
        form: {
          order:{
            businessAddress: '',
          }
        },
        addresses: [],
        dialogFormVisible: false,
      }
    },
    computed: {
      ...mapGetters({
        userid: 'user/userid',
      })
    },
    created() {
      this.showAddress()
    },
    methods: {
      async showAddress(){
        const id = {
          userId: parseInt(this.userid)
        }
        const address = await getAddress(id)
        this.addresses = address.data
      },
      showEdit(row) {
        this.$nextTick(()=>{
          this.form = Object.assign({}, row)
          this.form.order.businessAddress=null;
          this.dialogFormVisible = true
        })
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            const order = {
              orderId: this.form.order.orderId,
              businessAddress: this.form.order.businessAddress
            }
            await doDelivery(order)
            this.$baseMessage('发货成功', 'success')
            this.$refs['form'].resetFields()
            this.$nextTick(async ()=>{
              await this.$parent.fetchData()
            })
            this.dialogFormVisible = false
            this.form = this.$options.data().form
          } else {
            return false
          }
        })
      },
    },
  }
</script>
