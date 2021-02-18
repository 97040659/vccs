<template>
  <div class="table-container">
    <vab-query-form>
      <vab-query-form-left-panel>
        <el-button icon="el-icon-plus" type="primary" @click="handleUpdate">
          更新
        </el-button>
        <el-button icon="el-icon-delete" type="danger" @click="handleDelete">
          删除
        </el-button>
      </vab-query-form-left-panel>
      <vab-query-form-right-panel>
        <el-form
          ref="form"
          :model="queryForm"
          :inline="true"
          @submit.native.prevent
        >
          <el-form-item>
            <el-input v-model="queryForm.name" placeholder="请输入服装名" />
          </el-form-item>
          <el-form-item>
            <el-button
              icon="el-icon-search"
              type="primary"
              native-type="submit"
              @click="handleQuery"
            >
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-right-panel>
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
        label="服装编号"
        prop="clothesId"
        width="95">
      </el-table-column>
      <el-table-column show-overflow-tooltip label="图片">
        <template #default="{ row }">
          <el-image
            v-if="imgShow"
            :preview-src-list="imageList"
            :src="row.clothesImg"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="clothesName"
        label="服装名称"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="服装价格"
        prop="clothesCost"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="服装租金"
        prop="clothesRent"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="服装数量"
        prop="clothesNum"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="服装尺码"
        prop="clothesSize"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="服装介绍"
        prop="clothesInfo"
      ></el-table-column>
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
  import { getList,doQuery,doDeleteList } from '@/api/clothes'
  import TableEdit from './components/TableEdit'
  import {mapGetters} from "vuex";

  export default {
    name: 'ComprehensiveTable',
    components: {
      TableEdit,
    },
    data() {
      return {
        imgShow: true,
        list: null,
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
          name: null,
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
          imageList.push(item.clothesImg)
        })
        this.imageList = imageList
      },
      setSelectRows(val) {
        this.selectRows = val
      },
      handleUpdate() {
        if (this.selectRows.length === 1){
          this.$refs['edit'].showEdit(this.selectRows[0])
        }
        else {
          this.$baseMessage('同时只能更新一项', 'error')
          return false
        }
      },
      handleDelete(row) {
          if (this.selectRows.length > 0) {
            const clothesList = []
            for (let i in this.selectRows){
              clothesList[i] = this.selectRows[i].clothesId
            }
            this.$baseConfirm('你确定要删除选中项吗', null, async () => {
                // const { msg } = await doDelete(ids[i])
              const clothesIdList = {
                clothesIdList: clothesList
              }
              console.log(clothesIdList);
              const { msg } = await doDeleteList(clothesIdList)
              this.$baseMessage('删除成功', 'success')
              this.fetchData()
            })
          } else {
            this.$baseMessage('未选中任何行', 'error')
            return false
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
      async handleQuery() {
        this.fetchData()
      },
      async fetchData() {
        this.listLoading = true
        const a ={
          businessId: parseInt(this.userid),
        }
        const {data,totalCount} = await getList(a)
        this.list = data
        console.log(this.queryForm.name);
        if(this.queryForm.name!=null){
          const a = {
            inputName: this.queryForm.name
          }
          const {data,totalCount} = await doQuery(a)
          this.list = data
        }
        console.log(this.list);
        const imageList = []
        this.list.forEach((item) => {
          imageList.push(item.clothesImg)
        })
        console.log(imageList);
        this.imageList = imageList
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

