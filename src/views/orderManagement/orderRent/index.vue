<template>
  <div class="table-container">
    <vab-query-form>
      <el-form
        ref="form"
        :model="queryForm"
        :inline="true"
        @submit.native.prevent
      >
        <el-form-item>
          <el-button
            icon="el-icon-search"
            type="primary"
            v-show="isShow"
            @click="btnShow"
          >
            租用中的订单
          </el-button>
          <el-button
            icon="el-icon-search"
            type="primary"
            v-show="!isShow"
            @click="btnShow"
          >
            所有租凭订单
          </el-button>
        </el-form-item>
      </el-form>
    </vab-query-form>

    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      :height="height"
    >
      <el-table-column
        show-overflow-tooltip
        label="订单号"
        prop="order.orderId"
        width="95">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="服装名称"
        prop="order.clothesId"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="服装数量"
        prop="order.clothesNum"
        sortable
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="总金额"
        prop="order.totalCosts"
        sortable
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="客户ID"
        prop="order.buyerId"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="订单状态">
        <template #default="{ row }">
          <el-tooltip
            :content="row.order.state"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag :type="row.order.state | statusFilter">
              {{ row.order.state }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="开始时间"
        prop="beginTime"
        width="150"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="结束时间"
        prop="endTime"
        width="150"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="125rem" align="center">
        <template #default="{ row }">
          <el-button slot="reference" v-if="NotDeliver(row)" type="text" @click="handleDelivery(row)">发货</el-button>
          <el-button v-else-if="row.order.state=='Renting'" disabled='true'>租凭中</el-button>
          <el-button v-else-if="row.order.state=='Refund'" disabled='true'>退款中</el-button>
          <el-button v-else-if="row.order.state=='Return'" @click="handleReturn(row)">签收</el-button>
          <el-button disabled='true' v-else>已完成</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :background="background"
      :current-page="queryForm.pageNo"
      :layout="layout"
      :page-size="queryForm.pageSize"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
    <table-edit ref="edit"></table-edit>
  </div>
</template>

<script>
  import {getRentList,doRentQuery,doComplete} from '@/api/order'
  import TableEdit from './components/TableEdit'
  import {mapGetters} from "vuex";

  export default {
    name: 'ComprehensiveTable',
    components: {
      TableEdit,
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          'UnSent': 'danger',
          'Senting': 'gray',
          'Renting': 'gray',
          'Refund': 'danger',
          'Return': 'danger',
          'Complete': 'success'
        }
        return statusMap[status]
      },
    },
    data() {
      return {
        imgShow: true,
        list: [],
        isShow: true,
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        background: true,
        selectRows: '',
        dialogFormVisible: false,
        elementLoadingText: '正在加载...',
        queryForm: {
          pageNo: 1,
          pageSize: 20,
          title: '',
        },
      }
    },
    computed: {
      height() {
        return this.$baseTableHeight()
      },
      ...mapGetters({
        userid: 'user/userid',
      })
    },
    created() {
      this.fetchData()
    },
    beforeDestroy() {
    },
    mounted() {
    },
    methods: {
      btnShow(){
        this.isShow = !this.isShow
        this.fetchData()
      },
      NotDeliver(row){
        return row.order.state=="UnSent"
      },
      handleDelivery(row) {
        this.$refs['edit'].showEdit(row)
      },
      handleReturn(row){
        if (row.order.orderId) {
          this.$baseConfirm('你确定要签收吗', null, async () => {
            const order={
              orderId: row.order.orderId,
              orderState: row.order.state
            }
            await doComplete(order)
            this.$baseMessage('签收完成', 'success')
            this.fetchData()
          })
        } else {
          if (this.selectRows.length > 0) {
            this.$baseConfirm('你确定要签收吗', null, async () => {
              for (let i in this.selectRows){
                const order={
                  orderId: this.selectRows[i].order.orderId,
                  orderState: this.selectRows[i].order.state
                }
                await doComplete(order)
              }
              this.$baseMessage('签收完成', 'success')
              this.isShow = true
              this.fetchData()
            })
          } else {
            this.$baseMessage('未选中任何行', 'error')
            this.isShow = true
            return false
          }
        }
      },
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val
        this.fetchData()
      },
      handleQuery() {
        this.queryForm.pageNo = 1
        this.fetchData()
      },
      async fetchData() {
        this.listLoading = true
        const a ={
          businessId: parseInt(this.userid),
        }
        const {data, totalCount} = await getRentList(a)
        this.list = data
        if(this.isShow==false){
          const {data,totalCount} = await doRentQuery(a)
          this.list = data
        }
        this.total = this.list.length
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      },
      testNotify() {
        this.$baseNotify('测试消息提示', 'test', 'success', 'bottom-right')
      },
    },
  }
</script>
