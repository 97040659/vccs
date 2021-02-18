<template>
  <div class="table-container">
    <vab-query-form>
      <vab-query-form-left-panel>
        <el-button icon="el-icon-delete" type="danger" @click="handleDelete">
          批量处理
        </el-button>
      </vab-query-form-left-panel>
    </vab-query-form>

    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      :height="height"
      @selection-change="setSelectRows"
      @sort-change="tableSortChange"
    >
      <el-table-column
        show-overflow-tooltip
        type="selection"
        width="55"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="订单号"
        prop="orderId"
        width="95">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="总金额"
        prop="totalCosts"
        sortable
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="客户ID"
        prop="buyerId"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="创建时间"
        prop="createTime"
        width="200"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="180px">
        <template #default="{ row }">
          <el-button type="text" @click="handleDelete(row)" :disabled="isShow">处理</el-button>
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
  </div>
</template>

<script>
  import { getRefund, doComplete} from '@/api/order'
  import {mapGetters} from "vuex";
  export default {
    name: 'ComprehensiveTable',
    data() {
      return {
        imgShow: true,
        isShow: false,
        list: [],
        imageList: [],
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        background: true,
        selectRows: '',
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
    beforeDestroy() {},
    mounted() {},
    methods: {
      tableSortChange() {
        const imageList = []
        this.$refs.tableSort.tableData.forEach((item, index) => {
          imageList.push(item.img)
        })
        this.imageList = imageList
      },
      setSelectRows(val) {
        this.selectRows = val
      },
      handleDelete(row) {
        if (row.orderId) {
          this.$baseConfirm('你确定要签收吗', null, async () => {
            const order={
              orderId: row.orderId,
              orderState: row.state
            }
            await doComplete(order)
            this.$baseMessage('签收完成', 'success')
            this.fetchData()
          })
        } else {
          if (this.selectRows.length > 0) {
            this.$baseConfirm('你确定要处理吗', null, async () => {
              for (let i in this.selectRows){
                const order={
                  orderId: this.selectRows[i].orderId,
                  orderState: this.selectRows[i].state
                }
                await doComplete(order)
              }
              this.$baseMessage('处理完成', 'success')
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
      async fetchData() {
        this.listLoading = true
        const a ={
          businessId: parseInt(this.userid),
        }
        const {data, totalCount} = await getRefund(a)
        this.list = data
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
